import Image from "next/image";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  const { name, content } = game;
  const thumbnail = content.thumbnail;

  return (
    <article className="card card-compact overflow-hidden bg-base-100 shadow-xl transition-transform hover:scale-[1.02]">
      <figure className="relative aspect-square w-full">
        <Image
          src={thumbnail.url}
          alt={thumbnail.altText ?? name ?? "Game thumbnail"}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-base">{name}</h3>
      </div>
    </article>
  );
};
