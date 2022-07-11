import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { BRANCH, RESTAURANT, NEW_BRANCH, DEL_BRANCH, EDIT_BRANCH } from '../../Query';
import '../category/category.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import EditBtn from './../../assets/img/edit2.png'
import DelBtn from '../../assets/img/delete.png'




function Branch() {

    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)
    
    const { data, loading } = useQuery(BRANCH);
    const { data: restaurant } = useQuery(RESTAURANT)
    
    const branchNameRef = useRef()
    const branchEditName = useRef()
    const branchSelect = useRef()
     
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEdit(false)
    const handelEditShow = (ID) =>{
        setShowEdit(true)
        handleBranchUpdate(ID)
    }
    const handleDelShow = (ID) => {
        setShowDel(true)
        handleDelete(ID)
    }
    const handleDelClose = () => setShowDel(false)

    // add brandh
    const [ newBranch ] = useMutation(NEW_BRANCH, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    
    // edit branch
    const [ updateBranch ] = useMutation(EDIT_BRANCH, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    ///delete branch
    const [ delBranch ] = useMutation(DEL_BRANCH, {
        update: (cache, data) => {
            console.log(data);
        }
    })

    const handleBranchSubmit = () => {
        newBranch({
            variables: {
                name: branchNameRef.current.value,
                resID: branchSelect.current.value
            }
        });
        alert('New branch is added!')
    }
 
    const handleDelete = (ID) => {
        delBranch({
            variables: {
                id: ID
            }
        });
    }


    const handleBranchUpdate = (ID) => {
        console.log(ID);
        console.log(branchEditName.current.value);
        updateBranch({
            variables: {
                id: ID,
                name: branchEditName.current.value
            }
        });
        alert('Branch is updated')
    }


    return(<>
    <div className="wrapper">
        <div className="content">
            <div className="header">
                <h3>Branch</h3>
                <button className="basketBtn"  onClick={handleShow}>
                    Add +
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Branch name</td>
                        <td>Restaurant name</td>
                        <td>Functionality</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.branches.map((e, i) => (
                            <tr key={i}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>
                                    {
                                        restaurant && restaurant.restaurants.map((el, i) => {
                                            if (e.resID == el.id){
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
            {/* Modal add category*/}
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleBranchSubmit}>
                    <input type="text" className='form-control' ref={branchNameRef} required placeholder='Type branch name ...'/>
                    <label htmlFor="select">Select restaurants</label>
                    <select name="" id="select" ref={branchSelect}>
                    <option defaultValue="choose" hidden value="choose">Choose</option>
                        {
                            restaurant && restaurant.restaurants.map((e, i) => {
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
           
            {/* Modal edit branch */}
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input type="text" className='form-control' ref={branchEditName} required placeholder='Type category name ...'/>
                        <div className="buttonsEdit">
                            <Button variant="secondary" onClick={handleEditClose}>
                                Close
                            </Button>
                            <Button  variant="success" className='sbmtBtn' type='submit' onSubmit={handleBranchUpdate} onClick={handleEditClose}>
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
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this branch?</div></Modal.Body>
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
export default Branch;