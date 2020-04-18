'use strict';

const BaseChart = require('./base-chart');
const { getTitles, getValues } = require('./helpers');

module.exports = class LineChart extends BaseChart {

	parse() {
		return {
			data: this._parseData(),
			options: this._options
		};
	}

	_parseData() {
		return [
			getTitles([
				this._dataHandlingProps.label,
				...this._dataHandlingProps.values
			]),
			// Data
			...this._data.map(row => this._parseRow(row))
		];
	}

	_parseRow(row) {
		return getValues(row, [
			this._dataHandlingProps.label,
			...this._dataHandlingProps.values
		]);
	}
};
