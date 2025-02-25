export interface IFood {
  id: number;
  name: string;
}

export interface IFoodList {
  message: string;
  data: IFood[];
}

export interface IError {
  message: string;
}

export interface IFullNutrition {
  name: string;
  unit: string;
  amount: number;
}

export enum mealType {
  breakfast = "Breakfast",
  lunch = "Lunch",
  dinner = "Dinner",
  snack = "Snack",
}

export interface IFullNutritionList {
  name: string;
  foodCategory: string;
  filteredData: IFullNutrition[];
  description: string;
}
export interface IFullNutritionListResponse {
  message: string;
  data: IFullNutritionList;
}

export enum progressType {
  weight = "Weight",
  calories = "Calories",
}
