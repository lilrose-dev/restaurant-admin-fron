import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { BRANCH, FOOD, NEW_FOOD, DEL_FOOD, EDIT_FOOD } from '../../Query';
import '../category/category.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import EditBtn from './../../assets/img/edit2.png'
import DelBtn from '../../assets/img/delete.png'




function Food() {

    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)
    
    const { data, loading } = useQuery(FOOD);
    const { data: branch } = useQuery(BRANCH)

    const foodNameRef = useRef()
    const foodEditName = useRef()
    const foodSelect = useRef()
    const foodPrice = useRef()
     
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEdit(false)
    const handelEditShow = (ID) =>{
        setShowEdit(true)
        handleFoodUpdate(ID)
    }
    const handleDelShow = (ID) => {
        setShowDel(true)
        handleDelete(ID)
    }
    const handleDelClose = () => setShowDel(false)

    // add food
    const [ newFood ] = useMutation(NEW_FOOD, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    
    // edit food
    const [ updateFood ] = useMutation(EDIT_FOOD, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    ///delete food
    const [ delFood ] = useMutation(DEL_FOOD, {
        update: (cache, data) => {
            console.log(data);
        }
    })

    const handleFoodSubmit = () => {
        newFood({
            variables: {
                name: foodNameRef.current.value,
                branchID: foodSelect.current.value,
                price: foodPrice.current.value -0
            }
        });
        alert('New food is added!')
    }


    const handleFoodUpdate = (ID) => {
        console.log(ID);
        updateFood({
            variables: {
                id: Number(ID),
                name: foodEditName.current.value
            }
        })
    }

    const handleDelete = (ID) => {
        delFood({
            variables: {
                id: ID
            }
        })
    }


    return(<>
    <div className="wrapper">
        <div className="content">
            <div className="header">
                <h3>Food</h3>
                <button className="basketBtn"  onClick={handleShow}>
                    Add +
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Food name</td>
                        <td>Food price</td>
                        <td>Branch name</td>
                        <td>Functionality</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.food.map((e, i) => (
                            <tr key={i}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.price} so'm</td>
                                <td>
                                    {
                                        branch && branch.branches.map((el, i) => {
                                            if (e.branchID == el.id){
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
            {/* Modal add food*/}
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add food</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleFoodSubmit}>
                    <div className="wrap">
                        <label htmlFor="foodName">Food name:</label>
                        <input type="text" className='form-control' ref={foodNameRef} required placeholder='Type branch name ...'/>
                    </div>
                    <div className="wrap">
                        <label htmlFor="price">Food price</label>
                        <input type="number" id='price' ref={foodPrice} placeholder='Food price'/>  
                    </div>
                    <div className="wrap">
                        <label htmlFor="select">Select restaurants</label>
                        <select name="" id="select" ref={foodSelect}>
                        <option defaultValue="choose" hidden value="choose">Choose</option>
                            {
                                branch && branch.branches.map((e, i) => {
                                    return <option key={i} value={e.id}>{e.name}</option>
                                })
                            }
                        </select>
                    </div>
                   
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
           
            {/* Modal edit food */}
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <input type="text" className='form-control' ref={foodEditName} required placeholder='Type category name ...'/>
                        <div className="buttonsEdit">
                            <Button variant="secondary" onClick={handleEditClose}>
                                Close
                            </Button>
                            <Button  variant="success" className='sbmtBtn' type='submit' onSubmit={handleFoodUpdate} onClick={handleEditClose}>
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
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this food?</div></Modal.Body>
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
export default Food;