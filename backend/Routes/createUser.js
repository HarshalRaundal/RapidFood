const express = require('express');
const { body, validationResult } = require('express-validator');
//create an instance of router
const userRouter = express.Router();

const userModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jsonSecret = 'rapidfood_is_solution_to_your_hunger';


//define routes
// route for signUp
userRouter.route('/createUser')
    .post([
        body('name','name length must be greater than 5').isLength({ min: 5 }),
        body('password','password length must be greater than 5').isLength({ min: 5 }),
        body('email' , 'Enter valid email').isEmail()]
        , async (req, res, next) => {
            // validate user credentials data
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // console.log(errors);
                return res.status(400).json({ errors: errors.array(),success:false });
            }
            

            try {
                const saltRounds = 10; //the cost of processing the data
                const plainPassword = req.body.password;
                const hashedPassword = await bcrypt.genSalt(saltRounds)
                                            .then(salt => {
                                                // salt is completely random every time genSalt is run
                                                console.log(`salt :${salt}`)
                                                return bcrypt.hash(plainPassword , salt);
                                            })
                                            .then(hash =>  {
                                                console.log(`Hash : ${hash}`);
                                                return hash;
                                            })
                                            .catch(err => console.error('Error encrypting password : ',err.message));

                //create user and save to database

            let user = {
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: hashedPassword
            };
            console.log(user);
                // save user
                await userModel.create(user).then(
                //return acknowledge to fronend/api
                res.json({ success: true }));

            } catch (error) {
                console.log(error);
                res.json({ success: false });
            }
        });


// route for signIn
userRouter.route('/signIn')
.post([
    body('password','password length must be greater than 5').isLength({ min: 5 }),
    body('email' , 'Enter valid email').isEmail()]
    , async (req, res, next) => {
        // validate user credentials data
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() ,success:false});
        }

        //create user and save to database
        let user = {
            email: req.body.email,
            password: req.body.password
        };

        try {
            // save user
            let userData = await userModel.findOne({email : user.email});
            
            // console.log('user req : ' , user ,'\n user data :  ' , userData);
            //user do not exits
            if(!userData){
                // console.log('user not found!');
                return res.status(400).json({ errors: 'Try login with correct credentials' ,success:false});
            }
            

            const validation = await bcrypt.compare(user.password , userData.password)
                                    .then( result => { 
                                        console.log(result);
                                        return result;
                                    })
                                    .catch(err => {
                                        console.error('Error in bcrypt.compare : ',err.message);
                                    });
                                   

            if (validation){
                //generate auth token
                const data = { 
                    userID : userData.id,
                    Date : new Date()
                }
                console.log('payload: ',data);
                const authToken = jwt.sign(data , jsonSecret);
                return res.json({success: true , authToken : authToken});
            }else{
                return res.status(400).json({ errors: 'Incorrect Password !' ,success:false});
            }
            

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });


//export route
module.exports = userRouter;