// var editor = new Quill('#editor');
// var ReactQuill = require('react-quill');

var Editor = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	typingTimer: {},

	validEdit: function () {
		return (this.props.mode === 'edit' && typeof this.props.album !== 'undefined');
	},

	getInitialState: function() {
		var description,
				albumId;
		if (this.validEdit()) {
			description = this.props.album.description;
			albumId = this.props.album.id;
		} else {
			description = "";
		}

		return {
			albumId: albumId,
			theme: 'snow',
			enabled: true,
			readOnly: false,
			value: description,
			events: [],
			mode: this.props.mode
		};
	},

	componentDidMount: function () {
		AlbumStore.addAlbumUpdateListener(this._onSaved);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumUpdateListener(this._onSaved);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
		if (this.state.albumId) {
			ApiUtil.updateAlbum(this.state.albumId, null, this.state.value);
			if (this.typingTimer.typing) {clearTimeout(this.typingTimer.typing)};
			delete(this.typingTimer.typing);
		}
	},

	_onSaved: function () {
		// render some effects
	},

	_onAlbumCreated: function () {
		this.setState({mode: 'edit', albumId: AlbumStore.latestAlbum().id});
	},

	onKeyDown: function () {
		if (this.typingTimer.typing) {clearTimeout(this.typingTimer.typing)};
		delete(this.typingTimer.typing);
	},

	onKeyUp: function () {
		var onDoneTyping = this.onDoneTyping;
		this.typingTimer.typing = setTimeout(onDoneTyping, 5000);
	},

	onDoneTyping: function () {
		if (this.state.mode === 'edit') {
			ApiUtil.updateAlbum(this.state.albumId, null, this.state.value);
		} else {
			ApiUtil.createAlbum({description: this.state.value});
		}
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
		debugger
		ComponentActions.toggleEditing(false);
		if (this.props.mode === 'edit' ||
			this.props.mode === 'view' ||
			AlbumStore.newAlbumId()) {
			ApiUtil.updateAlbum(this.props.album.id, null, this.state.value);
		} else {
			ApiUtil.createAlbum({description: this.state.value});
		}
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



