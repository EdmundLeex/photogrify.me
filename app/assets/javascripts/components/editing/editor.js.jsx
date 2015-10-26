var QEditor = React.createClass({
	typingTimer: {},

	getInitialState: function() {
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
		this.props.onDoneTyping({description: this.state.value});
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

	render: function () {
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