import type { ObjectId } from "mongoose";

export interface Country {
  ABBREV: string;
  CONTINENT: string;
  FORMAL_EN: string;
  GDP_MD_EST: number;
  GDP_YEAR: number;
  ISO_A2: string;
  ISO_A3: string;
  NAME: string;
  NAME_LONG: string;
  POP_EST: number;
  POP_RANK: number;
  POP_YEAR: number;
  REGION_UN: string;
  SUBREGION: string;
}

export interface CountryWithAchievements extends Country {
  achievements: string[];
}

export interface Geography {
  geometry: any;
  properties: Country;
  rsmKey: string;
  svgPath: string;
  type: string;
}

export interface UserCountryAchievement {
  _id: ObjectId;
  userId: string;
  countryId: string;
  achievementId: string;
}
