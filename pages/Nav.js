import React from 'react';
import axios from 'axios';
import { dbConnect, jsonify, Pre } from '../utils/dbConnect';
import Car from '../models/Car';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Users = ({ car }) => {
	const router = useRouter();
	return (
		<>
			<h4 className='marTop'>{car.length}</h4>
			<div>
				{car.map((c) => {
					return (
						<div key={c._id}>
							<Link href={`/${c._id}`}>
								<a>{c.model} </a>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};

// This function gets called at build time
export const getStaticProps = async () => {
	dbConnect();

	const data = await Car.find({}); /* find all the data in our database */
	const car = await jsonify(data);

	return {
		props: {
			car,
		},
		revalidate: 1,
	};
};
export default Users;
