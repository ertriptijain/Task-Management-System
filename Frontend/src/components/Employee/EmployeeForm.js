import React from 'react';
// reactstrap components
import { Button, FormGroup, Form, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Error from '../Shared/Error';

const EmployeeForm = ({ onSubmit, selectedEmployee }) => {
	const [apiErrors, setApiErrors] = useState([]);
	const {
		formState: { errors },
		handleSubmit,
		control,
		setValue,
	} = useForm();

	useEffect(() => {
		if (selectedEmployee?.id) {
			setValue('fullName', selectedEmployee?.user?.fullName);
			setValue('mobileNumber', selectedEmployee?.user?.mobileNumber);
			setValue('email', selectedEmployee?.user?.email);
			setValue('id', selectedEmployee?.id);
		}
	},[]);

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<FormGroup>
						<label className="form-control-label" htmlFor="input-name">
							Full Name
						</label>
						<Controller
							name="fullName"
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Enter full name',
								},
								onKeyUp: (e) => {
									setValue('fullName', e.target.value);
								},
							}}
							render={({ field }) => (
								<Input
									className="form-control-alternative"
									placeholder="Enter full name"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.fullName && <Error errors={errors.fullName.message} />}
					</FormGroup>
				</div>
				<div>
					<FormGroup>
						<label className="form-control-label" htmlFor="input-email">
							Email
						</label>
						<Controller
							name="email"
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Enter email',
								},
								onKeyUp: (e) => {
									setValue('email', e.target.value);
								},
							}}
							render={({ field }) => (
								<Input
									className="form-control-alternative"
									placeholder="Enter email"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.email && <Error errors={errors.email.message} />}
					</FormGroup>
				</div>
				<div>
					<FormGroup>
						<label className="form-control-label" htmlFor="input-number">
							Mobile Number
						</label>
						<Controller
							name="mobileNumber"
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Enter mobile number',
								},
								onKeyUp: (e) => {
									setValue('mobileNumber', e.target.value);
								},
							}}
							render={({ field }) => (
								<Input
									className="form-control-alternative"
									placeholder="Enter mobile number"
									type="tel"
									{...field}
								/>
							)}
						/>
						{errors.mobileNumber && <Error errors={errors.mobileNumber.message} />}
					</FormGroup>
				</div>
				<div>
					<FormGroup>
						<label className="form-control-label" htmlFor="input-password">
							Password
						</label>
						<Controller
							name="password"
							control={control}
							rules={{
								required: {
									value: selectedEmployee?.id ? false : true,
									message: 'Enter password',
								},
							}}
							render={({ field }) => (
								<Input
									className="form-control-alternative"
									placeholder="Enter password"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.password && <Error errors={errors.password.message} />}
					</FormGroup>
				</div>
				<div className="relative mb-5">
					{apiErrors && apiErrors.length > 0 ? (
						<Error className="relative bottom-0" errors={apiErrors} />
					) : null}
				</div>
				<div className="d-flex justify-content-between">
					<Button color="success" size="md" type="submit">
						Save
					</Button>
				</div>
			</Form>
		</>
	);
};

export default EmployeeForm;
