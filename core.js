/* ================= tiện ích ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd=n=>crypto.getRandomValues(new Uint32Array(n));
const rid=n=>{const a='abcdefghjkmnpqrstuvwxyz23456789';return[...rnd(n)].map(x=>a[x%a.length]).join('')};
const shuffle=a=>{a=[...a];const r=rnd(a.length||1);for(let i=a.length-1;i>0;i--){const j=r[i]%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[rnd(1)[0]%a.length];
const clean=o=>JSON.parse(JSON.stringify(o));
const mk=s=>({get(k,d){try{const v=s().getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{s().setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{s().removeItem(k)}catch(e){}}});
const LS=mk(()=>localStorage),SS=mk(()=>sessionStorage);
function deepMerge(t,s){for(const k in s){const v=s[k];if(v&&typeof v==='object'&&!Array.isArray(v)){if(!t[k]||typeof t[k]!=='object'||Array.isArray(t[k]))t[k]={};deepMerge(t[k],v)}else t[k]=v}return t}
const b64e=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const b64d=s=>JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))));
const loadScript=src=>new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>no(new Error('Không tải được '+src));document.head.appendChild(s)});
const mmss=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`};

/* ================= đồng bộ: Firebase hoặc thử 1 máy ================= */
function LocalBE(){
  const bc=('BroadcastChannel' in window)?new BroadcastChannel('msTD'):null,subs=new Set(),K=p=>'msTDdb:'+p;
  const emit=()=>setTimeout(()=>subs.forEach(f=>f()));
  if(bc)bc.onmessage=emit;addEventListener('storage',e=>{if(e.key&&e.key.startsWith('msTDdb:'))emit()});
  return{
    async set(path,data){LS.set(K(path),deepMerge(LS.get(K(path),{}),clean(data)));if(bc)bc.postMessage(1);emit()},
    watch(path,cb){const f=()=>cb(LS.get(K(path),null));subs.add(f);setTimeout(f)},
    watchCol(path,cb){const pre=K(path+'/');const f=()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith(pre)&&!k.slice(pre.length).includes('/'))o[k.slice(pre.length)]=LS.get(k,null)}cb(o)};subs.add(f);setTimeout(f)}
  };
}
async function FireBE(cfg){
  const V='10.12.2';
  if(!window.firebase){await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-app-compat.js`);await loadScript(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-compat.js`)}
  const app=firebase.apps.length?firebase.app():firebase.initializeApp({apiKey:cfg.a,projectId:cfg.p,authDomain:cfg.p+'.firebaseapp.com'});
  const db=firebase.firestore(app);
  return{
    set:(path,data)=>db.doc(path).set(clean(data),{merge:true}),
    watch:(path,cb)=>db.doc(path).onSnapshot(d=>cb(d.exists?d.data():null),e=>showErr(e)),
    watchCol:(path,cb)=>db.collection(path).onSnapshot(s=>{const o={};s.forEach(d=>o[d.id]=d.data());cb(o)},e=>showErr(e))
  };
}
function showErr(e){const d=document.createElement('div');d.className='card warn';d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:9';d.textContent='Lỗi kết nối: '+(e&&e.message||e);document.body.appendChild(d);setTimeout(()=>d.remove(),8000)}

/* ================= vai trò ================= */
const ic={
 wolf:'<path d="M32 6 60 56H4Z" fill="#d4001a"/><path d="M32 6 60 56H32Z" fill="#a30014"/><rect x="29" y="22" width="6" height="20" rx="3" fill="#fff"/><circle cx="32" cy="48" r="3.4" fill="#fff"/>',
 seer:'<circle cx="27" cy="27" r="18" fill="#1f5cff"/><circle cx="27" cy="27" r="11" fill="#fff"/><path d="M22 22a8 8 0 0 1 8-3" stroke="#1f5cff" stroke-width="3" fill="none"/><rect x="38" y="40" width="9" height="22" rx="4" transform="rotate(-45 42 51)" fill="#18181d"/>',
 guard:'<path d="M32 4 56 13v18c0 15-10 25-24 29C18 56 8 46 8 31V13Z" fill="#0a7a3d"/><path d="M32 4 56 13v18c0 15-10 25-24 29Z" fill="#075c2e"/><path d="M21 32l8 8 15-16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>',
 villager:'<path d="M12 36a20 20 0 0 1 40 0" stroke="#888" stroke-width="6" fill="none"/><rect x="6" y="34" width="12" height="18" rx="5" fill="#1f5cff"/><rect x="46" y="34" width="12" height="18" rx="5" fill="#1f5cff"/><path d="M52 50q0 8-12 8" stroke="#888" stroke-width="3" fill="none"/><circle cx="38" cy="58" r="3" fill="#888"/>'
};
const svg=k=>`<svg viewBox="0 0 64 64" aria-hidden="true">${ic[k]}</svg>`;
const ROLE={
 wolf:{n:'Mã Lỗi',team:'Phe Mã Lỗi',bad:1,p:'Mỗi đêm chọn 1 người để đánh sập. Lệnh chỉ thành công khi bạn trả lời ĐÚNG câu hỏi đêm. NGỤY TRANG (1 lần mỗi ván): đêm nào bạn trả lời đúng mà bị Giám sát QA soi trúng, kết quả soi sẽ hiện "không phải Mã Lỗi".',g:'Thắng khi còn ẩn đến hết hạn chót ca trực, hoặc khi số Mã Lỗi bằng số người phe Tổng đài. Ban ngày hãy giả làm người tốt.'},
 seer:{n:'Giám sát QA',team:'Phe Tổng đài',p:'Mỗi đêm chọn 1 người để soi. Trả lời ĐÚNG câu hỏi đêm thì biết người đó có phải Mã Lỗi không. Cẩn thận: Mã Lỗi có thể Ngụy trang 1 lần, nên kết quả "không phải" chưa chắc đúng 100%.',g:'Tìm ra Mã Lỗi và thuyết phục cả ca bỏ phiếu đúng người.'},
 guard:{n:'Kỹ thuật viên',team:'Phe Tổng đài',p:'Mỗi đêm bảo vệ 1 người (được chọn chính mình, không trùng người đêm trước). Bảo vệ chỉ có hiệu lực khi trả lời ĐÚNG.',g:'Giữ những người quan trọng ở lại ca.'},
 villager:{n:'Tổng đài viên',team:'Phe Tổng đài',p:'Mỗi đêm chọn người bạn nghi nhất và trả lời câu hỏi. Từ Đêm 2, Tổng đài viên trả lời ĐÚNG NHANH NHẤT nhận 1 manh mối: tên một người chắc chắn không phải Mã Lỗi.',g:'Cùng cả ca loại hết Mã Lỗi. Mỗi đêm nghi đúng Mã Lỗi được +1 điểm cuối ván.'}
};
function suggest(n,w){const wolf=w&&w!=='auto'?+w:(n<=7?1:n<=13?2:3);return{wolf:Math.min(wolf,Math.floor((n-1)/2)),seer:1,guard:n>=5?1:0}}
/* hạn chót ca trực: chọn theo kết quả mô phỏng để tỉ lệ thắng 2 phe gần nhau */
const lastDayOf=(n,w)=>w===1?2:w===2&&n>=9?6:0;
const dlText=d=>d?`Mã Lỗi thắng nếu vẫn còn ẩn sau Ngày ${d}`:'Không có hạn chót';
const compText=(n,c)=>`${c.wolf} Mã Lỗi, 1 Giám sát QA${c.guard?', 1 Kỹ thuật viên':''}, ${n-c.wolf-1-c.guard} Tổng đài viên`;
