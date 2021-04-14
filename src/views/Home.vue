<template>
  <div class="home">
    <AppBar></AppBar>
    <BottomAppBar></BottomAppBar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AppBar from '../components/AppBar.vue';
import BottomAppBar from '../components/BottomAppBar.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    AppBar,
    BottomAppBar
  },
  
}
</script>
