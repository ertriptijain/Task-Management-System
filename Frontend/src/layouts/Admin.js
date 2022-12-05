/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import UserService from '../services/user.service';
import { routes } from 'routes.js';
import { useAuth } from 'providers/authProvider';

const Admin = (props) => {
	const mainContent = React.useRef(null);
	const location = useLocation();
	const [apiErrors, setApiErrors] = React.useState([]);
	const { user } = useAuth();

	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContent.current.scrollTop = 0;
	}, [location, user]);

	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (user && prop.layout === '/admin') {
				if (prop.role.includes(user.role)) {
					return (
						<Route
							path={prop.layout + prop.path}
							component={prop.component}
							key={key}
						/>
					);
				} else <Redirect from="*" to="/admin/task" />;
			} else {
				return null;
			}
		});
	};

	const sideBar = (routes) => {
		return routes.filter((prop, key) => {
			if (prop.isSideBar) return prop;
		});
	};

	const getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return 'Brand';
	};

	return (
		<>
			{user && user?.role !== 'EMPLOYEE' ? (
				<Sidebar
					{...props}
					routes={sideBar(routes)}
					logo={{
						innerLink: '/admin/employee',
						imgSrc: require('../assets/img/brand/logo.png').default,
						imgAlt: '...',
					}}
				/>
			) : null}
			<div className="main-content" ref={mainContent}>
				<AdminNavbar {...props} brandText={getBrandText(props.location.pathname)} />
				<Switch>
					{getRoutes(routes)}
					{user?.role != 'EMPLOYEE' ? (
						<Redirect from="*" to="/admin/dashboard" />
					) : (
						<Redirect from="*" to="/admin/task" />
					)}
					<Redirect from="*" to="/auth/login" />
				</Switch>
			</div>
		</>
	);
};

export default Admin;
