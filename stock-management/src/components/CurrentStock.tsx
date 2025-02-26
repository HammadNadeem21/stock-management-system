import React from "react";

const CurrentStock = () => {
  return (
    <>
      {/* Search Product */}
      <div className="container bg-[#51d0d2] mx-auto mt-10 px-5 py-3 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter a product name"
            className="flex-1 border border-black px-5 rounded-lg"
          />
          <select className="border border-black px-4 py-2 rounded-lg">
            <option value="">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
      </div>

      <div className="container bg-[#51d0d2] mx-auto mt-10 px-5 py-3 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-2">
              Product Slug
            </label>
            <input
              type="text"
              id="productName"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-[#aee45c] hover:bg-[#70b110] transition-all duration-300 text-white px-4 py-2 rounded-xl"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="container bg-[#51d0d2] mx-auto mt-10 mb-5 px-5 py-3 rounded-lg">
        <h1>Display Current Stock</h1>

        <table className="table-auto w-full border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Product Name</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Number</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">Product Name</td>
              <td className="border border-black px-4 py-2">Quantity</td>
              <td className="border border-black px-4 py-2">Number</td>
            </tr>

            <tr>
              <td className="border border-black px-4 py-2">Product A</td>
              <td className="border border-black px-4 py-2">10</td>
              <td className="border border-black px-4 py-2">$9.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentStock;
