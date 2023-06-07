import Logo from "./imgs/my-auto-logo.png";

export default function Header() {
  return (
    <div className="h-20 bg-white pl-435px select-none flex items-center">
      <a target="_sefl" href="/">
        <img src={Logo} alt="my-auto-logo" />
      </a>
    </div>
  );
}