import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

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
            return <FontAwesome name="info-circle" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
