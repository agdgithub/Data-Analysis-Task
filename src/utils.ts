// utils.ts
export interface WineData {
  Alcohol: number;
  Flavanoids: number | string;
  Ash: number | string;
  Hue: number | string;
  Magnesium: number | string;
}

export interface ClassWiseStats {
  Mean: number;
  Median: number;
  Mode: number;
}

export const calculateFlavanoidsStats = (data: WineData[]): Record<string, ClassWiseStats> => {
  const classWiseData: { [key: string]: number[] } = {};

  data.forEach((wine) => {
    const className = `Class ${wine.Alcohol}`;
    let flavanoidValue: number | string = wine.Flavanoids;

    if (typeof wine.Flavanoids === 'string') {
      flavanoidValue = parseFloat(wine.Flavanoids);
      console.log(`Converted string "${wine.Flavanoids}" to number: ${flavanoidValue}`);
    }
    
    if (!classWiseData[className]) {
      classWiseData[className] = [];
    }
    classWiseData[className].push(flavanoidValue as number);
  });

  const stats: Record<string, ClassWiseStats> = {};

  for (const className in classWiseData) {
    const values = classWiseData[className];
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)];
    
    let mode: number | undefined;
    let maxCount = 0;
    
    const counts: { [key: number]: number } = {};
    
    values.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
      if (counts[value] > maxCount) {
        maxCount = counts[value];
        mode = value;
      }
    });
    
    stats[className] = {
      Mean: parseFloat(mean.toFixed(3)),
      Median: parseFloat(median.toFixed(3)),
      Mode: mode !== undefined ? parseFloat(mode.toFixed(3)) : 0,
    };
  }

  return stats;
};

export const calculateGammaStats = (data: WineData[]): Record<string, ClassWiseStats> => {
  const classWiseData: { [key: string]: number[] } = {};

  data.forEach((wine) => {
    const className = `Class ${wine.Alcohol}`;
    let ashValue: number | string = wine.Ash;
    let hueValue: number | string = wine.Hue;
    let magnesiumValue: number | string = wine.Magnesium;

    if (typeof wine.Ash === 'string') {
      ashValue = parseFloat(wine.Ash);
      console.log(`Converted string "${wine.Ash}" to number for Ash: ${ashValue}`);
    }
    if (typeof wine.Hue === 'string') {
      hueValue = parseFloat(wine.Hue);
      console.log(`Converted string "${wine.Hue}" to number for Hue: ${hueValue}`);
    }
    if (typeof wine.Magnesium === 'string') {
      magnesiumValue = parseFloat(wine.Magnesium);
      console.log(`Converted string "${wine.Magnesium}" to number for Magnesium: ${magnesiumValue}`);
    }

    const gamma = (ashValue as number) * (hueValue as number) / (magnesiumValue as number);
    
    if (!classWiseData[className]) {
      classWiseData[className] = [];
    }
    classWiseData[className].push(gamma);
  });

  const stats: Record<string, ClassWiseStats> = {};

  for (const className in classWiseData) {
    const values = classWiseData[className];
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)];
    
    let mode: number | undefined;
    let maxCount = 0;
    
    const counts: { [key: number]: number } = {};
    
    values.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
      if (counts[value] > maxCount) {
        maxCount = counts[value];
        mode = value;
      }
    });
    
    stats[className] = {
      Mean: parseFloat(mean.toFixed(3)),
      Median: parseFloat(median.toFixed(3)),
      Mode: mode !== undefined ? parseFloat(mode.toFixed(3)) : 0,
    };
  }

  return stats;
};