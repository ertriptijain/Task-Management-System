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

// reactstrap components
import { useAuth } from 'providers/authProvider';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Col,
} from 'reactstrap';
import UserService from '../services/user.service';
import { useForm, Controller } from 'react-hook-form';
import Error from '../components/Shared/Error';

const Login = () => {
	const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
	const history = useHistory();
	const [apiErrors, setApiErrors] = useState([]);
	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm();

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/admin/dashboard');
		}
	});

	const onSubmit = async (data) => {
		try {
			setApiErrors([]);
			const res = await UserService.postLogin(data);
			setUser(res);
			setIsAuthenticated(true);
			if (res?.role != 'EMPLOYEE') {
				history.push('/admin/dashboard');
			} else {
				history.push('/admin/task');
			}
		} catch (e) {
			setApiErrors(e);
		}
	};
	return (
		<>
			<Col lg="5" md="7">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-center">
							<img
								width="100px"
								height="100px"
								alt="..."
								src={require('assets/img/theme/undraw_access_account.svg').default}
							/>
						</div>
						<div className="text-center text-muted mt-3 mb-4">
							<h4 class="mb-0"> Login with credentials</h4>
						</div>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<FormGroup className="mb-3">
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Controller
										name="email"
										control={control}
										rules={{
											required: {
												value: true,
												message: 'Enter email',
											},
										}}
										render={({ field }) => <Input type="email" {...field} />}
									/>
								</InputGroup>
								<small class="error-msg">{errors.email && <Error errors={errors.email.message} />}</small>
							</FormGroup>
							<FormGroup>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Controller
										name="password"
										control={control}
										rules={{
											required: {
												value: true,
												message: 'Enter password',
											},
										}}
										render={({ field }) => <Input type="password" {...field} />}
									/>
								</InputGroup>
								<small class="error-msg">{errors.password && <Error errors={errors.password.message} />}</small>
							</FormGroup>
							<div className="relative">
							<small class="error-msg">
								{apiErrors && apiErrors.length > 0 ? (
									<Error className="relative mb-3 bottom-0" errors={apiErrors} />
								) : null}
								</small>
							</div>
							<div className="text-center">
								<Button className="" color="primary" type="submit">
									Sign in
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Login;
