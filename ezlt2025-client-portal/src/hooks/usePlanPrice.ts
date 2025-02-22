import { usePlans } from "@/provider/plans";
import { useState, useEffect, useMemo, useRef } from "react";

function usePlanPrice() {
  // Ref to store the cached plan data
  const cachedPlanRef = useRef<any>(null);

  const { data, isLoading: apiLoading } = usePlans(); // API fetching
  const [prices, setPrices] = useState({
    single_price: 0,
    couple_price: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check if cached data exists before using the fetched data
  useEffect(() => {
    if (cachedPlanRef.current) {
      // Serve cached data immediately
      const cachedData = cachedPlanRef.current;
      setPrices({
        single_price: Number(cachedData.single_price) || 0,
        couple_price: Number(cachedData.couple_price) || 0,
      });
      setIsLoading(false); // Stop loading immediately when serving cached data
    } else if (data?.data) {
      // If no cached data, cache the new data from the API
      const plan = data.data.find(
        (plan) => plan.name === "COMPLETE LIVING TRUST",
      );
      cachedPlanRef.current = plan;

      if (plan) {
        setPrices({
          single_price: Number(plan.single_price) || 0,
          couple_price: Number(plan.couple_price) || 0,
        });
        setIsLoading(false); // Stop loading after data is cached
      }
    }
  }, [data]);

  return {
    single_price: prices.single_price,
    couple_price: prices.couple_price,
    isLoading: apiLoading && isLoading, // Loading based on API and local state
  };
}

export default usePlanPrice;
