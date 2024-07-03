import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./FiltersBlock.module.css";
import { useDebounce } from "../../../../hooks/debounce";
import {
  Icon_checkbox,
  Icon_checkbox_checked,
  Icon_delete_inlist,
  Icon_reloadlist,
  IconSearch,
} from "../../Icons";
import { IPaginate } from "../../../../types/request";
import { INIT_PAGINATE } from "../../../../constants/constants";
import { GlobalStateContext } from "../../../../context/GlobalStateProvider";
import FilterForList from "./FilterForList";
import { sendMessage } from "../../../../utils";

const FiltersBlock = ({
  filters,
  paginate,
  setPaginate,
}: {
  filters: any[] | undefined;
  paginate: IPaginate;
  setPaginate: (d: any) => void;
}) => {
  const { state } = useContext(GlobalStateContext);

  const [reloadListClick, setReloadListClick] = useState(false);

  const clearAllFilters = () => {
    sendMessage("clearAllFilters");
    setPaginate((prev: IPaginate) => ({
      ...INIT_PAGINATE,
      perPage: prev.perPage,
    }));
  };

  const reloadList = () => {
    setReloadListClick(true);
    setPaginate((prev: any) => ({
      ...prev,
      loaded: false,
    }));
    setTimeout(() => setReloadListClick(false), 500);
  };
  return (
    <div className={styles.filtersAndRelodWrapper}>
      {filters ? (
        <div className={styles.filtersWrap}>
          {filters.map((filter) => (
            <FilterForList<{ _id: string; name: string }>
              key={filter.collection}
              setPaginate={setPaginate}
              initPaginate={INIT_PAGINATE}
              field={filter.filteredFiled}
              fieldName="name"
              items={state[filter.collection].list}
              title={filter.title}
              disabled={!Boolean(paginate.loaded)}
            />
          ))}

          {Object.keys(paginate.query || {}).length > 0 && (
            <div className={styles.clearAll} onClick={clearAllFilters}>
              <span className={`body-s-regular   cursorPointer`}>
                Clear All
              </span>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.reloadIconWrapper} onClick={reloadList}>
        <Icon_reloadlist
          onClick={reloadList}
          className={reloadListClick ? "rotate" : ""}
        />
      </div>
    </div>
  );
};

export default FiltersBlock;
