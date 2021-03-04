import { MDBBtn, MDBIcon } from 'mdbreact';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Container, Card, FormControl } from 'react-bootstrap';

export default function RentForm({ carData }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(carData.length);
	const router = useRouter();
	const inputReference = useRef(null);
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const results = carData.filter((car) => {
			return (
				car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
				car.make.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
		setCarLength(results.length);
		setSearchResults(results);
	}, [searchTerm]);

	const clear = () => {
		setSearchTerm('');
		inputReference.current.focus();
	};
	const render = (id) => {
		return router.push(`CustomerRentForm/603f56357d8ed12b18f8eee1`);
	};

	return (
		<>
			<Container>
				<h3 className='text-muted mt-md-5 mb-4 fa fa-car'>
					{' '}
					Total Available Cars: {carLength}
				</h3>
				<div>
					<FormControl
						className='ml-sm-n1'
						ref={inputReference}
						autoFocus
						type='text'
						placeholder='Search by Model or Make'
						value={searchTerm}
						onChange={handleChange}
					/>

					<MDBBtn
						className='btn btn-sm btn-info ml-sm-n1'
						onClick={() => clear()}>
						Clear
						<MDBIcon className='ml-2' icon='trash' spin size='1x' fixed />
					</MDBBtn>
				</div>

				<Row xl={3} className='justify-content-center  '>
					{searchResults.map((car) => {
						return (
							//key={car._id}
							<Row key={car._id} xl={3} className=' justify-content-center'>
								<Col lg={12} className='  justify-content-center  m-md-2'>
									<Card style={{ width: '18em' }} className='mb-sm-2 mr-sm-2'>
										<Card.Body>
											<Card.Title>{car.model}</Card.Title>
											<Card.Subtitle className='mb-2 text-muted'>
												{car.make}
											</Card.Subtitle>
											<Card.Text className='text-truncate'>
												Mileage:
												<span className=' font-weight-bolder ml-1 '>
													{car.mileage}
												</span>
												<br />
												Color:{' '}
												<span className=' font-weight-bolder  ml-1 '>
													{car.color}
												</span>
												<br />
												Rental Fees:{' '}
												<span className=' font-weight-bolder ml-1 '>
													{car.rental_fees}
												</span>
												<br />
												Registration Exp. Date:{' '}
												<span className=' font-weight-bolder ml-1 '>
													{car.registration_expiry_date}
												</span>
												<br />
												Notes:{' '}
												<span className=' font-weight-bold ml-1 '>
													{car.notes}
												</span>
											</Card.Text>
											<MDBBtn
												className='btn btn-sm btn-info'
												onClick={() =>
													router.push(
														`http://localhost:3000/${car._id}/ClientForm`
													)
												}>
												Rent
												<MDBIcon icon='cog' spin size='1x' fixed />
											</MDBBtn>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
