import Link from 'next/link';
import React from 'react';
import styles from '../styles/main.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

export default function Manage() {
	return (
		<>
			<Link href='/'>
				<Button variant='primary' className='m-4  font-weight-bolder btn-lg'>
					Home
				</Button>
			</Link>
			<div className={styles.center_main_div}>
				<Container>
					<Form>
						<Row>
							<Col xs={12} md={8}>
								<Form.Label>Email</Form.Label>
								<Form.Control placeholder='Enter email' />
							</Col>
						</Row>

						<Form.Group as={Col} xs={3}>
							<Form.Label>Password</Form.Label>
							<Form.Control placeholder='Password' />
						</Form.Group>

						<Form.Group as={Col} xs={3}>
							<Form.Label>Address</Form.Label>
							<Form.Control placeholder='1234 Main St' />
						</Form.Group>

						<Form.Group as={Col} xs={3}>
							<Form.Label>Address 2</Form.Label>
							<Form.Control placeholder='Apartment, studio, or floor' />
						</Form.Group>

						{/* <Form.Row>
					</Form.Row> */}
						<Form.Group as={Col} xs={3}>
							<Form.Label>City</Form.Label>
							<Form.Control />
						</Form.Group>

						<Form.Group as={Col} xs={3}>
							<Form.Label>State</Form.Label>
							<Form.Control as='select' defaultValue='Choose...'>
								<option>Choose...</option>
								<option>...</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} xs={3}>
							<Form.Label>Zip</Form.Label>
							<Form.Control />
						</Form.Group>

						<Form.Group as={Col} xs={3}>
							<Form.Check type='checkbox' label='Check me out' />
						</Form.Group>

						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</Container>
			</div>
			<footer className={styles.footer}>
				<p> Made with 🤍 by MD-AD </p>
			</footer>
		</>
	);
}
