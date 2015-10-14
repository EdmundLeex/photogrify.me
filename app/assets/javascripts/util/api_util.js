window.ApiUtil = {
	fetchAllPictures: function () {
		// body...
	},

	fetchPicturesFromAlbum: function (albumId) {
		$.ajax({
			url: '/api/albums/' + albumId,
			type: 'get',
			dataType: 'json',

			success: function (respData) {
				ApiActions.receivePicturesFromOneAlbum(respData);
			}
		});
	},

	fetchAllAlbums: function (init) {
		// get request
		// dispatch action
		$.ajax({
			url: '/api/albums',
			type: 'get',
			dataType: 'json',

			success: function (respData) {
				var albumId = respData[0].id;
				ApiActions.receiveAllAlbums(respData);
				if (init) {
					ComponentActions.switchAlbum(albumId);
					ApiUtil.fetchPicturesFromAlbum(albumId);
				}
			}
		});
	},

	deleteAlbum: function (id) {
		$.ajax({
			url: '/api/albums/' + id,
			type: 'delete',
			dataType: 'json',

			success: function (respData) {
				ApiActions.receiveAllAlbums(respData);
			}
		});
	},

	logout: function () {
		$.ajax({
			url: '/logout',
			type: 'delete',
			dataType: 'json',

			success: function (respData) {
				window.location.href = respData.redirect;
			}
		});
	}
};