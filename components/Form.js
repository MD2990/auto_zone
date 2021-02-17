import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const Form = ({ formId, petForm, forNewPet = true }) => {
	const router = useRouter();
	const contentType = 'application/json';
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');

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
			router.push('/');
		} catch (error) {
			setMessage('Failed to update pet');
		}
	};

	/* The POST method adds a new entry in the mongodb database. */
	const postData = async (form) => {
		try {
			const res = await fetch('/api/cars', {
				method: 'POST',
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

			router.push('/');
		} catch (error) {
			setMessage('Failed to add pet');
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const value =
			target.name === 'poddy_trained' ? target.checked : target.value;
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
		const errs = formValidate();
		if (Object.keys(errs).length === 0) {
			forNewPet ? postData(form) : putData(form);
		} else {
			setErrors({ errs });
		}
	};

	/* Makes sure pet info is filled for pet name, owner name, species, and image url*/
	const formValidate = () => {
		let err = {};
		if (!form.name) err.name = 'Name is required';
		if (!form.make) err.make = 'Make is required';

		return err;
	};

	return (
		<>
			<form id={formId} onSubmit={handleSubmit}>
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
			<p>{message}</p>
			<div>
				{Object.keys(errors).map((err, index) => (
					<li key={index}>{err}</li>
				))}
			</div>
		</>
	);
};

export default Form;
