import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { IoCarSportSharp, IoCarSportOutline } from 'react-icons/io5';
import { FcEditImage } from 'react-icons/fc';
import { AiFillCar } from 'react-icons/ai';
import styles from '../styles/main.module.css';

export default function AlertDismissible() {
	return (
		<>
			<Container className='text-center'>
				<Row className=' justify-content-center align-items-center  vh-100'>
					<Col xs={3} className='mr-5'>
						<Link href='/Receive'>
							<a style={{ textDecoration: 'none' }}>
								<IoCarSportSharp size='5x' color='C70039' />
								<h3 className={styles.link_fonts}>Receive a Car</h3>
							</a>
						</Link>
					</Col>
					<Col xs={3}>
						<Link href='/Rent'>
							<a style={{ textDecoration: 'none' }}>
								<IoCarSportOutline size='5x' color='C70039' />
								<h3 className={styles.link_fonts}>Rent a Car</h3>
							</a>
						</Link>
					</Col>
					<Col xs={3} className='ml-4'>
						<Link href='/Manage'>
							<a style={{ textDecoration: 'none' }}>
								<FcEditImage size='5x' color='C70039' />
								<h5 className={styles.link_fonts}>Manage </h5>
							</a>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
}
