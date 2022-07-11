import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { CATEGORY, NEW_CATEGORY, EDIT_CATEGORY, DEL_CATEGORY } from '../../Query';
import './category.css'
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import EditBtn from './../../assets/img/edit2.png'
import DelBtn from '../../assets/img/delete.png'




function Category() {

    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)
    
    const { data, isLoading } = useQuery(CATEGORY);
    
    const [ info, setInfo ] = useState()
    
    const catNameRef = useRef()
    const catEditName = useRef()
     
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEdit(false)
    const handelEditShow = (ID) =>{
        const catID = Number(ID)
        setShowEdit(true)
        handleCatUpdate(catID)
    }
    const handleDelShow = (ID) => {
        setShowDel(true)
        handleDel(ID)
    }
    const handleDelClose = () => setShowDel(false)

    // add category
    const [ newCategory ] = useMutation(NEW_CATEGORY, {
        update: (cache, data) => {
            console.log(data)
        }
    })

    // edit category
    const [ updateCategory ] = useMutation(EDIT_CATEGORY, {
        update: (cache, data) => {
            console.log(data);
        }
    })

    ///delete category
    const [delCategory] = useMutation(DEL_CATEGORY, {
        update: (_, data) => {
            console.log(data);
        }
    })

    const handleCatSubmit = () => {
        newCategory({
            variables: {
                name: catNameRef.current.value
            }
        });
        alert('New category is added!')
    }


    const handleCatUpdate = (catID) => {
        updateCategory({
            variables: {
                id: catID,
                name: catEditName
            }
        })
    }

    const handleDel = (ID) => {
        delCategory({
            variables: {
                id: ID
            }
        })
    }

    return(<>
    <div className="wrapper">
        <div className="content">
            <div className="header">
                <h3>Category</h3>
                <button className="basketBtn"  onClick={handleShow}>
                    Add +
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Category name</td>
                        <td>Functionality</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.categories.map((e, i) => (
                            <tr key={i}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
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
            <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleCatSubmit}>
                    <input type="text" className='form-control' ref={catNameRef} required placeholder='Type category name ...'/>
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
           
            {/* Modal edit category */}
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleCatSubmit}>
                        <input type="text" className='form-control'  ref={catEditName} required placeholder='Type category name ...'/>
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
                <Modal.Body><div className="alert alert-danger">Are you sure want to delete this category?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDelClose}>
                        Close
                    </Button>
                    <Button  variant="danger" className='sbmtBtn' type='submit'onSubmit={handleDel} onClick={handleDelClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    </div>
    </>)
}
export default Category;