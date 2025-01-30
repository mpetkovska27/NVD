<template>
  <div>
    <h1>Blogs</h1>

    <div v-if="isLoading">Loading...</div>
    
    <div v-else-if="error">{{ "Error!" }}</div>
    
    <section v-else>
      <!-- Search input -->
      <div class="search">
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="searchTerm" />
      </div>

      <!-- Filter by title or content -->
      <fieldset class="filter_container">
        <div>Filter by: </div>
        <input
          type="checkbox"
          id="title"
          value="title"
          v-model="filters"
        />        
        <label for="title">By Title</label>
        <input
          type="checkbox"
          id="description"
          value="description"
          v-model="filters"
        />        
        <label for="description">By Content</label>
      </fieldset>

      <!-- List of articles -->
      <div class="articles-list">
        <template v-for="(blog, i) in filteredBlogs" :key="i">
          <div class="article-item">
            <div class="article-item-info">
              <img
              v-if="blog.heroImage"
              class="thumbnail"
              :src="`${blog.heroImage.fields.file.url}?fit=scale&w=350&h=196`"
              />
              <div class="article-text">
              <div class="date">
                {{ new Date(blog.createdAt).toDateString() }}
              </div>
              <h4>{{ blog.title }}</h4>
              <p>{{ blog.description }}</p>            
              </div>
            </div>
            <div class="delete-button-container">
              <button @click="deleteBlog(blog.id)" >Remove</button>          
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>


<script setup>

import { defineProps, defineEmits, ref, watch } from "vue";
import { useSearch } from "../composables/useSearch";

const props = defineProps({
  blogs: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["deleteBlog"]);
const deleteBlog = (id) => {
  emits("deleteBlog", id);
};
const blogs = ref(props.blogs);

watch(
  () => props.blogs,
  (newBlogs) => {
    blogs.value = newBlogs;
  }
);

const {
  searchTerm,
  filters,
  filteredItems: filteredBlogs,
} = useSearch(blogs);
</script>


<style scoped>

.articles-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-block: 20px;
    width: 100%;
  }
  .article-item {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-bottom: 15px;
    border: 1px solid gray;
    width: 100%;
  }
  .article-item-info {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 15px;
  }

.delete-button-container {
  display: flex;
  justify-content: center; 
}
button {
  background-color: #e0e0e0;
  color: black;
  border: 1px solid;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
button:hover {
  background-color:  #b0b0b0;;
  font-weight: bold;
}

#search {
  margin-left: 10px;
}


.article-text {
  padding: 15px 0;
}

.thumbnail {
  margin-right: 30px;
}

.date {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

fieldset {
    display: flex;
    gap: 10px;
    margin-block: 20px;
}
</style>