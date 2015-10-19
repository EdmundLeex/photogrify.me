var QEditor = React.createClass({
	// mixins: [React.addons.LinkedStateMixin],

	typingTimer: {},

	// validEdit: function () {
	// 	return (this.props.mode === 'edit' && typeof this.props.album !== 'undefined');
	// },

	getInitialState: function() {
		// var description,
		// 		albumId;
		// if (this.validEdit()) {
		// 	description = this.props.album.description;
		// 	albumId = this.props.album.id;
		// } else {
		// 	description = "";
		// }

		return {
			// albumId: albumId,
			theme: 'snow',
			enabled: true,
			readOnly: false,
			value: this.props.description,
			events: [],
			// mode: this.props.mode
		};
	},

	componentWillUnmount: function () {
		if (this.typingTimer.typing) {clearTimeout(this.typingTimer.typing)};
		delete(this.typingTimer.typing);
		this.onDoneTyping();
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({value: nextProps.description});
	},

	// componentWillUnmount: function () {
	// 	AlbumStore.removeAlbumUpdateListener(this._onSaved);
	// 	AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
	// 	if (this.state.albumId) {
	// 		ApiUtil.updateAlbum(this.state.albumId, null, this.state.value);
	// 		if (this.typingTimer.typing) {clearTimeout(this.typingTimer.typing)};
	// 		delete(this.typingTimer.typing);
	// 	}
	// },

	onKeyDown: function () {
		if (this.typingTimer.typing) {clearTimeout(this.typingTimer.typing)};
		delete(this.typingTimer.typing);
	},

	onKeyUp: function () {
		var onDoneTyping = this.onDoneTyping;
		if (typeof this.typingTimer.typing == 'undefined') {
			this.typingTimer.typing = setTimeout(onDoneTyping, 5000)
		};
	},

	onDoneTyping: function () {
		console.log('done');
		this.props.onDoneTyping({description: this.state.value});
	},

	// onBlur: function () {
	// 	this.onDoneTyping
	// },

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

	render: function () {
		console.log('rendered');
		return (
      <ReactQuill value={this.state.value}
      						theme={this.state.theme}
      						onChange={this.onEditorChange}
      						onChangeSelection={this.onEditorChangeSelection}
      						onKeyDown={this.onKeyDown}
      						onKeyUp={this.onKeyUp} />
    );
	}
});




// var quill;

// var QEditor = React.createClass({
// 	componentDidMount: function () {
// 		quill = new Quill('#q-editor', {
// 			theme: 'snow'
// 		});

// 		quill.addModule('toolbar', { container: '#toolbar' });
// 	},

// 	render: function () {
// 		return (
// 			<div className="q-editor">
// 				<div id="toolbar">
// 				  <select className="ql-size">
// 				    <option value="10px">Small</option>
// 				    <option value="13px" selected>Normal</option>
// 				    <option value="18px">Large</option>
// 				    <option value="32px">Huge</option>
// 				  </select>
// 				  <button className="ql-bold"></button>
// 				</div>
// 				<div id="q-editor">
// 				</div>
// 			</div>
// 		);
// 	}
// });