import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//ステータスの型定義
interface StatusProps {
  status: {
    name: string;
    base_stat: number;
  }[];
}

//ステータスの日本語名を定義
const statNameMap: Record<string, string> = {
  hp: "HP",
  attack: "こうげき",
  defense: "ぼうぎょ",
  special_attack: "とくこう",
  special_defense: "とくぼう",
  speed: "すばやさ",
};

// ステータスのコンポーネント
export default function Status({ status }: StatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>基本ステータス</CardTitle>
      </CardHeader>
      <CardContent>
        {/* HPの値を表示 */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>{statNameMap.hp}</span>
              <span>
                {status.find((stat) => stat.name === "hp")?.base_stat}
              </span>
            </div>
            {/* HPのバー */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((status.find((stat) => stat.name === "hp")?.base_stat ||
                      0) /
                      255) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/*攻撃の値を表示 */}
          <div>
            <div className="flex justify-between mb-1">
              <span>{statNameMap.attack}</span>
              <span>
                {status.find((stat) => stat.name === "attack")?.base_stat}
              </span>
            </div>
            {/* 攻撃のバー */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((status.find((stat) => stat.name === "attack")
                      ?.base_stat || 0) /
                      255) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>{statNameMap.defense}</span>
              <span>
                {status.find((stat) => stat.name === "defense")?.base_stat}
              </span>
            </div>
            {/* 防御のバー */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((status.find((stat) => stat.name === "defense")
                      ?.base_stat || 0) /
                      255) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* 特攻の値を表示 */}
          <div>
            <div className="flex justify-between mb-1">
              <span>{statNameMap.special_attack}</span>
              <span>
                {
                  status.find((stat) => stat.name === "special-attack")
                    ?.base_stat
                }
              </span>
            </div>
            {/* 特攻のバー */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((status.find((stat) => stat.name === "special-attack")
                      ?.base_stat || 0) /
                      255) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>{statNameMap.special_defense}</span>
              <span>
                {
                  status.find((stat) => stat.name === "special-defense")
                    ?.base_stat
                }
              </span>
            </div>
            {/* 特防のバー */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((status.find((stat) => stat.name === "special-defense")
                      ?.base_stat || 0) /
                      255) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>{statNameMap.speed}</span>
              <span>
                {status.find((stat) => stat.name === "speed")?.base_stat}
              </span>
            </div>
            {/* すばやさのバー */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-pink-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((status.find((stat) => stat.name === "speed")?.base_stat ||
                      0) /
                      255) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
