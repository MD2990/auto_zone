import { dbConnect, jsonify } from '../utils/dbConnect';
import Car from '../models/Cars';

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
	return (
		<div>
			<ul>
				{cars.map((cars) => {
					return (
						<li key={cars._id}>
							{cars.name}
							{cars.make}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
