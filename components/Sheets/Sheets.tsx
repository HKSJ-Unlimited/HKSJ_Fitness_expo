import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import BottomNutritionSheet from "./BottomNutritionSheet";
import BottomAddFoodSheet from "./BottomAddFoodSheet";

registerSheet("BottomNutritionSheet", BottomNutritionSheet);
registerSheet("BottomAddFoodSheet", BottomAddFoodSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    BottomNutritionSheet: SheetDefinition;
    BottomAddFoodSheet: SheetDefinition;
  }
}

export {};
