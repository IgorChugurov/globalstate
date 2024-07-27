export interface DataItem {
  collection: string;
  apiUrl: string;
  title: string;
}
/**
 * Represents the authentication data.
 */
export interface IAuthData {
  /**
   * The URL to login and get the authentication token.
   */
  loginAndGetTokenUrl: string;

  /**
   * The credentials required for authentication.
   */
  fields: IEditField[];

  /**
   * The URL to get the current authenticated user.
   */
  getCurrentAuthUserUrl: string;

  /**
   * The URL to refresh the authentication session.
   */
  refreshAuthSessionUrl: string;
}
/**
 * Represents the initial configuration.
 */
export interface IInitalConfig {
  TITLE: string;
  VERSION: string;
  STUDIA: string;
  LSPrefix: string;
  appGlobalStoreConfig: DataItem[];
  AuthData: IAuthData;
  EntitiesForListAndServicesPackageAndEditPage: IOptionsListItem;
  currentProject: string;
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
    reloadEvents?: { delete?: string; update?: string; create?: string };
  };
  /**
   * The title of the event that will be triggered when the element in the list updated or deleted
   */
  reloadEventTitle?: string;

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
    /**
     * The options for an empty list.
     */
    forEmptyList?: { title: string; messages: string[] };
    // Defines an optional 'messages' object that may contain optional strings for 'afterCreate', 'afterUpdate', and 'afterDelete' events.
    messages?: {
      afterCreate?: string; // Optional message to display after a create operation
      afterUpdate?: string; // Optional message to display after an update operation
      afterDelete?: string; // Optional message to display after a delete operation
    };
  };
  /**
   * The options for the edit page of the item from the list.
   */
  forEdit: IDataForEditPage;
}
/**
 * Represents the data for an action.
 */
export interface IActionData {
  /**
   * The name of the action.
   * Possible values are: "delete", "edit", "clone", "view", "copy", "actions".
   */
  action: "delete" | "edit" | "clone" | "view" | "copy" | "actions";
  /**
   * if true and action = edit in the component create Link to=url/rowId. in othe case openEditModal
   */
  link?: boolean;
  options?: IOptionsForActionDelete;
  /**
   * The fields to be copied.
   */
  copyFields?: { field: string }[];
  /**
   * The component associated with the action.
   */
  component?: any;
}
export interface IColumnForDataGrud {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  type?: "view" | "openEditPage" | "actions" | "naigateToDetails";
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
     * The info of the section
     */
    info?: { title: string; text: string };
    /**
     * The title of the section.
     */
    title: string;
    /**
     * The fields in the section.
     */
    fields: IEditField[];

    /**
     * The button for the section.
     */
    button?: {
      title: string;
      action: string;
      options?: IOptionsForActionDelete;
    };
  }[];

  /**
   * The title of the event that will be triggered when the data is saved in the edit page.
   */
  reloadEventTitle?: string;
  /**
   * The options for the buttons on the edit page.
   * default values are "Create" and "Update"
   */
  buttons?: {
    /**
     * The text for the "Create" button.
     */
    create?: string;
    /**
     * The text for the "Update" button.
     */
    update?: string;
  };
  buttonText?: {
    create?: string;
    update?: string;
  };
}

export interface IOptionsForActionDelete {
  modalText?: string;
  modalTitle?: string;
  confirmWord?: string;
  confirmText?: string;
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
    | "file"
    | "email"
    | "password";
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
   * Indicates if the field is disabled for edit page.
   */
  forEditPageDisabled?: boolean;
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
  /**
   * The options for the field.
   */
  options?: IOptionsForRadioAndSelect[];
}
export interface IOptionsForRadioAndSelect {
  value?: string; //for radio
  id?: string; // for select

  /**
   * The label of the option.
   */
  label?: string; //for radio
  name?: string; // for select
}
