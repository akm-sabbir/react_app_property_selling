import React, { useState } from 'react';

// Main App component
const Options = ({optionGroups, setOptionGroups, selectedOptions, setSelectedOptions, selectedOptionValues,
    setSelectedOptionValues, selectedFeatures}) => {
    // Sample data for multiple option groups
  const handleToggleOption = (groupId, optionId, value) => {
    setSelectedOptions((prevSelected) => {
      // Create a new object to update the state immutably
      const newSelected = { ...prevSelected };
      // If the clicked option is already selected in this group, deselect it
      if (newSelected[groupId] === optionId) {
        newSelected[groupId] = null; // Or delete newSelected[groupId];
      } else {
        // Otherwise, select the new option for this group
        newSelected[groupId] = optionId;
      }
      return newSelected;
    });

    setSelectedOptionValues((prevSelected) => {
      // Create a new object to update the state immutably
      const newSelected = { ...prevSelected };

      // If the clicked option is already selected in this group, deselect it
      if (selectedOptions[groupId] === optionId) {
        newSelected[groupId] = 0; // Or delete newSelected[groupId];
      } else {
        // Otherwise, select the new option for this group
        newSelected[groupId] = value;
      }
      return newSelected;
    });
  };

  // Helper function to find an option by its ID across all groups
  const findOptionById = (idToFind) => {
    for (const group of optionGroups) {
      const foundOption = group.options.find(option => option.id === idToFind);
      if (foundOption) {
        return { option: foundOption, groupName: group.name };
      }
    }
    return null;
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-gray p-6 rounded-lg shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Choose Your Options
        </h1>

        {/* Iterate over each option group */}
        {optionGroups.map((group) => (
          <div key={group.id} className="mb-8 last:mb-0">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              {group.name}
            </h2>
            {/* Grid container for options within each group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleToggleOption(group.id, option.id, option.value)} // Pass groupId and optionId
                  className={`
                    p-4 border-2 rounded-lg cursor-pointer
                    flex items-center justify-center text-center
                    transition-all duration-200 ease-in-out
                    min-h-[80px] sm:min-h-[100px] // Ensure consistent height for boxes
                    ${
                      // Check if this specific option is selected for its group
                      selectedOptions[group.id] === option.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                        : 'bg-gray-50 border-lime-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    }
                  `}
                >
                  <span className="font-medium text-lg">{option.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Display selected options */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Selected Options:
          </h2>
          {Object.values(selectedOptions).filter(id => id !== null).length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {Object.values(selectedOptions).map((id) =>
                  {
                // Only render if an option is actually selected for this group
                if (id) {
                  const found = findOptionById(id);
                  return (
                      <div class="justify-items-start">
                    <li key={id} className="py-1">
                      {found ? `${found.option.name} (from ${found.groupName})` : `Unknown Option (ID: ${id})`}
                    </li></div>
                  );
                }
                return null;
              })
          }
            </ul>
          ) : (
            <p className="text-gray-500">No options selected yet.</p>
          )}
        </div>

      {/* Display Selected Features */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Selected Features:
          </h2>
          {(selectedFeatures.length > 0) ? (
            <ul className="list-disc list-inside text-gray-600">
              {selectedFeatures.map((feature) => {
                // Only render if an option is actually selected for this group

                  return (
                      <div class="justify-items-start">
                    <li key={feature} className="py-1">
                      {feature}
                    </li></div>
                  );

              })
            }
            </ul>) : (
            <p className="text-gray-500">No Features selected yet.</p>)
          }
        </div>

      </div>
    </div>
  );
};

export default Options;