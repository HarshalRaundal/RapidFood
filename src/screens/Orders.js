import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navigationbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import noOrdersSvg from '../images/noOrders.svg';
export const Orders = () => {

    const [userOrders, setUserOrders] = useState([]);

    const FetchOrders = async () => {
        //fetch orders from backend
        await fetch("http://localhost:5000/api/getUserOrders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem("userEmail") })
        })
            .then(async (res) => {
                let response = await res.json();
                
                let orders = []
                // console.log(response.orderData);
                response.orderData !== null && 
                response.orderData.orders.map((currOrder) => {
                    let order = {
                        date :'',
                        orders:[]
                    }
                    
                    order.date = new Date(currOrder[0].orderDate).toDateString();
                    for (let i = 1; i < currOrder.length; i++) {
                        order.orders.push(currOrder[i]);
                    }
                    orders.push(order);
                    
                })
                setUserOrders(orders);
            })

    }

    useEffect(() => {
        FetchOrders();
    }, [])


    return (
        <>
            <Navigationbar />
            <div className='container-fluid p-2 m-3' >
                <div className='row fs-3 fw-bold  align-items-center' style={{minHeight:"70vh"}} >
                    {

                        userOrders.length === 0 ? 
                        <>
                        <img src={noOrdersSvg} className="d-block w-100" alt="..." style={{height:"60vh" ,objectFit:"contain"}}/>
                           
                        <div className='container text-center col  ' style={{height:"100%"}}>YOU DO NOT HAVE ANY ORDERS !!!</div>: 
                        </> :
                        userOrders.map((order ,index) => {
                            return (
                            <div key = {index+1}>
                                <div>
                                {order.date}
                                </div>
                            <hr></hr>
                    <div className='row  '>
                            {order.orders.map((item ,index) => { return (
                                <div key = {index+1} className='col  d-flex justify-content-center'>
                                <OrderCard itemName = {item.name }
                                           itemDate = {order.date}
                                           itemQty = {item.qty}
                                           itemSize = {item.size}
                                           itemPrice = {item.price} 
                                            />
                            </div>
                            )})}
                             </div>
                            </div>
                            // console.log(order)
                            
                            )

                           
                        })
                        
                    }
                    </div>
            </div>
            <Footer />
        </>
    )
}
