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

  HomePageTour: [
    {
      text: "Welcome to photogrify.me. Here's couple tips to help you get familiar with your private photo space.",
      selector: "div.logo.sidebar-thumbs",
      position: "center"
    },
    {
      text: "These are the buttons that you can use to navigate throughout the application.",
      selector: "div.sidebar-btn-group",
      position: "right"
    },
    {
      text: "Here you can search for your albums.",
      selector: "div.search-box",
      position: "bottom"
    },
    {
      text: "You can edit your title at any time.",
      selector: "div.title>input",
      position: "bottom"
    },
    {
      text: "And you can drag your picture to another album. To change the album cover, simple drag the picture you like to the cover area.",
      selector: "div.pictures-collection",
      position: "center"
    },
    {
      text: "By clicking the picture, you can see them in slideshow mode.",
      selector: "div.pictures-collection",
      position: "center"
    }
  ],

  NewEditPageTour: [
    {
      text: "Edit your album title by clicking the title bar.",
      selector: "div.title>input",
      position: "bottom"
    },
    {
      text: "Edit your album description here.",
      selector: "div.quill",
      position: "top"
    },
    {
      text: "All the changes you made are auto-save. So you will never need to worry losing it.",
      selector: "div.quill",
      position: "top"
    }
  ],

  MapTour: [
    {
      text: "On this page, you can find all your photos on the map. Rest assured, all your photos are guaranteed private" +
        "(If you disabled sharing the geolocation on your camera, your photo won't show up the map)",
      selector: "div.map",
      position: "center"
    },
    {
      text: "You can click this triangle to collapse the side panel.",
      selector: "div.collapse-btn",
      position: "left"
    }
  ],

  ConsolPrint: function () {
    console.log('%c       _/_/_/    _/      _/    _/_/_/   _/_/_/_/_/    _/_/_/      _/_/_/    _/_/_/   _/_/_/_/  _/       _/ ', 'color: #46BCEC');
    console.log('%c     _/     _/  _/      _/  _/      _/     _/      _/      _/  _/      _/    _/     _/          _/    _/   ', 'color: #46BCEC');
    console.log('%c    _/     _/  _/_/_/_/_/  _/      _/     _/      _/      _/  _/            _/     _/_/_/_/      _/ _/     ', 'color: #46BCEC');
    console.log('%c   _/_/_/_/   _/      _/  _/      _/     _/      _/      _/  _/    _/_/    _/     _/             _/        ', 'color: #46BCEC');
    console.log('%c  _/         _/      _/  _/      _/     _/      _/      _/  _/      _/    _/     _/             _/         ', 'color: #46BCEC');
    console.log('%c _/         _/      _/    _/_/_/       _/        _/_/_/     _/_/_/_/   _/_/_/   _/             _/          ', 'color: #46BCEC');
    console.log("Interested in hiring? See my Linked in profile or contact me by edmund.xz.lee@gmail.com");
    console.log("Just wanted to peek under the hood? Head to my github repo and check it out");
    console.log("https://github.com/EdmundLeex");
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