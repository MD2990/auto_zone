import React from 'react';

export default function CustomerRentFormComponent({ carInfo }) {
	return (
		<div>
			<h1>Hi</h1>
			<pre> {JSON.stringify(carInfo, null, 2)}</pre>
		</div>
	);
}
