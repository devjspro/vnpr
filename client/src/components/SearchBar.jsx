export default function SearchBar({ setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search plate..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}