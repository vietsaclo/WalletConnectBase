const Apis = {
  remove0xInAddress: (address: string) => {
    return address.substring(2, address.length);
  },

  API_HOST: 'http://myhufier.ddns.net/api',
  ADDRESSs: {
    CONTRACT_MINT_NFT_CAT: String(process.env.REACT_APP_CONTRACT_MINT_NFT_CAT_ADDRESS),
  },

  API_TAILER: {
    GET_POSTS: '/post/filter/v1',
  }
}

export default Apis;