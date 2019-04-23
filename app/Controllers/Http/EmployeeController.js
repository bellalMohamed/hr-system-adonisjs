'use strict'

const Employee = use('App/Models/Employee');
const Department = use('App/Models/Department');
const { validate } = use('Validator');

class EmployeeController {
	async all({ request, response }) {
		const employees = await Employee.all();

		return employees;
	}

	async create({ request, response }) {
		const validation = await validate(request.all(), {
			name: 'required',
			email: 'required|unique:employees',
			departmentId: 'required',
		}, {
			'name.required': 'Employee name is required',
			'email.required': 'Employee email is required',
			'email.unique': 'Email already exists',
		});

		if (validation.fails()) return validation.messages();

		const { name, email, departmentId, city } = request.all();

		const validDepartmentId = await this.isValidDepartmentId(departmentId);
		if (!validDepartmentId) {
			return response.status(400).json({
				error: true,
				message: 'Please, Select a valid depratment',
			});
		}

		const employee = await Employee.create({
			name, email, city, 'department_id': departmentId,
		});

		return response.json({
			error: false,
			message: "Employee created successfully",
			employee: employee,
		})
	}

	async delete({ request, response }) {
		const validation = await validate(request.all(), {
			employeeId: 'required',
		}, {
			'employeeId.required': 'Please specify the employee you want to delete',
		});

		if (validation.fails()) return validation.messages();

		const result = Employee.query().where('id', request.input('employeeId')).delete();

		return response.json({
			error: false,
			message: 'Employee Deleted Sucessfully',
		});
	}

	async update({ request, response}) {
		const validation = await validate(request.all(), {
			employeeId: 'required',
			name: 'required',
			email: 'required',
			departmentId: 'required',
		}, {
			'name.required': 'Employee name is required',
			'email.required': 'Employee email is required',
			'email.unique': 'Email already exists',
		});

		if (validation.fails()) return validation.messages();

		const { employeeId, name, email, departmentId, city } = request.all();

		const validDepartmentId = await this.isValidDepartmentId(departmentId);
		if (!validDepartmentId) {
			return response.status(400).json({
				error: true,
				message: 'Please, Select a valid depratment',
			});
		}

		const validEmailAddress = await this.validateEmailAddress(employeeId, email);
		if (!validEmailAddress) {
			return response.status(400).json({
				error: true,
				message: 'This email address blongs to another employee',
			});
		}

		const employee = await Employee.query().where('id', employeeId).update({
			name, email, city, 'department_id': departmentId,
		});

		return response.json({
			error: false,
			message: "Employee data updated successfully",
			employee: employee,
		})
	}

	async isValidDepartmentId(departmentId) {
		const department = await Department.query().where('id', departmentId).first();
		return (department) ? true : false;
	}

	async validateEmailAddress(id, email) {
		const employee = await Employee.query().where('id', '!=', id).where('email', email).count('* as match').first()
		return (employee.match == 0) ? true : false;
	}
}

module.exports = EmployeeController
