import React from 'react';
import ViewAllCars from '../components/ViewAllCars';

export default function GetAllCars() {
	return <ViewAllCars />;
}
/* export async function getServerSideProps(context) {
	const res = await fetch(`http://localhost:3000/api/cars`);
	const allData = await res.json();

	if (!allData) {
		return {
			notFound: true,
		};
	}

	return {
		props: { allData }, // will be passed to the page component as props
	};
}
 */
