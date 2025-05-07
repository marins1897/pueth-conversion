import { Box, Button, ButtonGroup } from "@mui/material";

type Props = {
  selected: number;
  onSelect: (hours: number) => void;
};

const timeRanges = {
  "1H": 1,
  "24H": 24,
  "3D": 24 * 3
};

export const TimeRangeSelector = ({ selected, onSelect }: Props) => (
  <Box display="flex" justifyContent="flex-start" alignItems="center" height="100%">
    <ButtonGroup variant="outlined" color="primary">
      {Object.entries(timeRanges).map(([label, h]) => (
        <Button
          key={label}
          variant={selected === h ? "contained" : "outlined"}
          onClick={() => onSelect(h)}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  </Box>
);
