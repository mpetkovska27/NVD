<template>
    <div>
        <button v-if="!showEditor" @click="showEditor = true">Add New Blog</button>        
        <BlogEditor  v-if="showEditor"  @addNewItem="handleAddBlog"  @close="showEditor = false"/>
      
        <Blogs :blogs="blogs" :is-loading="isLoading ?? false" :error="error ?? ''" @deleteBlog="handleDeleteBlog"/>
    </div> 
</template>


<script setup>
import { ref } from 'vue';
import BlogEditor from './BlogEditor.vue';
import Blogs from './Blogs.vue';
import { useBlogs } from '../composables/useBlogs';


const { blogs, isLoading, error, addItem, deleteItem } = useBlogs();
const showEditor = ref(false);

const generateRandomId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
const getCurrentDate = () => new Date().toISOString();

const handleAddBlog = (newBlog) => {
    if (!newBlog.id) {
    newBlog.id = generateRandomId();
  }
  newBlog.createdAt = getCurrentDate();
  addItem(newBlog);
  showEditor.value = false;
  console.log(newBlog.id);
  console.log(newBlog.createdAt);
};

const handleDeleteBlog = (id) => {
  deleteItem(id);
  console.log("Delete blog with id: ", id);
};
</script>

<style scoped>
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
</style>