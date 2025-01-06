/**
 * 使用示例：{% thumb_image SRC_URL imageMogr2/thumbnail/!50p %}
*/
hexo.extend.tag.register('thumb_image', function(args) {
	const src = args[0];
	const thumbnailString = args[1];
	const thumbnail = `${src}?${thumbnailString}`
	return `<img src="${thumbnail}" data-origin-pic="${src}" />`;
});
