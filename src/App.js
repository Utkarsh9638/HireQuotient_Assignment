import React, { useState, useEffect } from 'react';
import './App.css';
import BondTable from './components/Bond';
import RealEstate from './components/RealEstate';
import Loan from './components/Loan';
import Cash from './components/Cash';
import Fund from './components/Fund';
import Equity from './components/Equity';
function App() {
  const [bondData, setBondData] = useState([]);
 const [realestateData, setrealestate] = useState([]);
 const [cashData, setcashData] = useState([]);
 const [equityData, setequityData] = useState([]);
 const [fundData, setfundData] = useState([]);
 const [loanData, setloanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Empty array as second argument means this effect runs only once, equivalent to componentDidMount

  const fetchData = async () => {
    try {
      const response = await fetch('https://canopy-frontend-task.vercel.app/api/holdings'); // Replace this URL with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      const bondDataFiltered = jsonData.payload.filter(item => item.asset_class === "Bond");
      const realestateDataFiltered = jsonData.payload.filter(item => item.asset_class === "Real Estate")
      const cashDataFiltered = jsonData.payload.filter(item => item.asset_class === "Cash")
      const equityDataFiltered = jsonData.payload.filter(item => item.asset_class === "Equity")
      const fundDataDataFiltered = jsonData.payload.filter(item => item.asset_class === "Fund")
      const loanDataFiltered = jsonData.payload.filter(item => item.asset_class === "Loan") 
      setBondData(bondDataFiltered);
      setrealestate(realestateDataFiltered)
      setcashData(cashDataFiltered)
      setequityData(equityDataFiltered)
      setfundData(fundDataDataFiltered)
      setloanData(loanDataFiltered)
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <RealEstate arrayofrealestate={realestateData}/> 
      <Cash arrayofcash={cashData}/>
      <BondTable arrayofbond={bondData}/>
      <Equity arrayofequity={equityData}/>
      <Loan arrayofloan={loanData}/> 
      <Fund arrayoffund={fundData}/>      
    </div>
  );
}

export default App;