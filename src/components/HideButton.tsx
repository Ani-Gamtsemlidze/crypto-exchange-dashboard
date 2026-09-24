import { Eye, EyeOff } from "lucide-react";
interface HideButtonProps {
  toggleHidden: () => void;
  isHidden: boolean;
}

export default function HideButton({ toggleHidden, isHidden }: HideButtonProps) {
  return (
    <div onClick={toggleHidden}>
      {isHidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </div>
  );
}
