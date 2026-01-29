import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { ScreenView } from "../components/screen-view";

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   if (isPending || !data) return;
  //   router.replace("/protected");
  // }, [data, isPending]);

  return (
    <>
      <ScreenView className="p-4">
        <View className="flex-1 items-center justify-center rounded-2xl border border-primary">
          <ActivityIndicator/>
          {/* {isPending || data ? <ActivityIndicator /> : <SignUpIn />} */}
        </View>
      </ScreenView>
    </>
  );
}
