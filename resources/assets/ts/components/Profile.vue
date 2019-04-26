<template>
<main role="main">
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">PROFILE</h1>
      <p>とあるエンジニアの個人的なページです。</p>
    </div>
  </div>
  <div class="container">
    <!-- TOP LEVEL -->
    <h2>自己紹介</h2>
    <div class="row">
      <div class="col-12 col-lg-12">
        <p class="lead">
          プロフィール閲覧いただきありがとうございます！(｀・ω・´)> <br/>
          フリーランスエンジニアとして活動しているゆうたと申します！<br/>
          さまざまな企業さまのシステム開発支援を主な活動とさせていただきながら、<br/>
          IT人材教育・転職支援、物販、ドローンを使った思い出作り支援サービス立ち上げなどの活動もしています！
          技術気質のエンジニアではなく、技術的を活かして人に喜ばれる仕事を創造したいエンジニアです！
        </p>
      </div>
    </div><!-- END OF ROW -->
    <!-- TOP LEVEL -->
    <h2>プロフィール</h2>
    <div class="row">
      <div class="col-12 col-lg-12">
        <ul>
          <li>名前：下岸祐太(YUTA SHIMOGISHI)</li>
          <li>大学：九州工業大学知能情報工学科退学、同大学大学院情報創生工学専攻</li>
          <li>好きな技術：拡張現実(Augmented reality)</li>
          <li>性格：ひょうひょうとして前向き</li>
          <li>趣味：アニメ・漫画、カラオケ、テニス、バドミントン、その他体を動かすこと、温泉</li>
          <li>出身地：福岡県</li>
        </ul>
      </div>
    </div><!-- END OF ROW -->
    <h2>経歴</h2>
    <div class="row">
      <div class="col-12 col-lg-12">
        <ul>
          <li>監査法人T社データ分析ツールスクラッチ開発案件参画(2018年11月)</li>
          <li>メーカーS社工場効率化システム開発案件参画(2018年6月)</li>
          <li>某中目黒カフェウェブサイトSEOコンサル(2018年6月-11月)</li>
          <li>フリーランスエンジニアとして独立(2018年4月)</li>
          <li>株式会社TRIART入社(2017年2月)</li>
          <li>株式会社日立製作所 ITプラットフォーム事業部入社(2015年4月)</li>
        </ul>
      </div>
    </div><!-- END OF ROW -->
  </div>
</main>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  @Component
  export default class HomeComponent extends Vue {
      mounted(): void {
        this.$store.state.curPage = 'profile'
      }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');
.jumbotron {
  background-image: url("../../images/beach.jpg");
  background-size: cover;
  background-position: center 60%;
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