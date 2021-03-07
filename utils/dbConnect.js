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
		maxIdleTimeMS: 10000,
		serverSelectionTimeoutMS: 10000,
		socketTimeoutMS: 20000,
	});
}

export function jsonify(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export function Pre(obj) {
	return <pre> {JSON.stringify(obj, null, 2)} </pre>;
}

export default dbConnect;
