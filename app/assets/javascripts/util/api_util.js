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

	fetchAllAlbums: function () {
		// get request
		// dispatch action
		$.ajax({
			url: '/api/albums',
			type: 'get',
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