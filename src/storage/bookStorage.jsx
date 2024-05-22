export const loadBooksFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('books');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Could not load books from local storage", e);
      return [];
    }
  };
  
  export const saveBooksToLocalStorage = (books) => {
    try {
      const serializedState = JSON.stringify(books);
      localStorage.setItem('books', serializedState);
    } catch (e) {
      console.error("Could not save books to local storage", e);
    }
  };