import apiClient from "./apiClient";

export async function getAllComments({ page, limit, filter, sortBy, query }) {
  const res = await apiClient.get(`/comments/all`, {
    params: { page, limit, filter, sortBy, query },
  });

  return res.data;
}

export async function getCommentsByProduct(
  productId,
  { page, limit, filter, sortBy, query }
) {
  const res = await apiClient.get(`/comments/product/${productId}`, {
    params: { page, limit, filter, sortBy, query },
  });

  return res.data;
}

export async function getCommentsByUser(
  userId,
  { page, limit, filter, sortBy, query }
) {
  const res = await apiClient.get(`/comments/user/${userId}`, {
    params: { page, limit, filter, sortBy, query },
  });

  return res.data;
}

export async function makeComment({
  userId,
  productId,
  rating,
  commentText,
  photos,
}) {
  const res = await apiClient.post(`/comments`, {
    userId,
    productId,
    rating,
    commentText,
    photos,
  });

  return res.data;
}

export async function deleteComment(commentId) {
  const res = await apiClient.delete(`/comments/${commentId}`);
  return res.data;
}

export async function updateComment(
  commentId,
  { rating, commentText, photos }
) {
  const res = await apiClient.put(`/comments/${commentId}`, {
    rating,
    commentText,
    photos,
  });
  return res.data;
}
