window.ApiUtil = {
	fetchAllPictures: function () {
		$.ajax({
			url: '/api/pictures',
			type: 'get',
			dataType: 'json',

			success: function (respData) {
				ApiActions.receiveAllPictures(respData);
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	fetchPicturesFromAlbum: function (albumId) {
		$.ajax({
			url: '/api/albums/' + albumId,
			type: 'get',
			dataType: 'json',

			success: function (respData) {
				ApiActions.receivePicturesFromOneAlbum(respData);
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	deletePicture: function (imgId) {
		$.ajax({
			url: '/api/pictures/' + imgId,
			type: 'delete',
			dataType: 'json',

			success: function (respData) {
				console.log(respData);
				ApiActions.receivePicturesFromOneAlbum({pictures: respData});
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	transferImg: function (imgId, albumId) {
		$.ajax({
			url: '/api/transfer',
			type: 'patch',
			dataType: 'json',
			data: {imgId: imgId, albumId: albumId},

			success: function (respData) {
				console.log(respData);
				ApiActions.receivePicturesFromOneAlbum(respData);
				ApiActions.receiveAllAlbums(respData.albums);
			},
			error: function (respData) {
				console.log(respData);
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
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	createAlbum: function (data) {
		ComponentActions.toggleCreating('creating');
		$.ajax({
			url: '/api/albums/',
			type: 'post',
			dataType: 'json',
			data: data,

			success: function (respData) {
				ApiActions.createAlbum(respData);
			},
			error: function (respData) {
				console.log(respData);
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
			},
			error: function (respData) {
				console.log(respData);
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
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	}
};