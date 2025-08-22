import { ImSpinner8 } from "react-icons/im";

import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <ImSpinner8 className={styles.spinner} size={24} />
    </div>
  );
}
