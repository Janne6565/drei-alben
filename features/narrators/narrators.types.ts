import { Narrator } from "@/types/albums";

export type NarratorSlice = {
  data: Narrator[];
  lastFetchedAt?: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};
