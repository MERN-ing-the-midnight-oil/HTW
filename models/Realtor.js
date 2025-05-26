import mongoose from "mongoose";

const RealtorSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.models.Realtor ||
	mongoose.model("Realtor", RealtorSchema);
