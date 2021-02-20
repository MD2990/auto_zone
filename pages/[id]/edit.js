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
	const { data, error } = useSWR(`/api/cars/${id}`, fetcher);

	if (error) return <p>Failed to load</p>;
	if (!data) return <p>Loading...</p>;

	const carForm = {
		name: data.name,
		make: data.make,
	};

	return <Form  petForm={carForm}  />;
};

export default EditCar;
