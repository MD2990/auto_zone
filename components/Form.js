import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import axios from 'axios';
import { jsonify } from '../utils/dbConnect';

const Form = ({ petForm }) => {
	const router = useRouter();
	const contentType = 'application/json';

	const [form, setForm] = useState({
		name: petForm.name,
		make: petForm.make,
	});

	/* The PUT method edits an existing entry in the mongodb database. */
	const putData = async (form) => {
		const { id } = router.query;

		try {
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

			mutate(`/api/cars/${id}`, data, false); // Update the local data without a revalidation
			router.push('http://localhost:3000/edit');
		} catch (error) {
			setMessage('Failed to update car');
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		const make = target.make;

		setForm({
			...form,
			[name]: value,
			[make]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		putData(form);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					maxLength='20'
					name='name'
					value={form.name}
					onChange={handleChange}
					required
				/>
				<label htmlFor='make'>Make</label>

				<input
					type='text'
					maxLength='20'
					name='make'
					value={form.make}
					onChange={handleChange}
					required
				/>

				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default Form;
