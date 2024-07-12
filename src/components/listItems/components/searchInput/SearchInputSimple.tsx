import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchInput.module.css";
import { useDebounce } from "../../../../hooks/debounce";
import { IconSearch } from "../../Icons";

const SearchInputSimple = ({
  placeholder,
  setSearchState,
  disabled,
}: {
  placeholder: string;
  setSearchState: (d: string) => void;
  disabled?: boolean;
}) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 700);

  useEffect(() => {
    if (!debounced) {
      return;
    }
    setSearchState(debounced);
  }, [debounced]);
  return (
    <div className={styles.buttonContainer}>
      <div
        className={styles.searchBox}
        onClick={() =>
          inputSearchRef.current &&
          inputSearchRef.current.focus &&
          inputSearchRef.current?.focus()
        }
      >
        <IconSearch className={styles.searchIcon} />

        <input
          className="custom-input"
          style={{ paddingLeft: "32px" }}
          data-size="small"
          ref={inputSearchRef}
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchInputSimple;
