import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  name: text().default("Jeralt").notNull(),
  email: text().default("jeralt@gmail.com").unique().notNull(),
  age: int().default(27).notNull(),
  height: int().default(177).notNull(),
  image: text()
    .default("https://www.gravatar.com/avatar/?d=identicon")
    .notNull(),
});

export const goalsTable = sqliteTable("goals_table", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  userId: int()
    .notNull()
    .references(() => usersTable.id)
    .unique(),
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
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  date: text().default(new Date().toISOString()).notNull(),
  mealId: int()
    .notNull()
    .references(() => mealTable.id),
});
