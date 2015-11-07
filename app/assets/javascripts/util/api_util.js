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
				// no op
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
				// no op
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
				// no op
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
				// no op
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
				ComponentActions.slideOut(true);
			},
			error: function (respData) {
				// no op
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
				// no op
			}
		});
	},

	fetchAllAlbums: function () {
		$.ajax({
			url: '/api/albums',
			type: 'get',
			dataType: 'json',

			success: function (respData) {
				var albumId = respData.albums[0].id;
				ApiActions.receiveAllAlbums(respData.albums);
			},
			error: function (respData) {
				// no op
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
				// no op
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
				// no op
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
				ComponentActions.slideOut(true);
			},
			error: function (respData) {
				// no op
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
				// no op
			}
		});
	}
};