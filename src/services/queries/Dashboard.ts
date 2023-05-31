import { useQuery } from 'react-query';
import { Data } from '../../types/ApiTypes'

// Function to fetch the price data from the API
const getPrices = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  );
  
  // Check if the fetch was successful
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();

  const prices = data.prices;

  return prices;
};

// Custom hook to get the price data
export const usePrices = () => {
    const { data, error, isError, isLoading } = useQuery<Data[]>("prices", getPrices);

    if (isLoading) {
      return { isLoading: true };
    }

    if (isError) {
      // If an error occurred during the query, log the error and return it
      console.error('An error occurred: ', error);
      return { isError: true, error };
    }

    // If the query was successful, return the data
    return { data, isLoading: false, isError: false };
};
