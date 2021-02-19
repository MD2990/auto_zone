import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Car from '../../models/Car';

/* Allows you to view car card info and delete car card*/
/* const CarPage = ({ car }) => {

	const router = useRouter();
	const [message, setMessage] = useState('');
	const handleDelete = async () => {
		const carID = router.query.id;

		try {
			await fetch(`/api/cars/${carID}`, {
				method: 'Delete',
			});
			router.push('/');
		} catch (error) {
			setMessage('Failed to delete the car.');
		}
	};
	console.log(car);
	return (
		<div key={car._id}>
			<div>
				<h5>{car.name}</h5>
				<h5>{car.make}</h5>
				<div>
					<div>
						<Link href='/[id]/edit' as={`/${car._id}/edit`}>
							<button>Edit</button>
						</Link>
						<button onClick={handleDelete}>Delete</button>
					</div>
				</div>
			</div>
			{message && <p>{message}</p>}
		</div>
	);
};

export async function getServerSideProps({ params }) {
	await dbConnect();

	const car = await Car.findById(params.id).lean();
	//jsonify(cars);
	//jsonify(car._id);

	car._id = car._id.toString()

	return { props: { car } };
}

export default CarPage;
 */

export async function getServerSideProps(context) {
	dbConnect();
	const cars = await Car.find({}).exec();
	return {
		props: {
			cars: jsonify(cars),
		},
	};
}

export default function AllCars({ cars }) {
	const router = useRouter();

	const handleDelete = async (car) => {
		try {
			//car = cars.map((car) => car._id);

			console.log(car);
			await fetch(`/api/cars/${car}`, {
				method: 'DELETE',
			});
			//router.push('/');
		} catch (error) {
			//setMessage('Failed to delete the car.');
			alert(error);
		}
	};
	return (
		<div>
			{cars.map((cars) => {
				return (
					<div key={cars._id}>
						{cars.name}
						{/* 						{cars.make}
						 */}
						<div>
							<Link href='/[id]/edit' as={`/${cars._id}/edit`}>
								<button>Edit</button>
							</Link>
							<button onClick={() => handleDelete(cars._id)}>Delete</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}