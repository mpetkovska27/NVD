export function useListActions(items) {

  const addItem = (item) => {
    items.value.push(item);
  };

  const deleteItem = (id) => {
    items.value = items.value.filter(item=> item.id !== id);
  };

  return {
    addItem,
    deleteItem,
  };
}