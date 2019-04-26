<template>
<main role="main">
  <div class="jumbotron">
    <div class="container">
    </div>
  </div>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card" style="width: 20rem;">
            <img class="card-img-top" src="../../images/flex.jpg" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-title">フレキシブル三脚</h4>
              <p class="card-text">フレキシブル三脚、スマホホルダー、BlueToothシャッターリモコン、自由雲台の4点セット。自撮り、集合写真、風景写真など様々なシチュエーションで活躍できます。</p>
              <a href="https://www.amazon.co.jp/dp/B07K51JLHM?ref=myi_title_dp" target="_blank" class="btn btn-primary">商品ページに移動</a>
            </div>
          </div>
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
  background-image: url("../../images/Macchina.jpg");
  background-size: contain;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
}

h1 {
  font-family: 'Noto Sans JP', sans-serif;
}
p {
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