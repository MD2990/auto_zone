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
	Typography,
} from 'mdbreact';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FormPage() {
	return (
		<>
			<MDBContainer>
				<p className='h1 font-font-weight-bold text-center mb-xl-4 mt-xl-5  text-primary'>
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
					onSubmit={async (values, { resetForm, setSubmitting }) => {
						try {
							//moment(values.registration_expiry_date).format('MMMM Do YYYY');

							/* 	mutate(
							'http://localhost:3000/api/cars',
							[ values],
							false
						); */
							await axios
								.post('http://localhost:3000/api/cars', values)

								.then(function (response) {
									setSubmitting(false);
									resetForm();

									toast(`${response.data.data.model} added successfully`, {
										type: toast.TYPE.SUCCESS,
									});
								})

								.catch(function (error) {
									toast(`${error.response.data}`, {
										type: toast.TYPE.ERROR,
										autoClose: 8000,
									});
								});

							//trigger('http://localhost:3000/api/cars');
						} catch (error) {
							toast(
								'Somthing went wrong please check the car details and try again',
								{
									type: toast.TYPE.ERROR,
									autoClose: 8000,
								}
							);
						}
					}}
					validationSchema={Yup.object().shape({
						make: Yup.string().trim().required('Make is required'),
						model: Yup.string().trim().required('Model is required'),
						vin: Yup.string().trim().min(5).required('VIN number is required'),
						year: Yup.date()
							.typeError('Please enter a valid Year')
							.required('Year is required'),
						color: Yup.string().trim().required('Color is required'),
						mileage: Yup.number()
							.typeError('Rental Fees must be a number')
							.min(1, 'Min value 1')
							.required('Mileage is required'),
						registration_expiry_date: Yup.string()
							.trim()
							.min(2)
							.required('Exp Date is req'),
						rental_fees: Yup.number()
							.typeError('Rental Fees must be a number')
							.min(1, 'Min value 1')
							.required('Rental Fees is required'),
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
																label={
																	<Typography
																		className={
																			errors.make && touched.make
																				? 'text-danger'
																				: ''
																		}>
																		{errors.make && touched.make
																			? errors.make
																			: 'Make'}
																	</Typography>
																}
																icon='car'
																type='text'
																name='make'
																id='make'
																value={values.make}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																label={
																	<Typography
																		className={
																			errors.model && touched.model
																				? 'text-danger'
																				: ''
																		}>
																		{errors.model && touched.model
																			? errors.model
																			: 'Model'}
																	</Typography>
																}
																icon='wrench'
																type='text'
																name='model'
																id='model'
																value={values.model}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																label={
																	<Typography
																		className={
																			errors.year && touched.year
																				? 'text-danger'
																				: ''
																		}>
																		{errors.year && touched.year
																			? errors.year
																			: 'Year'}
																	</Typography>
																}
																icon='calendar-check'
																type='text'
																name='year'
																id='year'
																value={values.year}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																label={
																	<Typography
																		className={
																			errors.vin && touched.vin
																				? 'text-danger'
																				: ''
																		}>
																		{errors.vin && touched.vin
																			? errors.vin
																			: 'Vin'}
																	</Typography>
																}
																icon='credit-card'
																type='text'
																name='vin'
																id='vin'
																value={values.vin}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

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
																label={
																	<Typography
																		className={
																			errors.color && touched.color
																				? 'text-danger'
																				: ''
																		}>
																		{errors.color && touched.color
																			? errors.color
																			: 'Color'}
																	</Typography>
																}
																icon='palette'
																type='text'
																name='color'
																id='color'
																value={values.color}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																label={
																	<Typography
																		className={
																			errors.mileage && touched.mileage
																				? 'text-danger'
																				: ''
																		}>
																		{errors.mileage && touched.mileage
																			? errors.mileage
																			: 'Mileage'}
																	</Typography>
																}
																icon='tachometer-alt'
																type='text'
																name='mileage'
																id='mileage'
																value={values.mileage}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																label={
																	<Typography
																		className={
																			errors.rental_fees && touched.rental_fees
																				? 'text-danger'
																				: ''
																		}>
																		{errors.rental_fees && touched.rental_fees
																			? errors.rental_fees
																			: 'Rental Fees'}
																	</Typography>
																}
																icon='hand-holding-usd'
																type='text'
																name='rental_fees'
																id='rental_fees'
																value={values.rental_fees}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																label={
																	<Typography
																		className={
																			errors.registration_expiry_date &&
																			touched.registration_expiry_date
																				? 'text-danger text-right font-small '
																				: 'text-right font-small'
																		}>
																		{errors.registration_expiry_date &&
																		touched.registration_expiry_date
																			? errors.registration_expiry_date
																			: 'Reg Exp Date'}
																	</Typography>
																}
																className='text-right font-small'
																type='date'
																icon='calendar-check'
																name='registration_expiry_date'
																id='registration_expiry_date'
																value={values.registration_expiry_date}
																onChange={handleChange}
																onBlur={handleBlur}
															/>

															<MDBInput
																type='textarea'
																rows='2'
																label='Remarks'
																icon='book-open'
																name='remarks'
																id='remarks'
																value={values.remarks}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.remarks && touched.remarks && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-md-4 mt-n5  font-italic font-weight-lighter font-small text-danger'>
																	{errors.remarks}
																</MDBRow>
															)}
														</div>
													</MDBCol>
												</MDBRow>
											</MDBCardBody>
										</MDBCard>
										<MDBRow className='justify-content-center text-center mt-xl-3'>
											<MDBBtn
												outline
												color='primary'
												type='button'
												onClick={handleReset}
												disabled={!dirty || isSubmitting}>
												Reset
												<MDBIcon icon='broom' className='ml-1' />
											</MDBBtn>

											<MDBBtn
												outline
												color='primary'
												type='submit'
												disabled={isSubmitting}>
												Submit
												<MDBIcon icon='paper-plane' className='ml-1 ' />
											</MDBBtn>
										</MDBRow>
									</MDBCol>
								</MDBRow>
							</form>
						);
					}}
				</Formik>
			</MDBContainer>
		</>
	);
}
