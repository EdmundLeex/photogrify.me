// var editor = new Quill('#editor');
// var ReactQuill = require('react-quill');

var Editor = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	typingTimer: null,

	getInitialState: function() {
		return {
			theme: 'snow',
			enabled: true,
			readOnly: false,
			value: this.props.album.description,
			events: []
		};
	},

	componentDidMount: function () {
		AlbumStore.addAlbumUpdateListener(this._onSaved);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumUpdateListener(this._onSaved);
	},

	_onSaved: function () {
		// render some effects
	},

	onKeyDown: function () {
		var typingTimer = this.typingTimer;
		clearTimeout(typingTimer);
	},

	onKeyUp: function () {
		var onDoneTyping = this.onDoneTyping;
		var typingTimer = this.typingTimer;
		typingTimer = setTimeout(onDoneTyping, 10000);
	},

	onDoneTyping: function () {
		ApiUtil.updateAlbum(this.props.album.id, null, this.state.value);
	},

	formatRange: function(range) {
		return range
			? [range.start, range.end].join(',')
			: 'none';
	},

	onTextareaChange: function(event) {
		var value = event.target.value;
		this.setState({ value:value });
	},

	onEditorChange: function(value, delta, source) {
		this.setState({
			value: value,
			events: [
				'text-change('+this.state.value+' -> '+value+')'
			].concat(this.state.events)
		});
	},

	onEditorChangeSelection: function(range, source) {
		this.setState({
			selection: range,
			events: [
				'selection-change('+
					this.formatRange(this.state.selection)
				+' -> '+
					this.formatRange(range)
				+')'
			].concat(this.state.events)
		});
	},

	onToggle: function() {
		this.setState({ enabled: !this.state.enabled });
	},

	onToggleReadOnly: function() {
		this.setState({ readOnly: !this.state.readOnly });
	},

	onBlur: function () {
		// patch request
	},

	render: function () {
		return (
      <ReactQuill value={this.state.value}
      						theme={this.state.theme}
      						onChange={this.onEditorChange}
      						onChangeSelection={this.onEditorChangeSelection}
      						onBlur={this.onBlur}
      						onKeyDown={this.onKeyDown}
      						onKeyUp={this.onKeyUp} />
    );
	}
});



