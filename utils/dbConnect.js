import mongoose from 'mongoose';
const DB = process.env.DB;

export async function dbConnect() {
	// check if we have a connection to the database or if it's currently
	// connecting or disconnecting (readyState 1, 2 and 3)
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	return mongoose.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
}

export function jsonify(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export default dbConnect;
