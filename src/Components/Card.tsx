"use client";
import Link from "next/link";
import Image from "next/image";
import { getTypeColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  id: number;
  name: string;
  image: string;
  type: string;
  className?: string;
}

//カードコンポーネント
export default function Card({ id, name, image, type, className }: CardProps) {
  console.log(className);
  return (
    <Link href={`/pokemon/${id}`}>
      <div
        className={`flex flex-col items-center justify-center py-2 mr-1 border border-gray-300 rounded-md min-w-40 text-center shadow-md shadow-black hover:scale-110 transition-transform duration-300 cursor-pointer`}
      >
        <div className="rounded-2xl py-2 px-1 ">
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="w-[120px] h-[120px]"
          />
          <h4 className="font-bold text-lg text-gray-800">{name}</h4>
          <div className="flex justify-center mt-2">
            <Badge
              className={`${getTypeColor(
                type
              )} px-3 py-1 text-sm rounded-full text-white`}
              style={{ backgroundColor: "initial" }}
            >
              {type}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
