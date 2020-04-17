'use strict';

const getTitle = ({ source, title }) => {
	return title || source;
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
