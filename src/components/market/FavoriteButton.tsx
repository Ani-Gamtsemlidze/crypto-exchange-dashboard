import { Star } from "lucide-react";

interface FavoriteButtonProps {
  toggleFavorite: () => void;
  isFavorite: boolean;
}

export default function FavoriteButton({ toggleFavorite, isFavorite }: FavoriteButtonProps) {
  return (
    <div onClick={toggleFavorite} className="rounded-md bg-slate-600/15 p-2">
      {isFavorite ? (
        <Star fill="yellow" className="size-4 text-yellow-500" />
      ) : (
        <Star className="size-4 text-muted" />
      )}
    </div>
  );
}
