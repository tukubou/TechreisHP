<template>
<main role="main">
<div class=container>
  <div v-if="viewState !== 'complete'" class="py-5 text-center">
    <h2>お問い合わせフォーム</h2>
    <p class="lead">質問等あればお答えさせていただきます！</p>
  </div>
  <div v-else>
    <div class="py-5 text-center">
      <h3>メールが送信されました！</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <router-link class="btn btn-primary" to="/home">ホーム</router-link>
      </div>
    </div>
  </div>

  <div class="row">
    <!-- ################################ -->
    <!-- 入力フォーム -->
    <!-- ################################ -->
    <div v-if="viewState === 'input'" class="col-md-12 order-md-1">
      <form class="needs-validation" novalidate="">
        <!-- 名前 -->
        <div class="mb-3">
          <label for="username">お名前</label>
          <input type="text" class="form-control" id="username" v-model="contact.name" placeholder="あなたのお名前">
          <div class="invalid-feedback" style="width: 100%;">
            Your username is required.
          </div>
        </div>
        <!-- メールアドレス -->
        <div class="mb-3">
          <label for="email">メールアドレス</label>
          <input type="email" class="form-control" id="email" v-model="contact.email" placeholder="you@example.com">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
        <!-- タイトル -->
        <div class="mb-3">
          <label for="email">タイトル</label>
          <input type="email" class="form-control" id="subject" v-model="contact.subject" placeholder="お茶しようぜ">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>
        <!-- 内容 -->
        <div class="mb-3">
          <label>お問い合わせ内容</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" v-model="contact.message" rows="3"></textarea>
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates. 
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-block" @click="changeView('confirm')">この内容で確認</button>
      </form>
    </div>
    <!-- ################################ -->
    <!-- 確認フォーム -->
    <!-- ################################ -->
    <div v-else-if="viewState === 'confirm'" class="col-md-12 order-md-1">
      <!-- 名前 -->
      <div class="mb-3">
        <label for="username">お名前</label>
        <p class="border border-primary rounded p-3">{{contact.name}}</p>
      </div>
      <!-- メールアドレス -->
      <div class="mb-3">
        <label for="email">メールアドレス</label>
        <p class="border border-primary rounded p-3">{{contact.email}}</p>
      </div>
      <!-- タイトル -->
      <div class="mb-3">
        <label for="email">タイトル</label>
        <p class="border border-primary rounded p-3">{{contact.subject}}</p>
      </div>
      <!-- 内容 -->
      <div class="mb-3">
        <label>お問い合わせ内容</label>
        <p class="border border-primary rounded p-3">{{contact.message}}</p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <button class="btn btn-secondary btn-lg btn-block" @click="changeView('input')" >修正する</button>
        </div>
        <div class="col-md-6">
          <button class="btn btn-danger btn-lg btn-block" @click="sendContactDetails()" >この内容で送信</button>
        </div>
      </div>
    </div><!-- end of confirm -->
  </div>
</div><!-- container -->
</main>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import axios from 'axios';
    @Component
    export default class ContactComponent extends Vue {
      // メールで送信する内容
      viewState: string = 'input'; // input/confirm/complete
      contact: Object = {
        email: '',
        name: '',
        subject: '',
        message: '',
      };

      // State
      mounted(): void {}

      /**
       * 入力された内容でメールを送信
       */
      sendContactDetails(): void {
        axios.post('/api/contact', this.contact).then(res => {
          const contact = res.data;
        });
        this.changeView('complete');
      }

      /**
       * Viewの状態を変更する
       */
      changeView(state: string): void {
        this.viewState = state;
      }
    }
</script>

<style scoped>
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
</style>