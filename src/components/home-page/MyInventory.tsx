import { useEffect, useState } from "react";
import UseContractMintNFTsCatHook from "../../hooks/UseContractMintNFTsCatHook";
import { useWalletClient } from "wagmi";
import { Apis, Funcs } from "../../utils";
import { Skeleton, Space } from "antd";

const MyInventory = () => {
  const { UseGetInventoryOf } = UseContractMintNFTsCatHook();
  const { data: walletClient } = useWalletClient();
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
        <div key={k} className="col-12 col-md-3">
          <div className="card">
            <img src={v.Image} className="card-img-top" alt={v.Outfit} />
            <div className="card-body">
              <h5 className="card-title">Headgear</h5>
              <p className="card-text">
                {v.Headgear}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Background: {v.Background}</li>
              <li className="list-group-item">Equipment: {v.Equipment}</li>
              <li className="list-group-item">Eyes: {v.Eyes}</li>
            </ul>
            <div className="card-body">
              <Space>
                <button className="btn btn-outline-secondary">
                  Sent To...
                </button>
                <button className="btn btn-outline-success">
                  Listing on market
                </button>
              </Space>
            </div>
          </div>
        </div>
      );
    });
  }

  const renderInventoryIds = () => {
    return inventory.map((v, k) => {
      return (
        <div key={k} className="col-12 col-md-3">
          <div className="card">
            <Skeleton.Image className="w-100" style={{ height: '300px' }} active={true} />
            <div className="card-body">
              <h5 className="card-title">Headgear</h5>
              <p className="card-text">
                ...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Background: ...</li>
              <li className="list-group-item">Equipment: ...</li>
              <li className="list-group-item">Eyes: ...</li>
            </ul>
            <div className="card-body">
              <Space>
                <button className="btn btn-outline-secondary">
                  Sent To...
                </button>
                <button className="btn btn-outline-success">
                  Listing on market
                </button>
              </Space>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="container">
      <div className="row mt-5 pb-5">
        {loading ? renderInventoryIds() : renderInventory()}
      </div>
    </div>
  );
}

export default MyInventory;
