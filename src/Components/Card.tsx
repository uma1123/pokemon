"use client";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  id: number;
  name: string;
  image: string;
  type: string;
  className?: string;
}

export default function Card({ id, name, image, type, className }: CardProps) {
  return (
    <Link href={`/pokemon/${id}`}>
      <div
        className={`${className} flex flex-col items-center justify-center py-2 mr-1 border border-gray-300 rounded-md min-w-40 text-center shadow-md shadow-black hover:scale-110 transition-transform duration-300 cursor-pointer`}
      >
        <div className="rounded-2xl py-2 px-1 bg-white bg-opacity-30">
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="w-[120px] h-[120px]"
          />
          <h4>{name}</h4>
          <h3 className="mb-1">{type}</h3>
        </div>
      </div>
    </Link>
  );
}
