import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import {
  goalsTable,
  progressTable,
  totalCalories,
  usersTable,
} from "../schema";
import { mealType, progressType } from "@/Types/SharedTypes";
import { eq } from "drizzle-orm";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
  await useUpdateWeightProgress(db, 0, user[0].id);
};

export const useGetProgress = (db: SQLiteDatabase, type: progressType) => {
  const drizzleDb = drizzle(db);
  return useLiveQuery(
    drizzleDb.select().from(progressTable).where(eq(progressTable.type, type))
  );
};

export const useGetGoals = (db: SQLiteDatabase) => {
  const drizzleDb = drizzle(db);
  return useLiveQuery(drizzleDb.select().from(goalsTable));
};

export const useUpdateUser = async (
  db: SQLiteDatabase,
  additionalUserInfo: FirebaseAuthTypes.AdditionalUserInfo
) => {
  const drizzleDb = drizzle(db);
  await drizzleDb.update(usersTable).set({
    email: additionalUserInfo.profile?.email,
    name: additionalUserInfo.profile?.name,
    image: additionalUserInfo.profile?.picture,
  });
};

export const useUpdateWeightProgress = async (
  db: SQLiteDatabase,
  weight: number,
  userId: number
) => {
  const drizzleDb = drizzle(db);
  await drizzleDb.insert(progressTable).values({
    userId,
    type: progressType.weight,
    value: weight,
  });
};
