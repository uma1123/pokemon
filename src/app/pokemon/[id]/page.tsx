"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  type: string;
  height: number;
  weight: number;
  move: string;
}

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  //pokemonの詳細情報を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = res.data;
        const speciesRes = await axios.get(data.species.url);

        // 日本語の名前を取得
        const japaneseName =
          speciesRes.data.names.find(
            (nameObj: { language: { name: string }; name: string }) =>
              nameObj.language.name === "ja"
          )?.name || data.name;

        // 日本語のタイプを取得
        const japaneseTypeRes = await Promise.all(
          data.types.map(async (typeObj: { type: { url: string } }) => {
            const typeRes = await axios.get(typeObj.type.url);
            return typeRes.data.names.find(
              (nameObj: { language: { name: string }; name: string }) =>
                nameObj.language.name === "ja"
            )?.name;
          })
        );

        // ポケモンの詳細情報を設定
        setPokemon({
          id: data.id,
          name: japaneseName,
          image:
            data.sprites.other["official-artwork"].front_default ||
            "画像がありません",
          type: japaneseTypeRes[0] || "不明",
          height: data.height,
          weight: data.weight,
          move: data.moves[0]?.move.name || "不明",
        });
      } catch (error) {
        console.error("エラー", error);
      }
    };
    fetchData();
  }, [id]);

  if (!pokemon)
    return <div className="text-center text-2xl">読み込み中...</div>;

  return (
    <div className="flex flex-col items-center p-8 rounded-lg shadow-lg w-96 mx-auto">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={192}
        height={192}
        className="rounded-full shadow-xl mb-6 border-2 border-black"
      />
      <div className="text-lg text-black">
        <p className="mb-2">タイプ: {pokemon.type}</p>
        <p className="mb-2">高さ: {pokemon.height / 10} m</p>
        <p className="mb-2">重さ: {pokemon.weight / 10} kg</p>
        <p className="mb-4">最初のわざ: {pokemon.move}</p>
        <Link href="/">
          <span className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer">
            戻る
          </span>
        </Link>
      </div>
    </div>
  );
}
