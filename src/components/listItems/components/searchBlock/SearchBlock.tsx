import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchBlock.module.css";
import { useDebounce } from "../../../../hooks/debounce";
import {
  Icon_checkbox,
  Icon_checkbox_checked,
  Icon_delete_inlist,
  IconSearch,
} from "../../Icons";
import { IPaginate } from "../../../../types/request";

const SearchBlock = ({
  placeholder,
  paginate,
  setPaginate,
  rowSelectionModel,
  setOpenConfirmModal,
  setAllItems,
  allItems,
  items,
  disabled,
}: {
  placeholder: string;
  paginate: IPaginate;
  setPaginate: (d: any) => void;
  rowSelectionModel: string[];
  setAllItems: (d: any) => void;
  allItems: boolean;
  setOpenConfirmModal: (d: boolean) => void;
  items: any[];
  disabled?: boolean;
}) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 700);

  useEffect(() => {
    if (!paginate.search && !debounced) {
      return;
    }
    const tempPagination = Object.assign({}, paginate);
    tempPagination.search = debounced;
    if (!tempPagination.search) {
      delete tempPagination.search;
    }
    tempPagination.loaded = false;
    tempPagination.currentPage = 1;
    setPaginate(tempPagination);
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
      {rowSelectionModel.length > 0 && (
        <>
          <button
            className="button secondaryButton"
            data-size="small"
            onClick={() => {
              setOpenConfirmModal(true);
            }}
          >
            <Icon_delete_inlist
              className={styles.deleteIcon}
              onClick={() => {
                setOpenConfirmModal(true);
              }}
            />
            <span className="body-s-medium colorGreyBlack">{`Delete ${
              allItems ? paginate.totalItems : rowSelectionModel.length
            }`}</span>
          </button>
          {rowSelectionModel.length === items.length && (
            <button
              className="button secondaryButton"
              data-size="small"
              onClick={() => {
                setAllItems((prev: boolean) => !prev);
              }}
            >
              {allItems ? (
                <>
                  <Icon_checkbox_checked />
                  <span className="body-s-regular colorGrey600">
                    All accesses are selected.
                  </span>
                  <span className="body-s-medium colorGreyBlack">
                    Clear selection
                  </span>
                </>
              ) : (
                <>
                  <Icon_checkbox />
                  <span className="body-s-medium colorGreyBlack">
                    Select all {paginate.totalItems} accesses
                  </span>
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBlock;
