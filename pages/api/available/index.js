import dbConnect from '../../../utils/dbConnect';
import Car from '../../../models/Car';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const car = await Car.find({
					available: true,
				});
				res.status(200).json(JSON.stringify(car, null, 2));
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
