import React, { createContext, useContext, useEffect, useState } from "react";
import { Item, SavedList } from "../types/item";
import { getData, saveData, saveListToStorage } from "../utils/storage";

interface ShoppingListContextType {
  list: Item[];
  addItem: (name: string) => Promise<void>;
  toggleItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  editItem: (id: string, newName: string) => Promise<void>;
  removeAll: () => Promise<void>;
  saveCurrentList: (name: string) => Promise<void>;
  loadSavedList: (items: Item[], mode: "overwrite" | "append") => Promise<void>;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
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

  async function removeAll() {
    setList([]);
    await saveData([]);
  }

  async function saveCurrentList(name: string) {
    const savedList: SavedList = {
      id: String(Date.now()),
      name: name,
      date: new Date().toISOString(),
      items: [...list],
    };
    await saveListToStorage(savedList);
  }

  async function loadSavedList(items: Item[], mode: "overwrite" | "append") {
    if (mode === "overwrite") {
      setList(items);
      await saveData(items);
    } else {
      // Append mode: add items with new IDs to avoid conflicts
      const newItems = items.map((item) => ({
        ...item,
        id: String(Date.now() + Math.random()),
      }));
      const updatedList = [...list, ...newItems];
      setList(updatedList);
      await saveData(updatedList);
    }
  }

  return (
    <ShoppingListContext.Provider
      value={{
        list,
        addItem,
        toggleItem,
        removeItem,
        editItem,
        removeAll,
        saveCurrentList,
        loadSavedList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export default function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }
  return context;
}
