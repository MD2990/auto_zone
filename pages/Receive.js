import React from 'react';

export default function Blog() {
	return (
		<>
			<div>Hello</div>
		</>
	);
}

/* export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/cars/');
	const posts = await res.json();
	posts = JSON.parse(JSON.stringify(posts));

	return {
		props: {
			posts,
		},
	};
}

export default Blog; */
