import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema(
	{
		code: { type: String, required: true, unique: true },
		isUsed: { type: Boolean, default: false },
		realtorId: { type: mongoose.Schema.Types.ObjectId, ref: "Realtor" },
	},
	{ timestamps: true }
);

export default mongoose.models.PromoCode ||
	mongoose.model("PromoCode", PromoCodeSchema);
