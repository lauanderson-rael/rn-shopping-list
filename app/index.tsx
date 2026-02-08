import { ConfirmModal } from "@/components/ConfirmModal";
import { EditModal } from "@/components/EditModal";
import { InputItem } from "@/components/InputItem";
import { SaveListModal } from "@/components/SaveListModal";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useShoppingList from "../hooks/useShoppingList";
import { styles } from "../styles/home";



export default function Home() {
  // estados
  const [editingText, setEditingText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState<"single" | "all">("single");
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  // hooks
  const { list, addItem, toggleItem, removeItem, editItem, removeAll, saveCurrentList, loadSavedList } = useShoppingList();

  // funcoes
  const adicionarItem = async (nome: string) => {
    await addItem(nome);
  };

  const iniciarEdicao = (id: string, name: string) => {
    setItemToEdit(id);
    setEditingText(name);
    setEditModalVisible(true);
  };

  const salvarEdicao = async () => {
    if (itemToEdit && editingText.trim()) {
      await editItem(itemToEdit, editingText);
    }
    setItemToEdit(null);
    setEditingText("");
    setEditModalVisible(false);
  };

  const cancelarEdicao = () => {
    setItemToEdit(null);
    setEditingText("");
    setEditModalVisible(false);
  };

  const removerItem = (id: string) => {
    setItemToDelete(id);
    setDeleteMode("single");
    setModalVisible(true);
  };

  const removerTudo = () => {
    setDeleteMode("all");
    setModalVisible(true);
  };

  const confirmarRemocao = async () => {
    if (deleteMode === "single" && itemToDelete) {
      await removeItem(itemToDelete);
      setItemToDelete(null);
    } else if (deleteMode === "all") {
      await removeAll();
    }
    setModalVisible(false);
  };

  const handleSaveList = async (name: string) => {
    await saveCurrentList(name);
    setSaveModalVisible(false);
  };
  return (
  <SafeAreaView style={styles.container}>

    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.titulo}>
        <FontAwesome name="shopping-cart" size={24} color="rgb(33 150 243)" />
        <Text> Lista de Compras</Text>
      </Text>

      <InputItem onAdd={adicionarItem} />

      {list.length > 0 && (
        <View style={{ marginBottom: 10, flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#4CAF50",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
            }}
            onPress={() => setSaveModalVisible(true)}
          >
            <MaterialCommunityIcons name="content-save" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#f44336",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
            }}
            onPress={removerTudo}
          >
            <MaterialCommunityIcons name="broom" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Esvaziar ({list.length} itens)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {list.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="shopping-basket" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Sua lista está vazia</Text>
          <Text style={styles.emptySubText}>
            Adicione itens para começar suas compras!
          </Text>
        </View>
      ) : (
        <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={[
            styles.item,
            item.purchased ? styles.itemComprado : styles.itemPendente,
          ]}
          onPress={() => toggleItem(item.id)}
          onLongPress={() => removerItem(item.id)}
          >
              <View style={styles.textoItem}>
                <View style={{ flexDirection: "row" }}>
                  {/* check */}
                  {/* <TouchableOpacity onPress={() => toggleItem(item.id)} >
                    {item.purchased ? (
                      <FontAwesome
                      name="check-square"
                      size={20}
                      color={"green"}
                      />
                    ) : (
                      <FontAwesome name="square-o" size={20} color={"black"} />
                    )}
                  </TouchableOpacity> */}

                  {/* editar */}
                  <TouchableOpacity
                    style={{ marginLeft: 30 }}
                    onPress={() => iniciarEdicao(item.id, item.name)}
                    >
                    <FontAwesome name="edit" size={22} color={"#0066cc"} />
                  </TouchableOpacity>

                  {/* remover */}
                  <TouchableOpacity
                    style={{ marginLeft: 30 }}
                    onPress={() => removerItem(item.id)}
                    >
                    <FontAwesome name="trash" size={22} color={"#cf0000"} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemText}> {item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
        )}

      <ConfirmModal
        visible={modalVisible}
        message={deleteMode === "single" ? "Tem certeza que deseja deletar este item?" : "Tem certeza que deseja apagar toda a lista?"}
        onCancel={() => setModalVisible(false)}
        onConfirm={confirmarRemocao}
        />

      <EditModal
        visible={editModalVisible}
        value={editingText}
        onChangeText={setEditingText}
        onConfirm={salvarEdicao}
        onCancel={cancelarEdicao}
        />

      <SaveListModal
        visible={saveModalVisible}
        onSave={handleSaveList}
        onCancel={() => setSaveModalVisible(false)}
        />
    </View>
  </SafeAreaView>
  );
}
