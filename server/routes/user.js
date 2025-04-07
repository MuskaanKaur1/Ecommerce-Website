const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");


router.post('/signup', async (req, res) => {
    
    const { name, email, phone, password } = req.body;
    
    try {
        
        const existingUser = await User.findOne({email: email});

        if (existingUser) {
            return res.status(400).json({ msg: 'User Already exists!' });
        }
        
        
        const hashPassword = await bcrypt.hash(password,10);


        const result = await User.create({
                name: name,
                phone: phone,
                email: email,
                password: hashPassword
        });

        const token = jwt.sign(
            { email: result.email, id: result._id }, 
            process.env.JSON_WEB_TOKEN_SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            user:result,
            token:token
        })
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

router.post('/signin', async (req, res) => {
    
    const { email, password } = req.body;
    
    try {
        
        const existingUser = await User.findOne({email: email});

        if (!existingUser) {
            return res.status(404).json({ msg: 'User not Found!' });
        }
        

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ msg: 'Invalid Credentials!' });
        }


        const token = jwt.sign({email:existingUser, id:existingUser._id},process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            user:existingUser,
            token:token,
            msg:"user Authenticated"
        })
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

router.get(`/`, async (req,res) => {
    const userList = await User.find();

    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
});

router.get(`/:id`, async (req,res) => {
    const user = await User.findById(req.params.id);
    
    
        if (!user){
            res.status(500).json({ message: 'The user with the given ID was not found,'})
        }
        return res.status(200).send(user);
});

router.delete(`/:id`, async (req,res) => {
    User.findByIdAndDelete(req.params.id).then(user=>{
        if(user){
            return res.status(200).json({success:true, message:'the user is deleted!'})
        }else{
            return res.status(404).json({success:false, message:'user not found!'})
        }
    }).catch(err=>{
        return res.status(500)({success:false, error:err})
    })
    
});

router.get(`/get/count`, async(req,res)=>{
    const userCount = await User.countDocuments((count)=>count)
    
    if(!userCount){
        res.status(500).json({success:false})
    }
    res.send({
        userCount: userCount
    });
})

router.put(`/:id`, async (req,res) => {

        const {name, phone, email, password } = req.body;

        const userExist = await User.findById(req.params.id); 
        let newPassword 
        if(req.body.password) { 
        newPassword = bcrypt.hashSync(req.body.password, 10) 
        } else { 
        newPassword = userExist.password; 
        }
        const user = await User.findByIdAndUpdate( 
        req.params.id, 
        { 
        name:name, 
        phone: phone, 
        email:email, 
        password:newPassword
        },
        {new:true}
    )

   
    if (!user){
        return res.status(400).send('the user cannot be updated!')
    }
    res.send(user);
})

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); // Exclude password
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
});

module.exports = router;


//Token

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6eyJuYW1lIjoibXVzc2kiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRGTEx0ZU1hQVNyNkFhV2poQkg3S0FlaWhNN0RGOFpWT3lJdGVtd3dNMG8vYlQ2aU14d0liQyIsIl9pZCI6IjY3Yjc1MTRiZWQwMzJkODY5MGIzMTlkYSIsIl9fdiI6MCwiaWQiOiI2N2I3NTE0YmVkMDMyZDg2OTBiMzE5ZGEifSwiaWQiOiI2N2I3NTE0YmVkMDMyZDg2OTBiMzE5ZGEiLCJpYXQiOjE3NDAwNjcxNDd9.Wj0vgthgVx12O80zlSBPt1HMJBqls2XqXemuNy6g-Vc

{/*
    "name": "muskaan",
    "phone": "1234567890",
    "email":"muskaan@gmail.com",
    "password":"muskaan"
    */}

