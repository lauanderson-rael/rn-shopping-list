import useShoppingList from "@/hooks/useShoppingList";
import { SavedList } from "@/types/item";
import { deleteSavedList, getSavedLists } from "@/utils/storage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedLists() {
  const [savedLists, setSavedLists] = useState<SavedList[]>([]);
  const [expandedListId, setExpandedListId] = useState<string | null>(null);
  const { loadSavedList } = useShoppingList();
  const router = useRouter();

  const loadSavedListsData = async () => {
    const lists = await getSavedLists();
    setSavedLists(lists);
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedListsData();
    }, [])
  );

  const handleRestoreList = (list: SavedList) => {
    Alert.alert(
      "Importar Lista",
      "Como deseja importar esta lista?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sobrescrever",
          onPress: async () => {
            await loadSavedList(list.items, "overwrite");
            router.push("/");
          },
        },
        {
          text: "Incrementar",
          onPress: async () => {
            await loadSavedList(list.items, "append");
            router.push("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteList = (id: string, name: string) => {
    Alert.alert(
      "Excluir Lista",
      `Tem certeza que deseja excluir "${name}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteSavedList(id);
            await loadSavedListsData();
          },
        },
      ]
    );
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedListId(expandedListId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Text style={styles.titulo}>
          <MaterialCommunityIcons name="bookmark-multiple" size={24} color="rgb(33 150 243)" />
          <Text> Listas Salvas</Text>
        </Text>

        {savedLists.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bookmark-off" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma lista salva</Text>
            <Text style={styles.emptySubText}>
              Salve suas listas de compras para reutilizá-las depois!
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedLists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <TouchableOpacity 
                  style={styles.listHeader}
                  onPress={() => toggleExpand(item.id)}
                >
                  <View style={styles.listInfo}>
                    <Text style={styles.listName}>{item.name}</Text>
                    <Text style={styles.listDate}>
                      {formatDate(item.date)} • {item.items.length} {item.items.length === 1 ? "item" : "itens"}
                    </Text>
                  </View>
                  <FontAwesome 
                    name={expandedListId === item.id ? "chevron-up" : "chevron-down"} 
                    size={16} 
                    color="#666" 
                  />
                </TouchableOpacity>

                {expandedListId === item.id && (
                  <View style={styles.itemsContainer}>
                    {item.items.map((listItem, index) => (
                      <View key={index} style={styles.itemRow}>
                        <FontAwesome 
                          name={listItem.purchased ? "check-square" : "square-o"} 
                          size={16} 
                          color={listItem.purchased ? "green" : "#666"} 
                        />
                        <Text style={[
                          styles.itemText,
                          listItem.purchased && styles.itemTextPurchased
                        ]}>
                          {listItem.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleRestoreList(item)}
                  >
                    <MaterialCommunityIcons name="import" size={24} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteList(item.id, item.name)}
                  >
                    <FontAwesome name="trash" size={22} color="#f44336" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 10,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: "#ecececff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  listDate: {
    fontSize: 14,
    color: "#666",
  },
  itemsContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    gap: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
  itemTextPurchased: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
  },
  actionButton: {
    padding: 5,
  },
});
