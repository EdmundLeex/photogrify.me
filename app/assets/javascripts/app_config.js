window.APP_CONFIG = {
	CLOUDINARY_CONFIG: {
		cloud_name: 'edmundleex',
		upload_preset: 'k24aopiw',
		theme: 'minimal'
	},

	THUMBNAIL_SIZE: 'w_220,h_220,c_fill',

	INDEX_COVER_SIZE: 'w_350,h_120,c_fill',

    MAP_PREVIEW_SIZE: 'w_120,h_120,c_fill',

	FRAME_SIZE: 'h_600',

	ImageUrlByOptions: function (url, optionsStr) {
		url = url.split('/');
		var insert_index = url.indexOf('upload') + 1;
		url.splice(insert_index, 0, optionsStr);
		return url.join('/');
	},

	MAP_STYLE: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
	// INDEX_COVER_SIZE: 'w_350,c_fill,g_center' for moving pic when hover
};