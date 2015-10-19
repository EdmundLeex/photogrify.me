window.ApiActions = {
	receiveAllPictures: function (pictures) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALL_PICTURES_RECEIVED,
			pictures: pictures
		});
	},

	receiveAllAlbums: function (albums) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUMS_RECEIVED,
			albums: albums
		});
	},

	receivePicturesFromOneAlbum: function (payload) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_PICTURES_RECEIVED,
			album: payload.album,
			pictures: payload.pictures
		});
	},

	createAlbum: function (payload) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_CREATED,
			album: payload
		});
	},

	updatedAlbum: function (albums) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_UPDATED,
			albums: albums
		});
	},

	savedDescription: function (description) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_DESCRIPTION_SAVED,
			description: description
		});
	}
};