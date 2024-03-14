import { useEffect, useState } from "react";
import UseContractMintNFTsCatHook from "../../hooks/UseContractMintNFTsCatHook";
import { useAccount, useWalletClient } from "wagmi";
import { Apis, Funcs } from "../../utils";
import { Skeleton, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const MyInventory = () => {
  const { UseGetInventoryOf } = UseContractMintNFTsCatHook();
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const [inventory, setInventory] = useState<any[]>([]);
  const [inventoryIds, setInventoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadInventory();
  }, [walletClient]);

  const loadInventory = async () => {
    if (!walletClient) return;
    setLoading(true);
    const result = await UseGetInventoryOf(walletClient);
    setInventoryIds(result);

    const invs = [];
    for (let i = 0; i < result.length; i++) {
      const dataRes = await Funcs.fun_getOriginAxios(Apis.JSON_URI_FOLDER.GET_JSON_URI_WITH_ID.replace(':id', result[i].toString()));
      if (dataRes.status === 200) {
        invs.push(dataRes.data);
      }
    }
    setInventory(invs);
    setLoading(false);
  }

  const renderInventory = () => {
    return inventory.map((v, k) => {
      return (
        <div key={k} className="col-12 col-md-6 col-lg-4 col-xl-3">
          <div className="card inventory-card">
            <img style={{ minHeight: '324px' }} src={v.Image} className="card-img-top" alt={v.Outfit} />
            <div className="mt-3 mb-1 inventory-card__ttl d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">Headgear</p>
              <p className="card-text inventory-page__ttl">
                {v.Headgear}
              </p>
            </div>
            <div className="accordion" id={`accordion${k}`}>
              <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${k}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${k}`} aria-expanded="true" aria-controls={`collapse${k}`}>
                    <span className="fw-light">Background:</span> <span className="font-sec ms-auto">{v.Background}</span>
                  </button>
                </h2>
                <div id={`collapse${k}`} className="accordion-collapse collapse" aria-labelledby={`heading${k}`} data-bs-parent={`#accordion${k}`}>
                  <div className="accordion-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="fw-light">Equipment:</div>
                      <span className="font-sec">{v.Equipment}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="fw-light">Eyes:</div>
                      <span className="font-sec">{v.Eyes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 d-flex align-items-center justify-content-between">
              <button className="btn btn-send-nft">
                Sent to ...
              </button>
              <button className="btn btn-listing-nft">
                List on market
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  const renderInventoryIds = () => {
    return inventoryIds.map((v, k) => {
      return (
        <div key={k} className="col-12 col-md-6 col-lg-4 col-xl-3">
          <div className="card inventory-card">
            <Skeleton.Image className="w-100" style={{ minHeight: '324px', borderRadius: '16px' }} active={true} />
            <div className="mt-3 mb-1 inventory-card__ttl d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">Headgear</p>
              <p className="card-text inventory-page__ttl">
                Headgear
              </p>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <span className="fw-light">Background:</span> <span className="font-sec ms-auto">Background</span>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="accordionExample">
                  <div className="accordion-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="fw-light">Equipment:</div>
                      <span className="font-sec">Equipment</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="fw-light">Eyes:</div>
                      <span className="font-sec">Eyes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 d-flex align-items-center justify-content-between">
              <button className="btn btn-send-nft">
                Sent to ...
              </button>
              <button className="btn btn-listing-nft">
                List on market
              </button>
            </div>
          </div>
        </div >
      );
    });
  }

  return (
    <div className="inventory-page">
      <div className="container">
        <h2 className="mt-5 inventory-page__ttl">My Inventory</h2>
        <div className="row mt-3 pb-5 g-3">
          {loading ? renderInventoryIds() : renderInventory()}
          {!isConnected && (<h3 className="text-danger">Connect wallet require!</h3>)}
          {(!loading && !inventory.length && isConnected) && (<h3 className="text-secondary">Empty NFTs!</h3>)}
          {(loading && !inventoryIds.length) && (<LoadingOutlined />)}
        </div>
      </div>
    </div>
  );
}

export default MyInventory;
