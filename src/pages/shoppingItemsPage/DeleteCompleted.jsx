import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const DeleteCompleted = ({ deleteCompleted }) => {
  return (
    <div className="flex justify-end absolute bottom-10 right-0">
      <Menu
        as="div"
        className="inline-block text-left text-md md:text-xl font-bold"
      >
        <Menu.Button>
          <button className="inline-flex justify-center border border-transparent bg-orange-600 hover:bg-orange-700 py-2 px-4 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
            >
              <path
                fill="white"
                d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
              />
            </svg>
          </button>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-full right-0 z-10 mb-2 w-auto origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => deleteCompleted()}
                    className="text-gray-900 cursor-pointer block px-4 py-2 text-sm text-center"
                  >
                    Delete Completed
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DeleteCompleted;
