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
