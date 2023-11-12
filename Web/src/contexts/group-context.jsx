import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  // Funciones para manipular grupos
  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const removeGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  // ... otras funciones que necesites para manejar grupos

  return (
    <GroupContext.Provider value={{ groups, addGroup, removeGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
