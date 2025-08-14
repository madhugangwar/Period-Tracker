export interface PeriodData {
  date: string;
  flow: 'light' | 'medium' | 'heavy';
}

export interface SymptomData {
  date: string;
  symptoms: string[];
}

export interface CycleData {
  startDate: string;
  endDate: string;
  length: number;
  cycleLength: number;
}

export interface PredictionData {
  nextPeriodStart: string;
  nextPeriodEnd: string;
  ovulationDate: string;
  fertilityWindow: {
    start: string;
    end: string;
  };
}

export interface CycleStats {
  averageCycleLength: number;
  averagePeriodLength: number;
  totalCycles: number;
  lastPeriodDate: string;
  nextPredictedPeriod: string;
}