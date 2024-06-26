import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import selectedCityContext from "../../contexts/selectedCityContext.jsx";
import directory from "../../data/directory.json";

export default function Dropdown() {
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext);

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            City: {selectedCity}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {directory.cities.map((city) => (
                <Menu.Item onClick={() => setSelectedCity(city.city_name)} key={city.city_name}>
                  {({ active }) => (
                    <button
                    onClick={() => setSelectedCity(selectedCity)}
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <img
                        src={city.coat_of_arms_url ? city.coat_of_arms_url : "./city_coat_of_arms/default.svg"}
                        className="w-5 h-5 mr-2"
                        alt="Logo"
                      />
                      {city.city_name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}