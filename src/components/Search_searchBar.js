import React from "react";
import "../style/Search_searchBar.css";

function Search() {
  return (
    <>
      <div class="h-auto w-full grid bg-regal-red place-content-center">
        <div className="bg-search-bar">
          <div>
            <form class="flex items-center mx-8 mt-8">
              <label for="simple-search font-medium" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="h-14 bg-gray-200 text-gray-800 text-sm rounded-full font-medium  block w-full pl-10 p-2.5 "
                  placeholder="พิมพ์คำที่ต้องการจะค้นหาที่นี่.."
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-regal-red rounded-full hover:bg-regal-red-hover focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <svg
                  class="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div>
            <div class="flex ml-14 mb-8 mt-4">
              <div class="flex items-center mr-4">
                <input
                  id="inline-checkbox-head"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:regal-red "
                />
                <label
                  for="inline-checkbox-head"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                >
                  โครงงานวิจัย
                </label>
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="inline-2-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500"
                />
                <label
                  for="inline-2-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 "
                >
                  ผู้วิจัย
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
