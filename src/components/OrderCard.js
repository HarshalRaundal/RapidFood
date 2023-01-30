import React from 'react'

const OrderCard = (props) => {
    const {itemName , itemDate , itemQty  , itemSize ,itemPrice} = props;
    return (
        <div>


            <div className="card fs-6 fw-normal m-1" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{itemName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{itemDate}</h6>
                    <div className="card-text">qty : {itemQty}</div>
                    <div className="card-text">size : {itemSize}</div>
                    <div className="card-text">price : ₹ {itemPrice}/-</div>
                </div>
            </div>

        </div>
    )
}

export default OrderCard