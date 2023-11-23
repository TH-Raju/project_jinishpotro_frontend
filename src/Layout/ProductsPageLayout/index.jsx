import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";
import Range from "../../Components/Range";
import { useContext } from "react";
import { ContextData } from "../../Context";
import { useQuery } from "@tanstack/react-query";

const ProductsPageLayout = () => {
  const { selectedOptions, setSelectedOptions } = useContext(ContextData);
  const { data: categories } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });

  let options = categories?.map((categorie) => categorie.name);

  // console.log(options);

  const handleCheckboxChange = async (option) => {
    const isSelected = await selectedOptions?.includes(option);

    if (isSelected) {
      // If the option is already selected, remove it
      setSelectedOptions(
        selectedOptions.filter((selected) => selected !== option)
      );
    } else {
      // If the option is not selected, add it
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  // console.log(options);
  // console.log("options");
  return (
    <div className="drawer lg:drawer-open lg:mt-16">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content text-right my-2 mr-2">
        <label htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden">
          <Bars3BottomLeftIcon className="h-6 w-6 text-blue-500" />
        </label>
      </div>
      <div className="mt-9 drawer-content ">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}

          <Range />
          <div>
            {options?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2 peer hidden [&:checked_+_label_svg]:block"
                />
                <label
                  htmlFor={option}
                  className="cursor-pointer my-1 btn btn-sm  w-full justify-start"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="hidden h-5 w-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-gray-700">{option} </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProductsPageLayout;
