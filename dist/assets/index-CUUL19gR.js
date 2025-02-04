(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function s(n,o,i){const r=()=>{i.innerHTML="teehee",o.innerHTML="It's a date",n.forEach(e=>{e.classList.add("hide")})};n.forEach(e=>e.addEventListener("click",()=>r()))}document.querySelector("#app").innerHTML=`
  <div>
    <h1>Dearest Chloè</h1>
    <h2>Will you be my one & only Valentine?</h2>
    <div class="card">
      <button id="yes" type="button">Yes</button>
      <button id="alsoyes" type="button">Not no</button>
    </div>
  </div>
`;s(document.querySelectorAll("button"),document.querySelector("h1"),document.querySelector("h2"));
