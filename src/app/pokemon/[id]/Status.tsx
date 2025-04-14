interface StatusProps {
  status: {
    name: string;
    base_stat: number;
  }[];
}

const statNameMap: Record<string, string> = {
  hp: "HP",
  attack: "こうげき",
  defense: "ぼうぎょ",
  special_attack: "とくこう",
  special_defense: "とくぼう",
  speed: "すばやさ",
};

export default function Status({ status }: StatusProps) {
  return (
    <div className="flex flex-col gap-2">
      {status.map((stat) => (
        <div key={stat.name} className="flex gap-2">
          <span className="text-sm text-gray-500">
            {statNameMap[stat.name]}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
