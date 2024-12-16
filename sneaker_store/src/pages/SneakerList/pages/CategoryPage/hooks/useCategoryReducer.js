import { useReducer, useCallback } from "react";
import { CategoryService } from "../service/CategoryService";
import categoryReducer, { initialState } from "../reducer/CategoryReducer";;

const categoryService = new CategoryService();

export const useCategoryReducer = () => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchCategories = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await categoryService.getAllCategories();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  const addCategory = useCallback(
    async (name) => {
      try {
        const newCategory = await categoryService.createCategory({ name });
        dispatch({ type: "ADD_CATEGORY", payload: newCategory });
        return true;
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
        return false;
      }
    },
    [categoryService]
  );

  const updateCategory = useCallback(async (id, name) => {
    try {
      await categoryService.updateCategory({ id, name });
      dispatch({ type: "UPDATE_CATEGORY", payload: { id, name } });
      return true;
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
      return false;
    }
  }, []);

  const removeCategory = useCallback(async (id) => {
    try {
      await categoryService.deleteCategory(id);
      dispatch({ type: "REMOVE_CATEGORY", payload: id });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  return { state, fetchCategories, addCategory, updateCategory, removeCategory };
};