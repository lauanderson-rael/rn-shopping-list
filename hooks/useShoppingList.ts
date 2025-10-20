import { Item } from "@/types/item";
import { getData, saveData } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function useShoppingList() {
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getData();
      setList(data);
    }
    loadData();
  }, []);

  async function addItem(name: string) {
    if (name.trim() === "") return;
    const newItem: Item = {
      id: String(Date.now()),
      name: name,
      purchased: false,
    };
    const newList = [...list, newItem];
    setList(newList);
    await saveData(newList);
  }

  async function toggleItem(id: string) {
    const novaLista = list.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setList(novaLista);
    await saveData(novaLista);
  }

  async function removeItem(id: string) {
    const novaLista = list.filter((item) => item.id !== id);
    setList(novaLista);
    await saveData(novaLista);
  }

  async function editItem(id: string, newName: string) {
    if (newName.trim() === "") return;
    const novaLista = list.map((item) =>
      item.id === id ? { ...item, name: newName.trim() } : item
    );
    setList(novaLista);
    await saveData(novaLista);
  }

  return {
    list,
    addItem,
    toggleItem,
    removeItem,
    editItem,
  };
}
