import React from 'react';
import useSWR, { mutate } from 'swr';
import { Pre } from '../utils/dbConnect';

export default function GetAllCars({ datas }) {
	return (
		<>
			<pre> {JSON.stringify(datas)} </pre>
		</>
	);
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
