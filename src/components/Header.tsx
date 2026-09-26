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
    <header className="mx-auto mb-4 flex max-w-6xl items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="" className="mr-3 h-10 w-10 object-contain" />
        <h1 className="font-bold text-white capitalize">Crypto exchange dashboard</h1>
      </div>
      <div className="flex items-center">
        <Circle className={`mr-2 size-2 ${fill} ${color}`} />
        <span className={`text-sm ${color} capitalize`}>{label}</span>
      </div>
    </header>
  );
}
