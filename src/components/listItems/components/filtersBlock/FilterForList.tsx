import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FilterForList.module.css";
import { IPaginate } from "../../../../types/request";
import { Icon_arrow_down, Icon_close } from "../../Icons";

/**
 * Represents a filter component for a list.
 * @template T - The type of the items in the list.
 * @param {IProps<T>} props - The props for the component.
 * @returns {JSX.Element} - The filter component.
 */

/**
 * FilterForList Component API Documentation
 *
 * Props:
 * - section (optional): A string that can be used to categorize or specify the section of the list representation.
 * For this purpouse the item object must that present a section must has a property section="YES".
 * - selectedValue (optional): The currently selected value in the filter. Can be used to control the filter's state externally.
 * - setValue (optional): A function that updates the external state with the new selected value from the filter.
 * - disabled (optional): A boolean to enable or disable the filter functionality.
 * - setPaginate (required): A function to update the pagination state. It takes an object that conforms to the pagination structure.
 * - initPaginate (required): An object representing the initial state of pagination.
 * - items (required): An array of items of generic type T that will be filtered based on the filter criteria.
 * - field (required): The property name of the item object that will be used for create query for paginate object.
 * - fieldName (required): A string representing the name of the field to be used for display purposes.
 * - title (required): The title of the filter component.
 * - parse (optional): A boolean indicating whether the field values should be parsed in a specific way before being displayed.
 * - filteredFieldKey (optional): The key of the item object that will be used for filtering the list.
 * - filteredFieldValue (optional): The value that the `filteredFieldKey` must match for an item to be included in the filtered list.
 *
 * Data Mutation:
 * - Selecting a new value from the filter (via `setValue`) can lead to external state mutation, affecting how other components or data are displayed.
 * - Changing the `filteredFieldValue` or `filteredFieldKey` directly affects the filtered list of items by applying the specified filter criteria.
 * - Updating pagination (via `setPaginate`) can mutate the displayed subset of items based on the pagination settings.
 *
 * Usage:
 * This component is designed to be a generic filter for lists, where the items can be filtered based on a specified field and value.
 * It supports external control through `selectedValue` and `setValue`, allowing for integration with other components or state management solutions.
 * The component also supports pagination through `setPaginate` and `initPaginate`, enabling efficient display of large lists.
 * The `filteredFieldKey` and `filteredFieldValue` props can be used to apply additional filtering criteria to the list of items for more granular control.
 *
 */
interface IItem {
  _id: string;
  name?: string;
  role?: string;
}
interface IProps<T> {
  section?: string;
  selectedValue?: string;
  setValue?: (v: string) => void;
  disabled?: boolean;

  setPaginate: (d: any) => void;
  initPaginate: IPaginate;
  items: T[];
  field: string;
  fieldName: string;
  title: string;
  parse?: boolean;

  filteredFieldKey?: string;
  filteredFieldValue?: string;
}

const FilterForList = <T extends IItem>({
  section,
  selectedValue,
  setValue,
  disabled,
  filteredFieldKey,
  filteredFieldValue,

  setPaginate,
  initPaginate,
  items,
  field,
  fieldName,
  title,
  parse,
}: IProps<T>) => {
  const [fistLoaded, setFistLoaded] = useState(true);
  const [action, setAction] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickActionButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (data: string) => {
    setAction(data);
    setAnchorEl(null);
  };
  /**
   * Handles the change action for the filter.
   */

  const handleChangeAction = () => {
    if (setValue) {
      setValue(action);
    }
    setPaginate((prev: IPaginate) => {
      let query = prev.query ? { ...prev.query } : {};

      if (action) {
        try {
          query[field] = parse ? JSON.parse(action) : action;
        } catch (error) {
          query[field] = action;
        }
      } else {
        delete query[field];
      }
      return {
        ...initPaginate,
        perPage: prev.perPage,
        totalPages: prev.totalPages,
        query: { ...query },
      };
    });
  };

  const handleSuscribeClearAllFilters = () => {
    setFistLoaded(true);
    // to prevent reload a list after clear all filters
    setTimeout(() => {
      setAction("");
    }, 100);
  };

  const getSelectedName = () => {
    if (action) {
      const item: any = items.find((p) => p._id === action);
      if (item) {
        return item[fieldName];
      }
    }
  };
  const getDisplayProperty = (opt: { [key: string]: string }) => {
    if (filteredFieldKey) {
      return filteredFieldValue
        ? opt[filteredFieldKey] !== filteredFieldValue
          ? "none !important"
          : "flex"
        : "flex";
    } else {
      return "flex";
    }
  };
  useEffect(() => {
    window.addEventListener(
      "clearAllFilters",
      handleSuscribeClearAllFilters as EventListener
    );
    return () => {
      window.removeEventListener(
        "clearAllFilters",
        handleSuscribeClearAllFilters as EventListener
      );
    };
  }, []);
  useEffect(() => {
    if (filteredFieldValue !== undefined) {
      setTimeout(() => {
        setAction("");
      });
    }
  }, [filteredFieldValue]);

  useEffect(() => {
    if (fistLoaded) {
      setFistLoaded(false);
      return;
    }
    handleChangeAction();
  }, [action]);

  useEffect(() => {
    // if items is empty and action is not empty then set action to empty string
    // if items is not empty and action is not empty then check if action is in items if not set action to empty string
    // this action is for case when item is deleted from list
    if (items) {
      if (items.length === 0 && action !== "") {
        setAction("");
      } else if (items.length > 0 && action !== "") {
        const item: any = items.find((p) => p._id === action);
        if (!item) {
          setAction("");
        }
      }
    }
  }, [items]);

  return (
    <>
      <button
        className={`${styles.filterButton} ${
          Boolean(action) ? styles.active : ""
        }`}
        data-active={action}
        onClick={handleClickActionButton}
        disabled={disabled}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="body-s-regular colorGrey600">
            {title}
            {action && ":"}
          </span>
          <span className="body-s-regular colorGreyBlack">
            &nbsp;{getSelectedName()}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {action ? (
            <Icon_close
              onClick={(e) => {
                e.stopPropagation();
                handleMenuItemClick("");
              }}
            />
          ) : (
            <Icon_arrow_down />
          )}
        </div>
      </button>
      <Menu
        slotProps={{
          paper: {
            className: "menuPaper",
            sx: { width: "200px" },
          },
        }}
        sx={{ maxHeight: "400px" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item: any, i) => (
          <MenuItem
            disabled={Boolean(section && item[section] === "YES")}
            className="menuItem"
            sx={{ display: getDisplayProperty(item) }}
            key={i}
            onClick={() => handleMenuItemClick(item._id)}
            disableRipple
            selected={action === item._id}
          >
            {section && item[section] === "YES" ? (
              <>
                <span
                  className={[
                    "menuItemText",
                    "body-s-regular",
                    "colorGrey500",
                    "textWithEllipsis",
                  ].join(" ")}
                >
                  {item.name || item.title || item[fieldName]}
                </span>
              </>
            ) : (
              <>
                <span
                  className={`body-s-regular colorGreyBlack textWithEllipsis ${
                    section ? "pl10" : ""
                  }`}
                >
                  {item[fieldName]}
                </span>
              </>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterForList;
