import { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';

export default function Example({ show, handleCancel,handleDelete, car }) {
	return (
		<>
			<Modal show={show} onHide={handleCancel}>
				<Modal.Header closeButton>
					<Modal.Title>Delete a Car</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h6 className='form-control-lg'>
						{' '}
						Are you sure to delete:{' '}
						<span className='text-danger font-weight-bolder '>{car} </span>{' '}
					</h6>{' '}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='info' onClick={handleCancel}>
						Cancel
					</Button>
					<Button variant='danger' onClick={handleDelete}>
						Delete and Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
