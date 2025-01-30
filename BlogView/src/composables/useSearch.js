import { ref, computed } from 'vue';

export function useSearch(items) {
  const searchTerm = ref('');
  const filters = ref(['title'])

  const filteredItems = computed(() => {
    if (!searchTerm.value) return items.value;

    return items.value.filter(item =>
      filters.value.some(filter =>
        String(item[filter] || '')
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase())
      )
    );
  });

  return {
    searchTerm,
    filteredItems,
    filters,
  }
}