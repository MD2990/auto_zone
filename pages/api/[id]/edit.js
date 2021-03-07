import { useRouter } from 'next/router';
import useSWR, { mutate, trigger } from 'swr';
import Edit_Delete_Form from '../../../components/Edit_Delete_Form';
const url = `http://localhost:3000/edit`;
const errorUrl = `http://localhost:3000/View`;

const EditCar = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, error } = useSWR(`/api/cars/${id}`);

	if (error) router.replace(errorUrl);
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
	trigger('http://localhost:3000/api/cars', carForm, true);

	return <Edit_Delete_Form formData={carForm} />;
};

export default EditCar;
