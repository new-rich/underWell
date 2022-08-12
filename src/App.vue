<template>
  <div id="app">
    <router-view v-if="isShow"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload () {
      this.isShow= false;
      this.$nextTick(function () {
        this.isShow= true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  top:0px;
  left:0px;
  position:absolute;
  width : 100%;
  height : 100%;
}
</style>

