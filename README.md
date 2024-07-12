<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
- [Contributing](#contributing)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About the Project

The IOTA Wiki is a central hub for entering into the IOTA ecosystem. A community driven initiative to provide an up-to-date collection of introductions and further reading about the technology, the teams, the community, and everything in between. So anyone can learn how to build, adopt, and engage with IOTA, all in one space.

### Built With

The IOTA Wiki is built using [TypeScript](https://www.typescriptlang.org/), [ReactJS](https://reactjs.org/) and [Docusaurus v2.0](https://docusaurus.io/).

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Node.js 20.10 or above](https://nodejs.org/en/download/).
- [Modern Yarn](https://yarnpkg.com/getting-started/install) enabled by running `corepack enable`.

### Preview Locally

To preview the Wiki locally, use the following steps. For more detailed scripts, see [Pre-configured scripts](#pre-configured-scripts) for reference.

> Please note that the Wiki has a lot of content, so currently the initial build is taking a while. Effort is taken to try and reduce the build time in the future.

1. Clone the repository by running `git clone https://github.com/iotaledger/iota-wiki.git` and go to the directory with `cd iota-wiki`.
2. Install dependencies with `yarn`.
3. Prepare the environment by running `yarn prepare`, this has to be done only once.
4. Preview the Wiki with `yarn start`, this will start a development server serving the Wiki with hot reload capability, so it will update content after any changes were made.

#### Pre-configured scripts

| Script                    | Explanation                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prepare`                 | Prepare the environment by checking out submodules build.                                                                                                                                                           |
| `start`                   | Start a development server serving the Wiki, with hot reloading on changes.                                                                                                                                         |
| `start:section:{section}` | Start a development server serving only a section of the Wiki, with hot reloading on changes. Available sections are `build`, `get-started`, `learn`, and `maintain`.                                               |
| `build`                   | Build the Wiki. To build for production, checkout the latest version of external documentation by running `yarn checkout:remote` and set the `MODE` environment variable to `production`.                           |
| `checkout:remote`         | Check out the latest version of external documentation.                                                                                                                                                             |
| `generate:api`            | Generate available API documentation configured through the [Docusaurus OpenAPI plugin](https://www.npmjs.com/package/@paloaltonetworks/docusaurus-plugin-openapi) and by compiling documentation from source code. |

<!-- CONTRIBUTING -->

## Contributing

The IOTA Wiki is maintained by the IF and community contributions are always welcome. The DX team and related teams from the IF will review all issues and pull requests posted to this repository. If you notice any mistakes, or feel something is missing, feel free to create an issue to discuss with the team or directly create a pull request with suggestions. Here is a basic workflow to open a pull request:

1. Fork this repository to your own account and clone it (`git clone https://github.com/<YOUR_USERNAME>/iota-wiki.git`)
2. Create a feature branch for your changes (`git checkout -b feat/amazing-feature`).
3. Make your changes and optionally [preview them locally](#preview-locally).
4. Run `yarn format` and `yarn lint` and fix any remaining errors and warnings.
5. Commit your changes (`git commit -m 'Add some amazing feature'`).
6. Push your changes to your fork (`git push origin feat/amazing-feature`).
7. Open a pull request to the `main` branch of this repository.

Have a look at [CONTRIBUTING](.github/CONTRIBUTING.md) for further guidance.

### Versioning

To find out how to version your docs, read [this guide](https://wiki.iota.org/community/contribute-to-wiki/how_tos/versioning).

### Online one-click setup for contributing

You can use Gitpod (a free, online, VS Code-like IDE) for contributing. With a single click it will prepare everything you need to build and contribute to the Wiki. Just click on this button and skip step 1 from above.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-url]

<!-- CONTACT -->

## Contact

Phylo - [Phyloiota](https://github.com/Phyloiota) - Phylo [Community DAO - lets go!]#2233  
Jeroen van den Hout - [jlvandenhout](https://github.com/jlvandenhout) - jvdhout#4402  
Dr.Electron - [Dr-Electron](https://github.com/Dr-Electron) - Dr.Electron#9370  
Critical - [kilianhln](https://github.com/kilianhln) - Critical#7111  
JSto - [JSto91](https://github.com/JSto91) - JSto#3746

# Global State Management System Documentation Ver 1

## Purpose of the Global State Management System

The primary goal of the Global State Management System is to facilitate the management of multiple entity lists that are used across various components within the application, such as in lists, filters, and other interactive elements. These entities may require frequent updates, edits, and deletions. It is crucial to maintain the integrity and accuracy of these entity lists wherever they are utilized to ensure that all components reflect the most current state of data. This system ensures that updates to any entity are propagated in real time across all components that consume these entities, maintaining consistent and up-to-date state information throughout the application.

## Overview

The Global State Management System is a framework designed to manage global state in React applications. It is built on React's Context and utilizes a reducer for managing states and actions across the application. This system aims to simplify the access and manipulation of data fetched via APIs and supports loading indication for asynchronous operations.

## Key Components

1. **AppState** - Defines the shape of the application's state.
2. **DataEntity** - Describes the structure of each entity in the state, including a list of items and a loading boolean.
3. **Reducer** - A function that processes actions and updates the state accordingly.
4. **StateProvider** - A component that provides global state to the entire application.
5. **Context** - Created with `React.createContext`, this provides access to the state and the dispatch function.
6. **Actions** - Objects dispatched to the reducer to update the state. They include the action type and payload.

## Action Types

- **SET_DATA** - Sets data for the specified entity and stops the loading indicator.
- **SET_LOADING** - Sets the loading state for the specified entity.
- **UPDATE_ITEM** - Updates an item in the entity list.
- **CREATE_ITEM** - Adds a new item to the entity list.
- **DELETE_ITEM** - Removes an item from the entity list.
- **DELETE_MULTIPLE_ITEMS** - Removes multiple items from the entity list based on an array of IDs.

## Initialization and Setup

### Configuration Explanation

The `config` array serves as the central setup for specifying how each entity list should be managed within the Global State Management System. Here's an overview of the properties within each configuration object:

- **name**: A unique key used to reference the list within the state. This is not displayed but is used internally by the system to manage and update the corresponding entity list.

- **title**: A human-readable title for the list. This is used primarily for display purposes in components, helping to identify different lists by a friendly name.

- **apiUrl**: The endpoint URL for fetching the data associated with this entity. This URL is used to make API requests to retrieve or manipulate the data of this specific entity.

### API Request Object Requirements

For the state management system to operate correctly, it requires an object capable of executing API requests. This object must conform to a specific structure to ensure compatibility with the system:

- **Functionality**: The object must expose methods for making HTTP requests (GET, POST, PUT, DELETE) to handle fetching, updating, and deleting data.

- **Headers and Authentication**: The setup and handling of HTTP headers, including authentication tokens or custom headers, must be managed within this object. This allows the API request object to encapsulate all aspects of request customization and security.

### Example of a Suitable API Request Object

Here is a basic structure of an API request object that meets these requirements:

```javascript
const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    return await response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
export const API = {
  fetchDataById: async <T>(url: string, _id: string) =>
    await apiRequest<T>(`${url}/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-access-token",
      },
    }),
  fetchData: async <T>(url: string) =>
    await apiRequest<T>(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-access-token",
      },
    }),
  updateData: async <T>(url: string, _id: number, data: any) =>
    await apiRequest<T>(`${url}/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-access-token",
      },
      body: JSON.stringify(data),
    }),
  deleteData: async (url: string, _id: number) =>
    await apiRequest<void>(`${url}/${_id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer your-access-token" },
    }),
  createData: async <T>(url: string, data: any) =>
    await apiRequest<T>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-access-token",
      },
      body: JSON.stringify(data),
    }),
  deleteMany: async (url: string, ids: number[] | string[]) =>
    await apiRequest<void>(url, {
      method: "POST", // Assuming a POST request with a body for deletion criteria
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-access-token",
      },
      body: JSON.stringify({ ids }),
    }),
};
```

Example of initializing the `StateProvider` with initial configuration and an API function:

```javascript
const config = [{ name: "categories", apiUrl: "/api/categories" }];

<StateProvider initialConfig={config} apiRequest={apiRequest}>
  <App />
</StateProvider>;
```

# Main Workflow

## State Initialization

At application start, the `StateProvider` initializes the global state based on the provided configuration. Each entity starts with an empty list and `loading` set to `false`.

## Data Fetching

When a component requires data, it invokes the `loadData` function, which sets `loading` to `true` and performs the API request. Once the data is received, it is stored in the appropriate entity and `loading` is set to `false`.

## Data Updating

Components needing to update data can call `updateData` or other functions that dispatch appropriate actions to the reducer.

## Using the Data

Components subscribed to the context receive the current state and can react to changes, e.g., displaying loading indicators or updated data.

# Figma

- **static-site-generator** (also called **[Jamstack](https://jamstack.org/)**).
- variblae explorer https://www.figma.com/community/plugin/1310888112326715990/figma-variable-explorer **[Plagin](https://jamstack.org/)**)
- https://github.com/mui/mui-design-kits/issues/281
