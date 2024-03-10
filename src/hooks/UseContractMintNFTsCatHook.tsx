import { useAccount } from 'wagmi';
import { Apis, Funcs } from '../utils';
import abiContractMintNFTsCat from '../utils/abi/abi_MintNFTsCat.json';
import UseWalletConnectedHook from './UseWalletConnectedHook';
import { WalletClient } from 'viem';
import { BrowserProvider, ethers } from 'ethers';
import { ENVs } from '../utils/Consts';

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
    }).catch((_error: any) => {
      return null;
    });
    return mint;
  }

  const randomAlgorithm1 = (minted: number[]) => {
    let id = 0;
    let count = 0;
    do {
      id = Funcs.fun_randomMinMax(0, ENVs.TOTAL_SUPPLY_NFTs);
      count += 1;
      if (count > ENVs.TOTAL_SUPPLY_NFTs) return -1;
    } while (minted.includes(id));

    return id;
  }

  const randomAlgorithm2 = (minted: number[]) => {
    let id = 0;
    let count = 0;
    while (minted.includes(id)) {
      id += 1;
      count += 1;
      if (count > ENVs.TOTAL_SUPPLY_NFTs) return -1;
    }
    return id;
  }

  const UseRandomJsonId = async (walletClient: WalletClient) => {
    const contractMint: any = await UseGetContractMintNFTs(walletClient);

    // get getNFTsMintedIds
    const _mintIds = await contractMint.getNFTsMintedIds();
    const mintIds = Apis.convertUint256AraayToArray(_mintIds);
    if (mintIds.length >= ENVs.TOTAL_SUPPLY_NFTs) return -1; // Ended Mint

    let randomId = 0;
    if (mintIds.length <= ENVs.TOTAL_SUPPLY_NFTs)
      randomId = randomAlgorithm1(mintIds);
    else
      randomId = randomAlgorithm2(mintIds);

    return randomId;
  }

  const UseGetPRICE_PER_MINT = async (walletClient: WalletClient) => {
    const contractMint: any = await UseGetContractMintNFTs(walletClient);

    // get PRICE_PER_MINT
    const price = await contractMint.PRICE_PER_MINT();
    return Number(ethers.formatEther(price));
  }

  return {
    UseGetInventoryOf,
    UseGetContractMintNFTs,
    UseMintNFT,
    UseRandomJsonId,
    UseGetPRICE_PER_MINT,
  }
}

export default UseContractMintNFTsCatHook;
