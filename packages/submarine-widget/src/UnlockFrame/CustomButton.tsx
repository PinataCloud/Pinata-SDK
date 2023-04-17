import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Customizations } from "../../../../types/UnlockInfo";

interface CustomButtonProps {
  customizations?: Customizations;
  loading?: boolean;
  lockName: string;
  onClick: () => void;
}
const CustomButton = ({
  customizations,
  loading = false,
  lockName,
  onClick,
}: CustomButtonProps) => {
  const [styles, setStyles] = useState({});
  useEffect(() => {
    const style = {
      width: "90%",
      maxWidth: "300px",
      backgroundColor: "#FAFAFA",
      color: "#181818",
      borderRadius: 1000,
    };
    if (customizations?.buttonColor?.hex) {
      style.backgroundColor = customizations.buttonColor.hex;
    }

    if (customizations?.buttonTextColor?.hex) {
      style.color = customizations.buttonTextColor.hex;
    }

    if (customizations?.buttonShape === "square") {
      style.borderRadius = 5;
    }

    setStyles(style);
  }, [customizations]);

  return (
    <Button onClick={onClick} style={styles}>
      {loading ? `Verifying ${lockName}...` : `Verify ${lockName}`}
    </Button>
  );
};

export default CustomButton;
