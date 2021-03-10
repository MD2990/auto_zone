import { useRouter } from 'next/router';
import Edit_Delete_Form from '../components/Edit_Delete_Form';
import { dbConnect, jsonify } from '../utils/dbConnect';
import Car from '../models/Car';
import useSWR from 'swr';
const EditCar = ({ car }) => {
	const router = useRouter();
	const { id } = router.query;
	const { data, error } = useSWR(`/api/cars/${id}`, { initialData: car });

	if (error) router.replace('/');
	if (!data) return <p>Loading...</p>;

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
