import { Item } from "@/types";
import { getData, saveData } from "@/utils/storage";
import { randomUUID } from "crypto";
import { useEffect, useState } from "react";

export default function useShoppingList() {
  const [lista, setLista] = useState<Item[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getData();
      setLista(data);
    }
    loadData();
  }, []);

  async function addItem(name: string) {
    if (name.trim() === "") return;
    const newItem: Item = {
      id: randomUUID(),
      name: name,
      purchased: false,
    };
    const newList = [...lista, newItem];
    setLista(newList);
    await saveData(newList);
  }

  async function toggleItem(id: string) {
    const novaLista = lista.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setLista(novaLista);
    await saveData(novaLista);
  }

  async function removeItem(id: string) {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
    await saveData(novaLista);
  }

  return {
    lista,
    addItem,
    toggleItem,
    removeItem,
  };
}
