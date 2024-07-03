import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import CurrencyItem from "./CurrencyItem";

interface CurrencyInputProps {
  title: string;
  currency: string;
  onClick: () => void;
}

const CurrencyInput = ({ title, currency, onClick }: CurrencyInputProps) => {
  return (
    <div className="space-y-4 w-40">
      <div className="text-xl font-semibold text-center capitalize">
        {title}
      </div>
      <div
        onClick={onClick}
        className="w-full aspect-square flex items-center justify-center border border-green-600 rounded-xl"
      >
        {currency ? (
          <CurrencyItem currency={currency} layout="vertical" size="large" />
        ) : (
          <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <CiCirclePlus size={52} className="text-green-600" />
            <div className="font-semibold text-lg">Select</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
