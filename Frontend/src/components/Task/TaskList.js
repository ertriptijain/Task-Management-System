import {
	Card,
	CardHeader,
	Table,
	Container,
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Input,
	Col,
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskService from '../../services/task.service';
import UserService from '../../services/user.service';

import { getDateTime } from 'helpers/util.helper';

const TaskList = () => {
	const [showModal, setShowModal] = useState(false);
	const [dataList, setDataList] = useState([]);
	const [apiErrors, setApiErrors] = useState([]);
	const [selectedTask, setSelectedTask] = useState();
	const [userData, setUser] = useState({});

	const toggleShoWModal = () => setShowModal(!showModal);
	const statusList = ['all', 'pending', 'in-process', 'completed'];
	const getList = async (filters) => {
		try {
			const res = await TaskService.getTask(filters);
			setDataList(res.rows);
		} catch (e) {
			setApiErrors(e);
		}
	};

	const onSubmit = async (data) => {
		try {
			setApiErrors([]);
			if (!data.id) {
				await TaskService.postCreate(data);
			} else {
				await TaskService.putUpdate(data, data.id);
			}
			toggleShoWModal();
			setSelectedTask({});
			getList({}).then();
		} catch (e) {
			setApiErrors(e);
		}
	};

	const getProfile = async () => {
		try {
			const userData = await UserService.getProfile();
			setUser(userData);
		} catch (e) {
			setApiErrors(e);
		}
	};
	const editTask = async (data) => {
		setSelectedTask(data);
		toggleShoWModal();
	};

	useEffect(() => {
		getList({}).then();
		getProfile().then();
	}, []);

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0">
								<div className="d-flex justify-content-between">
									<div>
										<h3 className="mb-0">Task</h3>
									</div>

									{userData?.role != 'EMPLOYEE' ? (
										<div>
											<Button
												color="primary"
												size="sm"
												onClick={toggleShoWModal}
											>
												Create new
											</Button>
										</div>
									) : null}
								</div>
							</CardHeader>
							<Row className="p-3">
								<Col xl="3" lg="3" md="3" sm="6">
									<label className="form-control-label" htmlFor="input-name">
										Status
									</label>
									<Input
										className="form-control-alternative text-capitalize"
										type="select"
										onChange={(e) => getList({ status: e.target.value })}
									>
										{statusList.map((c) => (
											<option key={c} value={c} className="text-capitalize">
												{c}
											</option>
										))}
									</Input>
								</Col>
							</Row>
							<Table className="align-items-center table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Task Name</th>
										<th scope="col">Full name</th>
										<th scope="col">Status</th>
										<th scope="col">Created At</th>
										<th scope="col">Completed At</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{dataList.map((c) => (
										<tr key={c?.id}>
											<td className="text-capitalize">{c?.name}</td>
											<td className="text-capitalize">{c?.user?.fullName}</td>
											<td className="text-capitalize">{c?.status}</td>
											<td>{getDateTime(c?.createdAt)}</td>
											<td>{getDateTime(c?.completedAt)}</td>
											<td>
												<Button
													className="btn-icon btn-2"
													color="primary"
													type="button"
													size="sm"
													onClick={() => editTask(c)}
												>
													<span className="btn-inner--icon">
														<i className="ni ni-ruler-pencil" />
													</span>
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card>
					</div>
				</Row>
			</Container>

			<Modal isOpen={showModal} toggle={toggleShoWModal}>
				<ModalHeader toggle={toggleShoWModal}></ModalHeader>
				<ModalBody>
					<TaskForm onSubmit={onSubmit} selectedTask={selectedTask} userData={userData} />
				</ModalBody>
			</Modal>
		</>
	);
};

export default TaskList;
