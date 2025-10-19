import { Item } from "@/types/item";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
  item: Item;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ListItem({ item, onToggle, onRemove }: ListItemProps) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text style={item.purchased ? styles.itemBought : styles.item}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Text style={styles.removeText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  item: { fontSize: 18, color: "#333" },
  itemBought: {
    fontSize: 18,
    color: "#999",
    textDecorationLine: "line-through",
  },
  removeText: { color: "red", fontWeight: "bold", paddingHorizontal: 8 },
});
