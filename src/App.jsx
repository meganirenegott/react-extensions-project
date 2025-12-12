import { useState } from "react";
import "./App.css";
import Card from "./Components/Card.jsx";
import data from "./data.js";

function App() {
  const [extensions, setExtensions] = useState(data);
  const [filter, setFilter] = useState("all"); // Other settings are "active" and "inactive"

  function toggleExtensionActiveById(id) {
    setExtensions((previousExtensions) => {
      return getUpdatedExtensions(previousExtensions, id);
    });
  }

  function removeExtensionById(id) {
    setExtensions((previousExtensions) => {
      return getRemainingExtensions(previousExtensions, id);
    });
  }

  function getFilteredExtensions(allExtensions, currentFilter) {
    return allExtensions.filter((extension) => {
      return doesExtensionMatchFilter(extension, currentFilter);
    });
  }

  const visibleExtensions = getFilteredExtensions(extensions, filter);


  function getUpdatedExtensions(previousExtensions, id) {
    return previousExtensions.map((extension) => {
      return getUpdatedExtension(extension, id);
    });
  }

  function getUpdatedExtension(extension, id) {
    const isSameExtension = extension.id === id;

    if (!isSameExtension) {
      return extension;
    }

    return createToggledExtension(extension);
  }

  function createToggledExtension(extension) {
    return {
      ...extension,
      isActive: !extension.isActive,
    };
  }

  function getRemainingExtensions(previousExtensions, id) {
    return previousExtensions.filter((extension) => {
      return shouldKeepExtension(extension, id);
    });
  }

  function shouldKeepExtension(extension, id) {
    const isSameId = extension.id === id;
    const shouldKeep = !isSameId;
    return shouldKeep;
  }

  function doesExtensionMatchFilter(extension, currentFilter) {
    if (currentFilter === "active") {
      return isExtensionActive(extension);
    }

    if (currentFilter === "inactive") {
      return isExtensionInactive(extension);
    }

    // "all" or anything else → include it
    return true;
  }

  function isExtensionActive(extension) {
    return extension.isActive === true;
  }

  function isExtensionInactive(extension) {
    return extension.isActive === false;
  }

  // ===== Render =====

  return (
    <div className="App">
  
      {/* Filter buttons */}
      <div className="filter-header">
        <h1>Extensions List</h1>
        <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Show All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("inactive")}>Inactive</button>
        </div>
      </div>
      {/* Render cards */}
      <div className="cards-container">
        {visibleExtensions.length > 0 ? (
          visibleExtensions.map((extension) => {
            return (
              <Card
                key={extension.id}
                cardInformation={extension}
                onToggleActive={toggleExtensionActiveById}
                onRemove={removeExtensionById}
              />
            );
          })
        ) : (
          <p>No extensions found for this filter.</p>
        )}
      </div>
    </div>
  );
}

export default App;
