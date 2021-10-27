import React, { useMemo } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import format from 'date-fns/format';
import { flatten, groupBy } from 'lodash';

import { useAppContext } from '../../../../contexts/AppContexts';
import { SERIE_TYPE_CONFIRMED } from '../../../../constants';
import { Place } from '../../../../types';

export default function LineChart() {
  const { placesConfirmed, placesDeaths, currentPosition, serieType } =
    useAppContext();

  const serie: Serie = useMemo(() => {
    const places =
      serieType === SERIE_TYPE_CONFIRMED ? placesConfirmed : placesDeaths;

    const reports = places.map((item: Place) =>
      item.reports
        .map((report) => ({
          ...report,
          date: format(report.date, 'dd/MM/yyyy'),
        }))
        .filter((_, index) => index <= currentPosition)
    );

    const flatReports = flatten(reports);

    const groupedByDate = groupBy(flatReports, 'date');

    const data = [];

    for (const key in groupedByDate) {
      const confirmedCases = groupedByDate[key].reduce(
        (a, b) => a + b.value,
        0
      );

      data.push({ x: key, y: confirmedCases });
    }

    return {
      id: 'Quantidade',
      data: data,
      color: serieType === SERIE_TYPE_CONFIRMED ? 'green' : 'red',
    };
  }, [placesDeaths, placesConfirmed, currentPosition, serieType]);

  return (
    <ResponsiveLine
      data={[serie]}
      margin={{ top: 32, right: 32, bottom: 136, left: 56 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickValues: [],
        tickRotation: 0,
        legend: 'Dias',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 4,
        tickValues: 8,
        tickRotation: 0,
        legend: 'Quantidade',
        legendOffset: -80,
        legendPosition: 'middle',
      }}
      colors={[serie.color]}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
