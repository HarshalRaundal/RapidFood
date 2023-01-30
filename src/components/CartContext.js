import React, { createContext, useContext, useReducer } from 'react'

//context to use

const CartStateContext = createContext();
const CartDispatchContext = createContext();

//reducer 
const reducer = (state , action) => {
    //complex state update logic
    switch(action.type){
        case 'ADD':
            return [...state , {id:action.id , 
                                name : action.name,
                                img: action.img,
                                description : action.description,
                                price : action.price,
                                qty: action.qty,
                                size : action.size    
                            }]
        case 'REMOVE':
            var items = [...state]
            items.splice(action.index , 1)
            return items

        case 'UPDATE' :
            let arr = [...state]
            arr.find((food, index) => {
                
                if (food.id === action.id && food.size === action.size) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                    return arr
                }
                
            })
            return arr

        case 'DROP':
            let dropArr = []
            return dropArr
            
        default :
            console.log('Error in Reducer')
    }
}

export  const CartProvider = ({children}) =>{
 
    const [state , dispatch] = useReducer(reducer , []);

    return (
        <CartDispatchContext.Provider value = {dispatch}>
            <CartStateContext.Provider value = {state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
        );

}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);