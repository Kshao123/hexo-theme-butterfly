/**
 * Butterfly
 * galleryGroup and gallery
 * {% galleryGroup [name] [descr] [url] [img] %}
 *
 * {% gallery [button],[limit],[firstLimit] %}
 * {% gallery url,[url],[button] %}
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const cheerio = require('cheerio');
const { THUMBNAIL_TAG } = require('./thumbnail');

const DEFAULT_LIMIT = 10
const DEFAULT_FIRST_LIMIT = 10
const IMAGE_REGEX = /!\[(.*?)\]\(([^\s]*)\s*(?:["'](.*?)["']?)?\s*\)/g

/**
 * 将自定义的缩略图 标签转成 data 模式
 * 预计接受的 Content 为：<img src="${thumbnail}" data-origin-pic="${src}" data-${THUMBNAIL_TAG} />
*/
const parseThumbnailTag = (content) => {
  let images = [];
  if (!content?.includes(THUMBNAIL_TAG)) {
    return images;
  }
  
  // 使用 cheerio 解析 HTML 字符串
  const $ = cheerio.load(content);
  
  // 获取所有的 <img> 元素
  const imagesDom = $('img');
  
  if (!imagesDom.length) {
    return images;
  }
  
  // 使用 cheerio 的 .each() 方法遍历所有 <img> 元素
  images = imagesDom.map((index, element) => {
    const url = $(element).attr('src');
    const alt = $(element).attr('alt');
    const dataset = $(element).data(); // 获取 data-* 属性
    
    return {
      url,
      alt,
      dataset
    };
  }).get(); // .get() 将 cheerio 对象转为普通的 JavaScript 数组
  
  return images;
};


// Helper functions
const parseGalleryArgs = args => {
  const [type, ...rest] = args.join(' ').split(',').map(arg => arg.trim())
  return {
    isUrl: type === 'url',
    params: type === 'url' ? rest : [type, ...rest]
  }
}

const parseImageContent = content => {
  const images = parseThumbnailTag(content)
  let match

  while ((match = IMAGE_REGEX.exec(content)) !== null) {
    images.push({
      url: match[2],
      alt: match[1] || '',
      title: match[3] || ''
    })
  }

  return images
}

const createGalleryHTML = (type, dataStr, button, limit, firstLimit) => {
  return `<div class="gallery-container" data-type="${type}" data-button="${button}" data-limit="${limit}" data-first="${firstLimit}">
    <div class="gallery-items">${dataStr}</div>
  </div>`
}

const gallery = (args, content) => {
  const { isUrl, params } = parseGalleryArgs(args)

  if (isUrl) {
    const [dataStr, button = false, limit = DEFAULT_LIMIT, firstLimit = DEFAULT_FIRST_LIMIT] = params
    return createGalleryHTML('url', urlFor(dataStr), button, limit, firstLimit)
  }

  const [button = false, limit = DEFAULT_LIMIT, firstLimit = DEFAULT_FIRST_LIMIT] = params
  const images = parseImageContent(content)
  return createGalleryHTML('data', JSON.stringify(images), button, limit, firstLimit)
}

const galleryGroup = args => {
  const [name = '', descr = '', url = '', img = ''] = args.map(arg => arg.trim())

  return `<figure class="gallery-group">
    <img class="gallery-group-img no-lightbox" src='${urlFor(img)}' alt="Group Image Gallery">
    <figcaption>
      <div class="gallery-group-name">${name}</div>
      <p>${descr}</p>
      <a href='${urlFor(url)}'></a>
    </figcaption>
  </figure>`
}

// Register tags
hexo.extend.tag.register('gallery', gallery, { ends: true })
hexo.extend.tag.register('galleryGroup', galleryGroup)
