<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>TECHREIS</title>
</head>
<body>
  <div id="app" class="container-fluid p-0">
      <!-- 共通 Header -->
      <vue-header></vue-header>
      <!-- ルートごとに変わるコンテンツ -->
      <router-view></router-view>
      <!-- 共通 Footer -->
      <vue-footer></vue-footer>
  </div>
</body>
<script src="{{ mix('js/app.js') }}"></script>
</html>