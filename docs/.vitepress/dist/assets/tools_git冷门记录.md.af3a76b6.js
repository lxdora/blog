import{_ as n,c as s,o as a,a as e}from"./app.b31ce850.js";const g='{"title":"git\u51B7\u95E8\u8BB0\u5F55","description":"","frontmatter":{"title":"git\u51B7\u95E8\u8BB0\u5F55","date":"2021-04-09T11:18:01.000Z","tags":["git"],"categories":["\u6280\u672F\u6587\u6863"]},"headers":[],"relativePath":"tools/git\u51B7\u95E8\u8BB0\u5F55.md","lastUpdated":1648115122000}',p={},t=e(`<p>\u6839\u636E\u4E8C\u516B\u6CD5\u5219\uFF0C\u901A\u5E38\u6211\u4EEC\u53EF\u4EE5\u752820%\u7684\u77E5\u8BC6\u89E3\u51B380%\u7684\u95EE\u9898\uFF0Cgit\u7684\u4F7F\u7528\u4E5F\u662F\u8FD9\u6837\u3002\u5E38\u7528\u7684\u547D\u4EE4\u7FFB\u6765\u8986\u53BB\u5C31\u90A3\u4E48\u51E0\u4E2A\uFF0C\u4F46\u662F\u5F53\u6211\u4EEC\u9047\u5230\u6BD4\u8F83\u96BE\u5904\u7406\u7684\u95EE\u9898\u65F6\uFF0C\u4E5F\u8981\u80FD\u4F1A\u7528\u5176\u4ED680%\u4E2D\u7684\u77E5\u8BC6\uFF0C\u672C\u6587\u7528\u4E8E\u8BB0\u5F55\u65E5\u5E38\u5DE5\u4F5C\u4E0D\u5E38\u9047\u5230\u7684git\u95EE\u9898\uFF0C\u6301\u7EED\u66F4\u65B0\u3002</p><h1 id="git\u5E38\u7528\u547D\u4EE4" tabindex="-1">git\u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#git\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h1><p>\u7B80\u5355\u5217\u4E3E\uFF0C\u4E0D\u518D\u8D58\u8FF0</p><ol><li><code>git add .</code></li><li><code>git commit -m &#39;&#39;</code></li><li><code>git pull</code></li><li><code>git push origin HEAD</code></li><li><code>git branch -a</code></li><li><code>git checkout -b localBranch origin/master</code> \u4ECE\u8FDC\u7A0Bmaster\u5206\u652F\u62C9\u51FA\u672C\u5730\u5206\u652F</li><li><code>git branch --set-upstream-to=origin/master </code> \u8BBE\u7F6E\u5F53\u524D\u5206\u652F\u8FFD\u8E2A\u8FDC\u7A0Bmaster\u5206\u652F</li><li><code>git branch -vvv</code> \u67E5\u770B\u672C\u5730\u5206\u652F\u4E0E\u8FDC\u7A0B\u5206\u652F\u7684\u6620\u5C04\u5173\u7CFB</li></ol><h1 id="git\u4E0D\u5E38\u7528" tabindex="-1">git\u4E0D\u5E38\u7528 <a class="header-anchor" href="#git\u4E0D\u5E38\u7528" aria-hidden="true">#</a></h1><ol><li>\u6587\u4EF6\u540D\u5927\u5C0F\u5199\u4FEE\u6539\u540Egit\u68C0\u6D4B\u4E0D\u5230</li></ol><p>\u6267\u884C<code>git config core.ignorecase false</code>\uFF0C\u5173\u95EDgit\u5FFD\u7565\u5927\u5C0F\u5199\u914D\u7F6E\uFF0C\u5373\u53EF\u68C0\u6D4B\u5230\u5927\u5C0F\u5199\u540D\u79F0\u66F4\u6539</p><ol start="2"><li>git\u8FDC\u7A0B\u5206\u652F\u5220\u9664\u540E\u672C\u5730\u5206\u652F\u8FD8\u5728\uFF0C\u4E0D\u60F3\u4E00\u4E2A\u4E2A\u5220\u9664</li></ol><p>\u6267\u884C<code>git remote prune origin</code></p><ol start="3"><li><p>git\u6DFB\u52A0\u548C\u66F4\u65B0\u5B50\u6A21\u5757</p><p><code>git submodule add git@git.hoge.cn:microfed/library.git src/library</code></p><p><code>git submodule update --init --recursive</code></p><p>\u6DFB\u52A0\u5B50\u6A21\u5757\u62A5\u9519</p><p><code>&#39;src/library&#39; already exists in the index</code></p><p>\u6267\u884C\u5982\u4E0B\u547D\u4EE4</p><p><code>git rm -r --cached src/library</code></p></li><li><p>git \u5220\u9664\u8FDC\u7A0B\u5206\u652F</p><p><code> git push origin --delete new_a</code></p></li><li><div class="language-shell line-numbers-mode"><pre><code><span class="token comment">#\u6307\u5B9A\u8FDC\u7A0B\u5206\u652F\u65F6\u62A5\u9519\uFF0C\u5DF2\u7ECF\u5B58\u5728</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin git@git.hoge.cn:microfed/low_code.git
error: remote origin already exists.
<span class="token comment"># \u5148\u5220\u9664</span>
<span class="token function">git</span> remote <span class="token function">rm</span> origin
<span class="token comment"># \u518D\u6DFB\u52A0</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin git@git.hoge.cn:microfed/low_code.git
git@gitlab.com:lxdora/low_code.git
 
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li></ol><h1 id="\u5728\u672C\u5730\u540C\u65F6\u5173\u8054github-gitlab-gitee" tabindex="-1">\u5728\u672C\u5730\u540C\u65F6\u5173\u8054github, gitlab, gitee <a class="header-anchor" href="#\u5728\u672C\u5730\u540C\u65F6\u5173\u8054github-gitlab-gitee" aria-hidden="true">#</a></h1><ol><li><p>cd <code>~/.ssh</code>\u76EE\u5F55\u4E0B\uFF0C\u5206\u522B\u5EFA\u7ACB\u5BF9\u5E94\u7684\u6587\u4EF6\u5939</p><div class="language-shell line-numbers-mode"><pre><code><span class="token function">ls</span> ~/.ssh
<span class="token operator">&gt;</span> github   gitlab   gitee
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p>\u6267\u884C\u4E09\u6B21ssh-keygen, \u5206\u522B\u4FDD\u5B58\u5230\u5BF9\u5E94\u7684\u76EE\u5F55\u4E0B</p><div class="language-shell line-numbers-mode"><pre><code>ssh-keygen -t rsa -C <span class="token string">&quot;\u6CE8\u518C gitlab \u8D26\u6237\u7684\u90AE\u7BB1&quot;</span>
ssh-keygen -t rsa -C <span class="token string">&quot;\u6CE8\u518C github \u8D26\u6237\u7684\u90AE\u7BB1&quot;</span>
ssh-keygen -t rsa -C <span class="token string">&quot;\u6CE8\u518C gitee \u8D26\u6237\u7684\u90AE\u7BB1&quot;</span>

\u4FDD\u5B58\u8DEF\u5F84\u8981\u8F93\u5165\u5168\u8DEF\u5F84
Enter <span class="token function">file</span> <span class="token keyword">in</span> <span class="token function">which</span> to save the key <span class="token punctuation">(</span>/Users/hoge/.ssh/id_rsa<span class="token punctuation">)</span>: /Users/hoge/.ssh/gitee/id_rsa
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li><li><p>\u5C06\u5BF9\u5E94\u76EE\u5F55\u4E0B\u7684id_rsa.pub\u7684\u5185\u5BB9\u590D\u5236\u5230\u5BF9\u5E94\u7F51\u7AD9\u4E0A</p></li><li><p>\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6 <code>vim ~/.ssh/config</code></p><div class="language-shell line-numbers-mode"><pre><code><span class="token comment"># The git info for github</span>
Host github.com
HostName github.com
User <span class="token number">1061522566</span>@qq.com
IdentityFile ~/.ssh/github/id_rsa

<span class="token comment"># The git info for gitlab</span>
Host gitlab.com
HostName gitlab.com
User <span class="token number">1061522566</span>@qq.com
IdentityFile ~/.ssh/gitlab/id_rsa

<span class="token comment"># The git info for gitee</span>
Host gitee.com
HostName gitee.com
User <span class="token number">1061522566</span>@qq.com
IdentityFile ~/.ssh/gitee/id_rsa
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></li><li><p>\u6D4B\u8BD5\u4E00\u4E0B\u662F\u5426\u8FDE\u901A</p><div class="language-shell line-numbers-mode"><pre><code><span class="token function">ssh</span> -T git@github.com
<span class="token function">ssh</span> -T git@gitlab.com
<span class="token function">ssh</span> -T git@gitee.com

\u80FD\u770B\u5230\u81EA\u5DF1\u7684\u7528\u6237\u540D\uFF0C\u8BF4\u660E\u8FDE\u901A\u4E86
\u5982\u679C\u770B\u5230\u4E0B\u8FF0\u4FE1\u606F\uFF0C\u9700\u8981\u8F93\u5165\u4EE5\u4E0Byes
The authenticity of <span class="token function">host</span> <span class="token string">&#39;gitee.com (180.97.125.228)&#39;</span> can<span class="token string">&#39;t be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added &#39;</span>gitee.com,180.97.125.228<span class="token string">&#39; (ECDSA) to the list of known hosts.
Hi lxdora! You&#39;</span>ve successfully authenticated, but GITEE.COM does not provide shell access.
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li></ol><h1 id="git\u5C06\u672C\u5730\u5206\u652F\u63A8\u9001\u5230\u591A\u4E2A\u8FDC\u7A0B" tabindex="-1">git\u5C06\u672C\u5730\u5206\u652F\u63A8\u9001\u5230\u591A\u4E2A\u8FDC\u7A0B <a class="header-anchor" href="#git\u5C06\u672C\u5730\u5206\u652F\u63A8\u9001\u5230\u591A\u4E2A\u8FDC\u7A0B" aria-hidden="true">#</a></h1><ol><li><p>\u4F7F\u7528\u547D\u4EE4</p><div class="language-shell line-numbers-mode"><pre><code><span class="token comment"># \u6DFB\u52A0\u7B2C\u4E00\u4E2A\u8FDC\u7A0B\u4ED3\u5E93</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://git.oschina.net/Jicklin/bokeyuan.git
<span class="token comment"># \u7EE7\u7EED\u6DFB\u52A0\u8FDC\u7A0B\u4ED3\u5E93</span>
<span class="token function">git</span> remote set-url --add origin https://github.com/jicklin/bokeyuan.git
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p>\u4E0A\u9762\u547D\u4EE4\u6267\u884C\u540E\u662F\u4FEE\u6539\u4E86.git/config\u6587\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539\u8FD9\u4E2A\u914D\u7F6E\u6587\u4EF6</p><div class="language-shell line-numbers-mode"><pre><code><span class="token punctuation">[</span>remote <span class="token string">&quot;origin&quot;</span><span class="token punctuation">]</span>
    url <span class="token operator">=</span> git@gitlab.com:lxdora/xingyun-cli.git
    fetch <span class="token operator">=</span> +refs/heads/*:refs/remotes/origin/*
    url <span class="token operator">=</span> git@git.hoge.cn:microfed/xingyun-cli.git
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li></ol><h1 id="git\u547D\u4EE4\u884C\u522B\u540D" tabindex="-1">git\u547D\u4EE4\u884C\u522B\u540D <a class="header-anchor" href="#git\u547D\u4EE4\u884C\u522B\u540D" aria-hidden="true">#</a></h1><p>vim ~/.gitconfig</p><div class="language-shell line-numbers-mode"><pre><code><span class="token punctuation">[</span>core<span class="token punctuation">]</span>
	excludesfile <span class="token operator">=</span> /Users/hoge/.gitignore_global
<span class="token punctuation">[</span>difftool <span class="token string">&quot;sourcetree&quot;</span><span class="token punctuation">]</span>
	cmd <span class="token operator">=</span> opendiff <span class="token punctuation">\\</span>&quot;<span class="token variable">$LOCAL</span><span class="token punctuation">\\</span>&quot; <span class="token punctuation">\\</span>&quot;<span class="token variable">$REMOTE</span><span class="token punctuation">\\</span>&quot;
	path <span class="token operator">=</span>
<span class="token punctuation">[</span>mergetool <span class="token string">&quot;sourcetree&quot;</span><span class="token punctuation">]</span>
	cmd <span class="token operator">=</span> /Applications/SourceTree.app/Contents/Resources/opendiff-w.sh <span class="token punctuation">\\</span>&quot;<span class="token variable">$LOCAL</span><span class="token punctuation">\\</span>&quot; <span class="token punctuation">\\</span>&quot;<span class="token variable">$REMOTE</span><span class="token punctuation">\\</span>&quot; -ancestor <span class="token punctuation">\\</span>&quot;<span class="token variable">$BASE</span><span class="token punctuation">\\</span>&quot; -merge <span class="token punctuation">\\</span>&quot;<span class="token variable">$MERGED</span><span class="token punctuation">\\</span>&quot;
	trustExitCode <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">[</span>user<span class="token punctuation">]</span>
	name <span class="token operator">=</span> \u674E\u7FD4
<span class="token punctuation">[</span>pull<span class="token punctuation">]</span>
	rebase <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">[</span>alias<span class="token punctuation">]</span>
br <span class="token operator">=</span> branch
ci <span class="token operator">=</span> commit
cl <span class="token operator">=</span> clone
co <span class="token operator">=</span> checkout
<span class="token function">cp</span> <span class="token operator">=</span> cherry-pick
cfg <span class="token operator">=</span> clone
<span class="token function">df</span> <span class="token operator">=</span> <span class="token function">diff</span>
fh <span class="token operator">=</span> fetch
lg <span class="token operator">=</span> <span class="token string">&quot;log --color --graph --pretty=format:&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit --date=relative&quot;</span>
mg <span class="token operator">=</span> merge
pl <span class="token operator">=</span> pull
plr <span class="token operator">=</span> pull --rebase
rb <span class="token operator">=</span> rebase
ph <span class="token operator">=</span> push origin HEAD
rmt <span class="token operator">=</span> remote
rst <span class="token operator">=</span> reset
<span class="token function">sh</span> <span class="token operator">=</span> stash
st <span class="token operator">=</span> status
sts <span class="token operator">=</span> status -s
sbm <span class="token operator">=</span> submodule
sw <span class="token operator">=</span> show
swf <span class="token operator">=</span> <span class="token string">&quot;show --name-status&quot;</span>
delb <span class="token operator">=</span> <span class="token string">&quot;push origin --delete&quot;</span>
delt <span class="token operator">=</span> <span class="token string">&quot;push origin :&quot;</span>
mb <span class="token operator">=</span> merge-base
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h1 id="git\u521D\u59CB\u5316\u65F6add\u4E86\u9519\u8BEF\u7684\u6587\u4EF6" tabindex="-1">git\u521D\u59CB\u5316\u65F6add\u4E86\u9519\u8BEF\u7684\u6587\u4EF6 <a class="header-anchor" href="#git\u521D\u59CB\u5316\u65F6add\u4E86\u9519\u8BEF\u7684\u6587\u4EF6" aria-hidden="true">#</a></h1><p>\u5F53\u6211\u4EEC\u521D\u59CB\u5316\u4E00\u4E2A\u9879\u76EE\u7684git\uFF0C\u8FD9\u65F6\u53EF\u80FD\u9879\u76EE\u4E0B\u6CA1\u6709.gitignore\u6587\u4EF6\uFF0C\u7136\u540E\u4E0D\u5C0F\u5FC3\u6267\u884C\u4E86<code>git add .</code>\uFF0C\u8FD9\u65F6\u5019\u5C06\u6574\u4E2Anode_modules\u6587\u4EF6\u90FDadd\u4E86\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u53EF\u4EE5\u6267\u884C<code>git reset</code>\u64A4\u9500\u8BE5\u9519\u8BEF\u7684add</p>`,19),o=[t];function r(l,i,c,u,b,d){return a(),s("div",null,o)}var k=n(p,[["render",r]]);export{g as __pageData,k as default};
