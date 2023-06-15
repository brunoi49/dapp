import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import "./App.css";

// The contract address
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // Property Variables

  const [message, setMessage] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");

  // Zahtjev za pristup MetaMask računu 
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Dohvaća vrijednost spremljenu u greeting greeting
  async function fetchGreeting() {
    // Provjera povezanosti s MetaMask računom
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider.getCode(greeterAddress))
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
        setCurrentGreeting(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // Postavlja greeting
  async function setGreeting() {
    if (!message) return;

    //Provjera MetaMaska
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Stvaranje ugovora
     
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message);

      setMessage("");
      await transaction.wait();
      fetchGreeting();
    }
  }
  async function fetchVersion() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
  
      try {
        const version = await contract.getVersion();
        console.log("Version:", version);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <div className="description">
          <h1>Greeter.sol</h1>
          <h3>Full stack DApp koristeći ReactJS i Hardhat</h3>
        </div>
        <div className="custom-buttons">
          <button onClick={fetchGreeting} >
            Fetch Greeting
          </button>
          <button onClick={setGreeting} >
            Set Greeting
          </button>
          <button onClick={fetchVersion}>Fetch Version</button>
        </div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Set Greeting Message"
        />
        <h2 className="greeting">Greeting: {currentGreeting}</h2>
      </div>
    </div>
  );
}

export default App;