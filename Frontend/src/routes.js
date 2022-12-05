import Employee from 'views/Employee';
import Task from 'views/Task';
import Login from 'views/Login';
import Dashboard from './components/Dashboard/Dashboard';

export const routes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'ni ni-tv-2 ',
		component: Dashboard,
		layout: '/admin',
		isSideBar: true,
		role: ['SUPER_ADMIN', 'ADMIN'],
	},
	{
		path: '/employee',
		name: 'Employee',
		icon: 'ni ni-circle-08',
		component: Employee,
		layout: '/admin',
		isSideBar: true,
		role: ['SUPER_ADMIN', 'ADMIN'],
	},
	{
		path: '/task',
		name: 'Task',
		icon: 'ni ni-collection ',
		component: Task,
		layout: '/admin',
		isSideBar: true,
		role: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE'],
	},
	{
		path: '/login',
		name: 'Login',
		icon: 'ni ni-key-25 ',
		component: Login,
		layout: '/auth',
		role: ['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE'],
	},
];
