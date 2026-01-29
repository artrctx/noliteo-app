import { useFonts } from "expo-font";
// expo go doesn't load config fonts. use this only for dev settings
export function useFontForDevelopment() {
  const [loaded, error] = useFonts({
    // -- Geist Mono --
    // weight: 100
    "GeistMono-Thin": require("../../assets/fonts/GeistMono-Thin.otf"),
    "GeistMono-ThinItalic": require("../../assets/fonts/GeistMono-ThinItalic.otf"),
    // weight: 200
    "GeistMono-ExtraLight": require("../../assets/fonts/GeistMono-ExtraLight.otf"),
    "GeistMono-ExtraLightItalic": require("../../assets/fonts/GeistMono-ExtraLightItalic.otf"),
    // weight: 300
    "GeistMono-Light": require("../../assets/fonts/GeistMono-Light.otf"),
    "GeistMono-LightItalic": require("../../assets/fonts/GeistMono-LightItalic.otf"),
    // weight: 400
    "GeistMono-Regular": require("../../assets/fonts/GeistMono-Regular.otf"),
    // weight: 500
    "GeistMono-Medium": require("../../assets/fonts/GeistMono-Medium.otf"),
    "GeistMono-MediumItalic": require("../../assets/fonts/GeistMono-MediumItalic.otf"),
    // weight: 600
    "GeistMono-SemiBold": require("../../assets/fonts/GeistMono-SemiBold.otf"),
    "GeistMono-SemiBoldItalic": require("../../assets/fonts/GeistMono-SemiBoldItalic.otf"),
    // weight: 700
    "GeistMono-Bold": require("../../assets/fonts/GeistMono-Bold.otf"),
    "GeistMono-BoldItalic": require("../../assets/fonts/GeistMono-BoldItalic.otf"),
    // weight: 800
    "GeistMono-ExtraBold": require("../../assets/fonts/GeistMono-ExtraBold.otf"),
    "GeistMono-ExtraBoldItalic": require("../../assets/fonts/GeistMono-ExtraBoldItalic.otf"),
  });
  if (error) console.error("Development Font load error: ", error);
  if (loaded) console.log("Development Font loaded");

  return loaded;
}
