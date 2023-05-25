import styles from "./task.module.css";
import { TbTrash } from "react-icons/tb";
import { FiMail } from "react-icons/fi";
// import { BsFillCheckCircleFill } from "react-icons/bs";
export function Task({ task, onDelete }) {
  return (
    <div className={styles.task}>
      {/* This is the new layout */}
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.abcStyle}>
            <span>ABC</span>
          </div>
          <span>To: {task.title}</span>
          <i>
            <FiMail size={20} />
          </i>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardDescription}>
            <p>{task.description}</p>
          </div>
          <div className={styles.cardFooter}>
            <span>#unsaidfeelings</span>
          </div>
          <br />
          {/* <button
            className={styles.deleteButton}
            onClick={() => onDelete(task.id)}
          >
            <TbTrash size={20} />
          </button> */}
        </div>
      </div>
    </div>
  );
}
