const Apis = {
  remove0xInAddress: (address: string) => {
    return address.substring(2, address.length);
  },
  convertUint256AraayToArray: (uint256Array: any) => {
    const result = [];
    for (let i = 0; i < uint256Array.length; i++) {
      result.push(Number(uint256Array[i].toString()));
    }
    return result;
  },

  API_HOST: 'http://myhufier.ddns.net/api',
  ADDRESSs: {
    CONTRACT_MINT_NFT_CAT: String(process.env.REACT_APP_CONTRACT_MINT_NFT_CAT_ADDRESS),
  },

  JSON_URI_FOLDER: {
    GET_JSON_URI_WITH_ID: 'https://ipfs.pepemetaai.co/cat-nfts/jsons/:id.json',
  }
}

export default Apis;