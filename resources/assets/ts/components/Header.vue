<template>
  <nav class="site-header navbar navbar-expand-lg navbar-dark bg-dark py-1 sticky-top">
    <!-- ロゴ -->
    <router-link class="py-2" to="/home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="d-block mx-auto"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
        <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
        <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
        <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
        <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
        <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
      </svg>
    </router-link> <!-- END OF ブランドロゴ -->
    <button 
      type="button"
      class="navbar-toggler"
      data-toggle="collapse"
      data-target="#Navber"
      aria-controls="Navber"
      aria-expanded="false"
      aria-label="ナビゲーションの切替">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="Navber">
      <ul class="navbar-nav mr-auto">
        <!-- HOME -->
        <li class="nav-item active">
          <router-link to="/home" class="nav-link">ホーム</router-link>
        </li>
        <!-- Profile -->
        <li class="nav-item">
          <router-link to="/home" class="nav-link">プロフィール</router-link>
        </li>
        <!-- 趣味 -->
        <li class="nav-item">
          <router-link to="/hobbies" class="nav-link">趣味</router-link>
        </li>
        <!-- ドローン -->
        <li class="nav-item">
          <router-link to="/drone" class="nav-link">ドローン</router-link>
        </li>
        <!-- O.D.M -->
        <li class="nav-item">
          <router-link to="/odm" class="nav-link">O.D.M</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link">お問い合わせ</router-link>
        </li>
        <!-- Fireflyの時だけ -->
        <li v-if="getPageName == 'firefly' || getPageName == 'fireflySettings'" class="nav-item">
          <a class="nav-link" @click="showFireflyModal">ホタルの設定</a>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </nav>
</template>

<script lang="ts">
    import {Vue, Watch, Component} from 'vue-property-decorator'
    @Component
    export default class HeaderComponent extends Vue {
        public data: string = "";
        mounted(): void {}
        get getPageName(): string {
          return this.$store.state.curPage;
        }
        showFireflyModal(): void {
          this.$store.state.isShowModal = true;
        }
    }
</script>

<style scoped>
/* CSS を記述する */
</style>