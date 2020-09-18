import create from "zustand";

export const feedStore = create(() => ({
  selectedFilter: "For You",
  selectedTopics: [],
}));
