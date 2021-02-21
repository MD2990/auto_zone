import Link from 'next/link';
import React from 'react';
import styles from '../styles/main.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toasts from '../components/Snack';
import { ToastContainer, toast } from 'react-toastify';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcEditImage } from 'react-icons/fc';
import useSWR, { mutate, trigger } from 'swr';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
					<Row className=' justify-content-center align-items-center mb-4'>
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
					<Row className=' justify-content-center align-items-center mb-4'>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>Color</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							<Form.Label className={styles.label_text}>Mileage</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
					</Row>
					<Row className=' justify-content-center align-items-center mb-4'>
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

						<Form.Check type='checkbox' label='Check me out' /> */}
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

export default function ss() {
	return (
		<Jumbotron>
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
				}}
				onSubmit={async (values) => {
					/* 		await new Promise((resolve) => setTimeout(resolve, 500));
					alert(JSON.stringify(values, null, 2)); */
					mutate('http://localhost:3000/api/cars', [...[data], values], false);
					//	;
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
							<Row className=' justify-content-center align-items-center mb-4'>
								<Col xm='true' sm='4'>
									<Form.Label htmlFor='make' style={{ display: 'block' }}>
										Make
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Make'
										id='make'
										type='text'
										value={values.make}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.make && touched.make
												? styles.input + styles.error
												: styles.input
										}
									/>{' '}
									{errors.make && touched.make && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.make}
										</Row>
									)}
								</Col>

								<Col xm='true' sm='4'>
									<Form.Label htmlFor='make' style={{ display: 'block' }}>
										Model
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Model'
										id='model'
										type='text'
										value={values.model}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.model && touched.model
												? styles.input + styles.error
												: styles.input
										}
									/>
									{errors.model && touched.model && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.model}
										</Row>
									)}
								</Col>
							</Row>
							<Row className=' justify-content-center align-items-center mb-4'>
								<Col xm='true' sm='4'>
									<Form.Label htmlFor='vin' style={{ display: 'block' }}>
										VIN
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='VIN'
										id='vin'
										type='text'
										value={values.vin}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.vin && touched.vin
												? styles.input + styles.error
												: styles.input
										}
									/>{' '}
									{errors.vin && touched.vin && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.vin}
										</Row>
									)}
								</Col>

								<Col xm='true' sm='4'>
									<Form.Label htmlFor='year' style={{ display: 'block' }}>
										Year
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Year'
										id='year'
										type='text'
										value={values.year}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.year && touched.year
												? styles.input + styles.error
												: styles.input
										}
									/>
									{errors.year && touched.year && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.year}
										</Row>
									)}
								</Col>
							</Row>

							<Row className=' justify-content-center align-items-center mb-4'>
								<Col xm='true' sm='4'>
									<Form.Label htmlFor='mileage' style={{ display: 'block' }}>
										Mileage
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Mileage'
										id='mileage'
										type='text'
										value={values.mileage}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.mileage && touched.mileage
												? styles.input + styles.error
												: styles.input
										}
									/>{' '}
									{errors.mileage && touched.mileage && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.mileage}
										</Row>
									)}
								</Col>

								<Col xm='true' sm='4'>
									<Form.Label htmlFor='color' style={{ display: 'block' }}>
										Color
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Color'
										id='color'
										type='text'
										value={values.color}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.make && touched.make
												? styles.input + styles.error
												: styles.input
										}
									/>
									{errors.color && touched.color && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.make}
										</Row>
									)}
								</Col>
							</Row>
							<Row className=' justify-content-center align-items-center mb-4'>
								<Col xm='true' sm='4'>
									<Form.Label
										htmlFor='rental_fees'
										style={{ display: 'block' }}>
										Rental Fees
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
									/>{' '}
									{errors.rental_fees && touched.rental_fees && (
										<Row className=' justify-content-center align-items-center m-0'>
											{errors.rental_fees}
										</Row>
									)}
								</Col>

								<Col xm='true' sm='4'>
									<Form.Label
										htmlFor='registration_expiry_date'
										style={{ display: 'block' }}>
										Registration Expiry Date
									</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Registration Expiry Date'
										id='registration_expiry_date'
										type='text'
										value={values.registration_expiry_date}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.registration_expiry_date &&
											touched.registration_expiry_date
												? styles.input + styles.error
												: styles.input
										}
									/>{' '}
									{errors.registration_expiry_date &&
										touched.registration_expiry_date && (
											<Row className=' justify-content-center align-items-center m-0'>
												{errors.registration_expiry_date}
											</Row>
										)}
								</Col>
							</Row>

							<button
								type='button'
								className={styles.outline}
								onClick={handleReset}
								disabled={!dirty || isSubmitting}>
								Reset
							</button>
							<button type='submit' disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
		</Jumbotron>
	);
}
