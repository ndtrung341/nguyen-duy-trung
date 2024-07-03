import React from "react";

interface CurrencyItemProps {
  currency: string;
  layout?: "horizontal" | "vertical";
  size?: "small" | "large";
}

const CurrencyItem = ({
  currency,
  layout = "horizontal",
  size = "small",
}: CurrencyItemProps) => {
  const sizeMapping = size === "large" ? "w-14 h-14" : "w-8 h-8";
  const layoutMapping =
    layout === "vertical"
      ? "flex-col justify-center items-center space-y-4"
      : "flex-row items-center space-x-4";

  return (
    <div className={`flex text-inherit ${layoutMapping}`}>
      <img
        src={`/tokens/${currency}.svg`}
        className={sizeMapping}
        alt={currency}
      />
      <div className="text-inherit">{currency}</div>
    </div>
  );
};

export default CurrencyItem;
