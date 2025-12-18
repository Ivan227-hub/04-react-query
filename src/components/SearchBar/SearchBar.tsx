import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const action = (formData: FormData) => {
    const query = String(formData.get("query") || "").trim();

    if (!query) {
      toast.error("Введіть пошуковий запит");
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={css.form} action={action}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Пошук фільмів"
      />
      <button className={css.button} type="submit">
        Пошук
      </button>
    </form>
  );
}
