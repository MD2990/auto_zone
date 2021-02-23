/* import Link from 'next/link';
import React from 'react';
import styles from '../styles/main.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	InputGroup,
	FormControl,
	ToggleButtonGroup,
	ToggleButton,
} from 'react-bootstrap';
import { useState } from 'react';
import { FcEditImage } from 'react-icons/fc';
import useSWR, { mutate, trigger } from 'swr';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function ss() {
	return (
		<>
			<Jumbotron>
				<Container>
					<Row
							xs={4}
					md={2}
					lg={16} 
						className=' justify-content-center align-items-center mb-4'>
						<Col
							md='auto'
							className='border-bottom border-primary text-center '>
							<h1 className='text-truncate font-weight-bolder text-primary'>
								Add New Vehicle
							</h1>
						</Col>
					</Row>
				</Container>
				<Formik
					initialValues={{
						make: '',
						model: '',
						year: '',
						vin: '',
						color: '',
						mileage: '',
						rental_fees: '',
						registration_expiry_date: '',
						available: true,
						notes: '',
					}}
					onSubmit={async (values) => {
						 		await new Promise((resolve) => setTimeout(resolve, 500));
					alert(JSON.stringify(values, null, 2)); 
						console.log(values);
						 mutate(
							'http://localhost:3000/api/cars',
							[...[data], values],
							false
						);
							;
						await axios.post('http://localhost:3000/api/cars', values);
						trigger('http://localhost:3000/api/cars'); 
					}}
					validationSchema={Yup.object().shape({
						//make: Yup.string().make().required('Email is required'),
						make: Yup.string().trim().required('Make is required'),
						model: Yup.string().trim().required('Model is required'),
						vin: Yup.string().trim().min(5).required('VIN number is required'),
						year: Yup.string().trim().min(2).required('Year is required'),
						color: Yup.string().trim().required('Color is required'),
						mileage: Yup.string().trim().min(2).required('Mileage is required'),
						registration_expiry_date: Yup.string()
							.trim()
							.min(2)
							.required('Reg Exp Date is required'),
						rental_fees: Yup.string()
							.trim()
							.min(2)
							.required('Rental fees is required'),
					})}>
					{(props) => {
						const {
							values,
							touched,
							errors,
							dirty,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							handleReset,
						} = props;

						return (
							<Form onSubmit={handleSubmit}>
								<Row
									xs={2}
									md={4}
									lg={6}
									className=' justify-content-center align-items-center mb-4'>
									<Col xm='true' sm='4'>
										<Form.Label htmlFor='make'>
											<span className='text-danger'> *</span> Make
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Make'
											id='make'
											type='text'
											value={values.make}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.make && touched.make && (
											<Row
												xs={2}
												md={4}
												lg={6}
												className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.make}
											</Row>
										)}
									</Col>

									<Col xm='true' sm='4'>
										<Form.Label htmlFor='make'>
											<span className='text-danger'> *</span> Model
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Model'
											id='model'
											type='text'
											value={values.model}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.model && touched.model && (
											<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.model}
											</Row>
										)}
									</Col>
								</Row>
								<Row
									xs={2}
									md={4}
									lg={6}
									className=' justify-content-center align-items-center mb-4'>
									<Col xm='true' sm='4'>
										<Form.Label htmlFor='vin'>
											<span className='text-danger'> *</span> VIN
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='VIN'
											id='vin'
											type='text'
											value={values.vin}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.vin && touched.vin && (
											<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.vin}
											</Row>
										)}
									</Col>

									<Col xm='true' sm='4'>
										<Form.Label htmlFor='year'>
											<span className='text-danger'> *</span> Year
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Year'
											id='year'
											type='text'
											value={values.year}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.year && touched.year && (
											<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.year}
											</Row>
										)}
									</Col>
								</Row>

								<Row
									xs={2}
									md={4}
									lg={6}
									className=' justify-content-center align-items-center mb-4'>
									<Col xm='true' sm='4'>
										<Form.Label htmlFor='mileage'>
											<span className='text-danger'> *</span> Mileage
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Mileage'
											id='mileage'
											type='text'
											value={values.mileage}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.mileage && touched.mileage && (
											<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.mileage}
											</Row>
										)}
									</Col>

									<Col xm='true' sm='4'>
										<Form.Label htmlFor='color'>
											<span className='text-danger'> *</span> Color
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Color'
											id='color'
											type='text'
											value={values.color}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.color && touched.color && (
											<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.color}
											</Row>
										)}
									</Col>
								</Row>

								<Row
									xs={2}
									md={4}
									lg={6}
									className=' justify-content-center align-items-center mb-4'>
									<Col xm='true' sm='4'>
										<Form.Label htmlFor='rental_fees' className='text-truncate'>
											<span className='text-danger'> *</span> Rental Fees
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Rental Fees'
											id='rental_fees'
											type='text'
											value={values.rental_fees}
											onChange={handleChange}
											onBlur={handleBlur}

											 	className={
												errors.rental_fees && touched.rental_fees
													? styles.input + styles.error
													: styles.input
											} 
										/>
										{errors.rental_fees && touched.rental_fees && (
											<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
												{errors.rental_fees}
											</Row>
										)}
									</Col>

									<Col xm='true' sm='4'>
										<Form.Label
											htmlFor='registration_expiry_date'
											className='text-truncate'>
											<span className='text-danger'> *</span> Registration
											Expiry Date
										</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Registration Expiry Date'
											id='registration_expiry_date'
											type='date'
											value={values.registration_expiry_date}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.registration_expiry_date &&
											touched.registration_expiry_date && (
												<Row className=' justify-content-start align-items-left text-left ml-3 text-danger'>
													{errors.registration_expiry_date}
												</Row>
											)}
									</Col>
								</Row>

								<Row
									xs={2}
									md={4}
									lg={6}
									className=' justify-content-center align-content-start mb-4'>
									<Col xm='true' sm='4'>
										<Form.Label htmlFor='notes'>
											<span className='text-danger'> *</span> Mileage
										</Form.Label>

										<Form.Control
											size='lg'
											placeholder='notes'
											id='notes'
											type='textarea'
											value={values.notes}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Col>
									<Col md='auto' className='border'></Col>
								</Row>

								<Row
									xs={2}
									md={4}
									lg={6}
									className=' justify-content-center align-items-center mb-4'>
									<Col xm='true' sm='4' className='text-wrap'>
										<Form.Check
											type='switch'
											id='available'
											name='available'
											label='Immediately available'
											onChange={handleChange}
											onBlur={handleBlur}
											checked={values.available}
										/>
									</Col>
									<Col xm='true' sm='4'></Col>
								</Row>
								<Row className=' justify-content-center align-items-center text-center'>
									<button
										className='btn btn-lg btn-secondary m-2'
										type='button'
										//className={styles.outline}
										onClick={handleReset}
										disabled={!dirty || isSubmitting}>
										Reset
									</button>
									<button
										className='btn btn-lg btn-primary m-2'
										type='submit'
										disabled={isSubmitting}>
										Submit
									</button>
								</Row>
							</Form>
						);
					}}
				</Formik>
			</Jumbotron>
			<footer className={styles.footer}>
				<p> Made with 🤍 by MD-AD </p>
			</footer>
		</>
	);
} 
*/
/*

export function Manage() {
	const [startDate, setStartDate] = useState(new Date());
	function clicked() {
		toast('hello', {
			role: 'alert',
		});
	}

	return (
		<>
			<Link href='/'>
				<Button variant='primary' className='m-4  font-weight-bolder btn-lg'>
					Home
				</Button>
			</Link>

			<Jumbotron>
				<Form>
					<Row className=' justify-content-center align-items-center mb-4'>
						{' '}
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}> Make</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}>Model</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
					</Row>
					<Row
						xs={2}
						md={4}
						lg={6}
						className=' justify-content-center align-items-center mb-4'>
						{' '}
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>Year</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>VIN</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
					</Row>
					<Row
						xs={2}
						md={4}
						lg={6}
						className=' justify-content-center align-items-center mb-4'>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>Color</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>Mileage</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
					</Row>
					<Row
						xs={2}
						md={4}
						lg={6}
						className=' justify-content-center align-items-center mb-4'>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>
								Rental Fees{' '}
							</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>
								Registration Expiry Date
							</Form.Label>

							<Form.Control
								type='date'
								className='form-control'
								size='lg'
								placeholder='---'
								onChange={(e) => {
									console.log(e.target.value);
								}}
							/>
						</Col>
					</Row>
					{/* 
						
	
						<Form.Label>State</Form.Label>
						<Form.Control as='select' defaultValue='Choose...'>
							<option>Choose...</option>
							<option>...</option>
						</Form.Control>

						<Form.Check type='checkbox' label='Check me out' /> }
						<Row
						md={6}
						className='justify-content-center align-items-center ml-6 mr-11'>
						<Toasts></Toasts>
					</Row>
				</Form>
			</Jumbotron>

			<footer className={styles.footer}>
				<p> Made with 🤍 by MD-AD </p>
			</footer>
		</>
	);
}



*/
import React from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBInput,
} from 'mdbreact';

const FormPage = () => {
	return (
		<MDBContainer>
			<MDBRow>
				<form>
					<p className='h5 text-center mb-4'>Write to us</p>

					<MDBCol md={6}
						<div 	 className='grey-text'>
						<MDBInput
							label='Your name'
							icon='user'
							group
							type='text'
							validate
							error='wrong'
							success='right'
						/>

						</div>
						<MDBInput
							label='Your email'
							icon='envelope'
							group
							type='email'
							validate
							error='wrong'
							success='right'
						/>
						<MDBInput
							label='Subject'
							icon='tag'
							group
							type='text'
							validate
							error='wrong'
							success='right'
						/>
						<MDBInput
							type='textarea'
							rows='2'
							label='Your message'
							icon='pencil-alt'
						/>
				

					<div className='text-center'>
						<MDBBtn outline color='secondary'>
							Send
							<MDBIcon far icon='paper-plane' className='ml-1' />
						</MDBBtn>
					</div>
				</form>
			</MDBRow>
		</MDBContainer>
	);
};

export default FormPage;
