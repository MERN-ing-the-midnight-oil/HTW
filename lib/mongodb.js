import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the DATABASE_URL environment variable inside .env.local"
	);
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
