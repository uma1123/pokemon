"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Header from "../Components/Header";

//ポケモン情報の型定義
interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

//トップページ
export default function Page() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 24; // 一度に取得するポケモンの数

  // IntersectionObserverの参照
  const observerRef = useRef<IntersectionObserver | null>(null);

  // pokemonのデータを取得
  const getPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
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
    setLoading(false);
  }, [offset]); // offsetを依存配列に追加

  // 初回レンダリング時にポケモンのデータを取得
  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  // スクロール位置が変わったときにポケモンのデータを取得
  const observeElement = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return; // ローディング中は処理をスキップ
      if (observerRef.current) observerRef.current.disconnect(); // 以前のobserverを解除
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // 監視している要素が画面に入ったとき
          setOffset((prev) => prev + limit); // 次のポケモンを取得
        }
      });
      if (node) observerRef.current.observe(node); // 新しい要素を監視
    },
    [loading]
  );
  /*<div ref={observeElement}>が画面内に入ると、setOffset()がよばれてoffsetが増加
  ⇒getPokemon()が再実行されて追加のポケモンを取得 */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
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

      {loading && <p className="text-center">読み込み中...</p>}
      <div ref={observeElement} className="w-full h-10" />
    </div>
  );
}
