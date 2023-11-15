/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const Categoriy = ({ categoriy }) => {
  const { name, title, products } = categoriy;
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl sm:text-2xl font-extrabold my-4">
        <span className="text-rose-700 font-extrabold">I</span> {name}{" "}
      </h1>
      <h1 className="ml-3">{title}</h1>
      <div>
        {
            products.map(product => <div key={product._id}> {product.name}</div>)
        }
      </div>
    </div>
  );
};

export default Categoriy;
