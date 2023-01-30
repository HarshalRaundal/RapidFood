const express = require('express');
const router = express.Router();
//orders Schema
const ordersModel = require('../Models/Orders');


router.route('/userOrders')
.post(async (req, res) => {
    try {
        // save user orders to orders collection
        let orders = req.body.orders;
        await orders.splice(0, 0, { orderDate: Date.now() });
        const order = {
            email : req.body.email,
            orders : [orders]
        }
        console.log('users order : ', order);
        //check is user has past orders
        let pastId = await ordersModel.findOne({ 'email': order.email });
        console.log(pastId);

        if (pastId === null) {
            // first order by customer
            try {
                await ordersModel.create(order).then(() => res.json({ success: true }));
            } catch (error) {
                console.log(error.message)
                res.send("Server Error", error.message)
            }
        } else {
            try {
                await ordersModel.findOneAndUpdate({ email: order.email },
                    {
                        // append current order to existing orders
                        $push: { orders: order.orders[0] }
                    }).then(() => {
                        res.json({ success: true });
                    })
            } catch (error) {
                console.log(error.message)
                res.send("Server Error", error.message)
            }
        }

    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }

});
router.route('/getUserOrders')
.post(async (req,res) =>{
    // fetch data from backend
    const userEmail = req.body.email;
    try {
        // check if orders are present in data base
        const orderData = await ordersModel.findOne({email : userEmail});
        if (orderData !== null)
        await console.log('orderData : ',orderData);
        
        res.json({orderData : orderData , 'success' : true})
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }

});

module.exports = router;