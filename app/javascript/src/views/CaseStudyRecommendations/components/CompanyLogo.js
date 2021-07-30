import React, { useState } from "react";
import LogoMark from "src/components/LogoMark";

export default function CompanyLogo({ src }) {
  const [fallback, setFallback] = useState(src ? false : true);

  const handleError = () => {
    setFallback(true);
  };

  if (fallback) {
    return <LogoMark size={16} color="subtle" />;
  }

  return <img src={src} alt="" width="16px" onError={handleError} />;
}
