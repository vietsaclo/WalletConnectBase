import { useWalletClient } from "wagmi";
import UseContractMintNFTsCatHook from "../../hooks/UseContractMintNFTsCatHook";
import { UI } from "../../utils";
import { Tag } from "antd";

const MintNFTs = () => {
  const { data: walletClient } = useWalletClient();
  const { UseMintNFT } = UseContractMintNFTsCatHook();

  const btnMintCliced = async () => {
    if (!walletClient) {
      UI.toastError('Please reload website!');
      return;
    }
    const idJson = 4;// random
    const mint = await UseMintNFT(walletClient, idJson);
    console.log(mint);

  }

  return (
    <div className="container">
      <div className="mt-5 pb-5">
        <div className="center-element">
          <div className="box-mint">
            <div className="card" style={{ width: "18rem" }}>
              <div className="w-100 center-element fw-bold" style={{
                height: '200px',
                backgroundColor: '#f1f1f1',
                color: 'ActiveBorder',
                fontSize: '30px',
              }}>
                Random NFT
              </div>
              <div className="card-body">
                <h5 className="card-title">Mint NFT</h5>
                <p className="card-text">
                  Mint NFT K-Cats, Touch the button below and enjoy your meal.
                </p>
                <Tag color="cyan">Fee: 0.0001 Ether</Tag>
              </div>
              <div className="card-footer">
                <button onClick={btnMintCliced} className="btn btn-outline-danger w-100">
                  Mint NFTs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintNFTs;
