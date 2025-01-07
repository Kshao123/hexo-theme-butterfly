const THUMBNAIL_TAG = 'thumbnail';

/**
 * 使用示例：{% thumb-image SRC_URL imageMogr2/thumbnail/!50p %}
*/
hexo.extend.tag.register(THUMBNAIL_TAG, function(args) {
	const src = args[0];
	const thumbnailString = args[1];
	const thumbnail = `${src}?${thumbnailString}`
	return `<img src="${thumbnail}" data-origin-pic="${src}" data-${THUMBNAIL_TAG} />`;
});
