import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { mutate, trigger } from 'swr';
import axios from 'axios';
import 'lodash';
import ConfirmationModal from '../components/ConfirmationModal';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Edit_Delete_Form({ formData }) {
	const router = useRouter();
	const contentType = 'application/json';
	const [show, setShow] = useState(false);

	//The PUT method edits an existing entry in the mongodb database.
	const putData = async (form) => {
		const { id } = router.query;

		try {
			console.log('im putting');
			const res = await fetch(`/api/cars/${id}`, {
				method: 'PUT',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify(form),
			});

			// Throw error with status code in case Fetch API req failed
			if (!res.ok) {
				throw new Error(res.status);
			}

			const { data } = await res.json();

			mutate(`/api/cars/${id}`, data); // Update the local data without a revalidation
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		const url = `http://localhost:3000/View`;
		const deleteUrl = `http://localhost:3000/api/cars/${formData.id}`;

		await axios.delete(deleteUrl);
		trigger(url);
		router.push(url);
	};

	const handleShow = () => setShow(true);
	const handleCancel = () => setShow(false);
	//const handleDelete = () => setShow(false);
	function showModal(show) {
		console.log('im delete', show);

		if (show)
			return (
				<ConfirmationModal
					show={show}
					handleCancel={handleCancel}
					handleDelete={handleDelete}
					car={formData.model}
				/>
			);
		return;
	}

	console.log('im rendring');
	return (
		<>
			{showModal(show)}
			<MDBContainer>
				<p className='h1 font-font-weight-bold text-center mb-xl-4 mt-xl-5  text-primary'>
					Edit Delete Vehicle
				</p>
				<Formik
					initialValues={{
						id: formData.id,
						make: formData.make,
						model: formData.model,
						year: formData.year,
						vin: formData.vin,
						color: formData.color,
						mileage: formData.mileage,
						rental_fees: formData.rental_fees,
						registration_expiry_date: formData.registration_expiry_date,
						available: formData.available,
						notes: formData.notes,
					}}
					onSubmit={async (values, { resetForm, setSubmitting }) => {
						if (!_.isEqual(formData, values)) {
							try {
								await putData(values);
								setSubmitting(false);
								trigger('http://localhost:3000/api/cars');
								toast(
									` ${values.model} Updated Successfully !!!`,

									{
										type: toast.TYPE.SUCCESS,
										autoClose: 1500,
									}
								);
								setTimeout(() => {
									router.push('http://localhost:3000/View');
								}, 1800);
							} catch (error) {
								toast(
									'Somthing went wrong please check the car details and try again' +
										error,
									{
										type: toast.TYPE.ERROR,
										autoClose: 8000,
									}
								);
							}
						} else {
							toast(
								`No Changes ... `,

								{
									type: toast.TYPE.INFO,
									autoClose: 1000,
								}
							);
							setTimeout(() => {
								router.push('http://localhost:3000/View');
							}, 1200);
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
																label='Notes'
																icon='book-open'
																name='notes'
																id='notes'
																value={values.notes}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
															{errors.notes && touched.notes && (
																<MDBRow className=' justify-content-start align-items-left text-left ml-md-4 mt-n5  font-italic font-weight-lighter font-small text-danger'>
																	{errors.notes}
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
												className='text-capitalize'
												outline
												color='primary'
												type='submit'
												disabled={isSubmitting}>
												Edit and Save
												<MDBIcon icon='paper-plane' className='ml-1 ' />
											</MDBBtn>

											<MDBBtn
												onClick={handleShow}
												className='text-capitalize '
												outline
												color='danger'
												type='button'
												disabled={isSubmitting}>
												delete
												<MDBIcon icon='fas fa-trash ' className='ml-1 ' />
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
