import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export const expoDB = SQLite.openDatabaseSync("HKSJ_Fitness", {
  enableChangeListener: true,
});
export const db = drizzle(expoDB);
