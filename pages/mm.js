import useSWR, { mutate, trigger } from 'swr';
import styles from '../styles/formik.module.css';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Profile({ cars }) {
	const { data, error } = useSWR('http://localhost:3000/api/cars', {
		initialData: cars,
	});

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	console.log(data);

	return (
		<div className={styles.app}>
			<Formik
				initialValues={{ make: '', name: '' }}
				onSubmit={async (values) => {
					/* 		await new Promise((resolve) => setTimeout(resolve, 500));
					alert(JSON.stringify(values, null, 2)); */
					mutate('http://localhost:3000/api/cars', [...[data], values], false);
					//formikHelpers.resetForm();
					await axios.post('http://localhost:3000/api/cars', values);
					trigger('http://localhost:3000/api/cars');
				}}
				validationSchema={Yup.object().shape({
					//make: Yup.string().make().required('Email is required'),
					make: Yup.string().required('Email is required'),
					name: Yup.string().min(5).required('Name is required'),
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
						<form onSubmit={handleSubmit}>
							{data.data && <h1>total: {Object.values(data.data).length}</h1>}
							<div>
								<pre>{JSON.stringify(data, null, 2)}</pre>
							</div>
							<label htmlFor='make' style={{ display: 'block' }}>
								Email
							</label>
							<input
								id='make'
								placeholder='Enter your make'
								type='text'
								value={values.make}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.make && touched.make
										? styles.input + styles.error
										: styles.input
								}
							/>
							{errors.make && touched.make && (
								<div className={styles.input_feedback}>{errors.make}</div>
							)}
							<label htmlFor='name' style={{ display: 'block' }}>
								Name
							</label>
							<input
								id='name'
								placeholder='Enter your Name'
								type='text'
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.name && touched.name
										? styles.input + styles.error
										: styles.input
								}
							/>
							{errors.name && touched.name && (
								<div className={styles.input_feedback}>{errors.name}</div>
							)}

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
						</form>
					);
				}}
			</Formik>
		</div>
	);
}

Profile.getInitialProps = async (ctx) => {
	const res = await axios('http://localhost:3000/api/cars');
	const json = res.data;
	return { cars: json };
};

export default Profile;

// Helper styles for demo
