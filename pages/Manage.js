import Link from 'next/link';
import React from 'react';
import styles from '../styles/main.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcEditImage } from 'react-icons/fc';

export default function Manage() {
	const [startDate, setStartDate] = useState(new Date());
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
							{' '}
							<Form.Label className={styles.label_text}>Year</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}>VIN</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
					</Row>{' '}
					<Row className=' justify-content-center align-items-center mb-4'>
						{' '}
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}>Color</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}>Mileage</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
					</Row>
					<Row className=' justify-content-center align-items-center mb-4'>
						{' '}
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}>
								Rental Fees{' '}
							</Form.Label>
							<Form.Control size='lg' placeholder='---' />
						</Col>
						<Col xm='true' sm='4'>
							{' '}
							<Form.Label className={styles.label_text}>
								Registration Expiry Date
							</Form.Label>
							{/* 							<Form.Control size='lg' placeholder='---' />
				<DatePicker selected={startDate} onChange={date => setStartDate(date)} />

 */}{' '}
							<Form.Control
								type='date'
								className='form-control'
								size='lg'
								placeholder='---'
								onChange={(e) => {
									console.log(e.target.value);
								}}
							/>
							{/* 	<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								className={`${styles.input_text} 	form-control `}
							/> */}
						</Col>
					</Row>
					{/* 	<Form.Label>Email</Form.Label>
						<Form.Control className='mb-2' placeholder='Enter email' />
						<Form.Label>---</Form.Label>
						<Form.Control className='mb-2' placeholder='---' />
						<Form.Label>Address</Form.Label>
						<Form.Control className='mb-2' placeholder='1234 Main St' />
						<Form.Label>---</Form.Label>
						<Form.Control className='mb-2' placeholder='---' />
						<Form.Label>Address</Form.Label>
						<Form.Control className='mb-2' placeholder='1234 Main St' />

						<Form.Label>State</Form.Label>
						<Form.Control as='select' defaultValue='Choose...'>
							<option>Choose...</option>
							<option>...</option>
						</Form.Control>

						<Form.Check type='checkbox' label='Check me out' /> */}
					<Row
						md={6}
						className='justify-content-center align-items-center ml-6 mr-11'>
						<Button
							variant='success'
							type='submit'
							size='lg'
							block
							className='p-3 font-weight-bold text-uppercase 
							'>
							Submit
						</Button>
					</Row>
					{/* <Form.Row>
					</Form.Row> */}
				</Form>
			</Jumbotron>

			<footer className={styles.footer}>
				<p> Made with 🤍 by MD-AD </p>
			</footer>
		</>
	);
}
