import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { mutate, fetcher } from 'swr';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Car from '../../models/Car';
import Edit_Delete_Form from '../../components/Edit_Delete_Form';

const EditCar = ({ car }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return <Edit_Delete_Form formData={car} />;
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await Car.findById(params.id);
	const car = await jsonify(data);
	if (!car) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			car,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await Car.find({});
	const car = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = car.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default EditCar;
