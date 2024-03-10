import { ethers } from "ethers";
import { WalletClient } from "viem";
import { useAccount, useBalance } from "wagmi";

const UseWalletConnectedHook = () => {
  const { address: userAddress, isConnected } = useAccount();
  const { data: userBalance } = useBalance({ address: userAddress });

  const UseGetProvider = (client: WalletClient) => {
    const { chain, transport } = client;
    const network = {
      chainId: chain?.id,
      name: chain?.name,
      ensAddress: chain?.contracts?.ensRegistry?.address,
    };
    // You can use whatever provider that fits your need here.
    const provider = new ethers.BrowserProvider(transport, network);
    return provider;
  }

  const UseGetSigner = async (client: WalletClient) => {
    const { account } = client;
    const provider = UseGetProvider(client);
    const signer = await provider.getSigner(account?.address);
    return signer;
  }

  const UseGetUserBalance = () => {
    if (!isConnected) return 0;
    const balance: any = userBalance?.value;
    return Number(ethers.formatEther(balance));
  }

  return {
    UseGetProvider,
    UseGetSigner,
    UseGetUserBalance,
  }
}

export default UseWalletConnectedHook;
