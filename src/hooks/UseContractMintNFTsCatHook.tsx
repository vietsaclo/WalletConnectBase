import { useAccount, useWalletClient } from 'wagmi';
import { Apis } from '../utils';
import abiContractMintNFTsCat from '../utils/abi/abi_MintNFTsCat.json';
import UseWalletConnectedHook from './UseWalletConnectedHook';
import { WalletClient } from 'viem';
import { BrowserProvider, ethers } from 'ethers';

const UseContractMintNFTsCatHook = () => {
  const { UseGetProvider, UseGetSigner } = UseWalletConnectedHook();
  const { address: userAddress } = useAccount();

  const UseGetContractAndConnectSigner = (contractAddress: string, abi: any, provider: BrowserProvider, signer: ethers.JsonRpcSigner) => {
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider,
    );
    const contractConnect = contract.connect(signer);
    return contractConnect;
  }

  const UseGetContractMintNFTs = (provider: BrowserProvider, signer: ethers.JsonRpcSigner) => {
    return UseGetContractAndConnectSigner(Apis.ADDRESSs.CONTRACT_MINT_NFT_CAT, abiContractMintNFTsCat, provider, signer);
  }

  const UseGetInventoryOf = async (walletClient: WalletClient) => {
    const provider = UseGetProvider(walletClient);
    const signer = await UseGetSigner(walletClient);
    const contractMint: any = UseGetContractMintNFTs(provider, signer);

    // get inventory
    const inventory = await contractMint.getInventoryOf(userAddress);
    const result = [];
    for (let i = 0; i < inventory.length; i++) {
      result.push(Number(inventory[i].toString()));
    }

    return result;
  }

  return {
    UseGetInventoryOf,
    UseGetContractMintNFTs,
  }
}

export default UseContractMintNFTsCatHook;
