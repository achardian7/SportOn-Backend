import mongoose, { Schema, Document } from "mongoose";

export interface IPurchasedItem {
	productId: mongoose.Types.ObjectId;
	qty: number;
}

export interface ITransaction extends Document {
	paymentProof: string;
	status: "pending" | "paid" | "rejected";
	purchasedItems: IPurchasedItem[];
	totalPayment: number;
	customerName: string;
	customerContact: string;
	customerAddress: string;
}

const PurchasedItemsSchema = new Schema<IPurchasedItem>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		qty: {
			type: Number,
			required: true,
			min: 1,
		},
	},
	{
		_id: false,
	},
);

const TransactionSchema = new Schema<ITransaction>(
	{
		paymentProof: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "paid", "rejected"],
			default: "pending",
			required: true,
		},
		purchasedItems: {
			type: [PurchasedItemsSchema],
			required: true,
		},
		totalPayment: { type: Number, required: true },
		customerName: { type: String, required: true },
		customerContact: { type: String, required: true },
		customerAddress: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
