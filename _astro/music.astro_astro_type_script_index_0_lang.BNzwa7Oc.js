async function e(){try{let e=await fetch(`/playlist.json`);if(!e.ok)throw Error(`Unable to load playlist`);let t=await e.json();if(!t||t.length===0){console.warn(`Playlist is empty`);return}let n=document.getElementById(`playlist-container`),r=document.getElementById(`audio-player`),i=document.getElementById(`current-cover`),a=document.getElementById(`current-name`),o=document.getElementById(`current-artist`),s=document.getElementById(`search-input`),c=document.getElementById(`prev-page`),l=document.getElementById(`next-page`),u=document.getElementById(`page-info`),d=document.getElementById(`mode-shuffle`),f=document.getElementById(`mode-repeat`),p=document.getElementById(`mode-repeat-one`);if(!n||!r)return;let m=[...t],h=t[0],g=1,_=`order`;function v(e){!e||!r||!i||!a||!o||(h=e,r.src=e.url||``,i.src=e.cover||``,a.textContent=e.name||`Unknown title`,o.textContent=e.artist||`Unknown artist`,r.play().catch(e=>{console.log(`Autoplay blocked, user interaction needed`)}))}function y(e){if(_===`shuffle`){let n=t.filter(t=>t.url!==e.url);return n.length===0?e:n[Math.floor(Math.random()*n.length)]}else if(_===`repeat-one`)return e;else if(_===`repeat`){let n=(t.findIndex(t=>t.url===e.url)+1)%t.length;return t[n]}else{let n=t.findIndex(t=>t.url===e.url)+1;return n<t.length?t[n]:null}}function b(){let e=Math.ceil(m.length/6)||1;g>e&&(g=e),g<1&&(g=1);let r=(g-1)*6,i=Math.min(r+6,m.length),a=m.slice(r,i);if(u&&(u.textContent=m.length>0?`Page ${g} / ${e}`:`Page 0 / 0`),c&&(c.disabled=g===1),l&&(l.disabled=g===e),a.length===0){n.innerHTML=`
            <div class="text-center py-8 opacity-50 text-sm">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              No songs found
            </div>
          `;return}n.innerHTML=a.map(e=>{let t=h&&h.url===e.url;return`
            <button 
              class="song-item w-full flex items-center gap-4 p-3 rounded-xl transition text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/60 ${t?`bg-zinc-100 dark:bg-zinc-800/60 ring-1 ring-zinc-300 dark:ring-zinc-700`:``}"
              data-url="${e.url||``}"
              data-name="${e.name||``}"
              data-artist="${e.artist||``}"
              data-cover="${e.cover||``}"
            >
              <img src="${e.cover||``}" alt="" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" 
                   onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Crect width=%2240%22 height=%2240%22 fill=%22%23e5e7eb%22/%3E%3C/svg%3E'" />
              <div class="flex-1 overflow-hidden">
                <div class="truncate text-sm ${t?`font-semibold`:``}">
                  ${e.name||`Untitled`}
                </div>
                <div class="truncate text-xs opacity-70">
                  ${e.artist||`Unknown artist`}
                </div>
              </div>
              ${t?`<span class="text-xs opacity-50 animate-pulse">▶ Playing</span>`:``}
            </button>
          `}).join(``),document.querySelectorAll(`.song-item`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.url,r=t.find(e=>e.url===n);r&&(v(r),b())})})}v(h),s?.addEventListener(`input`,e=>{let n=(e.target.value||``).toLowerCase().trim();m=t.filter(e=>{let t=(e.name||``).toLowerCase(),r=(e.artist||``).toLowerCase();return t.includes(n)||r.includes(n)}),g=1,b()}),c?.addEventListener(`click`,()=>{g>1&&(g--,b())}),l?.addEventListener(`click`,()=>{let e=Math.ceil(m.length/6);g<e&&(g++,b())});function x(){[d,f,p].forEach(e=>{e&&e.classList.remove(`ring-2`,`ring-zinc-400`,`dark:ring-zinc-500`,`bg-zinc-100`,`dark:bg-zinc-800`)});let e=null;_===`shuffle`?e=d:_===`repeat`?e=f:_===`repeat-one`&&(e=p),e&&e.classList.add(`ring-2`,`ring-zinc-400`,`dark:ring-zinc-500`,`bg-zinc-100`,`dark:bg-zinc-800`)}d?.addEventListener(`click`,()=>{_=_===`shuffle`?`order`:`shuffle`,x()}),f?.addEventListener(`click`,()=>{_=_===`repeat`?`order`:`repeat`,x()}),p?.addEventListener(`click`,()=>{_=_===`repeat-one`?`order`:`repeat-one`,x()}),x(),r.addEventListener(`ended`,()=>{let e=y(h);if(e){v(e);let t=m.findIndex(t=>t.url===e.url);t!==-1&&(g=Math.floor(t/6)+1),b()}else r.pause(),r.currentTime=0}),b()}catch(e){console.error(`Music player initialization failed:`,e);let t=document.getElementById(`playlist-container`);t&&(t.innerHTML=`
          <div class="text-center py-8 text-red-500 text-sm">
            ⚠️ Failed to load playlist, please check if /playlist.json exists
          </div>
        `)}}document.addEventListener(`DOMContentLoaded`,e),document.addEventListener(`astro:after-swap`,e);