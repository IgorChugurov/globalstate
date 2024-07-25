/**
 * @file lists.ts
 * @description This file contains TypeScript interfaces and types for the application entities.
 * These are used across the application to ensure type safety and consistency, especially
 * for the data structures derived from the appdata.json configurations like EntitiesForListAndServicesPackageAndEditPage.
 * These types support the dynamic creation of list and edit pages for each entity.
 * @module lists
 */

/**
 * Represents the any entity for the list page.
 */
export interface IEntity {
  [key: string]: any;
}

/**
 * Represents the options for the list page.
 */
export interface IOptionsListItem {
  /**
   * The title of the list page.
   */
  title: string;
  /**
   * The name of the collection for the get service from servicesPackage.
   */
  collectionName: string;
  /**
   * The options for creating a service package for this collection in the servicesPackage.
   */
  forServicePackage: {
    /**
     * The URL for the service.
     */
    url: string;
    /**
     * The options for the service.
     */
    options: any;
  };
  /**
   * The options for the header of the list page.
   */
  forList: {
    /**
     * The search block for the list page.
     */
    searchBlock?: string;
    /**
     * The filters for the list page.
     */
    filters?: { collection: string; title: string; filteredFiled?: string }[];
    /**
     * The button block for the list page.
     */
    buttonBlock?: { title: string };
    /**
     * The columns for the data grid.
     */
    columnsForGrid: IColumnForDataGrud[];
  };
  /**
   * The options for the edit page of the item from the list.
   */
  forEdit: IDataForEditPage;
}
export interface IActionData {
  name: "delete" | "edit" | "clone" | "view" | "copy" | "actions";
  copyFields?: { field: string }[];
  component?: any;
}
interface IColumnForDataGrud {
  field: string;
  headerName: string;
  width: number;
  type?: "view" | "openEditPage" | "actions" | "naigateToDetail";
  options?: {
    // this is for action cell
    actions?: IActionData[];
  };
}

/**
 * Represents the options for the edit page of an item from the list.
 */
export interface IDataForEditPage {
  /**
   * The title of the edit page.
   */
  title: string[];
  /**
   * The page header of the edit page.
   */
  pageHeader?: string;
  /**
   * The sections of the edit page.
   */
  sections: {
    /**
     * The title of the section.
     */
    title: string;
    /**
     * The fields in the section.
     */
    fields: IEditField[];
  }[];
  /**
   * The title of the event that will be triggered when the data is saved in the edit page.
   */
  reloadEventTitle?: string;
}

/**
 * Represents a field in the edit page.
 */
export interface IEditField {
  /**
   * The name of the field.
   */
  name: string;
  /**
   * The label of the field.
   */
  label?: string;
  /**
   * The placeholder of the field.
   */
  placeholder?: string;
  /**
   * The type of the field.
   */
  type:
    | "text"
    | "date"
    | "number"
    | "radio"
    | "switch"
    | "select"
    | "array"
    | "view"
    | "copy"
    | "file";
  /**
   * The collection of the field.
   */
  collection?: string;
  /**
   * The helper text of the field.
   */
  helperText?: string;
  /**
   * Indicates if the field text anr textarea.
   */
  multipile?: boolean;
  /**
   * Indicates if the field is editable.
   */
  forEitPage?: "yes" | "no";
  /**
   * Indicates if the field is for a new item.
   */
  forNewPage?: "yes" | "no";
  /**
   * Indicates if the field is required.
   */
  required?: boolean;
  /**
   * The text to display when the field is required.
   */
  requiredText?: string;
  /**
   * The text to display when the field value is less than the minimum value.
   */
  minValueText?: string;
  /**
   * The text to display when the field value is greater than the maximum value.
   */
  maxValueText?: string;
  /**
   * The text to display when the field value is an empty array.
   */
  arrayEmptyText?: string;
}
