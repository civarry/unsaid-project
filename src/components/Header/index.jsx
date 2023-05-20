import todoLogo from "../../assets/Logo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./header.module.css";
import { useState } from "react";

export function Header({ onAddTask, onSearch }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    onAddTask(title, description);
    setTitle("");
    setDescription("");
    setCharacterCount(0);
  }

  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function onChangeDescription(event) {
    const text = event.target.value;
    if (text.length <= 264) {
      setDescription(text);
      setCharacterCount(text.length);
    }
  }

  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="" />
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search for keywords..."
          onChange={handleSearch}
        />
        <div className={styles.formHeader}>
          <input
            id="title"
            placeholder="Enter a title..."
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
          <button className={styles.addButton}>
            <AiOutlinePlusCircle size={20} />
          </button>
        </div>
        <div className={styles.formTextArea}>
          <textarea
            id="description"
            placeholder="Write your message here..."
            type="text"
            value={description}
            onChange={onChangeDescription}
            maxLength={264}
          />
          <div className={styles.characterCounter}>
            {characterCount} / 264 characters
          </div>
        </div>
      </form>
    </header>
  );
}
