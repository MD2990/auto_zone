import mongoose, { Schema } from 'mongoose';
import { date } from 'yup';

const MODEL_NAME = 'Car';
const schema = new Schema({
	model: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [40, 'Name cannot be more than 40 characters'],
	},
	make: {
		type: String,
		required: [true, 'Please add a make'],
	},
	year: {
		type: String,
		required: [true, 'Please add a year'],
	},
	vin: {
		type: String,
		required: [true, 'Please add a vin number'],
	},
	color: {
		type: String,
		required: [true, 'Please add a color'],
	},
	mileage: {
		type: String,
		required: [true, 'Please add a mileage'],
	},
	rental_fees: {
		type: String,
		required: [true, 'Please add a rental fees'],
	},
	registration_expiry_date: {
		type: Date,
		required: [true, 'Please add a Registration Expiry Date'],
	},
	available: {
		type: Boolean,
		default: true,
	},
	notes: {
		type: String,
	},
});

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, schema, 'cars');
