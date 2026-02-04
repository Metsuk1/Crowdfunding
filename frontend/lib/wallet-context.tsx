"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider } from "ethers";

interface WalletContextType {
    walletAddress: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    isConnecting: boolean;
    isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // Check for existing connection on mount
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window !== "undefined" && (window as any).ethereum) {
                try {
                    const provider = new BrowserProvider((window as any).ethereum);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0].address);
                        setIsConnected(true);
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
                const provider = new BrowserProvider((window as any).ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                if (accounts.length > 0) {
                    // Get the signer to ensure we have the correct address format if needed, 
                    // though eth_requestAccounts returns strings. provider.getSigner().getAddress() is safer.
                    const signer = await provider.getSigner();
                    const address = await signer.getAddress();
                    setWalletAddress(address);
                    setIsConnected(true);
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
        setIsConnected(false);
    };

    return (
        <WalletContext.Provider
            value={{
                walletAddress,
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
