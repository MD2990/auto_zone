import mongoose, { Schema } from 'mongoose';

const MODEL_NAME = 'Car';
const schema = new Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: [40, 'Name cannot be more than 40 characters'],
	},
	make: {
		type: String,
		
		maxlength: [200, 'Car model cannot be more than 200 characters'],
	},
});

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, schema, 'cars');
