<template>
  <div class="shici-container">
    <div id="jinrishici">
    </div>
    <div class="switch" @click="loadSentence">换一首</div>
  </div>
</template>

<script setup>
  import {onMounted, reactive, ref } from 'vue';
  import {load} from 'jinrishici'
  const loadSentence = function() {
    load(result => {
      const jinrishici = document.querySelector('#jinrishici');
      jinrishici.innerHTML = '';
      let shici = result.data;
      const fragment = new DocumentFragment();
      //标题
      const title = document.createElement('div');
      title.append(shici.origin.title)
      title.classList.add('poetry-title');
      fragment.append(title);
      // 作者
      const author = document.createElement('div');
      author.append(`${shici.origin.dynasty} · ${shici.origin.author}`)
      author.classList.add('poetry-author')
      fragment.append(author);
      //内容
      const content = document.createElement('ul');
      content.classList.add('poetry-content');
      for(let i=0; i<shici.origin.content.length; i++){
        const li = document.createElement('li');
        li.append(shici.origin.content[i]);
        li.classList.add('poetry-content-item');
        content.append(li);
      }
      fragment.append(content);
      jinrishici.append(fragment);
      console.log({shici});
    }, err => {
      document.querySelector('#jinrishici').innerHTML = `获取诗词失败, ${err}`
    })
  }
  onMounted(()=>{
    loadSentence();
  })
</script>

<style lang="scss">
@keyframes huerotate {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}
  .shici-container{
    margin: 20% auto 0;
    color: var(--color-main);
    #jinrishici{
      border-radius: 30px;
      text-align: center;
      border: 10px solid;
      border-image: linear-gradient(45deg, gold, deeppink) 1;
      clip-path: inset(0px round 10px);
      animation: huerotate 6s infinite linear;
      filter: hue-rotate(360deg);
      .poetry-title{
        font-size: 30px;
        font-weight: 500;
      }
      .poetry-author{
        margin-left: 100px;
        margin-top: 20px;
      }
      ul li{
        list-style-type:none;
      }
      .poetry-content{
        margin-top: 30px;
      }
    }
    .switch {
      position: relative;
      margin: 50px auto;
      width: 120px;
      line-height: 64px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      border: 2px solid gold;
      border-radius: 10px;
      background: gold;
      transition: all .3s;
      cursor: pointer;
      
      &:hover {
          filter: contrast(1.1);
      }
      
      &:active {
          filter: contrast(0.9);
      }
      
      &::before,
      &::after {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid gold;
          transition: all .5s;
          animation: clippath 3s infinite linear;
          border-radius: 10px;
      }
      
      &::after {
          animation: clippath 3s infinite -1.5s linear;
      }
  }

  @keyframes clippath {
      0%,
      100% {
          clip-path: inset(0 0 98% 0);
      }
      
      25% {
          clip-path: inset(0 98% 0 0);
      }
      50% {
          clip-path: inset(98% 0 0 0);
      }
      75% {
          clip-path: inset(0 0 0 98%);
      }
  }

  .bg::before {
      background: rgba(255, 215, 0, .5);
  }
}
</style>