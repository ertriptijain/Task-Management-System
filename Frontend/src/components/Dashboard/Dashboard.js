import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { useEffect, useState } from 'react';
import DashboardService from '../../services/dashboard.service';

const Dashboard = () => {
	const [analyticsData, setAnalyticsData] = useState({});
	const [apiErrors, setApiErrors] = useState([]);

	const getAnalyticsData = async () => {
		try {
			const res = await DashboardService.getAnalytics();
			setAnalyticsData(res);
		} catch (e) {
			setApiErrors(e);
		}
	};

	useEffect(() => {
		getAnalyticsData().then();
	}, []);
	return (
		<>
		
			<div className="header  pb-8 pt-2 pt-md-6 height-100">
				<Container fluid>
					<div className="header-body">
						<h3>Employee</h3>
						<Row>
							<Col lg="6" xl="3">
								<Card className="card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle
													tag="h5"
													className="text-uppercase text-muted mb-0"
												>
													No. of employees
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">
													{analyticsData?.employeeCount}
												</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
													<i className="fas fa-users" />
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>

						<div className="pt-4">
							<h3>Task</h3>
							<Row>
								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Yet To Start
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{analyticsData?.taskPendingCount}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-danger text-white rounded-circle shadow">
														<i className="fas fa-stop-circle" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														In-Process
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{analyticsData?.taskInProcessCount}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-warning text-white rounded-circle shadow">
														<i className="fas fa-spinner" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Completed
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{analyticsData?.taskCompletedCount}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-info text-white rounded-circle shadow">
														<i className="ni ni-check-bold" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</div>
					</div>
				</Container>
			</div>
			<style>
				{`
					.height-100 {
						height: 100vh;
					}
				`}
			</style>
		</>
	);
};

export default Dashboard;
