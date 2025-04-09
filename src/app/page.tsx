"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../Components/Card";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function Page() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 20; // 一度に取得するポケモンの数

  // pokemonのデータを取得
  const getPokemon = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}}{offset=${offset}`
      );
      const data = response.data;

      // ポケモンの詳細情報を取得
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await axios.get(pokemon.url);
          const pokemonData = res.data;
          const speciesRes = await axios.get(pokemonData.species.url);

          // 日本語の名前を取得
          const japaneseName =
            speciesRes.data.names.find(
              (nameObj: { language: { name: string }; name: string }) =>
                nameObj.language.name === "ja"
            )?.name || pokemonData.name;

          // 日本語のタイプを取得
          const japaneseTypeRes = await Promise.all(
            pokemonData.types.map(
              async (typeObj: { type: { url: string } }) => {
                const typeRes = await axios.get(typeObj.type.url);
                return typeRes.data.names.find(
                  (nameObj: { language: { name: string }; name: string }) =>
                    nameObj.language.name === "ja"
                )?.name;
              }
            )
          );

          // ポケモンの詳細情報を返す
          return {
            id: pokemonData.id,
            name: japaneseName,
            image:
              pokemonData.sprites.other["official-artwork"].front_default ||
              "画像がありません",
            type: japaneseTypeRes[0] || "不明",
          };
        })
      );

      // 既存のポケモンと重複しないようにフィルタリングして追加
      setAllPokemons((prev) => [
        ...prev,
        ...pokemonDetails.filter(
          (pokemon) => !prev.some((p) => p.id === pokemon.id)
        ),
      ]);
    } catch (error) {
      console.error("エラー:", error);
      alert("ポケモンのデータを取得できませんでした。");
    }
  }, [offset]); // offsetを依存配列に追加

  // 初回レンダリング時にポケモンのデータを取得
  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-2">
      <h1 className="text-2xl mb-4">ポケモン図鑑</h1>
      <div className="flex flex-wrap items-center justify-center">
        {allPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            type={pokemon.type}
          />
        ))}
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setOffset((prev) => prev + limit)}
      >
        次のポケモンを表示
      </button>
    </div>
  );
}
