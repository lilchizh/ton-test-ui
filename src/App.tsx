import { TonConnectButton } from '@tonconnect/ui-react'
import './App.css'
import { useCounterContract } from './hooks/useCounterContract'
import '@twa-dev/sdk';

function App() {

  const { value, address, sendIncrement } = useCounterContract()

  return <div>
    <TonConnectButton />

    <div>ИГРА ПРО ХОМЯКА</div>

    <div>Counter address</div>
    <div>{address}</div>

    <div>Counter value</div>
    <div>{value ?? 'Loading'}</div>

    <div>Increment</div>
    <button onClick={() => sendIncrement()}>Increment</button>
  </div>

}

export default App
