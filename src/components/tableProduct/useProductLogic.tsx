import { Product } from "@/types/product";
import { useState } from "react";

export function useProductLogic() {
  const [products, setProducts] = useState<Product[]>([
    {
      name: "",
      description: "",
      categories: [{ name: "", image: null, preview: null }],
    },
  ]);
  const [confirmProductIndex, setConfirmProductIndex] = useState<number | null>(
    null
  );
  const [confirmCategoryIndex, setConfirmCategoryIndex] = useState<{
    productIndex: number;
    categoryIndex: number;
  } | null>(null);

  const maxCategories = 3;
  const maxProducts = 5;

  const addProduct = () => {
    if (products.length < maxProducts) {
      setProducts([
        ...products,
        {
          name: "",
          description: "",
          categories: [{ name: "", image: null, preview: null }],
        },
      ]);
    }
  };

  const removeProduct = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
    setConfirmProductIndex(null);
  };

  const addCategory = (productIndex: number) => {
    const updated = [...products];
    if (updated[productIndex].categories.length < maxCategories) {
      updated[productIndex].categories.push({
        name: "",
        image: null,
        preview: null,
      });
      setProducts(updated);
    }
  };

  const removeCategory = (productIndex: number, categoryIndex: number) => {
    const updated = [...products];
    updated[productIndex].categories.splice(categoryIndex, 1);
    setProducts(updated);
  };

  const handleChange = (
    index: number,
    field: "name" | "description",
    value: string
  ) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleCategoryChange = (
    productIndex: number,
    categoryIndex: number,
    value: string
  ) => {
    const updated = [...products];
    updated[productIndex].categories[categoryIndex].name = value;
    setProducts(updated);
  };

  const handleImage = (
    productIndex: number,
    categoryIndex: number,
    file: File
  ) => {
    const updated = [...products];
    updated[productIndex].categories[categoryIndex].image = file;
    updated[productIndex].categories[categoryIndex].preview =
      URL.createObjectURL(file);
    setProducts(updated);
  };

  const handleRemoveImage = () => {
    if (confirmCategoryIndex === null) return;
    const updated = [...products];
    const { productIndex, categoryIndex } = confirmCategoryIndex;
    updated[productIndex].categories[categoryIndex].image = null;
    updated[productIndex].categories[categoryIndex].preview = null;
    setProducts(updated);
    setConfirmCategoryIndex(null);
  };

  return {
    products,
    addProduct,
    removeProduct,
    addCategory,
    removeCategory,
    handleChange,
    handleCategoryChange,
    handleImage,
    handleRemoveImage,
    confirmProductIndex,
    setConfirmProductIndex,
    confirmCategoryIndex,
    setConfirmCategoryIndex,
    maxCategories,
    maxProducts,
  };
}
