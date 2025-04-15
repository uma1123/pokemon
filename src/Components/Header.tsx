"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PokemonHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      // すべてのポケモン種データを取得（名前一覧）
      const listRes = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species?limit=10000"
      );
      const speciesList = listRes.data.results;

      // 日本語名を検索
      let englishName = "";
      for (const species of speciesList) {
        const speciesDetailRes = await axios.get(species.url);
        const names = speciesDetailRes.data.names;

        const matched = names.find(
          (nameObj: { language: { name: string }; name: string }) =>
            nameObj.language.name === "ja-Hrkt" && nameObj.name === searchQuery
        );

        if (matched) {
          englishName = species.name;
          break;
        }
      }

      // 英語名が見つからなければエラー
      if (!englishName) {
        alert("ポケモンが見つかりませんでした。名前を確認してください。");
        return;
      }

      // 英語名でポケモンデータを取得
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${englishName}`
      );
      const data = res.data;

      router.push(`/pokemon/${data.id}`);
    } catch (error) {
      console.error("ポケモンが見つかりませんでした:", error);
      alert("ポケモンが見つかりませんでした。名前を確認してください。");
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-red-400 to-red-500 p-7 shadow-md mb-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-white rounded-full border-4 border-red-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              ポケモン図鑑
            </h1>
          </div>

          <div className="w-full md:w-auto flex-1 md:max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="ポケモンを検索..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/90 border-2 border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
