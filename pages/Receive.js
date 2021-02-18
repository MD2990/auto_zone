function Blog({ posts }) {
	return (
		<>
			<div>
				<ul>
					{posts.data.map((car) => {
						return (
							<li key={car._id}>
								Car: {car.name} / Model: {car.make}
								<hr></hr>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/cars/');
	const posts = await res.json();

	return {
		props: {
			posts,
		},
	};
}

export default Blog;
