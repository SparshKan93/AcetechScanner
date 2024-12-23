import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [linkHistory, setLinkHistory] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data from AsyncStorage
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);

        // Load data from AsyncStorage
        const storedLinks = await AsyncStorage.getItem("linkHistory");
        const storedUser = await AsyncStorage.getItem("userData");
        // console.log(storedLinks);
        // console.log(storedUser);

        if (storedLinks) setLinkHistory(JSON.parse(storedLinks));
        if (storedUser) setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Save `linkHistory` to AsyncStorage whenever it changes
  useEffect(() => {
    const saveLinkHistory = async () => {
      try {
        await AsyncStorage.setItem("linkHistory", JSON.stringify(linkHistory));
      } catch (error) {
        console.error("Error saving link history:", error);
      }
    };

    if (linkHistory.length) saveLinkHistory();
  }, [linkHistory]);

  // Add a new link to the history
  const addLinkToHistory = (link) => {
    setLinkHistory((prevLinks) => {
      const updatedLinks = [link, ...prevLinks.filter((item) => item !== link)];
      return updatedLinks.slice(0, 50); // Limit to 50 items
    });
  };

  // Clear all links from history
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("linkHistory");
      setLinkHistory([]);
    } catch (error) {
      console.error("Error clearing link history:", error);
    }
  };

  // Remove a specific link from history
  const removeLinkFromHistory = (link) => {
    setLinkHistory((prevLinks) => prevLinks.filter((item) => item !== link));
  };

  // Login function
  const login = async (userDetails) => {
    try {
        await AsyncStorage.setItem("userData", JSON.stringify(userDetails));
        setUserData(userDetails);
        // console.log("Saving userDetails:", userDetails);

    } catch (error) {
        console.error("Error during login:", error);
    }
};


  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUserData(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Provide context values
  return (
    <AppContext.Provider
      value={{
        linkHistory,
        addLinkToHistory,
        clearHistory,
        removeLinkFromHistory,
        userData,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
