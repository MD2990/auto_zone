import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url) =>
	fetch(url)
		.then((res) => res.json())
		.then((json) => json.data);

const EditCar = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: car, error } = useSWR(id ? `/api/cars/${id}` : null, fetcher);

	if (error) return <p>Failed to load</p>;
	if (!car) return <p>Loading...</p>;

	const carForm = {
		name: car.name,
		make: car.make,
	};

	return <Form formId='edit-pet-form' petForm={carForm} forNewPet={false} />;
};

export default EditCar;
