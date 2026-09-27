import { Circle } from "lucide-react";
import logo from "../assets/logo.png";
import type { SocketStatus } from "../hooks/useBinancePrice";

interface HeaderProps {
  socketStatus: SocketStatus;
}

const statusConfig = {
  connected: { color: "text-status-connected", fill: "fill-status-connected", label: "Connected" },
  reconnecting: {
    color: "text-status-reconnecting",
    fill: "fill-status-reconnecting",
    label: "Reconnecting...",
  },
  disconnected: {
    color: "text-status-disconnected",
    fill: "fill-status-disconnected",
    label: "Disconnected",
  },
  loading: { color: "text-status-loading", fill: "fill-status-loading", label: "Connecting..." },
};

export default function Header({ socketStatus }: HeaderProps) {
  const { color, fill, label } = statusConfig[socketStatus];

  return (
    <header className="mb-4 flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <img src={logo} alt="" className="size-6 shrink-0 object-contain sm:size-10" />
        <h1 className="text-xs leading-tight font-bold text-white sm:text-lg">
          Crypto Exchange Dashboard
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Circle className={`size-2 shrink-0 ${fill} ${color}`} aria-hidden="true" />
        <span className={`text-xs whitespace-nowrap sm:text-sm ${color}`}>{label}</span>
      </div>
    </header>
  );
}
