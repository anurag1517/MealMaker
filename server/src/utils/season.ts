
export type Season = "winter" | "spring" | "summer" | "autumn";

export const detectSeason = (lat: number, month: number): Season => {
  const northernSeasons: Season[] = ["winter", "spring", "summer", "autumn"];
  const seasonIndex = Math.floor(((month + 1) % 12) / 3);

  // For the Southern Hemisphere (lat < 0), offset the season by 6 months (2 indices).
  if (lat < 0) {
    return northernSeasons[(seasonIndex + 2) % 4];
  }

  // Otherwise, return the Northern Hemisphere season.
  return northernSeasons[seasonIndex];
};