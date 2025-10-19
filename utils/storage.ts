import { Item } from "@/types/item";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@lista_compras";

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
