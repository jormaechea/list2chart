'use strict';

module.exports = class LineChart {

	constructor(dataHandlingProps, options = {}) {
		this._dataHandlingProps = dataHandlingProps;
		this._options = options;
	}

	setData(data) {
		this._data = data;
	}

};
