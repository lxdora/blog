<template>
  <div id="jinrishici-sentence">
    {{poem}}
  </div>
</template>

<script setup>
  import {onMounted, reactive, ref } from 'vue';
  import {load} from 'jinrishici'
  let poem = ref('');
  const loadSentence = function() {
    load(result => {
      let shici = result.data;
      poem = shici.content;
    }, err => {
      poem = `获取诗词失败, ${err}`
    })
  }
  onMounted(()=>{
    loadSentence();
  })
</script>

<style>
  #jinrishici-sentence{
    margin: 50% auto;
    border: 2px solid #3faf7c;
    height: 60px;
    border-radius: 30px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
</style>