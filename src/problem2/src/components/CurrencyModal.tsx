import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import CurrencyItem from "./CurrencyItem";

interface IModalProps {
  isOpen: boolean;
  currencyList: string[];
  onClose: () => void;
  onSelect: (currency: string) => void;
}

const CurrencyModal = ({
  isOpen,
  currencyList,
  onClose,
  onSelect,
}: IModalProps) => {
  const [select, setSelect] = useState<string>("");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-[80vh] w-full max-w-md flex flex-col transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center font-medium leading-6 text-gray-900"
                >
                  Currency List
                </Dialog.Title>

                <div className="my-4 flex-1 overflow-auto">
                  {currencyList.map((currency, index) => (
                    <div
                      key={index}
                      className={`flex items-center py-2.5 px-4 cursor-pointer ${
                        select === currency
                          ? "bg-green-100 text-green-900 rounded-lg"
                          : ""
                      }`}
                      onClick={() => setSelect(currency)}
                    >
                      <CurrencyItem currency={currency} />
                    </div>
                  ))}
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="flex gap-4 mt-auto">
                  <button
                    type="button"
                    className="inline-flex flex-1 justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => onSelect(select)}
                  >
                    Ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CurrencyModal;
