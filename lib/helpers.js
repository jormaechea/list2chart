'use strict';

const identity = x => x;

const getTitle = ({ source, title, titleMapper }) => {
	return (titleMapper || identity)(title || source);
};

/**
 * Maps an array of source definitions to an array of strings representing the titles.
 * A source definition is an object with the following properties:
 * - title {string}
 * - source {string}
 * - mapper {callable}. Receives a string and must return another
 *
 * @param {array<object>} sources The source definitions
 * @return {array<string>} The titles.
 */
module.exports.getTitles = sources => sources.map(getTitle);

const getValue = (row, { source, valueMapper }) => (valueMapper || identity)(row[source], row);

/**
 * Maps a row and an array of source definitions to an array of values.
 * A source definition is an object with the following properties:
 * - source {string}
 * - valueMapper {callable}. Receives a string and must return another
 *
 * @param {object} row The row with all the data
 * @param {array<object>} sources The source definitions
 * @return {array<any>} The values.
 */
module.exports.getValues = (row, sources) => sources.map(source => getValue(row, source));

const aggregate = (rows, {
	aggregate: aggregationField,
	target = aggregationField,
	aggregationOperation = 'count',
	groupTitleTarget,
	groups
}) => {

	const initialRows = groups.map(({ title }) => {
		return {
			[groupTitleTarget]: title,
			[target]: 0
		};
	});

	return rows.reduce((aggregated, row) => {
		const groupIndex = groups.findIndex(group => group.validator(row[aggregationField]));

		if(groupIndex < 0)
			return aggregated;

		if(aggregationOperation === 'count')
			aggregated[groupIndex][target]++;
		else if(aggregationOperation === 'sum')
			aggregated[groupIndex][target] += row[aggregationField];

		return aggregated;
	}, initialRows);
};

const processPipelineStep = (rows, step) => {

	if(step.map)
		return rows.map(row => step.map(row));

	if(step.aggregate)
		return aggregate(rows, step);

	return rows;
};

module.exports.processPipeline = (rows, pipeline) => pipeline.reduce((processedRows, step) => {
	return processPipelineStep(processedRows, step);
}, rows);
