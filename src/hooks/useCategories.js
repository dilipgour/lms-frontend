import axios from "axios";
import { useState, useEffect } from "react";

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
      setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  return { isLoading, categories };
};
