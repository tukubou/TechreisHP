<template>
<div id="content" class="container-fluid p-0">
  <canvas ref="my-canvas" :class="getPicture"></canvas>
  <!-- モーダルの設定 -->
  <div class="modal fade" id="fireflyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ホタルの設定</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="閉じる">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h5>画像の選択</h5>
          <select v-model="backImage" class="custom-select d-block w-60">
            <option disabled value="">画像を選択してください</option>
            <option value="picture1">背景画像1</option>
            <option value="picture2">背景画像2</option>
            <option value="picture4">背景画像3</option>
            <option value="picture5">背景画像4</option>
            <option value="picture6">背景画像5</option>
            <option value="picture7">背景画像6</option>
            <option value="picture8">背景画像7</option>
            <option value="picture9">背景画像8</option>
            <option value="picture10">背景画像9</option>
            <option value="picture17">背景画像10</option>
            <option value="picture19">背景画像11</option>
            <option value="picture20">背景画像12</option>
            <option value="picture28">背景画像13</option>
            <option value="picture29">背景画像14</option>
          </select>
          <h5>その他設定</h5>
          <p>工事中</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
          <button type="button" class="btn btn-primary">変更を保存</button>
        </div><!-- /.modal-footer -->
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</div>
</template>

<script lang="ts">
  // キャンバス用コンポーネントの読み込み
  import { getParentSize } from "../../utils.ts";
  import Firefly from "./firefly.ts";
  import {Vue, Component, Watch} from 'vue-property-decorator';
  @Component
export default class FireflyComponent extends Vue {
  //vueのdataプロパティ
  backImage: string = 'picture2';
  ps: any = getParentSize();
  time: number = 0;
  maxflag: boolean = false;
  developflag: boolean = true;
  fireflies: Firefly[] = [];
  maxnum: number = 10000;
  ctx: any = null;

  get modalState(): boolean {
    return this.$store.state.isShowModal;
  }
  get getPicture(): string {
    return this.backImage;
  };
  /** watch */
  @Watch('modalState')
    onValueChange(newValue: string, oldValue: string): void {
      console.log(`watch: ${newValue}, ${oldValue}`);
      $('#fireflyModal').modal();
    }
  mounted(): void {
    this.$store.state.curPage = 'firefly'
    // mounted 以降で canvas の DOM にアクセスできる
    let canvas: any = this.$refs["my-canvas"];
    this.ctx = canvas.getContext("2d");
    canvas.width = this.ps.width;
    canvas.height = this.ps.height;
    this.start();
    // 設定モーダルが閉じられた時のイベント
    let self = this;
    $('#fireflyModal').on('hide.bs.modal', function (e) {
      self.$store.state.isShowModal = false;
    });
  }

  // vueのmethods(普通のメソッド定義でOK)
  main(): void {
    // キャンバスをクリア（消す）
    this.ctx.clearRect(0, 0, this.ps.width, this.ps.height);
    if (this.time > 100 || this.time == 0) {
      this.time = 0;
      // サークルオブジェクトを配列に格納
      if (!this.maxflag) {
        this.fireflies.push(new Firefly(this.fireflies.length, this.ctx));
        this.fireflies[this.fireflies.length - 1].init();
        if (this.fireflies.length === this.maxnum) {
          this.maxflag = true;
        }
      }
    }
    // 蛍の描画
    for (const firefly of this.fireflies) {
      firefly.move();
      firefly.view(this.developflag);
    }
    this.time++;
  };

  start(): void {
    const self = this;
    setInterval(function() {
      self.main();
    }, 10);
  }
}
</script>
<style>
.canvas {
  background-image: url("../../../images/firefly/picture2.jpg");
}

.picture1 { background-image: url("../../../images/firefly/picture1.jpg"); }
.picture2 { background-image: url("../../../images/firefly/picture2.jpg"); }
.picture4 { background-image: url("../../../images/firefly/picture4.jpg"); }
.picture5 { background-image: url("../../../images/firefly/picture5.jpg"); }
.picture6 { background-image: url("../../../images/firefly/picture6.jpg"); }
.picture7 { background-image: url("../../../images/firefly/picture7.jpg"); }
.picture8 { background-image: url("../../../images/firefly/picture8.jpg"); }
.picture9 { background-image: url("../../../images/firefly/picture9.jpg"); }
.picture10 { background-image: url("../../../images/firefly/picture10.jpg"); }
.picture17 { background-image: url("../../../images/firefly/picture17.jpg"); }
.picture19 { background-image: url("../../../images/firefly/picture19.jpg"); }
.picture20 { background-image: url("../../../images/firefly/picture20.jpg"); }
.picture28 { background-image: url("../../../images/firefly/picture28.jpg"); }
.picture29 { background-image: url("../../../images/firefly/picture29.jpg"); }
</style>