import React from 'react';
import axios from 'axios';
import { dbConnect, jsonify, Pre } from '../utils/dbConnect';
import Car from '../models/Car';

const Users = ({ car }) => {
	return (
		<>
			<h4 className='marTop'>{car.length}</h4>
			<div>
				{car.map((c) => {
					return <div key={c._id}>{c.model}</div>;
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
