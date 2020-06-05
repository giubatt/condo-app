import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import Routes from './routes'
import Providers from './providers'
import ReactModal from 'react-modal'

ReactModal.setAppElement(document.getElementById('root') as HTMLElement)

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
  document.getElementById(`root`),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
