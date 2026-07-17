import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const files = ["branch1.json", "branch2.json", "branch3.json"];

    try {
      const fetchPromises = files.map((file) =>
        fetch(`api/${file}`).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${file}`);
          return res.json();
        }),
      );

      const responses = await Promise.all(fetchPromises);

      // Aggregate the response data
      const aggregate = responses.reduce((acc, branch) => {
        if (branch?.products && Array?.isArray(branch?.products)) {
          branch?.products.forEach(({ name, unitPrice, sold }) => {
            const revenue = unitPrice * sold;
            acc[name] = (acc[name] || 0) + revenue;
          });
        }
        return acc;
      }, {});

      // Transformat the aggregate data into array
      const formattedData = Object.entries(aggregate).map(
        ([name, totalRevenue]) => ({
          name,
          totalRevenue,
        }),
      );

      setProducts(formattedData);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Filtering aur Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, search]);

  // 5. Total Revenue calculate
  const totalRevenue = filteredProducts.reduce(
    (sum, p) => sum + p.totalRevenue,
    0,
  );

  if (loading) {
    return (
      <div className="app-container">
        <h2>Loading Revenue Data...</h2>
      </div>
    );
  }
  return (
    <div className="app-container">
      <h1>Revenue Aggregator</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <ProductTable products={filteredProducts} totalRevenue={totalRevenue} />
    </div>
  );
};

export default App;
