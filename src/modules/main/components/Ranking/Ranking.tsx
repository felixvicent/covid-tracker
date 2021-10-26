import React from "react";
import clsx from 'clsx';

import styles from "./Ranking.module.css";

export default function Ranking() {
  return (
    <>
      <h4 className={styles.title}>Ranking de Países</h4>
      <ol className={styles.listContainer}>
        <li className={clsx(styles.card, styles.listHeader)}>
          <div>Nº</div>
          <div>País</div>
          <div>Casos</div>
        </li>
        <li className={styles.card}>
          <div>1</div>
          <div>País</div>
          <div>500</div>
        </li>
      </ol>
    </>
  )
}