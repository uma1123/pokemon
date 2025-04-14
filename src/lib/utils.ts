import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//クラス名をハードコーディング
// クラス名を日本語タイプ対応に
export const getBackgroundColor = (type: string) => {
  switch (type) {
    case "いわ":
      return "bg-pokemon-rock";
    case "ゴースト":
      return "bg-pokemon-ghost";
    case "でんき":
      return "bg-pokemon-electric";
    case "むし":
      return "bg-pokemon-bug";
    case "どく":
      return "bg-pokemon-poison";
    case "ノーマル":
      return "bg-pokemon-normal";
    case "フェアリー":
      return "bg-pokemon-fairy";
    case "ほのお":
      return "bg-pokemon-fire";
    case "くさ":
      return "bg-pokemon-grass";
    case "みず":
      return "bg-pokemon-water";
    case "あく":
      return "bg-pokemon-dark";
    case "エスパー":
      return "bg-pokemon-psychic";
    case "じめん":
      return "bg-pokemon-ground";
    case "はがね":
      return "bg-pokemon-steel";
    case "かくとう":
      return "bg-pokemon-fighting";
    case "こおり":
      return "bg-pokemon-ice";
    case "ドラゴン":
      return "bg-pokemon-dragon";
    default:
      return "bg-pokemon-normal"; // デフォルトの色を指定
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "いわ":
      return "type-pokemon-rock";
    case "ゴースト":
      return "type-pokemon-ghost";
    case "でんき":
      return "type-pokemon-electric";
    case "むし":
      return "type-pokemon-bug";
    case "どく":
      return "type-pokemon-poison";
    case "ノーマル":
      return "type-pokemon-normal";
    case "フェアリー":
      return "type-pokemon-fairy";
    case "ほのお":
      return "type-pokemon-fire";
    case "くさ":
      return "type-pokemon-grass";
    case "みず":
      return "type-pokemon-water";
    case "あく":
      return "type-pokemon-dark";
    case "エスパー":
      return "type-pokemon-psychic";
    case "じめん":
      return "type-pokemon-ground";
    case "はがね":
      return "type-pokemon-steel";
    case "かくとう":
      return "type-pokemon-fighting";
    case "こおり":
      return "type-pokemon-ice";
    case "ドラゴン":
      return "type-pokemon-dragon";
    default:
      return "type-pokemon-normal"; // デフォルトの色を指定
  }
};
