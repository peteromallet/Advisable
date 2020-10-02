import create from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  selectedFilter: "For You",
  selectedTopics: [],
};

/* 
  Light state management store for posts feed filters.
*/
export const feedStore = create(
  devtools((set, get) => ({
    ...initialState,
    selectedTopicsIds: () => get().selectedTopics.map(({ id }) => id),
    updateSelectedTopics: (topic) =>
      set(({ selectedTopics: prev }) =>
        prev.includes(topic)
          ? prev.splice(prev.indexOf(topic), 1)
          : prev.push(topic),
      ),
    resetTopics: () => set(() => ({ selectedTopics: [] })),
    resetFilters: () => set(() => ({ ...initialState, selectedTopics: [] })),
    clear: () => set({}, true),
  })),
);
