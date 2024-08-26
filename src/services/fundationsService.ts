import { Fundation } from "../models/Fundation";

import { fvpApi } from "../api/fvpApi";

export const getFundations = async (): Promise<Fundation[]> => {
  const { data } = await fvpApi.get<Fundation[]>("/fundations");
  return data;
};
