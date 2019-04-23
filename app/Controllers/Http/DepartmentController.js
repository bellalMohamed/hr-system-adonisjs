'use strict'

const Department = use('App/Models/Department');
const { validate } = use('Validator');

class DepartmentController {

	/**
	 * List all depratments on the database
	 * @param  {obj} options.request
	 * @param  {obj} options.response
	 * @return {json}                  all departments
	 */
	async all({request, response}) {
		const departments = await Department.query().select('id', 'name').fetch();
		return departments;
	}

	/**
	 * Create Depertment
	 * @param  {obj} options.request  request object
	 * @param  {obj} options.response response obj
	 * @return {json}                 json response
	 */
	async create({request, response}) {
		const validation = await validate(request.all(), {
			name: 'required|unique:departments',
		}, {
			'name.required': 'Department is required',
			'name.unique': 'Department already exists',
		});

		if (validation.fails()) return validation.messages();

		const department = await Department.create({
			name: request.input('name'),
		});

		return response.json({
			error: false,
			department: department
		});
	}

	/**
	 * Delete Depertment By Id
	 * @param  {obj} options.request  request object
	 * @param  {obj} options.response response obj
	 * @return {json}                 json response
	 */
	async delete({request, response}) {
		const validation = await validate(request.all(), {
			departmentId: 'required',
		}, {
			'name.required': 'Department Id is required',
		});

		if (validation.fails()) return validation.messages();

		const result = await Department.query().where('id', request.input('departmentId')).delete();

		const message = (result) ? 'Department deelted successfully' : 'Error deleting department';
		const status = (result) ? 200 : 400;

		return response.status(status).json({
			error: result ? false : true,
			message: message
		})
	}
}

module.exports = DepartmentController
