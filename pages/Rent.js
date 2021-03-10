import useSWR, { mutate, fetcher } from 'swr';
import RentForm from '../components/RentForm';
import fetch from 'isomorphic-unfetch';
import Car from '../models/Car';
import dbConnect, { jsonify } from '../utils/dbConnect';

const url = `http://localhost:3000/api/available`;

const Rent = ({ car }) => {
	/* 	const { data, error } = useSWR(url, {
		initialData: car,
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
		); */
	return (
		<>
			<RentForm carData={car} />;
		</>
	);
};

export default Rent;

export const getStaticProps = async () => {
	dbConnect();
	const data = await Car.find({
		available: true,
	});
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
};
