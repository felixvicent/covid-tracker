import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';

import { Place, PandemicState } from '../types';
import { SERIE_TYPE_CONFIRMED } from '../constants';
import fetchData from '../services/fetchData';

type Contextvalue = {
  date?: Date;
  lastPosition: number;
  currentPosition: number;
  serieType: string;
  placesConfirmed: Place[];
  placesDeaths: Place[];
  totalCases: number;
  currentPandemicState: PandemicState[];
  avaliableDates: Date[];
  updatePosition: (value: number) => void;
  setSerieType: (value: string) => void;
};

const AppContext = createContext<Contextvalue | undefined>(void 0);

type Props = {
  children: ReactNode;
};

export function AppContextProvider(props: Props) {
  const { children } = props;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [avaliableDates, setAvaliableDates] = useState<Date[]>([]);
  const [placesConfirmed, setPlacesConfirmed] = useState<Place[]>([]);
  const [placesDeaths, setPlacesDeaths] = useState<Place[]>([]);
  const [serieType, setSerieType] = useState<string>(SERIE_TYPE_CONFIRMED);

  const lastPosition = Math.max(0, avaliableDates.length - 1);

  useEffect(() => {
    let finished = false;

    (async () => {
      const { confirmed, deaths } = await fetchData();

      if (finished || confirmed.length === 0 || deaths.length === 0) return;

      const avaliableDates = confirmed[0].reports.map(({ date }) => date);
      setAvaliableDates(avaliableDates);
      setCurrentPosition(Math.max(0, avaliableDates.length - 1));
      setPlacesConfirmed(confirmed);
      setPlacesDeaths(deaths);
    })();

    return () => {
      finished = true;
    };
  }, []);

  const updatePosition = useCallback(
    (value: number) => {
      setCurrentPosition(Math.min(lastPosition, Math.max(0, value)));
    },
    [lastPosition, setCurrentPosition]
  );

  const [currentPandemicState, totalCases] = useMemo((): [
    PandemicState[],
    number
  ] => {
    const data =
      serieType === SERIE_TYPE_CONFIRMED ? placesConfirmed : placesDeaths;

    const pandemicState = data
      .filter(({ reports }) => reports[currentPosition].value > 0)
      .map((place) => ({
        ...place,
        date: place.reports[currentPosition].date,
        value: place.reports[currentPosition].value,
        reports: place.reports.filter((_, index) => index <= currentPosition),
      }));

    const total = Math.max(0, ...pandemicState.map(({ value }) => value));

    return [pandemicState, total];
  }, [currentPosition, serieType, placesConfirmed, placesDeaths]);

  const date = avaliableDates[currentPosition];

  const value = {
    date,
    serieType,
    placesConfirmed,
    placesDeaths,
    totalCases,
    currentPandemicState,
    currentPosition,
    avaliableDates,
    lastPosition,
    updatePosition,
    setSerieType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (typeof context === 'undefined') {
    throw new Error('useAppContext must be user within an AppContext');
  }

  return context;
}
