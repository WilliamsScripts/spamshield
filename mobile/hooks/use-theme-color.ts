import { darkTheme, lightTheme } from "@/constants/theme";
import { useColorScheme } from "react-native";

export default function useTheme() {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkTheme : lightTheme;
}
