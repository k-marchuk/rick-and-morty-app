export interface LocationResponse {
  info: Info;
  results: Location[];
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  query: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
}
