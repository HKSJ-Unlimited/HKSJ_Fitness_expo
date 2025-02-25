import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { MoonStar } from "@/lib/icons/MoonStar";
import { Sun } from "@/lib/icons/Sun";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(
    isDarkColorScheme ? "dark" : "light"
  );

  useEffect(() => {
    setColorScheme(theme);
    setAndroidNavigationBar(theme);
    // AsyncStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Pressable
      onPress={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
      }}
    >
      {({ pressed }) => (
        <View
          className={cn(
            "aspect-square pt-0.5 justify-center items-start",
            pressed && "opacity-70"
          )}
        >
          {theme === "dark" ? (
            <MoonStar
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ) : (
            <Sun className="text-foreground" size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  );
}
