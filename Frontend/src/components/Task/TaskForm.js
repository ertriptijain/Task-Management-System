import React from 'react';
// reactstrap components
import { Button, FormGroup, Form, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Error from '../Shared/Error';
import EmployeeService from '../../services/employee.service';

const TaskForm = ({ onSubmit, selectedTask, userData }) => {
	const [apiErrors, setApiErrors] = useState([]);
	const [dataList, setDataList] = useState([]);
	const statusList = ['pending', 'in-process', 'completed'];

	const {
		formState: { errors },
		handleSubmit,
		control,
		setValue,
	} = useForm();
	const getEmployeeList = async () => {
		try {
			const res = await EmployeeService.getEmployee({ limit: 100, status: 'active' });
			setDataList(res.rows);
		} catch (e) {
			setApiErrors(e);
		}
	};

	useEffect(() => {
		getEmployeeList({}).then();
		if (selectedTask?.id) {
			setValue('name', selectedTask?.name);
			setValue('description', selectedTask?.description);
			setValue('status', selectedTask?.status);
			setValue('UserId', selectedTask?.UserId);
			setValue('id', selectedTask?.id);
		}
	}, []);

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<FormGroup>
						<label className="form-control-label" htmlFor="input-name">
							Task name
						</label>
						<Controller
							name="name"
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Enter task name',
								},
							}}
							render={({ field }) => (
								<Input
									className="form-control-alternative"
									placeholder="Enter task name"
									type="text"
									{...field}
								/>
							)}
						/>
						{errors.name && <Error errors={errors.name.message} />}
					</FormGroup>
				</div>
				<div>
					<FormGroup>
						<label className="form-control-label" htmlFor="input-description">
							Description
						</label>
						<Controller
							name="description"
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Enter description',
								},
							}}
							render={({ field }) => (
								<Input
									className="form-control-alternative"
									placeholder="Enter description"
									type="textarea"
									{...field}
								/>
							)}
						/>
						{errors.name && <Error errors={errors.name.message} />}
					</FormGroup>
				</div>
				{userData.role != 'EMPLOYEE' ? (
					<div>
						<FormGroup>
							<label className="form-control-label" htmlFor="input-description">
								Select employee
							</label>
							<Controller
								name="UserId"
								control={control}
								rules={{
									required: {
										value: true,
										message: 'Select employee',
									},
									onChange: (e) => {
										setValue('UserId', e.target.value);
									},
								}}
								render={({ field }) => (
									<Input
										className="form-control-alternative"
										placeholder="Enter description"
										type="select"
										{...field}
									>
										{dataList.map((c) => (
											<option key={c?.user.id} value={c?.user.id}>
												{c?.user?.fullName}
											</option>
										))}
									</Input>
								)}
							/>
							{errors.UserId && <Error errors={errors.UserId.message} />}
						</FormGroup>
					</div>
				) : null}
				{selectedTask?.id ? (
					<div>
						<FormGroup>
							<label className="form-control-label" htmlFor="input-description">
								Status
							</label>
							<Controller
								name="status"
								control={control}
								render={({ field }) => (
									<Input
										className="form-control-alternative text-capitalize"
										type="select"
										{...field}
									>
										{statusList.map((c) => (
											<option key={c} value={c} className="text-capitalize">
												{c}
											</option>
										))}
									</Input>
								)}
							/>
							{errors.status && <Error errors={errors.status.message} />}
						</FormGroup>
					</div>
				) : null}
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

export default TaskForm;
