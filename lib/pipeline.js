'use strict';

const aggregate = (rows, {
	aggregate: aggregationField,
	target = aggregationField,
	aggregationOperation = 'count',
	groupTitleTarget,
	groupSelector
}) => {

	const indexedAggregation = rows.reduce((aggregated, row) => {

		const groupName = groupSelector(row);

		if(!aggregated[groupName]) {
			aggregated[groupName] = {
				[groupTitleTarget]: groupName,
				[target]: 0
			};
		}

		if(aggregationOperation === 'sum')
			aggregated[groupName][target] += row[aggregationField];
		else // Default is 'count'
			aggregated[groupName][target]++;

		return aggregated;
	}, {});

	return Object.values(indexedAggregation);
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
