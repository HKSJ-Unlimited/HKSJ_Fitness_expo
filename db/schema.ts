import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().default("Jeralt"),
  email: text().default("jeralt@gmail.com").unique(),
  age: int().default(27),
  height: int().default(177),
  image: text().default("https://www.gravatar.com/avatar/?d=identicon"),
});

export const goalsTable = sqliteTable("goals_table", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  weight: int().notNull(),
  calories: int().notNull(),
});

export const mealTable = sqliteTable("meals_table", {
  id: int().primaryKey({ autoIncrement: true }),
  type: text().notNull().$type<mealType>(),
  name: text().notNull(),
  about: text().notNull(),
  quantity: int().notNull(),
  nutrients: text().notNull().$type<IFullNutrition[]>(),
});

export const diaryTable = sqliteTable("diary_table", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  date: text().default(new Date().toISOString()),
  mealId: int()
    .notNull()
    .references(() => mealTable.id),
});
