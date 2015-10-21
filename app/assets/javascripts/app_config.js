window.APP_CONFIG = {
	CLOUDINARY_CONFIG: {
		cloud_name: 'edmundleex',
		upload_preset: 'k24aopiw',
		theme: 'minimal'
	},

	THUMBNAIL_SIZE: 'w_220,h_220,c_fill',

	INDEX_COVER_SIZE: 'w_350,h_120,c_fill',

	FRAME_SIZE: 'h_600',

	ImageUrlByOptions: function (url, optionsStr) {
		url = url.split('/');
		var insert_index = url.indexOf('upload') + 1;
		url.splice(insert_index, 0, optionsStr);
		return url.join('/');
	}
	// INDEX_COVER_SIZE: 'w_350,c_fill,g_center' for moving pic when hover
};