import { Eye, EyeOff } from "lucide-react";
interface HideButtonProps {
  toggleHidden: () => void;
  isHidden: boolean;
}

export default function HideButton({ toggleHidden, isHidden }: HideButtonProps) {
  return (
    <div onClick={toggleHidden} className="rounded-md bg-slate-600/15 p-2">
      {isHidden ? <EyeOff className="size-4 text-muted" /> : <Eye className="size-4 text-muted" />}
    </div>
  );
}
