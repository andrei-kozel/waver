import styles from "./Navigation.module.scss";
import NavigationItem from "./NavigationItem";

import Home from "./icons/home.svg";
import Info from "./icons/info.svg";
import Mint from "./icons/mint.svg";
import Wallet from "./icons/wallet.svg";

const Navigation = () => {
  const handleActive = (e) => {
    console.log(e.target);
    e.target.classList.add(styles.active);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavigationItem
          icon={<Home />}
          title="Home"
          handleActive={handleActive}
        />
        <NavigationItem
          icon={<Mint />}
          title="Mint"
          handleActive={handleActive}
        />
        <NavigationItem
          icon={<Info />}
          title="Info"
          handleActive={handleActive}
        />
      </nav>
    </div>
  );
};

export default Navigation;
