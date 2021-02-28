import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';
const url = `http://localhost:3000/edit`;
const fetcher = (url) =>
	fetch(url)
		.then((res) => res.json())
		.then((json) => json.data);

const EditCar = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, error } = useSWR(`/api/cars/${id}`);

	if (error) return <p>Failed to load</p>;
	if (!data) return <p>Loading...</p>;

	console.log(data.model);
	console.log(data.make);

	const carForm = {
		model: data.model,
		make: data.make,
	};

	return <Form petForm={carForm} />;
};

export default EditCar;
