import { useState } from "react";
import Header from "./Header";
import MainPage from "./MainPage";

function App() {
  const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);

  return (
    <div className="h-screen">
      <Header
        setShowBurgerMenu={setShowBurgerMenu}
        showBurgerMenu={showBurgerMenu}
      />
      <MainPage
        showBurgerMenu={showBurgerMenu}
        setShowBurgerMenu={setShowBurgerMenu}
      />
    </div>
  );
}

export default App;
