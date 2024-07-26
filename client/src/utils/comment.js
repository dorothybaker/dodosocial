import { useQuery } from "@tanstack/react-query";
import { API } from "./axios";

export const commentNumber = (postId) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      API.get(`/comments?postId=${postId}`).then((res) => res.data),
  });

  return { data };
};
