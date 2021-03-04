import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import CustomerRentFormComponent from '../components/CustomerRentFormComponent';
import { jsonify } from '../utils/dbConnect';
import { CarInfo } from './api/available/availble';
export default function CustomerRentForm() {
	const router = useRouter();
	const { id } = router.query;

	const { data, error } = useSWR(`/api/cars/${id}`);

	if (error) return <p>Failed to load</p>;
	if (!data) return <p>Loading...</p>;
	return (
		<>
			<h1>ok</h1>
			<pre>{JSON.stringify(data)}</pre>
		</>
	);
}
