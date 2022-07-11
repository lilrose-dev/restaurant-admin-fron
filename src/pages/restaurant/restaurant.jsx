import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { RESTAURANT, CATEGORY, NEW_RESTAURANT, EDIT_RES, DEL_RESTAURANT } from '../../Query';
import '../category/category.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import EditBtn from './../../assets/img/edit2.png'
import DelBtn from '../../assets/img/delete.png'




function Restaurants() {

    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)
    
    const { data, isLoading } = useQuery(RESTAURANT);
    const { data: category } = useQuery(CATEGORY)

    const resNameRef = useRef()
    const resEditName = useRef()
    const resCatID = useRef()
     
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEdit(false)
    const handelEditShow = (id) =>{
        setShowEdit(true)
        handleResUpdate(id)
    }
    const handleDelShow = (ID) => {
        setShowDel(true)
        handleDelete(ID)
    }
    const handleDelClose = () => setShowDel(false)

    // add restaurant
    const [ newRestaurant ] = useMutation(NEW_RESTAURANT, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    
    // edit restaurant
    const [ updateRestaurant ] = useMutation(EDIT_RES, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    // /delete restaurant
    const [ delRestaurant ] = useMutation(DEL_RESTAURANT,{
        update:(cache, data) => {
            console.log(data);
        }
    })

    const handleResSubmit = () => {
        newRestaurant({
            variables: {
                name: resNameRef.current.value,
                catID: resCatID.current.value
            }
        });
        alert('New restaurant is added!')
    }


    const handleResUpdate = (id) => {
        console.log(id);
        updateRestaurant({
            variables: {
                id: Number(id),
                name: resEditName.value
            }
        });
        // alert('Restaurant is updated!')
    }

    const handleDelete = (ID) => {
        delRestaurant({
            variables: {
                id: ID
            }
        })
    }

    return(<>
    <div className="wrapper">
        <div className="content">
            <div className="header">
                <h3>Restaurant</h3>
                <button className="basketBtn"  onClick={handleShow}>
                    Add +
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Restaurant name</td>
                        <td>Category</td>
                        <td>Functionality</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.restaurants.map((e, i) => (
                            <tr key={i}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>
                                    {
                                        category && category.categories.map((el, ix) => {
                                            if(el.id == e.catID){
                                                return el.name
                                            }
                                        })
                                    }
                                </td>
                                <td>
                                    <button className='editbtn' onClick={() => handelEditShow(e.id)}>
                                        <img src={EditBtn} width={'30'} height={'30'} alt="edit-button" />
                                    </button>
                                    <button className='delbtn' onClick={() => handleDelShow(e.id)}>
                                        <img src={DelBtn} width={'30'} height={'30'} alt="edit-button" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* Modal add restaurant*/}
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add restaurant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleResSubmit}>
                    <label htmlFor="resName">Restaurant name:</label>
                    <input type="text" id='resName' className='form-control' ref={resNameRef} required placeholder='Type category name ...'/>
                    <label htmlFor="select">Select category:</label>
                    <select ref={resCatID} id='select'>
                            <option defaultValue="choose" hidden value="choose">Choose</option>
                            {
                                category && category.categories.map((e, i) => {
                                    return <option key={i} value={e.id}>{e.name}</option>
                                })
                            }
                    </select>
                    <div className="buttons">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button  variant="primary" className='sbmtBtn' type='submit' onClick={handleClose}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal.Body>
            </Modal>
           
            {/* Modal edit restaurant */}
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit restaurant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleResUpdate}>
                        <input type="text" className='form-control' ref={resEditName} required placeholder='Type restaurant name ...'/>
                        <div className="buttonsEdit">
                            <Button variant="secondary" onClick={handleEditClose}>
                                Close
                            </Button>
                            <Button  variant="success" className='sbmtBtn' type='submit' onClick={handleEditClose}>
                                Save changes
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
       

            {/* Modal delete confirmation */}
            <Modal show={showDel} onHide={handleDelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this restaurant?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelClose}>
                        Close
                    </Button>
                    <Button  variant="danger" className='sbmtBtn' type='submit' onSubmit={handleDelete} onClick={handleDelClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    </div>
    </>)
}
export default Restaurants;