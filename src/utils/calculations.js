import { addDays, differenceInDays } from './dateUtils';

/**
 * @param {Array<PeriodData>} periodData
 * @returns {PredictionData | null}
 */
export const calculatePredictions = (periodData) => {
  if (periodData.length < 2) return null;

  // Group consecutive period days into cycles
  const cycles = groupPeriodIntoCycles(periodData);
  if (cycles.length < 2) return null;

  // Calculate average cycle length
  const cycleLengths = cycles.slice(0, -1).map((cycle, index) => {
    const nextCycle = cycles[index + 1];
    return differenceInDays(new Date(nextCycle.startDate), new Date(cycle.startDate));
  });

  const averageCycleLength = Math.round(
    cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length
  );

  const lastCycle = cycles[cycles.length - 1];
  const nextPeriodStart = addDays(new Date(lastCycle.startDate), averageCycleLength);
  const nextPeriodEnd = addDays(nextPeriodStart, lastCycle.length);

  // Ovulation typically occurs 14 days before the next period
  const ovulationDate = addDays(nextPeriodStart, -14);
  
  // Fertility window is typically 5 days before ovulation to 1 day after
  const fertilityStart = addDays(ovulationDate, -5);
  const fertilityEnd = addDays(ovulationDate, 1);

  return {
    nextPeriodStart: nextPeriodStart.toISOString().split('T')[0],
    nextPeriodEnd: nextPeriodEnd.toISOString().split('T')[0],
    ovulationDate: ovulationDate.toISOString().split('T')[0],
    fertilityWindow: {
      start: fertilityStart.toISOString().split('T')[0],
      end: fertilityEnd.toISOString().split('T')[0],
    },
  };
};

/**
 * @param {Array<PeriodData>} periodData
 * @returns {CycleStats}
 */
export const getCycleStats = (periodData) => {
  const cycles = groupPeriodIntoCycles(periodData);
  
  if (cycles.length === 0) {
    return {
      averageCycleLength: 0,
      averagePeriodLength: 0,
      totalCycles: 0,
      lastPeriodDate: '',
      nextPredictedPeriod: '',
    };
  }

  // Calculate average period length
  const averagePeriodLength = Math.round(
    cycles.reduce((sum, cycle) => sum + cycle.length, 0) / cycles.length
  );

  // Calculate average cycle length
  let averageCycleLength = 0;
  if (cycles.length > 1) {
    const cycleLengths = cycles.slice(0, -1).map((cycle, index) => {
      const nextCycle = cycles[index + 1];
      return differenceInDays(new Date(nextCycle.startDate), new Date(cycle.startDate));
    });
    averageCycleLength = Math.round(
      cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length
    );
  }

  const lastCycle = cycles[cycles.length - 1];
  const predictions = calculatePredictions(periodData);

  return {
    averageCycleLength,
    averagePeriodLength,
    totalCycles: cycles.length,
    lastPeriodDate: lastCycle.startDate,
    nextPredictedPeriod: predictions?.nextPeriodStart || '',
  };
};

/**
 * @param {Array<PeriodData>} periodData
 * @returns {Array<CycleData>}
 */
const groupPeriodIntoCycles = (periodData) => {
  if (periodData.length === 0) return [];

  const sortedData = [...periodData].sort((a, b) => a.date.localeCompare(b.date));
  const cycles = [];
  let currentCycle = [];

  for (let i = 0; i < sortedData.length; i++) {
    const currentDate = new Date(sortedData[i].date);
    const prevDate = i > 0 ? new Date(sortedData[i - 1].date) : null;

    // Start a new cycle if this is the first day or there's a gap > 7 days
    if (!prevDate || differenceInDays(currentDate, prevDate) > 7) {
      if (currentCycle.length > 0) {
        cycles.push({
          startDate: currentCycle[0],
          endDate: currentCycle[currentCycle.length - 1],
          length: currentCycle.length,
          cycleLength: 0, // Will be calculated later
        });
      }
      currentCycle = [sortedData[i].date];
    } else {
      currentCycle.push(sortedData[i].date);
    }
  }

  // Add the last cycle
  if (currentCycle.length > 0) {
    cycles.push({
      startDate: currentCycle[0],
      endDate: currentCycle[currentCycle.length - 1],
      length: currentCycle.length,
      cycleLength: 0,
    });
  }

  return cycles;
};
