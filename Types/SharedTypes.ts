interface IFood {
  id: number;
  name: string;
}

interface IFoodList {
  message: string;
  data: IFood[];
}

interface IError {
  message: string;
}

interface IFullNutrition {
  name: string;
  unit: string;
  amount: number;
}
