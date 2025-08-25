//controllers/authController.js

const User = require('../models/User');
const { readFile, writeFile } = require('../models/file');
const path = require('path');
const bcrypt = require('bcryptjs');

const USERS_FILE = path.join(__dirname, "../json/users.json");

//POST     Register a new user
exports.register = async (req, res, next) => {
	const { name, email, password } = req.body;

	let users = readFile(USERS_FILE);

	if( !name || !email || !password ){
		return res.status(400).json({ message: 'All the fields are required'});
	}

	// check the length of password
	if (password.length < 4) {
		return res.status(400).send('Pass must be at least 4 character ');
	}

	//check if user name already exist
	const userExists = users.find(u => u.name === name);

	if(userExists)
		return res.status(400).send('Name already exists');

	//check id email exist
	const eExists = await users.find(u => u.email === email);

	if (eExists)
		return res.status(400).send('Email already exists');

	//hash password
	const hashedpassword = await bcrypt.hash(password, 10);

	users.push({ name, email, password: hashedpassword });
	writeFile(USERS_FILE, users);

	res.send({
		message: 'Signup successful! Please Login',
		name,
		email,
	});

};



//POST     Login user
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	let users = readFile(USERS_FILE);

	//check if email already exist
	const user = users.find(u => u.email === email);

	if(!user)
		return res.status(401).send('Invalid credentials: user not found');

	const match = await bcrypt.compare(password, user.password);

	if (!match)
		return res.status(401).send('Invalid credentials: password mismatch');

	req.session.user = { email: user.email, name: user.name };
	res.status(200).send({
		message: 'Login successful',
		name: user.name,
		email: user.email
	});
};



//POST   logout user
exports.logout = async (req, res, next) => {
	req.session.destroy( (err) => {
		if (err) {
			return res.status(500).json({ error: 'Logout failed' });
		}
		res.clearCookie('connect.sid');
		res.send( 'Logged out successfully');
	});
};

