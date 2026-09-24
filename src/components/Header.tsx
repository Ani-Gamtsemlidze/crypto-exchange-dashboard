import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="mb-2 flex items-center">
      <img src={logo} alt="" className="mr-3 h-10 w-10 object-contain" />
      <h1 className="font-bold text-white capitalize">Crypto exchange dashboard</h1>
    </header>
  );
}
