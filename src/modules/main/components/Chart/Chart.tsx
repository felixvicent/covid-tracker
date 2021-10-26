import React from "react";

import LineChart from "./LineChart";
import styles from './Chart.module.css';

export default function Chart() {
  return (
    <>
      <h4 className={styles.title}>Curva de crescimento da Covid-19</h4>
      <div className={styles.radio}>
        <input
          id="confirmed"
          type="radio"
          name="serie"
          className={styles.confirmed}
          checked={true} />
        <label htmlFor="confirmed">Casos confirmados</label>

        <div>
          <input
            id="deaths"
            type="radio"
            name="serie"
            className={styles.deaths}
            checked={true} />
        </div>
        <label htmlFor="deaths">Mortes confirmados</label>

      </div>
      <LineChart />
    </>
  )
}