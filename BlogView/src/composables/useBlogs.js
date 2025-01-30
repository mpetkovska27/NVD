import { createClient } from "contentful";
import { useListActions } from "./useListActions";
import { ref, onBeforeMount } from "vue";

// Create Contentful client
const client = createClient({
 space: "hpr0uushokd4",
 accessToken: "jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U",
});

export const useBlogs = () => {
 const blogs = ref([]);
 const loading = ref(false);
 const error = ref(null);
 const { addItem, deleteItem } = useListActions(blogs);


 const fetchBlogs = async (skip = 0, limit = 10) => {
   loading.value = true;
   error.value = null;

   try {
     const { items } = await client.getEntries({
       content_type: "blogPost",
       order: "-fields.publishDate",
       skip,
       limit,
     });

     blogs.value = items.map(({ fields }) => ({
       ...fields,
       id: fields.slug,
     }));
   } catch (err) {
     error.value = 'Failed to fetch blogs';
   } finally {
     loading.value = false;
   }
 };


 fetchBlogs();

 return {
   blogs,
   loading,
   error,
   addItem,
   deleteItem,
 };
};