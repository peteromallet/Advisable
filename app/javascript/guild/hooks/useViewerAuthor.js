import useViewer from "@advisable-main/hooks/useViewer";

export default function useViewerAuthor(post) {
  const viewer = useViewer();
  const isAuthor = viewer?.id === post?.author?.id;
  const authorHasReactions = isAuthor && !!post?.reactionsCount;
  const popularOrAuthorReactions = post?.isPopular || authorHasReactions;

  return { viewer, isAuthor, popularOrAuthorReactions };
}
