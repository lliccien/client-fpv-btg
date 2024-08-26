import { Transaction } from "../models/Transaction";

import { fvpApi } from "../api/fvpApi";

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const { data } = await fvpApi.get<Transaction[]>("/transactions");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTransaction = async (transaction: Transaction) => {
  try {
    const { data } = await fvpApi.post("/transactions", transaction);
    return data;
  } catch (error) {
    throw new Error(
      (
        error as { response?: { data?: { detail?: string } } }
      ).response?.data?.detail
    );
  }
};

export const cancelTransaction = async (id: string) => {
  try {
    const { data } = await fvpApi.post(`/transactions/cancel`, { id });
    return data;
  } catch (error) {
    console.log(error);
  }
};
