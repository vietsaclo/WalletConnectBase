import { ethers } from "ethers";
import { WalletClient } from "viem";

const UseWalletConnectedHook = () => {
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

  return {
    UseGetProvider,
    UseGetSigner,
  }
}

export default UseWalletConnectedHook;
