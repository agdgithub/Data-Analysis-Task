import React, { useEffect, useState } from 'react';
import { MantineProvider, Table } from '@mantine/core';
import { calculateFlavanoidsStats, calculateGammaStats, WineData, ClassWiseStats } from './utils';

const App: React.FC = () => {
  const [flavanoidsStats, setFlavanoidsStats] = useState<Record<string, ClassWiseStats>>({});
  const [gammaStats, setGammaStats] = useState<Record<string, ClassWiseStats>>({});

  useEffect(() => {
    // Fetch wine data from data.json
    fetch('/wine_data.json')
      .then((response) => response.json())
      .then((wineData: WineData[]) => {
        // Calculate statistics
        const flavanoidsStatsResult = calculateFlavanoidsStats(wineData);
        const gammaStatsResult = calculateGammaStats(wineData);

        // Update state
        setFlavanoidsStats(flavanoidsStatsResult);
        setGammaStats(gammaStatsResult);
      })
      .catch((error) => {
        console.error('Error fetching wine data:', error);
      });
  }, []);

  return (
    <MantineProvider>
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <h1>Wine Data Statistics</h1>

        {/* Flavanoids Table */}
        <h2>Flavanoids</h2>
          <Table style={{ borderCollapse: 'collapse', width: '50%', margin: '0 auto' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Measure</th>
              {Object.keys(flavanoidsStats).map((className) => (
                <th key={className} style={{ border: '1px solid black', padding: '8px' }}>{className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>Flavanoids Mean</td>
              {Object.values(flavanoidsStats).map((stats, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{isNaN(stats.Mean) ? 'N/A' : stats.Mean}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>Flavanoids Median</td>
              {Object.values(flavanoidsStats).map((stats, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{isNaN(stats.Median) ? 'N/A' : stats.Median}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>Flavanoids Mode</td>
              {Object.values(flavanoidsStats).map((stats, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{isNaN(stats.Mode) ? 'N/A' : stats.Mode}</td>
              ))}
            </tr>
          </tbody>
        </Table>

        <h2>Gamma</h2>
        <Table style={{ borderCollapse: 'collapse', width: '50%', margin: '0 auto' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Measure</th>
              {Object.keys(gammaStats).map((className) => (
                <th key={className} style={{ border: '1px solid black', padding: '8px' }}>{className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>Gamma Mean</td>
              {Object.values(gammaStats).map((stats, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{isNaN(stats.Mean) ? 'N/A' : stats.Mean}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>Gamma Median</td>
              {Object.values(gammaStats).map((stats, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{isNaN(stats.Median) ? 'N/A' : stats.Median}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>Gamma Mode</td>
              {Object.values(gammaStats).map((stats, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{isNaN(stats.Mode) ? 'N/A' : stats.Mode}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </MantineProvider>
  );
};

export default App;
