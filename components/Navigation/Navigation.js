import styles from "./Navigation.module.scss";
import NavigationItem from "./NavigationItem";
import { useRouter } from "next/router";

import Home from "./icons/home.svg";
import Info from "./icons/info.svg";
import Mint from "./icons/mint.svg";
import Wallet from "./icons/wallet.svg";

const Navigation = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavigationItem
          icon={<Home />}
          title="Home"
          onClick={() => router.push("/")}
        />
        <NavigationItem
          icon={<Mint />}
          title="Mint"
          onClick={() => router.push("/mint")}
        />
        <NavigationItem
          icon={<Info />}
          title="Info"
          onClick={() => router.push("/info")}
        />
      </nav>
    </div>
  );
};

export default Navigation;
