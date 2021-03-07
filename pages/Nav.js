import React from 'react';
import axios from 'axios';

const fetchData = async () =>
	await axios

		.get('http://localhost:3000/api/cars/')
		.then((res) => ({
			error: false,
			users: res.data.data,
		}))
		.catch(() => ({
			error: true,
			users: null,
		}));
const Users = ({ data, error }) => {
	return (
		<section>
			<header>
				<h1>List of users</h1>
			</header>
			{error && <div>There was an error.</div>}
			{!error && data && (
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{data.users.map((user, key) => (
							<tr key={key}>
								<td>{user.model}</td>
								<td>{user.make}</td>
								<td>{user.year}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	);
};

// This function gets called at build time
export const getStaticProps = async () => {
	const data = await fetchData();
	return {
		props: {
			data,
		},
		revalidate: 1,
	};
};
export default Users;
