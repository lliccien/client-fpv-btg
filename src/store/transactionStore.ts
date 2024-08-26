import { create, StateCreator } from "zustand";

import { Transaction } from "../models/Transaction";

export interface TransactionState {
  transactions: Transaction[];
  errorTransaction: string | null;
  setTransactions: (transactions: Transaction[]) => void;
  setErrorTransaction: (error: string | null) => void;
}

const transactionStore: StateCreator<TransactionState> = (set) => ({
  transactions: [],
  errorTransaction: null,
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  setErrorTransaction: (errorTransaction: string | null) =>
    set({ errorTransaction }),
});

export const useTransactionStore = create<TransactionState>()(transactionStore);
