import { useColorScheme } from "@/lib/useColorScheme";

const GetThemeColor = () => {
  const { colorScheme } = useColorScheme();
  return colorScheme === "dark" ? "#040201" : "#FDF9F7";
};

export default GetThemeColor;
