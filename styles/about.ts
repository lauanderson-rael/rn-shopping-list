import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  botao: {
    marginTop: 30,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  creditos: {
    marginTop: 40,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  lista: {
    marginLeft: 10,
  },
  itemLista: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
});
