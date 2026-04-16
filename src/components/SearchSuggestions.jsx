import { useState, useCallback, useEffect } from 'react';
import { getSuggestions } from '../data/recommendations';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchSuggestions = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const updateSuggestions = useCallback((value) => {
    if (value.trim().length >= 2) {
      const results = getSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions(null);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    updateSuggestions(value);
  };

  const handleSuggestionClick = (type, value) => {
    if (type === 'product') {
      navigate(`/product/${value}`);
    } else if (type === 'category') {
      navigate(`/shop?category=${value}`);
    } else if (type === 'search') {
      setQuery(value);
      navigate(`/shop?search=${encodeURIComponent(value)}`);
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Search equipment..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions(null);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
            {/* Products */}
            {suggestions.products.length > 0 && (
              <div className="border-b">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Products
                </p>
                {suggestions.products.map((item) => (
                  <button
                    key={item.value}
                    onClick={() =>
                      handleSuggestionClick(item.type, item.value)
                    }
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-900">{item.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Categories */}
            {suggestions.categories.length > 0 && (
              <div className="border-b">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Categories
                </p>
                {suggestions.categories.map((item) => (
                  <button
                    key={item.value}
                    onClick={() =>
                      handleSuggestionClick(item.type, item.value)
                    }
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-900">{item.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {suggestions.searches.length > 0 && (
              <div>
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Popular Searches
                </p>
                {suggestions.searches.map((item) => (
                  <button
                    key={item.value}
                    onClick={() =>
                      handleSuggestionClick(item.type, item.value)
                    }
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm text-gray-900">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchSuggestions;
