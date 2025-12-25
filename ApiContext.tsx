import React, { createContext, useState } from "react";
import { showToast } from "../utils/toast";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const pageSize = 5; // Simulate pagination

 const fetchProducts = async (refresh = false) => {
  try {
    setRefreshing(true);

    const [electronicsRes, jeweleryRes] = await Promise.all([
      fetch("https://fakestoreapi.com/products/category/electronics"),
      fetch("https://fakestoreapi.com/products/category/jewelery"),
    ]);

    const electronics = await electronicsRes.json();
    const jewelery = await jeweleryRes.json();

    setProducts([...electronics, ...jewelery]);
  } catch (err) {
    console.log(err);
  } finally {
    setRefreshing(false);
  }
};


  return (
    <ApiContext.Provider
      value={{ products, fetchProducts, refreshing, setRefreshing }}
    >
      {children}
    </ApiContext.Provider>
  );
};
