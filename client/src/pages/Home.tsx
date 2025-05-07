import { Box, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { fetchLatestRate, fetchRates } from "../services/api";
import { HeaderBar } from "../components/Header";
import { LatestRateCard } from "../components/LatestRateCard";
import { ChartCard } from "../components/ChartCard";
import type { Rate } from "../types/index";
  
  
const Home: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);
  const [rates, setRates] = useState<Rate[]>([]);
  const [latest, setLatest] = useState<Rate | null>(null);
  const [hours, setHours] = useState<number>(24);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fromDate = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
        const [ratesData, latestData] = await Promise.all([
          fetchRates(fromDate),
          fetchLatestRate(),
        ]);
          
        setRates(ratesData);
        setLatest(latestData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch conversion rate data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    if (!autoRefresh) return;
    const id = setInterval(() => {
      shouldScrollRef.current = true;
      fetchData();
    }, 60000);
    return () => clearInterval(id);
  }, [hours, autoRefresh]);

  useEffect(() => {
    if (!shouldScrollRef.current || !chartRef.current) return;
    
    requestAnimationFrame(() => {
      const rect = chartRef.current!.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY - 80;
    
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    
      shouldScrollRef.current = false;
    });
  }, [rates]);

  const handleHoursChange = (newHours: number) => {
    shouldScrollRef.current = true;
    setHours(newHours);
  };
    
  return (
    <>
      <HeaderBar />
      <Box sx={{ height: "80px" }}/>
  
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        width="100%"
        px={2}
        py={2}
        alignItems="center"
      >

          <Box width="100%" maxWidth="md" mb={4}>
            <LatestRateCard latest={latest} loading={loading} />
          </Box>
  
          <Box width="100%" maxWidth="xl" ref={chartRef}>
            <ChartCard
              setHours={handleHoursChange}
              rates={rates}
              hours={hours}
              loading={loading}
              error={error}
            />
          </Box>
          <FormControlLabel
            control={<Switch checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} />}
            label="Live Auto Refresh"
          />
        </Box>
    </>
  );
};
  
export default Home;
  