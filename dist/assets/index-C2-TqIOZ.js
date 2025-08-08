(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const o=document.querySelector("#app");o.innerHTML=`
  <div class="birthday-page" role="presentation">
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span class="marquee-text">HAPPY BIRTHDAY</span>
      </div>
    </div>

    <main class="stage" aria-label="Birthday stage with penguins">
      <div class="penguin left" aria-label="Left penguin" role="img">🐧</div>
      <div class="penguin right" aria-label="Right penguin" role="img">🐧</div>
      <h1 class="headline">Happy 23rd, my love!</h1>
    </main>
  </div>
`;
