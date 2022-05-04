import styles from "./Navigation.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavigationItem = ({ icon, title, onClick }) => {
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname === `/${title.toLowerCase()}` ||
      router.pathname === "/"
    ) {
      setActive(true);
    }
  }, []);

  return (
    <div
      className={`${styles.item} ${active ? "fill-red-500" : "fill-green-500"}`}
      onClick={onClick}
    >
      <p className={styles.title}>{title}</p>
      <div className={`${styles.icon} ${active ? styles.active : null}`}>
        {icon}
      </div>
    </div>
  );
};

export default NavigationItem;
