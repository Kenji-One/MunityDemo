import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function ContentsTop({
  title,
  label,
  placeholder,
  initialValue,
  featureKey,
  handleFeatureChange,
}) {
  const [url, setUrl] = useState(initialValue ? initialValue : "");

  // Function to handle save button click
  const handleSave = () => {
    handleFeatureChange(featureKey, undefined, url); // Assuming isActive is unchanged
  };
  return (
    <Box className="mob:mt-6 tab:mt-8 lap:mt-10 flex flex-col items-start mb-8">
      <Box className="flex items-center justify-between gap-4 w-full !mb-8 flex-wrap">
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "24px",
            lineHeight: "120%",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box className="!mb-8 w-full">
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "14px",
            lineHeight: "normal",
          }}
          className="!mb-[8px]"
        >
          {label}
        </Typography>
        <TextField
          type="url"
          className="w-full max-w-[352px]"
          InputLabelProps={{
            shrink: false,
          }}
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "400 !important",
          "&.MuiButtonBase-root.lightBlue": {
            backgroundColor: "#34A4E0",
          },
          lineHeight: "150%",
          color: "#10111B",
        }}
        className="!uppercase lightBlue"
      >
        Save
      </Button>
    </Box>
  );
}
