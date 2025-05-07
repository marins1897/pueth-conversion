import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { RateChart } from "./RateChart";
import type { Rate } from "../types/index";
  
type Props = {
  rates: Rate[];
  hours: number;
  setHours: (h: number) => void;
  loading: boolean;
  error: string | null;
};
  
export const ChartCard = ({
  rates,
  hours,
  setHours,
  loading,
  error,
}: Props) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Conversion Rate Over Time
        </Typography>
  
        <Box mb={3}>
          <TimeRangeSelector selected={hours} onSelect={setHours} />
        </Box>
  
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : rates.length == 0 ? (
          <Typography>No data available for the selected time range.</Typography>
        ) : (
          <RateChart data={rates} />
        )}
      </CardContent>
    </Card>
  );
};
  