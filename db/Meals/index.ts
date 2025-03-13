import {
  IFullNutrition,
  IFullNutritionListResponse,
  mealType,
} from "@/Types/SharedTypes";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { diaryTable, mealTable, totalCalories, usersTable } from "../schema";
import { and, eq } from "drizzle-orm";
import { FormatDate } from "@/utils/FormatDate";

// Function to get meals by type
export const useMealsByType = (db: SQLiteDatabase, type: mealType) => {
  const drizzleDb = drizzle(db);

  return useLiveQuery(
    drizzleDb.select().from(mealTable).where(eq(mealTable.type, type))
  );
};

// Function to get total calories by type
export const useTotalCaloriesByType = (db: SQLiteDatabase, type: mealType) => {
  const drizzleDb = drizzle(db);
  const formattedDate = FormatDate(new Date().toISOString());
  return useLiveQuery(
    drizzleDb
      .select({
        totalCalories: totalCalories.total,
      })
      .from(totalCalories)
      .where(
        and(eq(totalCalories.type, type), eq(totalCalories.date, formattedDate))
      )
  );
};

// Function to delete food by type
export const useDeleteFoodByType = async (
  db: SQLiteDatabase,
  id: number,
  type: mealType
) => {
  const drizzleDb = drizzle(db);
  const formattedDate = FormatDate(new Date().toISOString());
  try {
    const prev = await drizzleDb
      .delete(mealTable)
      .where(eq(mealTable.id, id))
      .returning({
        calories: mealTable.totalCalories,
      });

    const currentCalories = await drizzleDb
      .select({
        total: totalCalories.total,
      })
      .from(totalCalories)
      .where(
        and(eq(totalCalories.type, type), eq(totalCalories.date, formattedDate))
      );

    let total = currentCalories[0].total - prev[0].calories;
    await drizzleDb
      .update(totalCalories)
      .set({ total })
      .where(
        and(eq(totalCalories.type, type), eq(totalCalories.date, formattedDate))
      );

    await drizzleDb.delete(diaryTable).where(eq(diaryTable.mealId, id));
  } catch (error) {
    console.log(error);
  }
};

const useSetCalories = async (
  db: SQLiteDatabase,
  meal: mealType,
  calorie: IFullNutrition | undefined,
  date: string
) => {
  const drizzleDb = drizzle(db);
  const formattedDate = FormatDate(date);

  const currentCalories = await drizzleDb
    .select({
      total: totalCalories.total,
    })
    .from(totalCalories)
    .where(
      and(eq(totalCalories.type, meal), eq(totalCalories.date, formattedDate))
    );

  if (currentCalories.length > 0) {
    let total = currentCalories[0].total + (calorie?.amount ?? 0);

    await drizzleDb
      .update(totalCalories)
      .set({
        total,
      })
      .where(
        and(eq(totalCalories.type, meal), eq(totalCalories.date, formattedDate))
      );
  } else {
    await drizzleDb.insert(totalCalories).values({
      type: meal,
      total: calorie?.amount ?? 0,
    });
  }
};

// Function to get all meals
export const useAddFood = async (
  db: SQLiteDatabase,
  response: IFullNutritionListResponse,
  meal: mealType,
  portionSize: string
) => {
  const drizzleDb = drizzle(db);
  let calorie = response.data.filteredData.find(
    (nutrient) => nutrient.unit === "kcal"
  );
  const user = await drizzleDb.select({ id: usersTable.id }).from(usersTable);
  const mealId = await drizzleDb
    .insert(mealTable)
    .values({
      name: response.data.name,
      type: meal,
      description: response.data.description,
      nutrients: JSON.stringify(response.data.filteredData),
      quantity: parseInt(portionSize),
      totalCalories: calorie?.amount ?? 0,
    })
    .returning({
      id: mealTable.id,
      calories: mealTable.nutrients,
      quantity: mealTable.quantity,
    });
  await drizzleDb.insert(diaryTable).values({
    mealId: mealId[0].id,
    userId: user[0].id,
  });
  useSetCalories(db, meal, calorie, new Date().toISOString());
};

// Function to get nutrition data
export const useNutritionData = async (db: SQLiteDatabase, id: number) => {
  const drizzleDb = drizzle(db);

  return drizzleDb.select().from(mealTable).where(eq(mealTable.id, id));
};
