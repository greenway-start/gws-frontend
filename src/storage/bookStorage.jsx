
export const loadBooksFromLocalStorage = () => {
  try {
      const serializedState = localStorage.getItem('books');
      return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (e) {
      console.warn('Error loading books from local storage', e);
      return [];
  }
};

export const saveBooksToLocalStorage = (books) => {
  try {
      const serializedState = JSON.stringify(books);
      localStorage.setItem('books', serializedState);
  } catch (e) {
      console.warn('Error saving books to local storage', e);
  }
};
