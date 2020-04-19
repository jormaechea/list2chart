'use strict';

const assert = require('assert');

const sampleData = require('../sample-data/pie-chart');
const { PieChart } = require('../../lib');

describe('Pie Chart', () => {

	it('Should parse the data and options properly', () => {

		const pieChart = new PieChart({
			label: {
				source: 'name'
			},
			value: {
				source: 'quantity'
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity'],
			['First element', 10],
			['Second element', 20],
			['Third element', 60]
		]);
	});

	it('Should use label and value titles if present', () => {

		const pieChart = new PieChart({
			label: {
				source: 'name',
				title: 'Name'
			},
			value: {
				source: 'quantity',
				title: 'Quantity'
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['Name', 'Quantity'],
			['First element', 10],
			['Second element', 20],
			['Third element', 60]
		]);
	});

	it('Should pass-through pie chart properties', () => {

		const pieChart = new PieChart({
			label: {
				source: 'name'
			},
			value: {
				source: 'quantity'
			}
		}, {
			title: 'My chart title',
			is3D: true,
			pieHole: 0.4,
			pieStartAngle: 100
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {
			title: 'My chart title',
			is3D: true,
			pieHole: 0.4,
			pieStartAngle: 100
		});

		assert.deepStrictEqual(data, [
			['name', 'quantity'],
			['First element', 10],
			['Second element', 20],
			['Third element', 60]
		]);
	});

	it('Should map a value by it\'s given valueMapper', () => {

		const pieChart = new PieChart({
			label: {
				source: 'name'
			},
			value: {
				source: 'quantity',
				valueMapper: v => v * 10
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity'],
			['First element', 100],
			['Second element', 200],
			['Third element', 600]
		]);
	});

	it('Should map a label by it\'s given valueMapper', () => {

		const pieChart = new PieChart({
			label: {
				source: 'name',
				valueMapper: s => s.toUpperCase()
			},
			value: {
				source: 'quantity'
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity'],
			['FIRST ELEMENT', 10],
			['SECOND ELEMENT', 20],
			['THIRD ELEMENT', 60]
		]);
	});

	it('Should map a title by it\'s given titleMapper', () => {

		const pieChart = new PieChart({
			label: {
				source: 'name',
				titleMapper: s => s.toUpperCase()
			},
			value: {
				source: 'quantity',
				titleMapper: s => `The ${s}`
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['NAME', 'The quantity'],
			['First element', 10],
			['Second element', 20],
			['Third element', 60]
		]);
	});

	it('Should aggregate data by it\'s given pipeline with the default aggregationOperation', () => {

		const pieChart = new PieChart({
			pipeline: [
				{
					map: ({ quantity, id, ...row }) => ({ ...row, quantity: quantity + id })
				},
				{
					aggregate: 'quantity',
					groupTitleTarget: 'type',
					groupSelector: ({ quantity }) => ((quantity % 2) === 1 ? 'odd' : 'even')
				}
			],
			label: {
				source: 'type'
			},
			value: {
				source: 'quantity'
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['type', 'quantity'],
			['odd', 2],
			['even', 1]
		]);
	});

	it('Should aggregate data by it\'s given pipeline with a custom aggregationOperation', () => {

		const pieChart = new PieChart({
			pipeline: [
				{
					aggregate: 'quantity',
					aggregationOperation: 'sum',
					groupTitleTarget: 'sum',
					groupSelector: () => 'total'
				}
			],
			label: {
				source: 'sum'
			},
			value: {
				source: 'quantity'
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['sum', 'quantity'],
			['total', 90]
		]);
	});

	it('Should skip data pipeline if it\'s type is not recognized', () => {

		const pieChart = new PieChart({
			pipeline: [
				{
					justUnknown: true
				}
			],
			label: {
				source: 'name'
			},
			value: {
				source: 'quantity'
			}
		});

		pieChart.setData(sampleData);

		const {
			data,
			options
		} = pieChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity'],
			['First element', 10],
			['Second element', 20],
			['Third element', 60]
		]);
	});

});
