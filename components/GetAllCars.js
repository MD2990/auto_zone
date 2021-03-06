/* import React from 'react';
import useSWR, { mutate } from 'swr';
import ViewAllCars from './ViewAllCars';

export default function GetAllCars(allData) {
	const { data, error } = useSWR('http://localhost:3000/api/cars', {
		initialData: allData,
	});

	if (error)
		return (
			<div className='d-flex justify-content-center text-center mt-xl-5 pt-xl-5 vh-100'>
				<div className='ms-auto spinner-grow  text-danger ' role='status'>
					<span className='visually-hidden'> </span>
					<h6 className=' ml-xl-n5 pl-xl-n5 mt-xl-5  text-nowrap '>
						Please try again !!!
					</h6>
				</div>
			</div>
		);

	if (!data)
		return (
			<div className='d-flex justify-content-center text-center mt-xl-5 pt-xl-5 vh-100'>
				<div className='ms-auto spinner-grow  text-primary ' role='status'>
					<span className='visually-hidden'></span>
					<h6 className=' ml-xl-n2 mt-xl-5  text-nowrap '>Loading ...</h6>
				</div>
			</div>
		);
	mutate('http://localhost:3000/api/cars', data, false);

	return <ViewAllCars />;
}
export async function getServerSideProps(context) {
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
