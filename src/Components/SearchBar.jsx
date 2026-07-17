const SearchBar = ({ search, setSearch }) => (
  <div className="search-box">
    <label htmlFor="search">Search Product: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Type to Filter..."
    />
  </div>
);
export default SearchBar;
