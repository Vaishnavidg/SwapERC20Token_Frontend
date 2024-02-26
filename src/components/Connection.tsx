import { Box, BoxClassKey, Button } from '@mui/material';
import { ethers } from 'ethers';
import React, { useState } from 'react'
import TokenAbi from "../SwapTokens.json";


export default function Connection() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [errormessage, setErrormessage] = useState<string | null>(null);
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0);
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


  
    const ConnectWallet = () => {
        if (window.ethereum) {
          const providers = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(providers);
          console.log(providers);
          if (provider) {
            window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then((result: React.SetStateAction<string>[]) => {
                setUserAddress(result[0]);
                setTokenContract(
                  new ethers.Contract(contractAddress,TokenAbi.abi , providers)
                );
              });
          }
          // console.log(tokenContract);
          // console.log(new ethers.Contract(contractAddress, TokenAbi.abi, providers));
        } else {
          setErrormessage("Install Metamask! ");
        }
      };
      const Print =()=>{
        if(tokenContract && userAddress){
          console.log(tokenContract);
          console.log(userAddress);
        }
       
      }
  return (
   <Box>
    <Button onClick={ConnectWallet}>Connection</Button>
   <h1>{userAddress}
    </h1> 
    {/* {tokenContract} */}
    <Button onClick={Print}>Print</Button>
   </Box>
  )
}
