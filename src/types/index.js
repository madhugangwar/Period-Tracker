// types.js
// Ye file JavaScript me type information sirf documentation ke liye rakhegi

/**
 * @typedef {Object} PeriodData
 * @property {string} date
 * @property {'light' | 'medium' | 'heavy'} flow
 */

/**
 * @typedef {Object} SymptomData
 * @property {string} date
 * @property {string[]} symptoms
 */

/**
 * @typedef {Object} CycleData
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} length
 * @property {number} cycleLength
 */

/**
 * @typedef {Object} PredictionData
 * @property {string} nextPeriodStart
 * @property {string} nextPeriodEnd
 * @property {string} ovulationDate
 * @property {{ start: string, end: string }} fertilityWindow
 */

/**
 * @typedef {Object} CycleStats
 * @property {number} averageCycleLength
 * @property {number} averagePeriodLength
 * @property {number} totalCycles
 * @property {string} lastPeriodDate
 * @property {string} nextPredictedPeriod
 */
