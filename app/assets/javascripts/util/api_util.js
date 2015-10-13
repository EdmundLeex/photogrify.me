window.ApiUtil = {
	fetchAllPictures: function () {
		// body...
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