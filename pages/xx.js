import React from 'react';
import useSWR, { mutate, trigger, fetcher } from 'swr';
import fetch from 'isomorphic-unfetch';

export default function Na(props) {
	const url = 'http://localhost:3000/api/cars';
	const fetcher = (url) => fetch(url).then((r) => r.json());

	const { data, error } = useSWR('/api/cars', fetcher, {
		initialData: props.posts,
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
		);

	console.log(data);
	return (
		<>
			<h2>{data.car.length}</h2>
			<pre>{JSON.stringify(data)}</pre>;
		</>
	);
}

export async function getStaticProps() {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	// `getStaticProps` is invoked on the server-side,
	// so this `fetcher` function will be executed on the server-side.
	const posts = await fetcher('http://localhost:3000/api/cars');
	return { props: { posts } };
}
