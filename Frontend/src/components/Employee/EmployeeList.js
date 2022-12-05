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
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
import { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeService from '../../services/employee.service';
import { getDateTime } from 'helpers/util.helper';

const EmployeeList = () => {
	const [showModal, setShowModal] = useState(false);
	const [dataList, setDataList] = useState([]);
	const [apiErrors, setApiErrors] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState();

	const toggleShoWModal = () => setShowModal(!showModal);

	const getList = async (filters) => {
		try {
			const res = await EmployeeService.getEmployee(filters);
			setDataList(res.rows);
		} catch (e) {
			setApiErrors(e);
		}
	};
	const onSubmit = async (data) => {
		try {
			setApiErrors([]);
			if (!data.id) {
				await EmployeeService.postCreate(data);
			} else {
				await EmployeeService.putUpdate(data, data.id);
			}
			toggleShoWModal();
			setSelectedEmployee({});
			getList({}).then();
		} catch (e) {
			setApiErrors(e);
		}
	};
	const editEmployee = async (data) => {
		setSelectedEmployee(data);
		toggleShoWModal();
	};
	useEffect(() => {
		getList({}).then();
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
										<h3 className="mb-0">Employee</h3>
									</div>
									<div>
										<Button
											color="primary"
											size="sm"
											onClick={toggleShoWModal}
										>
											Create new
										</Button>
									</div>
								</div>
							</CardHeader>
							<Table className="align-items-center table-flush" responsive>
								<thead className="thead-light">
									<tr>
										<th scope="col">Full name</th>
										<th scope="col">Email</th>
										<th scope="col">Mobile Number</th>
										<th scope="col">Created At</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{dataList.map((c) => (
										<tr key={c?.id}>
											<td>{c?.user?.fullName}</td>
											<td>{c?.user?.email}</td>
											<td>{c?.user?.mobileNumber}</td>
											<td>{getDateTime(c?.createdAt)}</td>
											<td>
												<Button
													className="btn-icon btn-2"
													color="primary"
													type="button"
													size="sm"
													onClick={() => editEmployee(c)}
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
					<EmployeeForm onSubmit={onSubmit} selectedEmployee={selectedEmployee} />
				</ModalBody>
			</Modal>
		</>
	);
};

export default EmployeeList;
