const c=".livestats-container";function E(){const t=[];let e=!1;function r(){if(t.length===0||e===!0)return;t.shift()()}return document.addEventListener("visibilitychange",()=>{e=document.hidden}),setInterval(r,1e3),t}function a(){return document.querySelectorAll(c)}function R(t,e){return t?3e4:e?5e3:3e4}function u(t,e){const r=t.getAttribute("data-id"),s=t.getAttribute("data-dataonly")==="1";return()=>fetch(`get_stats/${r}`).then(n=>{if(n.ok)return n.json();throw new Error(`Network response was not ok: ${n.status}`)}).then(n=>{t.innerHTML=n.html;const i=n.status==="active";e&&setTimeout(()=>{e.push(u(t,e))},R(s,i))}).catch(n=>{console.error(n)})}const o=a();if(o.length>0){const t=E();o.forEach(e=>{u(e,t)()})}