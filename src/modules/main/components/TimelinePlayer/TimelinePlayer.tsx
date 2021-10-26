import React from "react";
import { FaPlay } from "react-icons/fa";
import Slider from 'react-input-slider';

import styles from "./TimelinePlayer.module.css";

const sliderStyles = {
  active: {},
  thumb: {
    background: '#f1f1f1',
    width: 10,
    height: 10,
    transition: 'all 250ms ease-in-out',
    "&:hover": {
      width: 15,
      height: 15,
    }
  },
  track: {
    width: "50%",
    background: "#123e8e",
    borderRadius: 4,
    height: 4,
  },
}

export default function TimelimePlayer() {
  return (
    <div className={styles.container}>
      <span className={styles.date}>00/00/0000</span>
      <button className={styles.button}>
        <FaPlay className={styles.play} />
      </button>
      <Slider
        axis="x"
        xreverse={false}
        yreverse={false}
        xmin={0}
        xmax={100}
        x={0}
        styles={sliderStyles}
      />
    </div>
  )
}