function Error({ statusCode }) {
	return (
		<p>
			{statusCode
				? `An error ${statusCode} occurred on server`
				: 'An error occurred on client'}
		</p>
	);
}

export const getStaticProps = async ({ params, statusCode }) => {
	dbConnect();
	try {
		const car = await Car.findById(params.id);
		if (!car) {
			statusCode = res.status(400);

			return statusCode;
		}
		return {
			props: {
				car,
			},
			revalidate: 1,
		};
	} catch (error) {
		res.status(400).json({ success: false });
	}
};

export default Error;
