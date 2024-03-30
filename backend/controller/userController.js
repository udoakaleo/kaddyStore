import user from "../model/userModel.js";
import asyncHandler from "../middleware/asyncHandle.js";
import bcrypt from "bcryptjs";
import getToken from "../assets/getToken.js";

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new Error("please enter your data");
	}
	const foundUser = await user.findOne({ email })
	if (foundUser) res.status(400).json({ message: "user already taken" });

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new user({ username, email, password: hashedPassword });

	try {
		await newUser.save();
		getToken(res, newUser._id);
		res.status(201).json({
			_id: newUser._id,
			username: newUser.username,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
		}); 
	} catch (error) {
		res.status(400);
		throw new Error("invalid data");
	}
});
  
 const loginUser = asyncHandler(async(req, res)=> {
    const {email, password} = req.body;
	const existingUser = await user.findOne({email});
	if(existingUser) {
		const matchPassword = await bcrypt.compare(password, existingUser.password);
		 if(matchPassword){
			getToken(res, existingUser._id);

			res.status(201).json({
				_id: existingUser._id,
				username: existingUser.username,
				email: existingUser.email,
				isAdmin: existingUser.isAdmin,
			});
			return;
		 }
	} 
 })

     const logoutUser = asyncHandler(async(req, res) => {
           res.cookie("jwt", "", {
			httpOnly: true,
			expiresIn: new Date(0)
		   });
		   res.status(204).json({message: "you have been loggesout"})

	 })
export { createUser, loginUser, logoutUser };
