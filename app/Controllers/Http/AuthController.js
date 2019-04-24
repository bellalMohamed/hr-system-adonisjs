'use strict'

const Manager = use('App/Models/Manager');
const Hash = use('Hash');
const { validate } = use('Validator');

class AuthController {
	async login ({ auth, request, response }) {
		const validation = await validate(request.all(), {
			email: 'required|email',
			password: 'required|min:6'
		}, {
			'password.min': "Password must be at least 6 chars",
			'email.email': "Please Provide a valid email address",
			'email.required': "Please Provide your email address",
		});

		if (validation.fails()) return validation.messages();

	 	const { email, password } = request.all()

	    let token = await auth.attempt(email, password)
	    return token;
	}

	wrongCredentials(response) {
		return response.status(401).json({
			'error': true,
			'message': 'Please, check your login credentials'
		});
	}
}

module.exports = AuthController
