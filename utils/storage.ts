import { Item, SavedList } from "@/types/item";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@lista_compras";
const SAVED_LISTS_KEY = "@listas_salvas";

export async function saveData(list: Item[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (error) {
    console.log(error);
  }
}

export async function getData() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function saveListToStorage(list: SavedList) {
  try {
    const savedLists = await getSavedLists();
    const updatedLists = [...savedLists, list];
    await AsyncStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(updatedLists));
  } catch (error) {
    console.log(error);
  }
}

export async function getSavedLists(): Promise<SavedList[]> {
  try {
    const data = await AsyncStorage.getItem(SAVED_LISTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteSavedList(id: string) {
  try {
    const savedLists = await getSavedLists();
    const updatedLists = savedLists.filter((list) => list.id !== id);
    await AsyncStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(updatedLists));
  } catch (error) {
    console.log(error);
  }
}
