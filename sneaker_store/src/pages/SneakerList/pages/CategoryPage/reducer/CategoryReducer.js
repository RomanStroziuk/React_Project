const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...state, loading: true, error: null };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, categories: action.payload };
      case "FETCH_ERROR":
        return { ...state, loading: false, error: action.payload };
      case "ADD_CATEGORY":
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      case "UPDATE_CATEGORY":
        return {
          ...state,
          categories: state.categories.map((category) =>
            category.id === action.payload.id
              ? { ...category, name: action.payload.name }
              : category
          ),
        };
      case "REMOVE_CATEGORY":
        return {
          ...state,
          categories: state.categories.filter((category) => category.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  export { initialState };