import {
  addTransaction,
  cancelTransaction,
  getTransactions,
} from "../services/transactionService";
import { Transaction } from "../models/Transaction";
import { useQuery } from "@tanstack/react-query";
import { useTransactionStore } from "../store/transactionStore";

export const useTransactions = () => {
  const {
    transactions,
    setTransactions,
    errorTransaction,
    setErrorTransaction,
  } = useTransactionStore();

  const transactionQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
        return data;
      } catch (error) {
        console.log(error);
        setErrorTransaction(error as string);
        return [];
      }
    },
  });

  const addNewTransaction = async (transaction: Transaction) => {
    try {
      const newTransaction = await addTransaction(transaction);
      setTransactions([newTransaction, ...transactions]);
      return newTransaction;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`error ${error.message}`);
        setErrorTransaction(error.message);
      } else {
        console.log("Otro tipo de error");
      }
      return [];
    }
  };

  const cancelSubscription = async (id: string) => {
    const cancellation = await cancelTransaction(id);
    setTransactions([cancellation, ...transactions]);
  };

  return {
    transactions,
    addNewTransaction,
    cancelSubscription,
    errorTransaction,
    ...transactionQuery,
  };
};
