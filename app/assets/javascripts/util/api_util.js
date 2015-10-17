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

				// if (init) {
				// 	ComponentActions.switchAlbum(albumId);
				// 	ApiUtil.fetchPicturesFromAlbum(albumId);
				// }

				// show welcome page, setTimeout disappear
			}
		});
	},

	createAlbum: function (data) {
		$.ajax({
			url: '/api/albums/',
			type: 'post',
			dataType: 'json',
			data: data,

			success: function (respData) {
				ApiActions.createAlbum(respData);
			}
		});
	},

	updateAlbum: function (albumId, title, description, urls) {
		$.ajax({
			url: '/api/albums/' + albumId,
			type: 'patch',
			dataType: 'json',
			data: {"title": title, "description": description, "urls": urls},

			success: function (respData) {
				ApiActions.updatedAlbum(respData);
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	// updateDescription: function (id, description) {
	// 	$.ajax({
	// 		url: '/api/albums/' + id,
	// 		type: 'patch',
	// 		dataType: 'json',
	// 		data: {"description": description},

	// 		success: function (respData) {
	// 			ApiActions.savedDescription(respData.description);
	// 		}
	// 	});
	// },

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