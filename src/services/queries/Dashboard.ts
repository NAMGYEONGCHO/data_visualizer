import { useQuery } from 'react-query';
import { Data } from '../../types/ApiTypes'

const getPrices = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  );

  const data = await res.json();

  const prices = data.prices;

  return prices;
};

export const usePrices = () => {
    return useQuery<Data[]>("prices", getPrices);
};
