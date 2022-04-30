import styles from "./Navigation.module.scss";
import NavigationItem from "./NavigationItem";

import Home from "./icons/home.svg";
import Info from "./icons/info.svg";
import Mint from "./icons/mint.svg";
import Wallet from "./icons/wallet.svg";

const Navigation = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavigationItem>
          <Home />
        </NavigationItem>
        <NavigationItem active>
          <Mint />
        </NavigationItem>
        <NavigationItem>
          <Info />
        </NavigationItem>
      </nav>
    </div>
  );
};

export default Navigation;
