import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
	name: string;
	description: string;
	imageUrl: string;
}

const CategorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		imageUrl: { type: String, required: true },
	},
	{ timestamps: true },
);

export default mongoose.model<ICategory>("Category", CategorySchema);
