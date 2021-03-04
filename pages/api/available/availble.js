import { useRouter } from 'next/router';
import useSWR from 'swr';
import RentForm from '../../../components/RentForm';
const url = `http://localhost:3000/edit`;

const Available = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, error } = useSWR(`/api/available`);

	if (error) return <p>Failed to load</p>;
	if (!data) return <p>Loading...</p>;

	const carForm = {
		id: data._id,
		make: data.make,
		model: data.model,
		year: data.year,
		vin: data.vin,
		color: data.color,
		mileage: data.mileage,
		rental_fees: data.rental_fees,
		registration_expiry_date: data.registration_expiry_date,
		available: data.available,
		notes: data.notes,
	};

	return <RentForm carData={data} />;
};

export default Available;
