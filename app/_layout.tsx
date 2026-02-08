import { ShoppingListProvider } from "@/hooks/useShoppingList";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <ShoppingListProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Tabs.Screen
          name="index"
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
          name="saved-lists"
          options={{
            title: "Listas Salvas",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <FontAwesome name="bookmark" size={size} color={color} />
              );
            },
          }}
        />

        <Tabs.Screen
          name="about"
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
    </ShoppingListProvider>
  );
}
