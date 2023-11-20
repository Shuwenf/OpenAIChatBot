(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const f="/assets/bot-61bdb6bf.svg",m="/assets/user-bcdeb18e.svg",c=document.querySelector("form"),a=document.querySelector("#chat_container"),p="/api";let d;function g(e){e.textContent="",d=setInterval(()=>{e.textContent+=".",e.textContent==="...."&&(e.textContent="")},300)}function v(e,r){let o=0,s=setInterval(()=>{o<r.length?(e.innerHTML+=r.charAt(o),o++):clearInterval(s)},20)}function h(){const e=Date.now(),o=Math.random().toString(16);return`id-${e}-${o}`}function l(e,r,o){return`
      <div class="wrapper ${e&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img src="${e?f:m}" 
              alt="${e?"bot":"user"}" />
          </div>
          <div class="message" id=${o}>${r}</div>
        </div>
      </div>
    `}const u=async e=>{e.preventDefault();const r=new FormData(c);a.innerHTML+=l(!1,r.get("prompt")),c.reset();const o=h();a.innerHTML+=l(!0," ",o),a.scrollTop=a.scrollHeight;const s=document.getElementById(o);g(s);const t=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:r.get("prompt")})});if(clearInterval(d),s.innerHTML="",t.ok){const i=(await t.json()).bot.trim();v(s,i)}else{const n=t.text();s.innerHTML="Something went wrong!",console.log(n)}};c.addEventListener("submit",u);c.addEventListener("keyup",e=>{e.keyCode===13&&!e.shiftKey&&u(e)});
