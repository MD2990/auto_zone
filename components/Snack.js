import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';

// Display a maximum of 3 notifications at the same time
export default function Toasts() {
	const notify = (e) => {
		e.preventDefault();
		toast('lorem ipsum');
	};

	return (
		<div>
			<button className='btn btn-lg btn-success' onClick={notify}>
				Submit
			</button>
			<ToastContainer limit={1}></ToastContainer>
		</div>
	);
}










