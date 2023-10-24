import { createContext, useContext, useEffect, useState } from "react";
import { apiConnect } from "../services/axios";

const ShopsContext = createContext();

const ShopsProviderWrapper = ({ children }) => {
  const [allShops, setAllShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shopDetails, setShopDetails] = useState(null);
  const [message, setMessage] = useState(null);

  function handleError(error) {
    setLoading(false);

    console.log(error);

    const { response } = error;
    setError(response?.message);
  }

  const fetchAllShops = async () => {
    try {
      setLoading(true);
      const response = await apiConnect.getAllShops();
      setAllShops(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      handleError(error);
    }
  };

  const addNewShop = async (shopData) => {
    try {
      setLoading(true);
      const response = await apiConnect.createShop(shopData);

      console.log(response);

      setMessage(response.data.message);
      setLoading(false);
      setError(null);

      fetchAllShops();
    } catch (error) {
      handleError(error);
    }
  };

  const addPetToShop = async (newPetData, shopID) => {
    try {
      setLoading(true);
      const response = await apiConnect.addPetToShop(newPetData, shopID);

      setMessage(response.data.data.message);
      setLoading(false);
      setError(null);

      fetchAllShops();
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch a pet by ID
  const getShopById = async (id) => {
    try {
      setLoading(true);
      const response = await apiConnect.getShopById(id);
      setShopDetails(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      handleError(error);
    }
  };

  const deleteShopById = async (id) => {
    try {
      setLoading(true);
      const response = await apiConnect.deleteShop(id);
      setMessage(response.data.message);
      // update all pets by fetching it
      await fetchAllShops();
      setLoading(false);
      setError(null);
    } catch (error) {
      handleError(error);
    }
  };

  const updateShopById = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await apiConnect.updateShop(id, updatedData);
      setMessage(response.data?.message);
      // Update the pet in the state
      await fetchAllShops();
      setLoading(false);
      setError(null);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchAllShops();
  }, []);

  // Define context value
  const contextValue = {
    allShops,
    shopDetails,
    loading,
    message,
    error,
    fetchAllShops,
    getShopById,
    deleteShopById,
    updateShopById,
    addNewShop,
    addPetToShop,
  };

  return (
    <ShopsContext.Provider value={contextValue}>
      {children}
    </ShopsContext.Provider>
  );
};

// Define a custom hook to access the context
const useShopsContext = () => {
  const context = useContext(ShopsContext);
  return context;
};

export { ShopsProviderWrapper, useShopsContext };
