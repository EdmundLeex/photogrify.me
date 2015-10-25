window.ApiUtil = {
	fetchAllPictures: function () {
		$.ajax({
			url: '/api/pictures',
			type: 'get',
			dataType: 'json',

			success: function (respData) {
				ApiActions.receiveAllPictures(respData.pictures);
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

	fetchPicturesByFilter: function () {
		var filter = FilterParamsStore.params();
		$.ajax({
			url: '/api/pictures/',
			type: 'get',
			data: filter,

			success: function (respData) {
				ApiActions.receiveAllPictures(respData.pictures);
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
				ComponentActions.newMsg(respData.msg);
				ApiActions.receivePicturesFromOneAlbum(respData);
				ComponentActions.showConfirmation(false);
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
				ComponentActions.newMsg(respData.msg);
				ApiActions.receivePicturesFromOneAlbum(respData);
				ApiActions.receiveAllAlbums(respData.albums);
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	updateAlbumCover: function (imgId) {
		$.ajax({
			url: '/api/update_cover',
			type: 'patch',
			dataType: 'json',
			data: {imgId: imgId},

			success: function (respData) {
				ComponentActions.newMsg(respData.msg);
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
				var albumId = respData.albums[0].id;
				ApiActions.receiveAllAlbums(respData.albums);

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
				ComponentActions.newMsg("New album created.");
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
				ComponentActions.newMsg(respData.msg);
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	deleteAlbum: function (id, callback) {
		ComponentActions.deletingAlbum(true);
		$.ajax({
			url: '/api/albums/' + id,
			type: 'delete',
			dataType: 'json',

			success: function (respData) {
				ApiActions.receiveAllAlbums(respData.albums);
				ComponentActions.newMsg(respData.msg);
				callback();
				ComponentActions.deletingAlbum(false);
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	},

	logout: function () {
		ComponentActions.loggingOut(true);
		$.ajax({
			url: '/logout',
			type: 'delete',
			dataType: 'json',

			success: function (respData) {
				ComponentActions.newMsg(respData.msg);
				window.location.href = respData.redirect;
			},
			error: function (respData) {
				console.log(respData);
			}
		});
	}
};