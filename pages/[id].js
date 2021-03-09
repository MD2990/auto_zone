import { useRouter } from 'next/router';
import useSWR, { mutate, trigger } from 'swr';
import Edit_Delete_Form from '../components/Edit_Delete_Form';
import Car from '../models/Car';
import dbConnect, { jsonify } from '../utils/dbConnect';
const url = `http://localhost:3000/edit`;
const errorUrl = `http://localhost:3000/View`;

const EditCar = ({ car }) => {
	const router = useRouter();
	const { id } = router.query;

	/* 	const { data, error } = useSWR(`/api/cars/${id}`);

	if (error) router.replace(errorUrl);
	if (!data) return <p>Loading...</p>;
 */
	const carForm = {
		id: car._id,
		make: car.make,
		model: car.model,
		year: car.year,
		vin: car.vin,
		color: car.color,
		mileage: car.mileage,
		rental_fees: car.rental_fees,
		registration_expiry_date: car.registration_expiry_date,
		available: car.available,
		notes: car.notes,
	};
	//	trigger('http://localhost:3000/api/cars', carForm, true);

	return <Edit_Delete_Form formData={carForm} />;
};

export async function getStaticPaths() {
	dbConnect();

	const data = await Car.find({});
	const car = await jsonify(data);

	// Get the paths we want to pre-render based on posts

	const paths = car.map((car) => ({
		params: { id: car._id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

// This function gets called at build time
export const getStaticProps = async ({ params }) => {
	dbConnect();

	const data = await Car.findById(params.id);

	if (!data) {
		return {
			notFound: true,
		};
	}
	const car = await jsonify(data);

	return {
		props: {
			car,
		},
		revalidate: 1,
	};
};

export default EditCar;

/* import React from 'react';
import axios from 'axios';
import { dbConnect, jsonify, Pre } from '../utils/dbConnect';
import Car from '../models/Car';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Error from '../components/Error';

const Users = ({ car }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	if (!car) {
		return <h1>not Ok</h1>;
	}

	return (
		<>
			<Link href='/Nav'>
				<a>
					<button>Back</button>
				</a>
			</Link>

			<ul key={car._id}>
				{
					<>
						{' '}
						<li>{car.make}</li>
						<li>{car.model}</li>
						<li>{car.year}</li>
						<li>{car.vin}</li>
					</>
				}
			</ul>
		</>
	);
};

export async function getStaticPaths() {
	dbConnect();

	const data = await Car.find({}); /* find all the data in our database 
	const car = await jsonify(data);

	// Get the paths we want to pre-render based on posts

	const paths = car.map((car) => ({
		params: { id: car._id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

// This function gets called at build time
export const getStaticProps = async ({ params }) => {
	dbConnect();

	const data = await Car.findById(
		params.id
	); /* find all the data in our database 

	if (!data) {
		return {
			notFound: true,
		};
	}
	const car = await jsonify(data);

	return {
		props: {
			car,
		},
		revalidate: 1,
	};
};
export default Users;
 */
