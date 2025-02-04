import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Dearest Chloè</h1>
    <h2>Will you be my one & only Valentine?</h2>
    <div class="card">
      <button id="yes" type="button">Yes</button>
      <button id="alsoyes" type="button">Not no</button>
    </div>
  </div>
`

setupCounter(document.querySelectorAll('button'), document.querySelector('h1'), document.querySelector('h2'))
// setupCounter(document.querySelector('#alsoyes'), document.querySelector('h2'))
