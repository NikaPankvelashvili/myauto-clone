import Logo from "./imgs/my-auto-logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  setShowBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showBurgerMenu: boolean;
};

export default function Header({ setShowBurgerMenu, showBurgerMenu }: Props) {
  return (
    <div className="h-20 bg-white pl-[calc((100vw-1020px)/2)] select-none flex items-center max-lg:justify-between max-lg:px-[7%]">
      <a target="_sefl" href="/">
        <img src={Logo} alt="my-auto-logo" />
      </a>
      {showBurgerMenu ? (
        <AiOutlineClose
          onClick={() => setShowBurgerMenu(!showBurgerMenu)}
          size={"20px"}
          className="lg:hidden"
          color="#FD4100"
        />
      ) : (
        <GiHamburgerMenu
          onClick={() => setShowBurgerMenu(!showBurgerMenu)}
          size={"20px"}
          className="lg:hidden"
          color="#FD4100"
        />
      )}
    </div>
  );
}
