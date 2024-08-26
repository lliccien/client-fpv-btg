import { create, StateCreator } from "zustand";
import { Fundation } from "../models/Fundation";

export interface FundationState {
  fundations: Fundation[];
  setFundations: (fundations: Fundation[]) => void;
}

const fundationStore: StateCreator<FundationState> = (set) => ({
  fundations: [],
  setFundations: (fundations: Fundation[]) => set({ fundations }),
});

export const useFundationStore = create<FundationState>()(fundationStore);
