import styles from "./Navigation.module.scss";

const NavigationItem = ({ icon, title, handleActive }) => {
  return (
    <div className={styles.item} onClick={(e) => handleActive(e)}>
      <p className={styles.title}>{title}</p>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default NavigationItem;
