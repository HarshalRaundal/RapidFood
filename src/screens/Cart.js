import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCart, useDispatchCart } from '../components/CartContext';
import { FaTrashAlt } from 'react-icons/fa';

function Cart({onClose}) {
    const cartData = useCart();
    const cartDispatch = useDispatchCart();
    let totalPrice = cartData.reduce((total, food) => total + food.price, 0)
    
    const handleCheckOut = async ()=>{
        // save all cart data to database
        const order = {
            email : localStorage.getItem("userEmail"),
            orders : cartData
        }
        // console.log('user order : ', order);
        // save to database
        const response = await fetch("http://localhost:5000/api/userOrders",{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify(order)
        })

        const orderResponse = await response.json();
        // await console.log("Response: ",orderResponse);

        
        // clear cart , assuming order is successful
        orderResponse.success && cartDispatch({type:'DROP'});

    }

    return (
        <>
           

            <Modal
                show = {true}
                onHide={onClose}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        My Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {cartData.length === 0 ? <div className='fs-1 text-center fw-bold'> CART IS EMPTY !!!</div> : 
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Option</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>

                            {cartData.map((item,index) => {
                                return (
                                <tr key = {index+1 }>
                                    <th scope="row ">{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}</td>
                                    <td className='text-center' onClick={() => {cartDispatch({type : 'REMOVE' , index:index})}}> <FaTrashAlt /></td>
                                </tr>
                                )
                            })}


                        </tbody>
                    </table>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className='fw-bold pe-3'>Total : {totalPrice}/-</div>
                    <Button variant="secondary" onClick = {handleCheckOut}>Check Out</Button>

                </Modal.Footer>
            </Modal>
            
        </>
    );
}

export default Cart;