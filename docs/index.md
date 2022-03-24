<div id="jinrishici-sentence">
</div>

<script>
  import {onMounted, reactive } from 'vue';
  import {load} from 'jinrishici'
  const loadSentence = function() {
    load(result => {
      let shici = result.data;
      document.querySelector('#jinrishici-sentence').innerHTML = shici.content;
    }, err => {
      shici = `获取诗词失败, ${err}`
    })
  }
  loadSentence();
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