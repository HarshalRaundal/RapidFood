import React, { useState ,useRef, useEffect} from 'react';
import {useCart , useDispatchCart} from './CartContext';

const Card = (props) => {

    let dispatch = useDispatchCart();
    let cartData = useCart();

    let options = props.itemOptions;
    let priceOption = Object.keys(options);

    const initalSize = useRef();
    const [qty , setQty] = useState(1);
    const [size , setSize]  = useState("");

    useEffect(  () => {
        setSize(initalSize.current.value)
        // console.log(initalSize.current.value);
    },[]);

    let finalPrice = qty * (options[size]);

    
    const handleAddToCart = async () => {

        // let food = [];

        for (const item of cartData) {
            if(item.id === props.foodItem._id && item.size === size){
                await dispatch({type : 'UPDATE' , id:props.foodItem._id, qty : qty, size : size,price : finalPrice });
                return;
            }
        }
        
        // console.log('food => ' + food.name + ' size ' +food.size + ' current size : ' + size) ;

        // if(food  !== []) {
        //     if(food.size === size){
        //         // update item from cart
                
        //         await dispatch({type : 'UPDATE' , id:props.foodItem._id, qty : qty, price : finalPrice });
        //         return;
        //     }else if (food.size !== size)  {
        //         // add new item to cart
        //         await dispatch({type : 'ADD' , 
        //                 id:props.foodItem._id,
        //                 name:props.foodItem.name,
        //                 img: props.foodItem.img,
        //                 description : props.foodItem.description,
        //                 qty : qty,
        //                 size : size,
        //                 price : finalPrice
        //             });
        //         return;
                    
        //     }
        //     return;
        // }

        await dispatch({type : 'ADD' , 
                        id:props.foodItem._id,
                        name:props.foodItem.name,
                        img: props.foodItem.img,
                        description : props.foodItem.description,
                        qty : qty,
                        size : size,
                        price : finalPrice
                    });

    }
    return (
        <div>
            <div className="card " style={{ "width": "20rem", maxHeight: "400px" }}>
                <div  >
                    <img className="card-img-top" style={{ display: "block", maxHeight: "300px" }} src={props.foodItem.img} alt="Card image cap" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <div className='container d-flex justify-content-around align-items-center'>
                        <select className='p-1 m-2' onChange={(e) => {setQty(e.target.value)}}>
                            {
                                Array.from(Array(5), (e, i) => {
                                    return (<option key={i + 1} value={i + 1}>{i + 1} </option>)
                                })
                            }

                        </select>
                        <select className='p-1 m-2' ref = {initalSize} onChange={(e) => {setSize(e.target.value)}}>
                            {priceOption.map(option => {
                                return (

                                    <option key={option} value={option}>{option}</option>

                                )
                            })}

                        </select>
                        <div className='d-inline p-2  '>
                        ₹ {finalPrice} /-
                        </div>
                        
                    </div>
                    <hr></hr>
                        <div className='btn btn-outline-dark' onClick={handleAddToCart}>
                        
                            Add to cart</div>
                </div>
            </div>

        </div>
    )
}

export default Card