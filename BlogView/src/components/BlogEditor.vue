<template>
    <div>
        <h2 class="text-xl font-bold">Create a New Blog</h2>
        <div class="field">
            <label for="title">Title</label>
            <input
        v-model="title"
        type="text"
        id="title"
        class="input"
      />
        </div>

        <div class="field">
            <label for="slug">Blog id</label>
            <input
        v-model="id"
        type="text"
        id="id"
        class="input"
      />
        </div>

        <div class="field">
            <label for="author">Author</label>
            <input
        v-model="author"
        type="text"
        id="author"
        class="input"
      />
        </div>

        <div class="field">
            <label for="content">Content</label>
            <textarea
        v-model="content"
        id="content"
        rows="4"
        class="input"
      ></textarea>
        </div>

        <div class="button-container">
            <button @click="saveBlog">Save</button>
        </div>
    </div>
</template>



<script >

export default {
  data() {
    return {
      title: '',
      author: '',
      id: '',
      content: '',
    };
  },
  methods: {
    saveBlog(){
      this.$emit('addNewItem', {
        title: this.title,
        author: this.author,
        id: this.id,
        content: this.content,
      });

      this.title = '';
      this.author = '';
      this.id = '';
      this.content = '';
    },
    
  },
};
</script>

<style scoped>

.field {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
label{
  margin-bottom: 1rem;
  margin-top: 1rem;
  text-align: right;
  width: 300px;   
}
input,textarea {
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  padding: 0.5rem;
  margin-left: 10px;
  font-size: 1rem;
  width: auto; 
} 
.button-container {
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

</style>