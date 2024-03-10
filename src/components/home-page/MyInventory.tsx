import { useEffect } from "react";
import UseContractMintNFTsCatHook from "../../hooks/UseContractMintNFTsCatHook";
import { useWalletClient } from "wagmi";

const MyInventory = () => {
  const { UseGetInventoryOf } = UseContractMintNFTsCatHook();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    loadInventory();
  }, [walletClient]);

  const loadInventory = async () => {
    if (!walletClient) return;
    const result = await UseGetInventoryOf(walletClient);
    console.log(result);

  }

  return (
    <div className="container">
      My Inventory
    </div>
  );
}

export default MyInventory;
