import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
const url = `http://localhost:3000/aval`;

const Available = () => {
	const router = useRouter();
	const { available } = router.query;

	const { data, error } = useSWR(`/api/available`);

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
	if (!data) return <p>Loading...</p>;
	console.log(data);

	return (
		<>
			<h2>{data.length}</h2>
			<div>
				{data.map((car) => {
					return (
						<>
							<div key={car._id}>
								<h5>
									{car.model}--- {car.available.toString()}
								</h5>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};

export default Available;
