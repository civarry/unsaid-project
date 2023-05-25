import React, { useEffect, useRef } from "react";
import styles from "./task.module.css";
import { TbTrash } from "react-icons/tb";
import { FiMail } from "react-icons/fi";

export function Task({ task, onDelete }) {
  const cardContainerRef = useRef(null);
  const previousScrollPositionRef = useRef(0);

  useEffect(() => {
    const cardContainer = cardContainerRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollDirection =
        scrollPosition > previousScrollPositionRef.current ? "down" : "up";

      if (scrollDirection === "down") {
        const cardContainerOffset = cardContainer.offsetTop;
        if (scrollPosition + windowHeight > cardContainerOffset) {
          cardContainer.classList.add(styles.animate);
          cardContainer.classList.remove(styles.animateReverse);
        } else {
          cardContainer.classList.remove(styles.animate, styles.animateReverse);
        }
      }

      previousScrollPositionRef.current = scrollPosition;
    };

    handleScroll(); // Apply animation immediately on mount

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.task}>
      {/* This is the new layout */}
      <div ref={cardContainerRef} className={styles.cardContainer}>
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
