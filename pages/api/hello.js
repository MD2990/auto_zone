// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/* export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
 */

import Cars from '../../models/Cars';
import dbConnect from '../../utils/dbConnect';

export default async (req, res) => {
	await dbConnect();

	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const Car = await Cars.find({});

				res.status(200).json({ success: true, data: Car });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const Car = await Cars.create(req.body);

				res.status(201).json({ success: true, data: Car });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
