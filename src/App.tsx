import { useState, useEffect } from 'react'
import reactLogo from './assets/bup.jpg'
import './App.css'
import Options from './ApartmentOptions'

export default function App() {

  const [optionGroups, setOptionGroups] = useState([
    {
      id: 'category-1',
      name: 'BedRoom Options',
      options: [
        { id: 'p-1', name: 'One BedRoom', value: 100000 },
        { id: 'p-2', name: 'Two BedRoom', value: 200000 },
        { id: 'p-3', name: 'Three BedRoom', value: 300000 },
        { id: 'p-4', name: 'Four BedRoom', value: 500000 },
      ],
    },
    {
      id: 'category-2',
      name: 'Bath Room Options',
      options: [
        { id: 's-1', name: 'One Bath', value: 10000 },
        { id: 's-2', name: 'Two Bath', value: 20000 },
        { id: 's-3', name: 'Three Bath', value: 30000 },
        { id: 's-4', name: 'Four Bath', value: 40000 },
      ],
    },
    {
      id: 'category-3',
      name: 'Balcony Options',
      options: [
        { id: 'a-1', name: 'One Large Balcony', value: 3000 },
        { id: 'a-2', name: 'Two Medium Balconies', value: 4000 },
        { id: 'a-3', name: 'Multiple Balconies', value: 7000 },
        { id: 'a-4', name: 'Small Balconies', value: 2000 },
        { id: 'a-5', name: 'One Balcony', value: 2500 },
      ],
    },
    {
      id: 'category-4',
      name: 'Living Room Options',
      options: [
        { id: 'l-1', name: 'Large Living Room', value: 50000 },
        { id: 'l-2', name: 'Medium Living Room', value: 35000 },
        { id: 'l-3', name: 'Small Living Room', value: 20000 },
        { id: 'l-4', name: 'Ex Small Living Room', value: 10000 },
      ],
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionValues, setSelectedOptionValues] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  const [featureValues, setFeatureValues] = useState({});
   const options = [['Clean Neighborhood', 20000], ['Safety and Security', 30000], ['Near by Shopping complex', 40000],
       ['Close to City Center', 50000], ['High class Neighborhood', 45000], ['Education Center', 70000],
       ['Lot of Restaurant Near by', 8000], ['With Parking', 3000], ['Near by Train and Bus Stop', 5000],
       ["International Connectivity", 8000], ["Good Air Quality", 7000], ["No Bugs and Mosquitoes", 10000]];
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  useEffect(() => {

        const sumValueFeature = () => {return Object.values(featureValues).reduce((acc, value) =>
            acc + value,0
        );};
        const sumValueOption = () => { return Object.values(selectedOptionValues).reduce((acc, value) =>
            acc + value,0
        );};
    setTotalCost( totalCost => sumValueFeature() + sumValueOption());
    console.log(totalCost);
  }, [selectedOptionValues, featureValues, selectedOptions]);
  const handleChange = (event) => {
    const { value, checked } = event.target;
    const values = value.split(',');
    if (checked) {
      // Add the value to the array if checked
      setSelectedFeatures((prevSelectedFeatures) => [...prevSelectedFeatures, values[0]]);
      setFeatureValues((prevFeatureValues) => {
      // Create a new object to update the state immutably
      const newFeatureValues = { ...prevFeatureValues };
      newFeatureValues[values[0]] = parseInt(values[1]);
      return newFeatureValues;
    });
    } else {
      // Remove the value from the array if unchecked
      setSelectedFeatures((prevSelectedFeatures) =>
        prevSelectedFeatures.filter((feature) => feature !== values[0]));

      setFeatureValues((prevFeatureValues) => {
      // Create a new object to update the state immutably
        const newFeatureValues = { ...prevFeatureValues };
        newFeatureValues[values[0]] =  0;
        return newFeatureValues;
        });
      }


  };
  return (
    <>
      <div>
        {/*<a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>*/}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 class="text-3xl font-bold text-green-500 mb-3"> Predicting Apartment Price</h1>
      <div class="grid grid-cols-5 gap-4 border">
        <aside class="col-span-1 col-start-1 mx-auto bg-black-500 text-white ml-2">
            <ul className="space-y-2">
                <div className="justify-items-start">
                    <h3 class="font-bold text-green-500 mt-1"> Select your favorite Features:</h3>
                        {options.map((feature) => (
                            <div key={feature}  >
                                    <input
                                    class="pr-4"
                                    type="checkbox"
                                    value={feature}
                                    checked={selectedFeatures.includes(feature[0])}
                                    onChange={handleChange}/>
                                <label class="pl-3">
                                    {feature[0]}
                                </label>
                            </div>
                        ))}
      <h4 class="font-bold text-green-500">Selected Features:</h4>
      {/*{selectedFruits.join(', ')}*/}
      <ul className="list-disc list-inside text-white-600 overflow-y-auto justify-items-start">
              {selectedFeatures.map((feature) => {
                // Only render if an option is actually selected for this group

                  return (
                      <div class="justify-items-start">
                    <li key={feature} className="py-1">
                      {feature}
                    </li></div>
                  );

              })}
            </ul>

    </div>
            </ul>
        </aside>
        <main class="col-span-4 col-start-2 grid grid-rows-[2fr_auto] mr-2 mt-3">
            <div class="overflow-y-auto font-bold"><Options optionGroups={optionGroups}
            setOptionGroups={ setOptionGroups} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
            selectedOptionValues={selectedOptionValues} setSelectedOptionValues={setSelectedOptionValues}
            selectedFeatures={selectedFeatures}/></div>
            <div class="border-t p-4 text-2xl overlow-y-auto font-bold justify-items-start text-green-500">
             Total Probable Cost For The Apartment:
            <label class="text-red-500 text-2xl ">{` ${totalCost} USD`}</label>
            </div>


        </main>
    </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
  </>
 );
};
