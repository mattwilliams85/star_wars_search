import { MovieType } from './movie';

export interface SearchType {
  query: string;
  count: number;
  next: null;
  previous: null;
  isLoading: boolean;
  results: MovieType[];
}
