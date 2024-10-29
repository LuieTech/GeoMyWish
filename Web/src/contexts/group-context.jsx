import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const removeGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const value = {
    groups,
    currentGroup,
    setCurrentGroup,
    addGroup,
    removeGroup,
  };

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  );
};

export function useGroupContext(){
  return useContext(GroupContext);
};
