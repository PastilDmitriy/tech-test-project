import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  const { id, name, content } = game;
  const thumbnail = content.thumbnail;

  return (
    <Link href={`/play/${id}`} className="block h-full">
      <article className="card card-compact flex h-full flex-col overflow-hidden bg-base-100 shadow-xl transition-transform hover:scale-[1.02]">
        <figure className="relative aspect-square w-full flex-5 min-h-0">
          <Image
            src={thumbnail.url}
            alt={thumbnail.altText ?? name ?? "Game thumbnail"}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />
        </figure>
        <div className="card-body shrink-0 px-3 py-2">
          <h3 className="card-title text-sm line-clamp-2">{name}</h3>
        </div>
      </article>
    </Link>
  );
};
