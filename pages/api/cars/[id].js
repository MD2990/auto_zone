import dbConnect from '../../../utils/dbConnect';
import Car from '../../../models/Car';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const car = await Car.findById(id);
				if (!car) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: car });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const car = await Car.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!car) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: car });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const deletedPet = await Car.deleteOne({ _id: id });
				if (!deletedPet) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
