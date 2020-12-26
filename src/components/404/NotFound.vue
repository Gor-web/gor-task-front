<template>
  <div class="not-found-container">
    <div class="error-page">404 error</div>
    <p class="error-page-found">Page isn't found</p>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.error-page {
  text-align: center;
  font-size: 2em;
  color: red;
}

.error-page-found {
  text-align: center;
  font-size: 1.7em;
  margin-top: 50px
}
</style>
