import React from 'react';

import LineChart from './LineChart';
import styles from './Chart.module.css';

import { useAppContext } from '../../../../contexts/AppContexts';

import { SERIE_TYPE_CONFIRMED, SERIE_TYPE_DEATHS } from '../../../../constants';

export default function Chart() {
  const { serieType, setSerieType } = useAppContext();

  return (
    <>
      <h4 className={styles.title}>Curva de crescimento da Covid-19</h4>
      <div className={styles.radio}>
        <input
          id={SERIE_TYPE_CONFIRMED}
          value={SERIE_TYPE_CONFIRMED}
          type="radio"
          name={SERIE_TYPE_CONFIRMED}
          className={styles.confirmed}
          onChange={(e) => setSerieType(e.target.value)}
          checked={serieType === SERIE_TYPE_CONFIRMED}
        />
        <label htmlFor={SERIE_TYPE_CONFIRMED}>Casos confirmados</label>

        <div>
          <input
            id={SERIE_TYPE_DEATHS}
            value={SERIE_TYPE_DEATHS}
            type="radio"
            name={SERIE_TYPE_DEATHS}
            className={styles.deaths}
            onChange={(e) => setSerieType(e.target.value)}
            checked={serieType === SERIE_TYPE_DEATHS}
          />
        </div>
        <label htmlFor="deaths">Mortes confirmados</label>
      </div>
      <LineChart />
    </>
  );
}
