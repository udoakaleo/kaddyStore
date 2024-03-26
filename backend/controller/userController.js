import user from "../model/userModel.js";
import asyncHandler from "../middleware/asyncHandle.js";
import bcrypt from "bcryptjs";
import getToken from "../assets/getToken.js";

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new Error("please enter your data");
	}
	const foundUser = await user.findOne({ email }).exec();
	if (foundUser) res.status(400).json({ message: "user already taken" });

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new user({ username, email, password: hashedPassword });

	try {
		await newUser.save();
		getToken(res, newUser._id);
		res.status(201).json({
			_id: newUser.id,
			username: newUser.username,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
		});
	} catch (error) {
		res.status(40);
		throw new Error("invalid data");
	}
});

export { createUser };
