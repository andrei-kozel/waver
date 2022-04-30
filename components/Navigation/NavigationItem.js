import styles from "./Navigation.module.scss";

const NavigationItem = ({ active, children }) => {
  return (
    <div className={`${styles.item} ${active && styles.active}`}>
      {children}
    </div>
  );
};

export default NavigationItem;
