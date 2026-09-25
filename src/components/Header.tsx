import { Circle } from "lucide-react";
import logo from "../assets/logo.png";
import type { SocketStatus } from "../hooks/useBinancePrice";

interface HeaderProps {
  socketStatus: SocketStatus;
}

export default function Header({ socketStatus }: HeaderProps) {
  return (
    <header className="mx-auto mb-4 flex max-w-6xl items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="" className="mr-3 h-10 w-10 object-contain" />
        <h1 className="font-bold text-white capitalize">Crypto exchange dashboard</h1>
      </div>
      <div className="flex items-center">
        <Circle fill="#00c951" className="mr-1 size-3 text-green-500" />
        <span className="text-sm text-green-500 capitalize">{socketStatus}</span>
      </div>
    </header>
  );
}
