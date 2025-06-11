import http from "../utils/http";

export const getAllProduct = async () => {
  const response = await http.get("admin/products");

  return response;
};

export const deleteProductById = async (productId) => {
  const response = await http.delete(`admin/products/${productId}`);

  return response;
};
