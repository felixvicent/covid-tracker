import parseCsv from 'csv-parse/lib/sync';
import parseDate from 'date-fns/parse';
import { DocumentData, Place } from '../types';

async function getDataFromGithub(url: string) {
  const response = await fetch(url);
  const text = await response.text();

  return parseCsv(text, {
    columns: true,
  });
}

function parseDataToPlaces(reports: DocumentData[]): Place[] {
  const dataKeys = Object.keys(reports[0]).filter((key) =>
    /^(\d+)\/(\d+)\/(\d+)$/g.test(key)
  );

  return reports.map((row) => ({
    country: row['Country/Region'],
    location: {
      lat: Number(row?.['Lat']),
      lng: Number(row?.['Lng']),
    },
    reports: dataKeys
      .map((date) => ({
        date: parseDate(date, 'M/d/yy', new Date()),
        value: Number(row?.[date] ?? 0),
      }))
      .sort((reportA, reportB) =>
        Math.sign(reportA.date.getTime() - reportB.date.getTime())
      ),
  }));
}

export default async function fetchData() {
  const data = await Promise.all([
    getDataFromGithub(process.env.REACT_APP_CSV_CONFIRMED_URL!),
    getDataFromGithub(process.env.REACT_APP_CSV_DEATHS_URL!),
  ]);

  const [confirmed = [], deaths = []] = data.map(parseDataToPlaces);

  return {
    confirmed,
    deaths,
  };
}
