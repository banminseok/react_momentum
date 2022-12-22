import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDoLocal",
  storage: localStorage,
});

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }
export interface ICategories {
  text: string;
  id: number;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});
export const categoryListState = atom<ICategories[]>({
  key: "categories",
  default: [{ text: "TO_DO", id: 90001 }, { text: "DOING", id: 90002 }, { text: "DONE", id: 90003 }],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});