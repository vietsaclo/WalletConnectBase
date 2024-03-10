import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import {
  createWeb3Modal,
} from '@web3modal/wagmi/react'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient } from '@tanstack/react-query'

// 0. Setup queryClient for WAGMIv2
const myQueryClient = new QueryClient()

const projectId = 'f78180a8e45ede6927e3eeda2335c600';
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const myWagmiConfig = defaultWagmiConfig({
  chains: [mainnet, arbitrum],
  projectId,
  metadata: {
    name: 'Web3Modal React Example',
    description: 'Web3Modal React Example',
    url: '',
    icons: []
  }
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: myWagmiConfig,
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})

export {
  myWagmiConfig,
  myQueryClient,
}
