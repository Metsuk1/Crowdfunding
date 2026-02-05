"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider, formatEther } from "ethers";

const HARDHAT_CHAIN_ID = "0x7A69"; // 31337 in hex

interface WalletContextType {
    walletAddress: string | null;
    balance: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    isConnecting: boolean;
    isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

async function switchToHardhat() {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    try {
        // Try switching to Hardhat network
        await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: HARDHAT_CHAIN_ID }],
        });
    } catch (switchError: any) {
        // Chain not added yet — add it
        if (switchError.code === 4902) {
            await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: HARDHAT_CHAIN_ID,
                        chainName: "Hardhat Localhost",
                        nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                        rpcUrls: ["http://127.0.0.1:8545"],
                    },
                ],
            });
        } else {
            throw switchError;
        }
    }
}

export function WalletProvider({ children }: { children: ReactNode }) {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const fetchBalance = async (address: string) => {
        try {
            if (typeof window !== "undefined" && (window as any).ethereum) {
                const provider = new BrowserProvider((window as any).ethereum);
                const bal = await provider.getBalance(address);
                setBalance(parseFloat(formatEther(bal)).toFixed(4));
            }
        } catch {
            setBalance(null);
        }
    };

    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window !== "undefined" && (window as any).ethereum) {
                try {
                    const provider = new BrowserProvider((window as any).ethereum);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0].address);
                        setIsConnected(true);
                        fetchBalance(accounts[0].address);
                    }
                } catch (error) {
                    console.error("Failed to check wallet connection:", error);
                }
            }
        };
        checkConnection();
    }, []);

    const connectWallet = async () => {
        setIsConnecting(true);
        try {
            if (typeof window !== "undefined" && (window as any).ethereum) {
                // Switch to Hardhat network first
                await switchToHardhat();

                const provider = new BrowserProvider((window as any).ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                if (accounts.length > 0) {
                    const signer = await provider.getSigner();
                    const address = await signer.getAddress();
                    setWalletAddress(address);
                    setIsConnected(true);
                    fetchBalance(address);
                }
            } else {
                alert("MetaMask is not installed. Please install it to use this feature.");
            }
        } catch (error) {
            console.error("Connection error:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
        setBalance(null);
        setIsConnected(false);
    };

    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                balance,
                connectWallet,
                disconnectWallet,
                isConnecting,
                isConnected,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
