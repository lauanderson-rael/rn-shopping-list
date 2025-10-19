import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#004b77" },
          headerTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              // dentro da página
              if (focused) {
                return <FontAwesome name="home" size={size} color={color} />;
              }
              // fora da página
              return <FontAwesome name="home" size={size} color={color} />;
            },
          }}
        />

        <Tabs.Screen
          name="about/index"
          options={{
            title: "Sobre o App",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              // dentro da página
              if (focused) {
                return (
                  <FontAwesome name="info-circle" size={size} color={color} />
                );
              }
              // fora da página
              return (
                <FontAwesome name="info-circle" size={size} color={color} />
              );
            },
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
