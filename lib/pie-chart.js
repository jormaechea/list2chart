'use strict';

module.exports = class PieChart {

	constructor(dataHandlingProps, options = {}) {
		this._dataHandlingProps = dataHandlingProps;
		this._options = options;
	}

	setData(data) {
		this._data = data;
	}

	parse() {
		return {
			data: this._parseData(),
			options: this._options
		};
	}

	_parseData() {
		return [
			// Titles
			[
				this._getTitle(this._dataHandlingProps.label),
				this._getTitle(this._dataHandlingProps.value)
			],
			// Data
			...this._data.map(row => this._parseRow(row))
		];
	}

	_getTitle({ source, title }) {
		return title || source;
	}

	_parseRow(row) {
		return [
			row[this._dataHandlingProps.label.source],
			row[this._dataHandlingProps.value.source]
		];
	}
};
