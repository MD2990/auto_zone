// Helper styles for demo
import styles from '../styles/formik.module.css';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function form() {
	return (
		<div className={styles.app}>
			<Formik
				initialValues={{ email: '', name: '' }}
				onSubmit={async (values) => {
					await new Promise((resolve) => setTimeout(resolve, 500));
					alert(JSON.stringify(values, null, 2));
					
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email().required('Email is required'),
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
							<label htmlFor='email' style={{ display: 'block' }}>
								Email
							</label>
							<input
								id='email'
								placeholder='Enter your email'
								type='text'
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.email && touched.email
										? styles.input + styles.error
										: styles.input
								}
							/>
							{errors.email && touched.email && (
								<div className={styles.input_feedback}>{errors.email}</div>
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
