import express from "express";
import {createUser, loginUser, logoutUser}from "../controller/userController.js"
const router = express.Router()

router.route('/').post(createUser); 
router.post('/auth', loginUser); 
router.post('/logout', logoutUser);


export default router;