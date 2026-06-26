export interface House {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
}

export interface HousesFilters {
  name: string;
  region: string;
}

export interface HousesState {
  houses: House[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}
