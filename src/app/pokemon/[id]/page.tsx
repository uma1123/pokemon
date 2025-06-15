"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { getBackgroundColor, getTypeColor } from "@/lib/utils";
import Status from "../../../Components/Status";
import { Badge } from "@/components/ui/badge";

//ポケモンの詳細情報の型定義
interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  type: string;
  height: number;
  weight: number;
  move: string;
  className?: string;
  status: {
    name: string;
    base_stat: number;
  }[];
}

//ポケモンの詳細ページ
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

        // 日本語のわざを取得
        const moveUrl = data.moves[0]?.move.url;
        let japaneseMove = "不明";
        if (moveUrl) {
          const moveRes = await axios.get(moveUrl);
          japaneseMove =
            moveRes.data.names.find(
              (nameObj: { language: { name: string }; name: string }) =>
                nameObj.language.name === "ja"
            )?.name || "不明";
        }
        // ステータスを取得
        const stats = data.stats.map(
          (stat: { base_stat: number; stat: { name: string } }) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
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
          move: japaneseMove,
          status: stats,
        });
      } catch (error) {
        console.error("エラー", error);
      }
    };
    fetchData();
  }, [id]);

  //ローディング
  if (!pokemon)
    return <div className="text-center text-2xl">読み込み中...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      {/*タイプごとの背景色*/}
      <div
        className={`${getBackgroundColor(
          pokemon.type
        )} rounded-lg p-6 mb-8 shadow-lg`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/*ポケモン画像*/}
          <div className="relative w-full max-w-[300px] aspect-square bg-yellow-50 rounded-full p-4 flex items-center justify-center">
            <Image
              src={pokemon.image || "/placeholder.svg"}
              alt={pokemon.name}
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>

          {/*名前、ID、タイプ */}
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{pokemon.name}</h1>
              <span className="text-xl text-gray-500">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>
            <Badge
              className={`${getTypeColor(
                pokemon.type
              )} flex flex-wrap gap-2 mb-4 rounded-full px-3 py-1 text-white text-sm`}
            >
              {pokemon.type}
            </Badge>
          </div>

          {/*高さ、重さ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 shadow">
              <p className="text-sm text-gray-500">高さ</p>
              <p className="font-medium">{pokemon.height / 10}m</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow">
              <p className="text-sm text-gray-500">重さ</p>
              <p className="font-medium">{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </div>
      <Status status={pokemon.status} />
    </div>
  );
}
