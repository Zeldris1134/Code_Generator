import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const SiteContext = createContext();

const SiteProvider = ({ children }) => {
  const [sites, setSites] = useState([]);

  const findSites = async () => {
    const result = await AsyncStorage.getItem("sites");
    if (result !== null) setSites(JSON.parse(result));
  };

  useEffect(() => {
    findSites();
  }, []);

  return (
    <SiteContext.Provider value={{ sites, setSites, findSites }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSites = () => useContext(SiteContext);

export default SiteProvider;
