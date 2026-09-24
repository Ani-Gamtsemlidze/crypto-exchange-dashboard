import { Star } from "lucide-react";

interface FavoriteButtonProps {
  toggleFavorite: () => void;
  isFavorite: boolean;
}

export default function FavoriteButton({ toggleFavorite, isFavorite }: FavoriteButtonProps) {
  return (
    <div onClick={toggleFavorite}>
      {isFavorite ? (
        <Star fill="yellow" className="size-4 text-yellow-500" />
      ) : (
        <Star className="size-4 text-yellow-400" />
      )}
    </div>
  );
}
