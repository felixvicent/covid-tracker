import React from 'react';
import clsx from 'clsx';
import groupBy from 'lodash/groupBy';

import { useAppContext } from '../../../../contexts/AppContexts';
import styles from './Ranking.module.css';

export default function Ranking() {
  const { currentPandemicState } = useAppContext();

  const dict = groupBy(currentPandemicState, 'country');

  const groupedByCountry = Object.entries(dict)
    .map(([key, value]) => ({
      country: key,
      value: value.reduce((a, b) => a + b.value, 0),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <h4 className={styles.title}>Ranking de Países</h4>
      <ol className={styles.listContainer}>
        <li className={clsx(styles.card, styles.listHeader)}>
          <div>Nº</div>
          <div>País</div>
          <div>Casos</div>
        </li>
        {groupedByCountry.map(({ country, value }, index) => (
          <li
            key={country}
            className={styles.card}
            style={{
              zIndex: groupedByCountry.length - index,
              top: `calc(${index + 1} * var(--height))`,
            }}
          >
            <div>{index + 1}</div>
            <div>{country}</div>
            <div>{value}</div>
          </li>
        ))}
      </ol>
    </>
  );
}
