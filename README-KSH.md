# Update from upstream
```shell
git remote add [upstream] => anyname https://github.com/jerryc127/hexo-theme-butterfly.git
git remote -v # see remotes 
```

# use
```shell
git clone -b dev https://github.com/Kshao123/hexo-theme-butterfly.git themes/Butterfly
```

# CHANGELOG
## 0.1
- 使用 config 内的 realTitle 来渲染站点的 title 解决备案域名的站点标题与当前不一致

## 0.2
- update, merged files: layout/includes/header/nav.pug

```
nav#nav
  span#blog-info
    a(href=url_for('/') title=config.realTitle)
      if theme.nav.logo
        img.site-icon(src=url_for(theme.nav.logo))
      if theme.nav.display_title
        span.site-name=config.realTitle
```

## 0.3

> 增加 fancybox 的缩略图实现

- 修改 `/source/js/utils.js` L:192，增加 fancybox 的缩略图，字段来源新增的 自定义标签

```js
const dataSrc = i.dataset.originPic || i.dataset.lazySrc || i.src
```

- 增加 `/scripts/tag/thumb-image.js` 实现自定义标签，用于给 fancybox 增加自定义属性

- 修改 `/scripts/tag/gallery.js` 和 `/source/js/main.js` L: 262，增加 Gallery 对缩略图的支持
