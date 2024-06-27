// src/SomeComponent.tsx
import React, { useContext, useEffect } from "react";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
const ENTITY_NAME = "categories";
const SomeComponent: React.FC = () => {
  const { state, renewData } = useContext(GlobalStateContext);

  //   const createItem = (name: string, data: any) => {
  //     dispatch({ type: 'CREATE_ITEM', payload: { name, data } });
  //   };

  //   const deleteItem = (name: string, id: number) => {
  //     dispatch({ type: 'DELETE_ITEM', payload: { name, id } });
  //   };

  //   const deleteMultipleItems = (name: string, ids: number[]) => {
  //     dispatch({ type: 'DELETE_MULTIPLE_ITEMS', payload: { name, ids } });
  //   };

  useEffect(() => {
    console.log("Current state:", state);
    renewData(ENTITY_NAME);
  }, []);

  return (
    <div>
      <h2>Category Data:</h2>
      {state[ENTITY_NAME] && state[ENTITY_NAME].loading ? (
        <div>Loading</div>
      ) : (
        <pre>{JSON.stringify(state.categories, null, 2)}</pre>
      )}
    </div>
  );
};

export default SomeComponent;
