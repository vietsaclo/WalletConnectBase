import { useAccount } from 'wagmi';
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

  const UseGetContractMintNFTs = async (walletClient: WalletClient) => {
    const provider = UseGetProvider(walletClient);
    const signer = await UseGetSigner(walletClient);
    return UseGetContractAndConnectSigner(Apis.ADDRESSs.CONTRACT_MINT_NFT_CAT, abiContractMintNFTsCat, provider, signer);
  }

  const UseGetInventoryOf = async (walletClient: WalletClient) => {
    const contractMint: any = await UseGetContractMintNFTs(walletClient);

    // get inventory
    const inventory = await contractMint.getInventoryOf(userAddress);
    return Apis.convertUint256AraayToArray(inventory);
  }

  const UseMintNFT = async (walletClient: WalletClient, idJson: number) => {
    const contractMint: any = await UseGetContractMintNFTs(walletClient);

    // mint NFT
    const mint = await contractMint.mintNFT(idJson, {
      value: ethers.parseEther('0.0001'),
    });
    return mint;
  }

  return {
    UseGetInventoryOf,
    UseGetContractMintNFTs,
    UseMintNFT,
  }
}

export default UseContractMintNFTsCatHook;
