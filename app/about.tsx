import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/about";

export default function Sobre() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
          <FontAwesome name="info-circle" size={24} color="rgb(33 150 243)" />
          <Text>  Sobre o Aplicativo</Text>
        </Text>

        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido com o objetivo de facilitar o
          controle de compras do usuário no dia a dia. Ele permite adicionar
          itens, marcar como comprados, remover e salvar automaticamente no
          dispositivo, garantindo praticidade e organização.
        </Text>

        {/* <Text style={styles.subtitulo}></Text> */}
        <Text></Text>
        <Text style={styles.texto}>Versão: 1.0.1</Text>

        <Text style={styles.texto}> 
          Desenvolvidedor:{" "}
          <Text
            style={{ color: "#2196F3", textDecorationLine: "underline" }}
            onPress={() => {
              Linking.openURL("https://github.com/lauanderson-rael");
            }}
          >
            Lauanderson Rael
          </Text>
        </Text>
      </ScrollView>
    </View>
  </SafeAreaView>
  );
}
