(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const P=document.querySelector("#app");P.innerHTML=`
  <div class="birthday-page" role="presentation">
    <div class="marquee" aria-hidden="true">
      <div class="marquee-inner">
        <div class="marquee-group">
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
        </div>
        <div class="marquee-group" aria-hidden="true">
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
          <span class="marquee-text">HAPPY BIRTHDAY</span>
        </div>
      </div>
    </div>

    <main class="stage" aria-label="Birthday stage with penguins">
      <div class="penguin left" aria-label="Left penguin" role="img"><img src="public/penguin.png"/></div>
      <div class="penguin right" aria-label="Right penguin" role="img"><img src="public/penguin.png"/></div>
      <h1 class="headline">Happy 23rd
      <br>My Chloè-Kous!!!</br></h1>
    </main>
  </div>
`;const a=document.createElement("canvas");a.className="confetti-canvas";document.body.appendChild(a);const s=a.getContext("2d");function y(){const n=Math.max(window.devicePixelRatio||1,1);a.width=Math.floor(window.innerWidth*n),a.height=Math.floor(window.innerHeight*n),a.style.width=`${window.innerWidth}px`,a.style.height=`${window.innerHeight}px`,s.setTransform(n,0,0,n,0,0)}window.addEventListener("resize",y);y();const l=[],f=["#ff6b6b","#ffd93d","#6bcBef","#b28dff","#51cf66","#ffa8a8"];let u=null,m=!1;function p(n,r,o=48){for(let e=0;e<o;e+=1){const t=Math.random()*Math.PI*2,i=3+Math.random()*5;l.push({x:n+(Math.random()-.5)*16,y:r+(Math.random()-.5)*16,vx:Math.cos(t)*i,vy:Math.sin(t)*i-2,size:4+Math.random()*6,color:f[Math.floor(Math.random()*f.length)],rotation:Math.random()*Math.PI,rotationSpeed:(Math.random()-.5)*.2,life:120+Math.floor(Math.random()*60)})}}function v(){s.clearRect(0,0,a.width,a.height);const n=.15,r=.995;for(let o=l.length-1;o>=0;o-=1){const e=l[o];if(e.vx*=r,e.vy=e.vy*r+n,e.x+=e.vx,e.y+=e.vy,e.rotation+=e.rotationSpeed,e.life-=1,e.life<=0||e.y-e.size>window.innerHeight+50){l.splice(o,1);continue}s.save(),s.translate(e.x,e.y),s.rotate(e.rotation),s.fillStyle=e.color,s.fillRect(-e.size/2,-e.size/2,e.size,e.size*.7),s.restore()}u=requestAnimationFrame(v)}function b(){if(m)return;m=!0;const n=window.innerWidth/2,r=window.innerHeight*.6;p(n,r,60),setInterval(()=>{p(n+(Math.random()-.5)*120,r+(Math.random()-.5)*40,48)},900),u==null&&(u=requestAnimationFrame(v))}const w=document.querySelector(".penguin.left"),M=document.querySelector(".penguin.right");let h=!1,g=!1;function c(n){n.animationName==="slide-in-left"&&(h=!0),n.animationName==="slide-in-right"&&(g=!0),h&&g&&(b(),w.removeEventListener("animationend",c),M.removeEventListener("animationend",c))}w.addEventListener("animationend",c);M.addEventListener("animationend",c);
