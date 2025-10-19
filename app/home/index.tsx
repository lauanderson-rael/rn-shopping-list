import { Item } from "@/hooks/ useShoppingList";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

export default function Home() {
  const [item, setItem] = useState("");
  const [lista, setLista] = useState<Item[]>([]);

  useEffect(() => {
    carregarLista();
  }, []);

  // Salvar sempre que a lista mudar
  useEffect(() => {
    salvarLista(lista);
  }, [lista]);

  const salvarLista = async (dados: Item[]) => {
    try {
      await AsyncStorage.setItem("@listaCompras", JSON.stringify(dados));
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  };

  const carregarLista = async () => {
    try {
      const dados = await AsyncStorage.getItem("@listaCompras");
      if (dados) {
        setLista(JSON.parse(dados));
      }
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  };

  const adicionarItem = () => {
    if (item.trim() === "") return;
    const novoItem: Item = {
      id: String(Date.now()),
      name: item,
      purchased: false,
    };
    setLista([...lista, novoItem]);
    setItem("");
  };

  const alternarComprado = (id: string) => {
    const novaLista = lista.map((i) =>
      i.id === id ? { ...i, purchased: !i.purchased } : i
    );
    setLista(novaLista);
  };

  const removerItem = (id: string) => {
    const novaLista = lista.filter((i) => i.id !== id);
    setLista(novaLista);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        <FontAwesome name="shopping-cart" size={24} color="rgb(33 150 243)" />
        <Text> Lista de Compras</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite um item..."
          value={item}
          onChangeText={setItem}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarItem}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              item.purchased ? styles.itemComprado : styles.itemPendente,
            ]}
            onPress={() => alternarComprado(item.id)}
            onLongPress={() => removerItem(item.id)}
          >
            <View style={styles.textoItem}>
              {item.purchased ? (
                <FontAwesome name="check-square" size={20} color={"green"} />
              ) : (
                <FontAwesome name="square-o" size={20} color={"black"} />
              )}

              <Text> {item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
