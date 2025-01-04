import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import BottomNutritionSheet from "./BottomNutritionSheet";
import BottomAddFoodSheet from "./BottomAddFoodSheet";
import BottomLoginSheet from "./BottomLoginSheet";

registerSheet("BottomNutritionSheet", BottomNutritionSheet);
registerSheet("BottomAddFoodSheet", BottomAddFoodSheet);
registerSheet("BottomLoginSheet", BottomLoginSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    BottomNutritionSheet: SheetDefinition;
    BottomAddFoodSheet: SheetDefinition;
    BottomLoginSheet: SheetDefinition;
  }
}

export {};
