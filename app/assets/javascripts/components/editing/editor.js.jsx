var quill;

var QEditor = React.createClass({
	componentDidMount: function () {
		quill = new Quill('#q-editor');
	},
});