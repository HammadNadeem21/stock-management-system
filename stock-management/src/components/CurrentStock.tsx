"use client";
import React, { useEffect, useState } from "react";
interface Product {
  slug: string;
  quantity: number;
  price: number;
}
type productProp = Product;
const CurrentStock = () => {
  const [productForm, setProductForm] = useState<Product>({
    slug: "",
    quantity: 0,
    price: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  // FOR TOAST
  const [alert, setAlert] = useState("");

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/product");
      const res = await response.json();
      setProducts(res.products);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST", //POST request for data sending
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(productForm), //productForm data convert into json string
      });

      if (response.ok) {
        console.log("Product add Successfuly");
        setAlert("Your Product has been added!");
        setProductForm({ slug: "", quantity: 0, price: 0 });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // for searchbar dropdown
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([
    {
      _id: "67c20c8bd54f90b8f32571e0",
      slug: "Pencil",
      quantity: "50",
      price: "20",
    },
    {
      _id: "67c1fee5d54f90b8f32571db",
      slug: "Pen",
      quantity: "12",
      price: "20",
    },
    {
      _id: "67c20c8bd54f90b8f32571e0",
      slug: "Pencil",
      quantity: "50",
      price: "20",
    },
  ]);
  const onDropdownEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!loading) {
      setLoading(true);
      setDropdown([])
      const response = await fetch(
        "http://localhost:3000/api/search?query=" + query
      );
      const res = await response.json();
      setDropdown(res.products);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-green-800 text-center">{alert}</div>

      {/* Search Product */}
      <div className="container bg-[#51d0d2]/20 mx-auto mt-10 px-5 py-3 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mb-2 gap-2">
          <input
            onBlur={ () => { setDropdown([]) } }
            onChange={onDropdownEdit}
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

        {/* Loading SVG */}
        {loading && 
        <div className="flex mb-4 justify-center items-center">
          <svg
            className="animate-spin h-10 w-10 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          </div>
        }

        <div className="absolute bg-[#51d0d2] w-[81%] rounded-lg">
          {dropdown.map((item) => {
            return (
              <div
                key={item.slug}
                className="container  p-3  grid grid-cols-3 my-1 text-center justify-between border-b-2 border-[#3ea0a1]"
              >
                <span className="">{item.slug}</span>

                <span className="">{item.price}</span>
                <span className="">{item.price}</span>
              </div>
            );
          })}
          </div>


      </div>

      <div className="container bg-[#51d0d2]/20 mx-auto mt-10 px-5 py-3 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-2">
              Product Slug
            </label>
            <input
              value={productForm?.slug || ""}
              name="slug"
              onChange={handleChange}
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
              value={productForm?.quantity || ""}
              name="quantity"
              onChange={handleChange}
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
              value={productForm?.price || ""}
              name="price"
              onChange={handleChange}
              type="number"
              id="price"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          <button
            onClick={addProduct}
            type="submit"
            className="bg-[#aee45c] hover:bg-[#70b110] transition-all duration-300 text-white px-4 py-2 rounded-xl"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="container bg-[#51d0d2]/20 mx-auto mt-10 mb-5 px-5 py-3 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Display Current Stock</h1>

        <table className="table-auto w-full border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Product Name</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Price</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.slug}>
                  <td className="border border-black px-4 py-2">{item.slug}</td>
                  <td className="border border-black px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-4 py-2">
                    Rs {item.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentStock;
