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
import { Link } from 'react-router-dom';
// reactstrap components
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Navbar,
	Nav,
	Container,
	Media,
} from 'reactstrap';

import JwtService from '../../services/jwt.service';
import UserService from '../../services/user.service';

import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'providers/authProvider';

const AdminNavbar = (props) => {
	const history = useHistory();
	const { isAuthenticated, setIsAuthenticated } = useAuth();

	const logout = () => {
		setIsAuthenticated(false);
		JwtService.clearToken();
		history.push('/auth/login');
	};

	return (
		<>
			<Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
				<Container fluid>
					<Link className="h3 mb-0 text-primary text-uppercase d-none d-lg-inline-block">
						{/*props.brandText*/}
					</Link>
					<Nav className="align-items-center d-none d-md-flex" navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle className="pr-0" nav>
								<Media className="align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img
											alt="..."
											src={
												require('../../assets/img/theme/team-4-800x800.jpg')
													.default
											}
										/>
									</span>
									{/* <Media className="ml-2 d-none d-lg-block">
										<span className="mb-0 text-sm font-weight-bold">
											Manager
										</span>
									</Media> */}
								</Media>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem onClick={logout}>
									<i className="ni ni-user-run" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default AdminNavbar;
