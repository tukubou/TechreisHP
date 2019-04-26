<template>
<main role="main">
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">TECHREIS</h1>
      <p>Life is journey.</p>
    </div>
  </div>
  <div class="container marketing">
    <div class="row">
      <div class="col-lg-3">
        <img class="rounded-circle" src="../../images/icon-techreis.png" alt="Generic placeholder image" width="140" height="140">
        <h2>Profile</h2>
        <p>自己紹介です。</p>
        <router-link class="btn btn-secondary" to="/profile">View details »</router-link>
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-3">
        <img class="rounded-circle" src="../../images/octocat.png" alt="Generic placeholder image" width="140" height="140">
        <h2>趣味の作品</h2>
        <p>趣味です。</p>
        <router-link class="btn btn-secondary" to="/hobbies">View details »</router-link>
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-3">
        <img class="rounded-circle" src="../../images/icon-aerialeye.png" alt="Generic placeholder image" width="140" height="140">
        <h2>Drone</h2>
        <p>Droneを使った思い出空撮サービスをやっています。</p>
        <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-3">
        <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
        <h2>O.D.M</h2>
        <p>Original Design Manufacturingです</p>
        <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
      </div><!-- /.col-lg-4 -->
    </div><!-- /.row -->
  </div><!-- /.container -->
</main>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import axios from 'axios';
    @Component
    export default class HomeComponent extends Vue {
      mounted(): void {
        this.$store.state.curPage = 'home'
        //APIからAjaxでデータを取得するサンプル
        axios.get('/api/articles').then(response => { console.log(response); });
      }
    }
</script>

<style>
.jumbotron {
  background-image: url("../../images/homeimage-techreis.png");
  background-size: cover;
  background-position: center 60%;
}

.topImage {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>