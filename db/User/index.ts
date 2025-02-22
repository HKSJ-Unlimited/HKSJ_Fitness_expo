import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { goalsTable, totalCalories, usersTable } from "../schema";
import { mealType } from "@/Types/SharedTypes";

export const useInitUser = async (db: SQLiteDatabase) => {
  const drizzleDb = drizzle(db);
  const user = await drizzleDb.insert(usersTable).values({}).returning({
    id: usersTable.id,
  });
  await drizzleDb.insert(goalsTable).values({
    calories: 2000,
    weight: 69,
    userId: user[0].id,
  });
  await drizzleDb.insert(totalCalories).values({
    type: mealType.breakfast,
  });

  await drizzleDb.insert(totalCalories).values({
    type: mealType.lunch,
  });
  await drizzleDb.insert(totalCalories).values({
    type: mealType.dinner,
  });
  await drizzleDb.insert(totalCalories).values({
    type: mealType.snack,
  });
};
