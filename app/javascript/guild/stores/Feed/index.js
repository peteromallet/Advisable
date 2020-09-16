import create from "zustand";

const initialState = {
  selectedFilter: "For You",
  selectedTopics: [],
};

export const feedStore = create((set, get) => ({
  ...initialState,
  selectedTopicsIds: () => get().selectedTopics.map(({ id }) => id),
  updateSelectedTopics: (topic) =>
    set(({ selectedTopics: prev }) =>
      prev.includes(topic)
        ? prev.splice(prev.indexOf(topic), 1) // zustand requires a destructive mutation
        : prev.push(topic),
    ),
  resetTopics: () => set(() => ({ selectedTopics: [] })),
  resetFilters: () =>
    set(() => ({ selectedTopics: [], selectedFilter: "For You" })),
  clear: () => set({}, true),
}));
