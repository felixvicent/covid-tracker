import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import Slider from 'react-input-slider';
import format from 'date-fns/format';

import { useAppContext } from '../../../../contexts/AppContexts';

import styles from './TimelinePlayer.module.css';

const sliderStyles = {
  active: {},
  thumb: {
    background: '#f1f1f1',
    width: 10,
    height: 10,
    transition: 'all 250ms ease-in-out',
    '&:hover': {
      width: 15,
      height: 15,
    },
  },
  track: {
    width: '50%',
    background: '#123e8e',
    borderRadius: 4,
    height: 4,
  },
};

export default function TimelimePlayer() {
  const [play, setPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { updatePosition, currentPosition, date, lastPosition } =
    useAppContext();

  useEffect(() => {
    if (currentPosition === lastPosition || !play) {
      setPlay(false);
      return;
    }

    const timer = setInterval(() => {
      updatePosition(currentPosition + 1);
    }, 300);

    return () => clearInterval(timer);
  }, [play, updatePosition, currentPosition, lastPosition]);

  return (
    <div className={styles.container}>
      <span className={styles.date}>
        {date ? format(date, 'dd/MM/yyyy') : '--/--/----'}
      </span>
      <button
        className={styles.button}
        onClick={() => {
          if (lastPosition === currentPosition) {
            updatePosition(0);
          }
          setPlay((isPlaying) => !isPlaying);
        }}
      >
        {play ? (
          <FaPause className={styles.play} />
        ) : (
          <FaPlay className={styles.play} />
        )}
      </button>
      <Slider
        axis="x"
        xreverse={false}
        yreverse={false}
        xmin={0}
        xmax={lastPosition}
        x={currentPosition}
        styles={sliderStyles}
        onChange={({ x }) => {
          updatePosition(x);
        }}
      />
    </div>
  );
}
