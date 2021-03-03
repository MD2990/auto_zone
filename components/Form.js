import { Typography } from '@material-ui/core';
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBRow,
} from 'mdbreact';
import React from 'react';

export function CardBody(props) {
	return (
		<>
			<MDBCard>
				<MDBCardBody className='mx-4'>
					<MDBRow>{props.children}</MDBRow>
				</MDBCardBody>
			</MDBCard>
		</>
	);
}
export function ButtonsRow({
	isSubmitting,
	btnIcon = [{ send: 'paper-plane' }],
}) {
	return (
		<>
			<MDBRow className='justify-content-center text-center mt-xl-3'>
				<MDBBtn
					className='text-capitalize'
					outline
					color='primary'
					type='submit'
					disabled={isSubmitting}>
					Edit and Save
					<MDBIcon icon={btnIcon[0].send} className='ml-1 ' />
				</MDBBtn>
			</MDBRow>
		</>
	);
}

export function Col(props) {
	return (
		<MDBCol>
			<div className='grey-text'>{props.children}</div>
		</MDBCol>
	);
}

export function Inputs(props) {
	return (
		<MDBInput
			label={
				<Typography
					className={props.errors && props.touched ? 'text-danger' : ''}>
					{props.errors && props.touched ? props.errors : props.errors}
				</Typography>
			}
			icon={props}
			type={props}
			name={props}
			id={props}
			value={props}
			onChange={props}
			onBlur={props}
		/>
	);
}

export function TheForm(props) {
	return (
		<>
			<div className=' container-sm  justify-content-center text-center mt-4 mb-4'>
				{props.title}
			</div>

			<form onSubmit={props.handleSubmit}>
				<MDBRow className=' justify-content-center  '>
					<MDBCol md='8'>{props.children}</MDBCol>
				</MDBRow>
			</form>
		</>
	);
}
