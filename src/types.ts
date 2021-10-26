export type DocumentData = {
  [key: string]: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type Report = {
  date: Date;
  value: number;
};

export type Place = {
  country: string;
  location: Location;
  reports: Report[];
};

export type PandemicState = Place & {
  date: Date;
  value: number;
};
