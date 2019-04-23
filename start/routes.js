'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('employees', 'EmployeeController.all');

}).prefix('api/v1').middleware(['auth']);

Route.group(() => {
    Route.post('login', 'AuthController.login');
    Route.get('departments', 'DepartmentController.all');
    Route.post('department/create', 'DepartmentController.create');
    Route.post('department/delete', 'DepartmentController.delete');

    Route.get('employees', 'EmployeeController.all');
    Route.post('employee/create', 'EmployeeController.create');
    Route.post('employee/delete', 'EmployeeController.delete');

}).prefix('api/v1').middleware(['guest']);


