import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { CatchingPokemon } from '@mui/icons-material';
import { ethers } from 'ethers';
import TokenAbi from "../SwapTokens.json";
import SwapComponent from './SwapComponent';
declare global {
    interface Window {
        ethereum?: any;
    }
}

export default function Navbar(): JSX.Element {
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const [errormessage, setErrormessage] = useState<string>("");
    const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(null);
    const [userAddress, setUserAddress] = useState<string>("");
    const [connecting, setConnecting] = useState(false);
    const ConnectWallet = () => {
        setConnecting(true);
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
                            new ethers.Contract(contractAddress, TokenAbi.abi, providers)
                        );
                    });
            }
            setConnecting(false);
            // console.log(tokenContract);
            // console.log(new ethers.Contract(contractAddress, TokenAbi.abi, providers));
        } else {
            setErrormessage("Install Metamask! ");
            setConnecting(false);
        }
    };

    // const connectWallet = () => {
    //     if (window.ethereum) {
    //         window.ethereum
    //             .request({ method: "eth_requestAccounts" })
    //             .then((result: string[]) => {
    //                 accountChange(result[0]);
    //                 setDefaultAccount(result[0]);
    //             })
    //             .catch((error: Error) => {
    //                 setErrormessage("Error connecting to wallet: " + error.message);
    //             });
    //     } else {
    //         setErrormessage("Install Metamask!");
    //     }
    // };

    // const getBalance = (accountAddress: string | null) => {
    //     if (accountAddress) {
    //         window.ethereum
    //             .request({
    //                 method: "eth_getBalance",
    //                 params: [String(accountAddress), "latest"],
    //             })
    //             .then((balance: string) => {
    //                 console.log(balance);
    //                 setUserBalance(ethers.utils.formatEther(balance));
    //             })
    //             .catch((error: Error) => {
    //                 setErrormessage("Error getting balance: " + error.message);
    //             });
    //     }
    // };

    const accountChange = (accountName: string | null) => {
        setDefaultAccount(accountName);
        // getBalance(accountName);
    };


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <CatchingPokemon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            SWAP TOKENS
                        </Typography>
                        <Button color="inherit" onClick={ConnectWallet} disabled={connecting}>
                            {connecting ? 'Connecting...' : (userAddress ? `${userAddress}` : 'Connect')}
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className='MainSwap'>
                {tokenContract && <SwapComponent contract={tokenContract} />}
            </div>
        </>

    );
}
