import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 10,
    textAlign: "center",
  },

  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },

  botaoAdicionar: {
    marginLeft: 10,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },

  textoBotao: { color: "#fff", fontWeight: "bold" },

  item: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  itemPendente: { backgroundColor: "#f8d7da" },

  itemComprado: { backgroundColor: "#d4edda" },

  textoItem: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    fontSize: 16,
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
});
