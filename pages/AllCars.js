import { dbConnect, jsonify } from '../utils/dbConnect';

export async function getServerSideProps(context) {
	dbConnect();
	const cars = [{ name: 'majid' }]; //await Car.find({}).exec();
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
					return <li>cars.name</li>;
				})}
			</ul>
		</div>
	);
}
