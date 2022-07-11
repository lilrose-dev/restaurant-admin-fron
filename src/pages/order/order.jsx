import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { DEL_ORDER, ORDER } from '../../Query';
import '../category/category.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import DelBtn from '../../assets/img/delete.png'




function Order() {
    const navigate = useNavigate()
    const [ show, setShow ] = useState(false)
    const [ showEdit, setShowEdit] = useState(false)
    const [ showDel, setShowDel] = useState(false)
    
    const { data, loading } = useQuery(ORDER);
    console.log(data);

    
     
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setShowEdit(false)
   
    const handleDelShow = (ID) => {
        setShowDel(true)
        handleDelete(ID)
    }
    const handleDelClose = () => setShowDel(false)

    

    ///delete order
    const [ delOrder ] = useMutation(DEL_ORDER, {
        update: (_, data)=> {
            console.log(data);
        }
    })

    const handleDelete = (ID) => {
        delOrder({
            variables: {
                id: ID
            }
        })
        navigate('/order', {replace: true})
    }




    return(<>
    <div className="wrapper">
        <div className="content">
            <div className="header">
                <h3>Order</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>User name</td>
                        <td>Food name</td>
                        <td>Location</td>
                        <td>Phone</td>
                        <td>Price</td>
                        <td>Count</td>
                        <td>Functionality</td>
                    </tr>
                </thead>    
                <tbody>
                    {
                        data && data.orders.map((e, i) => (
                            <tr key={i}>
                                <td>{e.id}</td>
                                <td>{e.userName}</td>
                                <td>{e.foodName}</td>
                                <td>{e.location}</td>
                                <td>{e.phone}</td>
                                <td>{e.price} so'm</td>
                                <td>{e.count}</td>
                                <td>
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
                    <Button  variant="danger" className='sbmtBtn' onSubmit={handleDelete} type='submit' onClick={handleDelClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    </div>
    </>)
}
export default Order;