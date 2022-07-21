import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Json = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as object;


  const redirectToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!state) {
      console.log("no data on state", state);
      navigate("/");
    }
  }, []);

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "center" }} >
        <Button
          variant="outlined"
          onClick={() => {
            redirectToHome();
          }}
        >
          Home
        </Button>
      </Box>
      <pre data-testid = "pre">{JSON.stringify(state, null, 2)}</pre>
    </Box>
  );
};
