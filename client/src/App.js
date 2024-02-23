import { useEffect, useState } from "react";
import certificate from "./artifacts/contracts/Certificate.sol/Certificate.json";
import { ethers } from "ethers";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignUp from "./components/auth/SignUp";
import Notify from "./components/auth/Notify";
import Verified from "./components/auth/Verified";
import Home from "./components/Home/Home";
import SignIn from "./components/auth/SignIn";
import BirthCertificate from "./components/BirthCertificate";
import ShowCertificate from "./components/ShowCertificate";
import LandDeed from "./components/Forms/LandDeed";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const ethereumProvider = getEthereumProvider();
        if (ethereumProvider) {
          await handleProviderChanges(ethereumProvider);
          setProvider(ethereumProvider);
        } else {
          alert("Metamask is not installed in your browser :(");
        }
      } catch (error) {
        console.error("Error loading provider:", error);
      }
    };

    loadProvider();
  }, []);

  const getEthereumProvider = () => {
    return window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
  };

  const handleProviderChanges = async (ethereumProvider) => {
    ethereumProvider.on("accountsChanged", () => updateAccount(ethereumProvider));
    ethereumProvider.on("chainChanged", () => handleChainChange(ethereumProvider));

    await ethereumProvider.send("eth_requestAccounts", []);
    updateAccount(ethereumProvider);

    const signer = ethereumProvider.getSigner();
    const contractAddress = "0x9d5C11d77B3f579047d3848EF6a261b6F319D44B";
    const contractInstance = new ethers.Contract(contractAddress, certificate.abi, signer);
    console.log(contractInstance);
    setContract(contractInstance);
  };

  const updateAccount = async (ethereumProvider) => {
    const signer = ethereumProvider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  const handleChainChange = (ethereumProvider) => {
    // Handle chain change if needed
  };

  return (
    <Box
      className="App"
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Routes>
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/auth/:id/verify/:token" element={<Verified />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/create-birth-certificate"
          element={<BirthCertificate contract={contract} />}
        />
        <Route
          path="/certificate/:id/birth-certificate/:txid"
          element={<ShowCertificate contract={contract} />}
        />
        <Route path="/LandDeed" element={<LandDeed />} />
      </Routes>
    </Box>
  );
}

export default App;
