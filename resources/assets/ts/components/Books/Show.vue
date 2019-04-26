<template>
  <div>
    <p>Title：{{book.title}}</p>
    <p>内容：{{book.description}}</p>
    <router-link :to="'/books'">一覧へ2</router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchBook();
  },
  data() {
    return {
      book: []
    };
  },
  methods: {
    fetchBook() {
      this.$http.get("/api/books/" + this.$route.params.id).then(res => {
        console.log(this.$route.params.id);
        this.book = res.data;
      });
    }
  }
};
</script>