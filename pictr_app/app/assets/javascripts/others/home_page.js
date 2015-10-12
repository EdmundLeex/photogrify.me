$(function () {
	$("#signup-btn").click(function (e) {
		e.preventDefault();
		var form = $(".overlay")
		form.removeClass("hidden");
		form.find("form").attr("action", "signup");
		form.find(".btn").attr("value", "Sign up");
	});

	$("#signin-btn").click(function (e) {
		e.preventDefault();
		var form = $(".overlay")
		form.removeClass("hidden");
		form.find("form").attr("action", "signin");
		form.find(".btn").attr("value", "Sign in");
	});

	$("#close-btn").click(function (e) {
		e.preventDefault();
		var form = $(".overlay")
		form.addClass("hidden");
	});
});