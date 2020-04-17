'use strict';

const assert = require('assert');

const sampleData = require('../sample-data/line-chart');
const { LineChart } = require('../../lib');

describe('Line Chart', () => {

	it('Should parse the data and options properly', () => {

		const lineChart = new LineChart({
			label: {
				source: 'date'
			},
			values: [{
				source: 'quantity'
			}]
		});

		lineChart.setData(sampleData);

		const {
			data,
			options
		} = lineChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it('Should parse the data with multiple lines/values', () => {

		const lineChart = new LineChart({
			label: {
				source: 'date'
			},
			values: [{
				source: 'quantity'
			}, {
				source: 'double'
			}]
		});

		lineChart.setData(sampleData);

		const {
			data,
			options
		} = lineChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity', 'double'],
			['2020-04-15', 10, 20],
			['2020-04-16', 20, 40],
			['2020-04-17', 60, 120]
		]);
	});

	it('Should use label and values titles if present', () => {

		const lineChart = new LineChart({
			label: {
				source: 'date',
				title: 'Date'
			},
			values: [{
				source: 'quantity',
				title: 'Quantity'
			}]
		});

		lineChart.setData(sampleData);

		const {
			data,
			options
		} = lineChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['Date', 'Quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it('Should pass-through pie chart properties', () => {

		const lineChart = new LineChart({
			label: {
				source: 'date'
			},
			values: [{
				source: 'quantity'
			}]
		}, {
			title: 'My chart title',
			curveType: 'function',
			enableInteractivity: false,
			pointsVisible: true
		});

		lineChart.setData(sampleData);

		const {
			data,
			options
		} = lineChart.parse();

		assert.deepStrictEqual(options, {
			title: 'My chart title',
			curveType: 'function',
			enableInteractivity: false,
			pointsVisible: true
		});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

});
