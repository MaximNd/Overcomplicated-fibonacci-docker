<template>
  <div id="app">
    <appNavbar></appNavbar>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  components: {
    appNavbar: Navbar
  }
};
</script>

<style>

</style>
