import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import {
  createWeb3Modal,
} from '@web3modal/wagmi/react'
import { blastSepolia } from 'wagmi/chains'
import { QueryClient } from '@tanstack/react-query'

// 0. Setup queryClient for WAGMIv2
const myQueryClient = new QueryClient()

const projectId = String(process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID);
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const myWagmiConfig = defaultWagmiConfig({
  chains: [blastSepolia],
  projectId,
  metadata: {
    name: 'Web3Modal React Example',
    description: 'Web3Modal React Example',
    url: '',
    icons: []
  },
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: myWagmiConfig,
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': 'black',
    '--w3m-color-mix-strength': 0
  }
})

export {
  myWagmiConfig,
  myQueryClient,
}
