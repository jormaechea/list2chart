'use strict';

const { processPipeline } = require('./pipeline');

module.exports = class LineChart {

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
			options: this._parseOptions()
		};
	}

	_parseData() {

		const { pipeline } = this._dataHandlingProps;

		return pipeline ? processPipeline(this._data, pipeline) : this._data;
	}

	_parseOptions() {
		return this._options;
	}

};
