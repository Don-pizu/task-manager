// config/session.js

const session = require('express-session'); // to store user data on the server between HTTP requests — commonly used for login sessions, shopping carts, etc.

const sessionMiddleware = session({
	secret: 'tastStrongManager',
	resave: false, 
	saveUninitialized: false,
	cookie: {
		maxAge: 3600000,    // 1 hour
		httpOnly: true,    // prevents JS from reading the cookie
	    secure: true,      //  required for cross-site HTTPS 
	    sameSite: "none"   // llow cookies across domains (Vercel <-> Render)
	}
	});
	


module.exports = sessionMiddleware;