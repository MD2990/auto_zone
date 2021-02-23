import React from 'react';
import {
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBInput,
} from 'mdbreact';
import { Formik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { Input } from '@material-ui/core';

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




*/

export default function FormPage() {
	let t = 'text';
	return (
		<>
			<MDBContainer>
				<p className='h1 font-font-weight-bold text-center mb-4 mt-4'>
					Add New Vehicle
				</p>
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
						/* await new Promise((resolve) => setTimeout(resolve, 500));
						alert(JSON.stringify(values, null, 2));
						console.log(values);
						mutate(
							'http://localhost:3000/api/cars',
							[...[data], values],
							false
						);
						await axios.post('http://localhost:3000/api/cars', values);
						trigger('http://localhost:3000/api/cars'); */

						//alert(JSON.stringify(values, null, 2));
						console.log(values);
					}}
					validationSchema={Yup.object().shape({
						make: Yup.string().trim().required('Make is required'),

						model: Yup.string().trim().required('Model is required'),
						vin: Yup.string().trim().min(5).required('VIN number is required'),
						year: Yup.date()
							.typeError('Please enter a valid ')
							.required('Year is required'),
						color: Yup.string().trim().required('Color is required'),
						mileage: Yup.number()
							.typeError('Rental Fees must be a number')
							.min(1, 'Min value 1.')
							.required('Mileage is required'),
						registration_expiry_date: Yup.string()
							.trim()
							.min(2)
							.required('Reg Exp Date is required'),
						rental_fees: Yup.number()
							.typeError('Rental Fees must be a number')
							.min(1, 'Min value 1.')
							.required('Rental Fees is required'),
						/* .max(30, 'Max value 30.') */
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
							<form onSubmit={handleSubmit}>
								<MDBRow className=' justify-content-center  '>
									<MDBCol md='8'>
										<MDBCard>
											<MDBCardBody className='mx-4'>
												<MDBRow>
													<MDBCol md='6'>
														<div className='grey-text'>
															<MDBInput
																label='Make'
																icon='user'
																type='text'
																name='make'
																id='make'
																value={values.make}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.make && touched.make && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.make}
																</MDBRow>
															)}
															<MDBInput
																label='Model'
																icon='user'
																type='text'
																name='model'
																id='model'
																value={values.model}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.model && touched.model && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.model}
																</MDBRow>
															)}

															<MDBInput
																label='Year'
																icon='user'
																type='text'
																name='year'
																id='year'
																value={values.year}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.year && touched.year && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.year}
																</MDBRow>
															)}
															<MDBInput
																label='Vin'
																icon='user'
																type='text'
																name='vin'
																id='vin'
																value={values.vin}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.vin && touched.vin && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.vin}
																</MDBRow>
															)}
															<div className='custom-control custom-switch'>
																<input
																	type='checkbox'
																	className='custom-control-input'
																	id='available'
																	checked={values.available}
																	onChange={handleChange}
																	readOnly
																/>
																<label
																	className='custom-control-label'
																	htmlFor='available'>
																	Toggle this switch element
																</label>
															</div>
														</div>
													</MDBCol>

													<MDBCol md='6'>
														<div className='grey-text'>
															<MDBInput
																label='Color'
																icon='user'
																type='text'
																name='color'
																id='color'
																value={values.color}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.color && touched.color && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.color}
																</MDBRow>
															)}
															<MDBInput
																label='Mileage'
																icon='user'
																type='text'
																name='mileage'
																id='mileage'
																value={values.mileage}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.mileage && touched.mileage && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.mileage}
																</MDBRow>
															)}
															<MDBInput
																label='Rental Fees'
																icon='user'
																type='text'
																name='rental_fees'
																id='rental_fees'
																value={values.rental_fees}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.rental_fees && touched.rental_fees && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.rental_fees}
																</MDBRow>
															)}
															<MDBInput
																className='text-right font-small'
																type='date'
																label='Reg Exp Date'
																icon='user'
																name='registration_expiry_date'
																id='registration_expiry_date'
																value={values.registration_expiry_date}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.registration_expiry_date &&
																touched.registration_expiry_date && (
																	<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																		{errors.registration_expiry_date}
																	</MDBRow>
																)}

															<MDBInput
																type='textarea'
																rows='2'
																label='Remarks'
																icon='pencil-alt'
																name='remarks'
																id='remarks'
																value={values.remarks}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.remarks && touched.remarks && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-3 text-danger'>
																	{errors.remarks}
																</MDBRow>
															)}
														</div>
													</MDBCol>
												</MDBRow>
											</MDBCardBody>
										</MDBCard>
										<MDBRow className='justify-content-center text-center'>
											<MDBBtn
												outline
												color='secondary'
												type='button'
												onClick={handleReset}
												disabled={!dirty || isSubmitting}>
												Reset
												<MDBIcon far icon='paper-plane' className='ml-1' />
											</MDBBtn>

											<MDBBtn
												outline
												color='secondary'
												type='submit'
												disabled={isSubmitting}>
												Submit
												<MDBIcon far icon='paper-plane' className='ml-1' />
											</MDBBtn>
										</MDBRow>
									</MDBCol>
								</MDBRow>
							</form>
						);
					}}
				</Formik>
			</MDBContainer>
			);
		</>
	);
}

//export default FormPage;
