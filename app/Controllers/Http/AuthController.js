'use strict'

const User = use('App/Models/User');
const Hash = use('Hash');
const { validate } = use('Validator');

class AuthController {
	async login ({ auth, request, response }) {
		const validation = await validate(request.all(), {
			email: 'required|email',
			password: 'required'
		});

		if (validation.fails()) return this.wrongCredentials(response);

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
