import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { usersTable } from "./schema";

export const expoDB = SQLite.openDatabaseSync("HKSJ_Fitness", {
  enableChangeListener: true,
});
export const db = drizzle(expoDB);

export const createUser = async () => {
  const user = await db.select().from(usersTable);
  if (!user.length) {
    console.log("creating user");
    try {
      await db.insert(usersTable).values({});
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("user exists");
  }
};
