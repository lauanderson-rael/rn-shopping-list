import React from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles/about";

export default function Sobre() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Sobre o Aplicativo</Text>

        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido com o objetivo de facilitar o
          controle de compras do usuário no dia a dia. Ele permite adicionar
          itens, marcar como comprados, remover e salvar automaticamente no
          dispositivo, garantindo praticidade e organização.
        </Text>

        <Text style={styles.subtitulo}>Objetivos do Projeto</Text>
        <View style={styles.lista}>
          <Text style={styles.itemLista}>
            • Aplicar conceitos fundamentais do React Native
          </Text>
          <Text style={styles.itemLista}>
            • Demonstrar uso de componentes visuais (View, Text,
            TouchableOpacity)
          </Text>
          <Text style={styles.itemLista}>
            • Utilizar AsyncStorage para persistência de dados
          </Text>
          <Text style={styles.itemLista}>
            • Proporcionar uma interface simples, funcional e intuitiva
          </Text>
        </View>

        <Text style={styles.subtitulo}>Tecnologias Utilizadas</Text>
        <View style={styles.lista}>
          <Text style={styles.itemLista}>• React Native (com Expo)</Text>
          <Text style={styles.itemLista}>• TypeScript</Text>
          <Text style={styles.itemLista}>
            • AsyncStorage para armazenamento
          </Text>
          <Text style={styles.itemLista}>• Estilização com StyleSheet</Text>
          <Text style={styles.itemLista}>
            • Expo Router para navegação entre telas
          </Text>
        </View>

        <Text style={styles.subtitulo}>Versão do App</Text>
        <Text style={styles.texto}>Versão 1.0.1</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            Linking.openURL(
              "https://github.com/lauanderson-rael/rn-shopping-list"
            )
          }
        >
          <Text style={styles.textoBotao}>Acessar Repositório no GitHub</Text>
        </TouchableOpacity>

        <Text style={styles.creditos}>
          Desenvolvido por:{" "}
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
  );
}
