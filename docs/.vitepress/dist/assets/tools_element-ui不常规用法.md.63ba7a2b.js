import{_ as n,c as s,o as a,a as p}from"./app.b31ce850.js";const d='{"title":"element-ui\u4E0D\u5E38\u89C4\u7528\u6CD5","description":"","frontmatter":{"title":"element-ui\u4E0D\u5E38\u89C4\u7528\u6CD5","tags":["\u524D\u7AEF"],"categories":["\u6280\u672F\u6587\u6863"],"date":"2021-05-17T19:35:58.000Z"},"headers":[],"relativePath":"tools/element-ui\u4E0D\u5E38\u89C4\u7528\u6CD5.md","lastUpdated":1648115122000}',e={},t=p(`<p>\u5E73\u5E38\u5F00\u53D1\u8FC7\u7A0B\u4E2D\u4F7F\u7528\u7684\u662Felement\u7EC4\u4EF6\u5E93\uFF0C\u5E73\u65F6\u4E00\u4E9B\u7EC4\u4EF6\u4E0E\u8BBE\u8BA1\u7ED9\u7684\u4E0D\u4E00\u6837\uFF0C\u4E0D\u80FD\u76F4\u63A5\u4F7F\u7528\uFF0C\u9700\u8981\u8FDB\u884C\u4E00\u4E9B\u4FEE\u6539\uFF0C\u672C\u6587\u6863\u8BB0\u5F55\u4E00\u4E0B\u8FD9\u4E9B\u4FEE\u6539\u7684\u5730\u65B9\u3002</p><h1 id="\u4FEE\u6539table\u7684border\u989C\u8272" tabindex="-1">\u4FEE\u6539table\u7684border\u989C\u8272 <a class="header-anchor" href="#\u4FEE\u6539table\u7684border\u989C\u8272" aria-hidden="true">#</a></h1><div class="language-vue line-numbers-mode"><pre><code>.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: #f6f6f6;
}

.el-table--border,
.el-table--group {
	border-color: #f6f6f6;
}

.el-table td,
.el-table th.is-leaf {
	border-bottom: 1px solid #f6f6f6;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
	border-bottom: 1px solid #f6f6f6;
}

.el-table--border td,
.el-table--border th {
	border-right: 1px solid #f6f6f6;
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h1 id="el-form\u9A8C\u8BC1" tabindex="-1">el-form\u9A8C\u8BC1 <a class="header-anchor" href="#el-form\u9A8C\u8BC1" aria-hidden="true">#</a></h1><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">async</span> <span class="token function">onSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">[</span><span class="token string">&#39;form&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">valid</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>valid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token operator">===</span><span class="token string">&#39;add&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
              <span class="token keyword">await</span> <span class="token function">addServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>form<span class="token punctuation">}</span><span class="token punctuation">)</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>$message<span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">&#39;\u6DFB\u52A0\u670D\u52A1\u5668\u6210\u529F&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
              <span class="token keyword">await</span> <span class="token function">updateServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>form<span class="token punctuation">}</span><span class="token punctuation">)</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>$message<span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">&#39;\u7F16\u8F91\u670D\u52A1\u5668\u6210\u529F&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> isError<span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">&quot;is-error&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          isError<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h1 id="\u4FEE\u6539el-tabs\u6837\u5F0F" tabindex="-1">\u4FEE\u6539el-tabs\u6837\u5F0F <a class="header-anchor" href="#\u4FEE\u6539el-tabs\u6837\u5F0F" aria-hidden="true">#</a></h1><div class="language-css line-numbers-mode"><pre><code><span class="token selector">.el-tabs__nav-wrap</span><span class="token punctuation">{</span>
  <span class="token selector">&amp;::after</span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f4f4f4<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.el-tabs__active-bar</span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
    <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
      <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
      <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #037AFF<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> -2px auto 0<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.el-tabs__item</span> <span class="token punctuation">{</span>
    <span class="token selector">&amp;:hover</span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #037AFF<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.is-active</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #037AFF<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,7),o=[t];function c(l,r,u,i,k,b){return a(),s("div",null,o)}var f=n(e,[["render",c]]);export{d as __pageData,f as default};
