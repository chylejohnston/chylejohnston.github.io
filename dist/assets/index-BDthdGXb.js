(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const P=document.querySelector("#app");P.innerHTML=`
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
`;const r=document.createElement("canvas");r.className="confetti-canvas";document.body.appendChild(r);const s=r.getContext("2d");function v(){const n=Math.max(window.devicePixelRatio||1,1);r.width=Math.floor(window.innerWidth*n),r.height=Math.floor(window.innerHeight*n),r.style.width=`${window.innerWidth}px`,r.style.height=`${window.innerHeight}px`,s.setTransform(n,0,0,n,0,0)}window.addEventListener("resize",v);v();const l=[],f=["#ff6b6b","#ffd93d","#6bcBef","#b28dff","#51cf66","#ffa8a8"];let u=null,m=!1;function h(n,a,o=48){for(let e=0;e<o;e+=1){const t=Math.random()*Math.PI*2,i=3+Math.random()*5;l.push({x:n+(Math.random()-.5)*16,y:a+(Math.random()-.5)*16,vx:Math.cos(t)*i,vy:Math.sin(t)*i-2,size:4+Math.random()*6,color:f[Math.floor(Math.random()*f.length)],rotation:Math.random()*Math.PI,rotationSpeed:(Math.random()-.5)*.2,life:120+Math.floor(Math.random()*60)})}}function y(){s.clearRect(0,0,r.width,r.height);const n=.15,a=.995;for(let o=l.length-1;o>=0;o-=1){const e=l[o];if(e.vx*=a,e.vy=e.vy*a+n,e.x+=e.vx,e.y+=e.vy,e.rotation+=e.rotationSpeed,e.life-=1,e.life<=0||e.y-e.size>window.innerHeight+50){l.splice(o,1);continue}s.save(),s.translate(e.x,e.y),s.rotate(e.rotation),s.fillStyle=e.color,s.fillRect(-e.size/2,-e.size/2,e.size,e.size*.7),s.restore()}u=requestAnimationFrame(y)}function A(){if(m)return;m=!0;const n=window.innerWidth/2,a=window.innerHeight*.6;h(n,a,60),setInterval(()=>{h(n+(Math.random()-.5)*120,a+(Math.random()-.5)*40,48)},900),u==null&&(u=requestAnimationFrame(y))}const w=document.querySelector(".penguin.left"),M=document.querySelector(".penguin.right");let p=!1,g=!1;function c(n){n.animationName==="slide-in-left"&&(p=!0),n.animationName==="slide-in-right"&&(g=!0),p&&g&&(A(),w.removeEventListener("animationend",c),M.removeEventListener("animationend",c))}w.addEventListener("animationend",c);M.addEventListener("animationend",c);
