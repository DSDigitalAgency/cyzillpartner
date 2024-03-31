// UserStorageContext.js

import React, { createContext, useContext } from "react";

// Create the context
export const UserStorageContext = createContext();

// Custom hook to consume the context
export const useUserStorageContext = () => useContext(UserStorageContext);
