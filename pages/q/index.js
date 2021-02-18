import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();
const fetchPanets = async () => {
	const result = await fetch('api/cars');
	return result.json();
};

const Planets = () => {
	const { error, isLoading, data, status } = useQuery('Planets', fetchPanets);

	if (data) {
		const newArray = data.data.map((n) => {
			console.log(n.name);
			console.log(n.make);
			return n.name;
		});
		console.log('okkkkkkkkkk: ', Object.keys(data), data.data);
	}

	return (
		<>
			<h1>Hi</h1>
			{/* 	{isLoading ? (
				<div>isLoading ...</div>
			) : (
				<div>
					{data.results.map((name) => {
						return (
							<div key={name.created}>
								<h1>
									{name.name} __ {name.birth_year}{' '}
								</h1>
							</div>
						);
					})}
				</div>
			)} */}
		</>
	);
};

export default function Warped() {
	return (
		<QueryClientProvider client={queryClient}>
			<Planets />
		</QueryClientProvider>
	);
}
