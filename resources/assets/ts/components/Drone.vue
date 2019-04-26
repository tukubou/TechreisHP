<template>
<main role="main">
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">DRONE ~ AERIALEYE</h1>
      <p style="color:white">どろーんとかやってます</p>
    </div>
  </div>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p class="lead text-muted">
            ドローンでの思い出撮影サービス（開発中）やってます。
          </p>
          <p>
            <a href="#" class="btn btn-primary">移動</a>
          </p>
        </div>
      </div>
    </div>
      </div>
</main>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    @Component
    export default class HobbiesComponent extends Vue {
        mounted(): void {}
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');
.jumbotron {
  background-image: url("../../images/drone.jpg");
  background-size: cover;
  background-position: center 65%;
}

h1 {
  font-family: 'Noto Sans JP', sans-serif;
  color: white;
}
p {
    font-family: 'Noto Sans JP', sans-serif;
}

li {
    font-family: 'Noto Sans JP', sans-serif;
}

.video-wrap {
  width:100%;
  position: relative;
}
.topImage {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>