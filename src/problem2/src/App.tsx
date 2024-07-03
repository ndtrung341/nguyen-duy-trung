import React, { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoIosArrowRoundForward } from "react-icons/io";
import CurrencyInput from "./components/CurrencyInput";
import CurrencyModal from "./components/CurrencyModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Price = {
  currency: string;
  date: string;
  price: number;
};

const schema = yup
  .object({
    to: yup.string().required(),
    from: yup.string().required(),
    amount: yup.number(),
  })
  .required();

export default function App() {
  const [openModalFor, setOpenModalFor] = useState<"from" | "to" | null>(null);
  const [swapAmount, setSwapAmount] = useState<number | null>(null);
  const [prices, setPrices] = useState<Price[]>([]);

  const form = useForm({
    defaultValues: {
      from: "",
      to: "",
      amount: 0,
    },
    criteriaMode: "firstError",
    resolver: yupResolver(schema),
  });

  const amount = form.watch("amount");
  const from = form.watch("from");
  const to = form.watch("to");

  const { errors } = form.formState;

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("https://interview.switcheo.com/prices.json");
      const data: Price[] = await res.json();
      setPrices(data);
    };

    fetchPrices();
  }, []);

  const currencyList = useMemo(() => {
    return prices.map((p) => p.currency);
  }, [prices]);

  const handleSelectCurrency = (currency: string) => {
    if (openModalFor === "to" || openModalFor == "from")
      form.setValue(openModalFor, currency);
    setOpenModalFor(null);
  };

  const handleSwap = (values: any) => {
    const { from, to, amount } = values;
    const fromPrice = prices.find((p) => p.currency === from)?.price;
    const toPrice = prices.find((p) => p.currency === to)?.price;

    if (!fromPrice || !toPrice) return;

    const exchangeRate = fromPrice / toPrice;
    const swapAmount = amount * exchangeRate;

    setSwapAmount(swapAmount);
  };

  const renderError = () => {
    console.log(errors["root"]);
    const error = errors["from"]?.message || errors["to"]?.message;
    if (error)
      return (
        <div className="py-2 px-4 mb-4 rounded-lg text-lg bg-red-200 text-red-900">
          {error}
        </div>
      );
  };

  return (
    <React.Fragment>
      <div className="h-screen">
        <h1 className="text-center text-4xl block mt-12 mb-8">Currency Swap</h1>
        <div className="mt-8 max-w-md mx-auto">
          {renderError()}
          <div className="flex w-full justify-between gap-12">
            <CurrencyInput
              title={"from"}
              currency={from}
              onClick={() => {
                //  setOpenModal(true);
                //  setSelectFor("from");
                setOpenModalFor("from");
              }}
            />

            <IoIosArrowRoundForward
              size={64}
              className="self-center mt-4 icon text-green-600"
            />

            <CurrencyInput
              title={"to"}
              currency={to}
              onClick={() => {
                //  setOpenModal(true);
                //  setSelectFor("to");
                setOpenModalFor("to");
              }}
            />
          </div>

          <Controller
            control={form.control}
            name="amount"
            render={({ field }) => (
              <input
                type="number"
                step={0.1}
                className="mt-8 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2 focus-visible:outline-none"
                {...field}
              />
            )}
          />

          <button
            type="button"
            onClick={form.handleSubmit(handleSwap)}
            className="block w-full rounded-md border border-transparent bg-green-100 px-4 py-2 font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Swap
          </button>

          {swapAmount && (
            <div className="text-center text-lg mt-3">
              {amount} ({from}) = {swapAmount} ({to})
            </div>
          )}
        </div>
      </div>

      <CurrencyModal
        //   isOpen={openModal}
        //   onClose={() => setOpenModal(false)}
        isOpen={!!openModalFor}
        onClose={() => setOpenModalFor(null)}
        onSelect={handleSelectCurrency}
        currencyList={currencyList.filter((c) => c !== from && c !== to)}
      />
    </React.Fragment>
  );
}
