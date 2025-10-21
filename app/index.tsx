import { ConfirmModal } from "@/components/ConfirmModal";
import { EditModal } from "@/components/EditModal";
import { InputItem } from "@/components/InputItem";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useShoppingList from "../hooks/useShoppingList";
import { styles } from "../styles/home";

export default function Home() {
  // estados
  const [editingText, setEditingText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);

  // hooks
  const { list, addItem, toggleItem, removeItem, editItem } = useShoppingList();

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
    setModalVisible(true);
  };

  const confirmarRemocao = async () => {
    if (itemToDelete) {
      await removeItem(itemToDelete);
      setItemToDelete(null);
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.titulo}>
        <FontAwesome name="shopping-cart" size={24} color="rgb(33 150 243)" />
        <Text> Lista de Compras</Text>
      </Text>

      <InputItem onAdd={adicionarItem} />

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
                  <TouchableOpacity onPress={() => toggleItem(item.id)}>
                    {item.purchased ? (
                      <FontAwesome
                        name="check-square"
                        size={20}
                        color={"green"}
                      />
                    ) : (
                      <FontAwesome name="square-o" size={20} color={"black"} />
                    )}
                  </TouchableOpacity>

                  {/* editar */}
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => iniciarEdicao(item.id, item.name)}
                  >
                    <FontAwesome name="edit" size={20} color={"#0066cc"} />
                  </TouchableOpacity>

                  {/* remover */}
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => removerItem(item.id)}
                  >
                    <FontAwesome name="trash" size={20} color={"#cf0000"} />
                  </TouchableOpacity>
                </View>

                <Text style={{ flexShrink: 1 }}> {item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <ConfirmModal
        visible={modalVisible}
        message="Tem certeza que deseja deletar este item?"
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
    </View>
  );
}
