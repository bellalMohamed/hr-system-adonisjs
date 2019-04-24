'use strict'
const Route = use('Route')

Route.group(() => {
    Route.get('departments', 'DepartmentController.all');
    Route.post('department/create', 'DepartmentController.create');
    Route.post('department/delete', 'DepartmentController.delete');

    Route.get('employees', 'EmployeeController.all');
    Route.post('employee/create', 'EmployeeController.create');
    Route.post('employee/delete', 'EmployeeController.delete');
    Route.post('employee/update', 'EmployeeController.update');
}).prefix('api/v1').middleware(['auth']);

Route.group(() => {
    Route.post('login', 'AuthController.login');
}).prefix('api/v1').middleware(['guest']);
