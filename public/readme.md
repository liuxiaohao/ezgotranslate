﻿Web Develop About
===

## 修改日志

**2015.1.31**

translating.html

将`<textarea></textarea>`改为`<div class="input-block" contenteditable="true"></div>`

@Boby

**2015.1.20**

0. 添加 **public.css**， 将所有的css塞这里面。
1. 删除了所有的 css ，整合到了 **public.css**。
2.  区别不同页面的样式方案：将每个`body`都添加了`id`属性，作为最大的过滤器。如：
``` html
    <body id="translating">
      ......
    </body>
```
（修改详情，见附录一）

@Boby

**2015.1.20**

0. Disable main-dynamic.js, delete main.js and index.js
1. Add **public.js** and merge **main.js** and **index.js** and **main-dynamic.js** into **public.js**

@ccreimondo

**2015.1.19**

0. 统一修改了CSS文件以及HTML文件的命名，按照如下的**命名规定**。
1. 添加了 **public.js** ，将公共页面动态效果放在这里面。
2. 将 **personal.js** 和 **signinup.js** 合并到 **public.js** 中。



## Web directory structure

```bash
public/
|
+---index.html
|
+---web/
    |
    +---css/
    |   |
    |   +---css.css
    |
    +---image/
    |   |
    |   +---img.png
    |
    +---js/
    |   |
    |   +---js.js
    |
    +---after-signin.html
    |
    +---homepage.html
    |
    +---personal-inf.html
    |
    +---translate-object.html
    |
    +---translate-page.html
    |
    +---translating.html

```



## How to name document-name

>I recommend **one-two-three.js**, **three-two-one.html**, **ico-file.png**

`TODO` new icon name?


## How to name variable

**JS** 变量一律采用驼峰式命名法

**CSS** 一律采用"-"，（这个叫什么符号来着。。）

**HTML** 一律采用"-", especially id and class



## HTML document

**index.html** 点击进入Tryneeds主页

**after-signin.html** 登陆之后的主页，右上角出现会员信息

**homepage.html** 点击会员信息（右上角的框），进入个人主页，显示真在进行的项目

**personal-inf.html** 个人信息设置界面

`TODO`**translate-object.html**  管理项目界面（这个界面有些，鸡肋，这个板块需要再商议）

**translate-page.hrml**  进入某个项目内，显示项目进度

**translating.hrml**  正在进行翻译的界面



## CSS document

css 文档很杂很多的问题，这是必须要整理的。
> 公用部分公用, 其他部分可以用一个上层结构来区分
比如都是 content
一个是 .page-index-wrapper .content 一个是 .page-account-wrapper .content         ---[Villic Van]()


**public.css**


## JS document

**public.js** 存放公共页面动态效果

**translate.js** 翻译模块

**function.js** Include many useful function, mainly to test.



## Appendix
**（2015.1.20修改详情）**

> Tips: **除了以下特别标注的，均把 ‘_’ 换成了 ‘-’ **

#### header and footer
id:
| 修改前     | 修改后  |
| :-------- | :--------|
| p_head | personal-head |


className:
| 修改前     | 修改后  |
| :-------- | :--------|
| p_nav | personal-nav |
| p\_nav_last | personal-nav-last |


----

#### index.html（登陆注册的地方改过）
id:
| 修改前     | 修改后  |
| :-------- | :--------|

className:
| 修改前     | 修改后  |
| :-------- | :--------|
| container_in | container-signin |
| container_up | container-signup |


----

#### translating.html

className:
| 修改前     | 修改后  |
| :-------- | :--------|
| addExplain | add-explain |
| untranslateCharacter | untranslate-character |
| numberOfsentences | number-of-sentences |
