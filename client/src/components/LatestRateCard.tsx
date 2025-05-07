import {
  Card,
  CardContent,
  Typography,
  CircularProgress
} from "@mui/material";
  
type Props = {
  latest: { rate: number; timestamp: string } | null;
  loading: boolean;
};
  
export const LatestRateCard = ({ latest, loading }: Props) => (
  <Card elevation={3} sx={{ height: 180 }}>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
        
      <Typography variant="h6" gutterBottom>
        Latest Conversion Rate
      </Typography>
  
      {loading ? (
        <CircularProgress size={36} />
      ) : latest ? (
        <>
          <Typography variant="h4" color="primary">
            {latest.rate.toFixed(6)}
          </Typography>
            
          <Typography variant="body2" color="text.secondary">
          {new Date(latest.timestamp).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
          </Typography>
        </>
      ) : (
        <Typography color="text.secondary">No data available</Typography>
      )}
    </CardContent>
  </Card>
);
  