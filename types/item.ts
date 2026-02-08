export interface Item {
  id: string;
  name: string;
  purchased: boolean;
}

export interface SavedList {
  id: string;
  name: string;
  date: string;
  items: Item[];
}
