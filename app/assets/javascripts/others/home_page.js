$(function () {
	$("#signup-btn").click(function (e) {
		e.preventDefault();
		clearFlash();
		var overlay = $(".overlay");
		overlay.removeClass("behind");
		overlay.find(".submit-btn").attr("value", "Sign up");
		overlay.find("form").attr("action", "signup");
	});

	$("#guest-btn").click(function (e) {
		e.preventDefault();
		clearFlash();
		var overlay = $(".overlay");
		var form = $("#auth-form");
		overlay.find(".submit-btn").attr("value", "Sign in");
		overlay.find("form").attr("action", "signin");
		overlay.removeClass("behind");
		setTimeout(fillForm.bind(null, form), 250);
	});

	$("#signin-btn").click(function (e) {
		e.preventDefault();
		clearFlash();
		var overlay = $(".overlay");
		overlay.removeClass("behind");
		overlay.find(".submit-btn").attr("value", "Sign in");
		overlay.find("form").attr("action", "signin");
	});

	$("#close-btn").click(function (e) {
		e.preventDefault();
		var form = $(".overlay");
		form.addClass("behind");
	});

	function clearFlash() {
		var alerts = $(".alert");
		if (alerts.length) {
			for (var i = 0; i < alerts.length; i++) {
				alerts[i].remove();
			}
		}
	}

	function fillForm(form) {
		form.find("#username").typed({
			strings: ["demo"],
			typeSpeed: 5,
			attr: "value",
			callback: function () {
				form.find("#password").typed({
					strings: ["secret"],
					typeSpeed: 5,
					attr: "value",
					callback: function () {
						form.submit();
					}
				});
			}
		});
	}
});