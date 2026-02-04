import { Request, Response } from "express";

import BankModel from "../models/bank.model";

export const createBank = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const bank = new BankModel(req.body);

		await bank.save();

		res.status(201).json(bank);
	} catch (error) {
		res.status(500).json({ message: "Error creating bank", error });
	}
};

export const getBanks = async (_req: Request, res: Response): Promise<void> => {
	try {
		const banks = await BankModel.find().sort({ createdAt: -1 });

		res.status(200).json(banks);
	} catch (error) {
		res.status(500).json({ message: "Error fetching banks", error });
	}
};

export const updateBank = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const bank = await BankModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!bank) {
			res.status(404).json({ message: "Bank not found" });
			return;
		}

		res.status(200).json(bank);
	} catch (error) {
		res.status(500).json({ message: "Error updating bank", error });
	}
};

export const deleteBank = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const bank = await BankModel.findByIdAndDelete(req.params.id);

		if (!bank) {
			res.status(404).json({ message: "Bank not found" });
			return;
		}

		res.status(200).json({ message: "Bank deleted succesfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting bank", error });
	}
};
