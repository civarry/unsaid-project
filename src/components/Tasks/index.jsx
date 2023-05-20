import { Task } from "../Task";
import styles from "./tasks.module.css";

export function Tasks({ tasks, onDelete, searchQuery }) {
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const taskQuantity = tasks.length;
  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Confession(s)</p>
          <span>{taskQuantity}</span>
        </div>
      </header>
      <div className={styles.list}>
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}
