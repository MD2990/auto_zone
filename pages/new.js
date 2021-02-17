import Form from '../components/Form';

const NewCar = () => {
	const carForm = {
		name: '',
		make: '',
	};

	return <Form formId='add-pet-form' petForm={carForm} />;
};

export default NewCar;
