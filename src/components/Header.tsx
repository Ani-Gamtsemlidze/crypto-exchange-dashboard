import { Circle, MoonStar, Sun } from "lucide-react";
import logo from "../assets/logo.png";
import type { SocketStatus } from "../hooks/useBinancePrice";
import { useTheme } from "../hooks/useTheme";

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
  const { toggleTheme, theme } = useTheme();

  return (
    <header className="mb-4 flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <img src={logo} alt="" className="size-6 shrink-0 object-contain sm:size-10" />
        <h1 className="text-xs leading-tight font-bold text-slate-800 sm:text-lg dark:text-white">
          Crypto Exchange Dashboard
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center">
          <Circle className={`mr-2 size-2 ${fill} ${color}`} />
          <span className={`text-sm ${color} capitalize`}>{label}</span>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-md bg-slate-600/10 p-2 hover:bg-slate-600/25"
        >
          {theme === "dark" ? (
            <Sun className="size-5 text-yellow-300" />
          ) : (
            <MoonStar className="size-5 text-accent" />
          )}
        </button>
      </div>
    </header>
  );
}
