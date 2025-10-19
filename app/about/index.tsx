import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./style";
export default function Sobre() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Sobre o Aplicativo</Text>

        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido com o objetivo de facilitar o
          controle de compras do usuário no dia a dia. Ele permite adicionar
          itens, marcar como comprados, remover e salvar automaticamente no
          dispositivo, garantindo praticidade e organização.
        </Text>

        <Text style={styles.subtitulo}>Objetivos do Projeto</Text>
        <Text style={styles.texto}>
          Aplicar conceitos fundamentais do React Native{"\n"}
          Demonstrar uso de componentes visuais (View, Text, TouchableOpacity)
          {"\n"}
          Utilizar AsyncStorage para persistência de dados{"\n"}
          Proporcionar uma interface simples, funcional e intuitiva
        </Text>

        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido com o objetivo de facilitar o
          controle de compras do usuário no dia a dia. Ele permite adicionar
          itens, marcar como comprados, remover e salvar automaticamente no
          dispositivo, garantindo praticidade e organização.
        </Text>

        <Text style={styles.subtitulo}>Objetivos do Projeto</Text>
        <Text style={styles.texto}>
          Aplicar conceitos fundamentais do React Native{"\n"}
          Demonstrar uso de componentes visuais (View, Text, TouchableOpacity)
          {"\n"}
          Utilizar AsyncStorage para persistência de dados{"\n"}
          Proporcionar uma interface simples, funcional e intuitiva
        </Text>

        <Text style={styles.subtitulo}>Tecnologias Utilizadas</Text>
        <Text style={styles.texto}>
          • React Native (com Expo){"\n"}• TypeScript{"\n"}• AsyncStorage para
          armazenamento{"\n"}• Estilização com StyleSheet{"\n"}• Expo Router
          para navegação entre telas
        </Text>

        <Text style={styles.subtitulo}>Versão do App</Text>
        <Text style={styles.texto}>Versão 1.0.0</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => Linking.openURL("https://github.com/seuRepositorio")}
        >
          <Text style={styles.textoBotao}>Acessar Repositório no GitHub</Text>
        </TouchableOpacity>

        <Text style={styles.creditos}>Desenvolvido por: Lauanderson Rael</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
