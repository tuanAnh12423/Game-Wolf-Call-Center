/* ================================================================
   MÀN HÌNH MC (máy tính / máy chiếu)
================================================================ */
function mcApp(BOT){
  const app=$('#app');
  app.innerHTML=`<header class="top"><div class="row"><h1 class="logo">Ma Sói Tổng Đài</h1><span id="hcode"></span></div>
  <nav class="tabs" id="tabs"><button data-t="room" class="on">Phòng chơi</button><button data-t="bank">Ngân hàng câu hỏi</button><button data-t="rules">Luật chơi</button></nav></header>
  <main><section class="band" id="t-room"></section><section class="band hide" id="t-bank"></section><section class="band hide rules" id="t-rules"></section></main>`;
  $('#tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x===b));['room','bank','rules'].forEach(t=>$('#t-'+t).classList.toggle('hide',t!==b.dataset.t));if(b.dataset.t==='room')refreshGroups()};
  const S=BOT?{nightSec:60,talkSec:60,voteSec:40,phaoSec:60,wolves:'auto',dl:'auto',mode:'L',cfg:null,cfgRaw:'',groups:[],base:location.href.split('#')[0]}:Object.assign({nightSec:60,talkSec:180,voteSec:60,phaoSec:90,wolves:'auto',mode:'L',cfg:null,cfgRaw:'',base:location.href.split('#')[0]},LS.get('msTD_set',{}));
  const saveS=()=>{if(!BOT)LS.set('msTD_set',S)};

  /* ---- tab câu hỏi ---- */
  $('#t-bank').innerHTML=`<div class="g2"><div style="display:grid;gap:16px;align-content:start">
    <div><h2>Ngân hàng câu hỏi</h2><p class="small" id="bsum"></p></div>
    <div class="card"><h3>Thêm một câu</h3>
      <label for="nq">Câu hỏi</label><textarea id="nq" style="min-height:70px"></textarea>
      <label for="na">Đáp án đúng</label><input id="na">
      <label for="nw1">Đáp án sai 1</label><input id="nw1">
      <label for="nw2">Đáp án sai 2 (không bắt buộc)</label><input id="nw2">
      <label for="nw3">Đáp án sai 3 (không bắt buộc)</label><input id="nw3">
      <label for="ng">Nhóm</label><input id="ng" list="gl" placeholder="Ví dụ: Máy giặt - Mã lỗi"><datalist id="gl"></datalist>
      <label for="ns">Nguồn (không bắt buộc)</label><input id="ns" placeholder="Ví dụ: HDSD TWD-T35BP160MWV">
      <p id="nmsg" class="small"></p><button class="btn red" id="nadd">Thêm câu</button></div>
    <div class="card"><h3>Nhập nhiều câu</h3>
      <p class="small">Mỗi dòng: Câu hỏi | Đáp án đúng | Sai 1 | Sai 2 | Sai 3 | g:Nhóm | s:Nguồn. Phần g: và s: không bắt buộc. Câu trùng hoặc gần giống câu đã có sẽ tự bị bỏ qua.</p>
      <textarea id="imp" style="min-height:110px"></textarea>
      <div class="row" style="margin-top:8px"><input type="file" id="impf" accept=".txt,.csv,.md" style="width:auto"><button class="btn" id="impgo">Nhập, bỏ câu trùng</button></div>
      <p class="small" style="margin-top:14px">Bộ câu hỏi máy giặt Toshiba được soạn từ sách hướng dẫn sử dụng và trang sản phẩm chính thức trên toshiba-lifestyle.com/vn. Mỗi câu ghi rõ nguồn.</p>
      <button class="btn ghost" id="loadw">Nạp lại bộ máy giặt Toshiba</button>
      <div id="impr" class="small" style="margin-top:10px"></div></div>
  </div><div style="display:grid;gap:16px;align-content:start">
    <div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Danh sách câu hỏi</h3><div class="row"><button class="btn ghost" id="bdup" style="min-height:36px;padding:6px 12px">Kiểm tra trùng</button><button class="btn ghost" id="bcopy" style="min-height:36px;padding:6px 12px">Sao chép tất cả</button></div></div>
      <div class="row" style="margin:12px 0"><input id="bq" placeholder="Tìm câu hỏi hoặc đáp án" style="flex:1 1 200px"><select id="bg" style="flex:1 1 200px"></select></div>
      <div id="bdr" class="small" style="margin-bottom:8px"></div>
      <div id="blist"></div></div>
    <details class="card"><summary><b>Sửa dạng văn bản</b></summary>
      <textarea id="braw" style="min-height:260px;margin-top:10px"></textarea>
      <div class="row" style="margin-top:8px"><button class="btn" id="brawgo">Áp dụng</button><button class="btn ghost" id="brawreset">Khôi phục bộ mặc định</button></div></details>
  </div></div>`;
  let bq='',bg='',delI=-1;
  const grpMap=()=>{const m={};getBank().forEach(x=>m[x.g]=(m[x.g]||0)+1);return m};
  function refreshGroups(){
    const box=$('#gbox');if(!box)return;
    const gm=grpMap(),gs=Object.keys(gm).sort(),known=(box.dataset.known||'').split('\u0001'),cur=[...box.querySelectorAll('input')];
    const on=new Set(cur.length?cur.filter(x=>x.checked).map(x=>x.value):(S.groups&&S.groups.length?S.groups:gs));
    box.innerHTML=gs.map(g=>`<label><input type="checkbox" value="${esc(g)}" ${on.has(g)||!known.includes(g)&&cur.length?'checked':''}> ${esc(g)} (${gm[g]})</label>`).join('');
    box.dataset.known=gs.join('\u0001');
  }
  function renderBank(){
    const bank=getBank(),gm=grpMap(),gs=Object.keys(gm).sort();
    $('#bsum').textContent=`${bank.length} câu hỏi trong ${gs.length} nhóm`;
    $('#gl').innerHTML=gs.map(g=>`<option value="${esc(g)}">`).join('');
    $('#bg').innerHTML=`<option value="">Tất cả nhóm (${bank.length})</option>`+gs.map(g=>`<option value="${esc(g)}"${g===bg?' selected':''}>${esc(g)} (${gm[g]})</option>`).join('');
    const qn=nk(bq),list=bank.map((x,i)=>[x,i]).filter(([x])=>(!bg||x.g===bg)&&(!qn||nk(x.q+' '+x.a).includes(qn)));
    $('#blist').innerHTML=list.map(([x,i])=>`<div class="bi"><span class="small">${esc(x.g)}${x.s?' · '+esc(x.s):''}</span><b>${esc(x.q)}</b><span class="okc">✓ ${esc(x.a)}</span><span class="small">${x.w.map(w=>'✗ '+esc(w)).join(' · ')}</span><button class="btn ghost" data-del="${i}" style="min-height:32px;padding:4px 10px;font-size:14px">Xoá</button></div>`).join('')||'<p class="small">Không có câu nào.</p>';
    $('#braw').value=toText(bank);refreshGroups();
  }
  $('#nadd').onclick=()=>{
    const q=$('#nq').value.trim(),a=$('#na').value.trim(),w=['#nw1','#nw2','#nw3'].map(id=>$(id).value.trim()).filter(Boolean),g=$('#ng').value.trim()||'Khác',s=$('#ns').value.trim(),m=$('#nmsg');
    m.className='warn';
    if(!q||!a||!w.length){m.textContent='Cần có câu hỏi, đáp án đúng và ít nhất 1 đáp án sai.';return}
    if(new Set([a,...w].map(nk)).size<w.length+1){m.textContent='Các đáp án không được trùng nhau.';return}
    const b=getBank(),r=addItems(b,[{q,a,w,g,s}]);
    if(r.dups.length){m.textContent='Câu này trùng hoặc gần giống: '+r.dups[0].hit.q;return}
    setBank(b);m.className='okc';m.textContent='Đã thêm câu.';['#nq','#na','#nw1','#nw2','#nw3','#ns'].forEach(id=>$(id).value='');renderBank();
  };
  const doImport=txt=>{
    const p=parseLines(txt),b=getBank(),r=addItems(b,p.items);setBank(b);renderBank();
    $('#impr').innerHTML=`<span class="okc">Đã thêm ${r.added.length} câu.</span> Bỏ qua ${r.dups.length} câu trùng${p.bad.length?`, ${p.bad.length} dòng sai định dạng`:''}.`
      +(r.dups.length?`<ul>${r.dups.slice(0,8).map(d=>`<li>${esc(d.it.q)}<br>giống: ${esc(d.hit.q)}</li>`).join('')}</ul>`:'')
      +(p.bad.length?`<p class="warn">Dòng sai đầu tiên: ${esc(p.bad[0].slice(0,90))}</p>`:'');
  };
  $('#impgo').onclick=()=>{doImport($('#imp').value);$('#imp').value=''};
  $('#impf').onchange=async e=>{const f=e.target.files[0];if(!f)return;doImport(await f.text());e.target.value=''};
  $('#loadw').onclick=()=>doImport(WASHER);
  $('#bq').oninput=()=>{bq=$('#bq').value;renderBank()};
  $('#bg').onchange=()=>{bg=$('#bg').value;renderBank()};
  $('#blist').onclick=e=>{const b=e.target.closest('button[data-del]');if(!b)return;const i=+b.dataset.del;
    if(delI!==i){delI=i;b.textContent='Bấm lần nữa để xoá';return}
    const bank=getBank();bank.splice(i,1);setBank(bank);delI=-1;renderBank()};
  $('#bdup').onclick=()=>{
    const b=getBank(),d=findDups(b),el=$('#bdr');
    if(!d.length){el.innerHTML='<span class="okc">Không có câu trùng hoặc gần giống.</span>';return}
    el.innerHTML=`<p class="warn">Có ${d.length} cặp trùng hoặc gần giống:</p><ul>${d.slice(0,10).map(([i,j])=>`<li>${esc(b[i].q)}<br>≈ ${esc(b[j].q)}</li>`).join('')}</ul><button class="btn ghost" id="bdrm">Xoá bản sau của mỗi cặp</button>`;
    $('#bdrm').onclick=()=>{const drop=new Set(d.map(x=>x[1]));setBank(b.filter((_,i)=>!drop.has(i)));el.innerHTML='<span class="okc">Đã xoá câu trùng.</span>';renderBank()};
  };
  $('#bcopy').onclick=async()=>{try{await navigator.clipboard.writeText(toText(getBank()));$('#bdr').innerHTML='<span class="okc">Đã sao chép toàn bộ câu hỏi.</span>'}catch(e){$('#bdr').textContent='Mở mục "Sửa dạng văn bản" rồi sao chép thủ công.'}};
  $('#brawgo').onclick=()=>{
    const p=parseLines($('#braw').value),b=[],r=addItems(b,p.items);
    if(!b.length){$('#bdr').innerHTML='<span class="warn">Không có dòng hợp lệ, chưa áp dụng.</span>';return}
    setBank(b);renderBank();$('#bdr').textContent=`Đã áp dụng ${b.length} câu${r.dups.length?`, bỏ ${r.dups.length} câu trùng`:''}${p.bad.length?`, ${p.bad.length} dòng sai định dạng`:''}.`;
  };
  $('#brawreset').onclick=()=>{const el=$('#brawreset');
    if(!el.dataset.s){el.dataset.s=1;el.textContent='Bấm lần nữa để khôi phục';return}
    const b=[];addItems(b,parseLines(GENERAL).items);addItems(b,parseLines(WASHER).items);setBank(b);el.dataset.s='';el.textContent='Khôi phục bộ mặc định';renderBank()};
  renderBank();

  /* ---- tab luật ---- */
  $('#t-rules').innerHTML=RULES();

  /* ---- trạng thái phòng ---- */
  let BE=null,code='',R=null,P={},H=null,busy=false,showRoles=false,qrCache={},link='',mcWorld=null,showPos=!!BOT;
  const hk=()=>'msTD_host_'+code,saveH=()=>LS.set(hk(),H);
  const rp=()=>'msTD/'+code,pp=p=>'msTD/'+code+'/players/'+p;
  const WAIT={key:'w',kind:'wait',q:null,qs:null,objs:null,near:false,prompt:null,targets:null};
  const nm=p=>(R&&R.names&&R.names[p])||(P[p]&&P[p].name)||'?';
  const alive=()=>(R.order||[]).filter(p=>R.alive[p]);
  const roleOf=p=>(H.roles&&H.roles[p])||(P[p]&&P[p].priv&&P[p].priv.role);
  const stepKey=()=>R.phase==='night'?'n'+R.round:R.phase==='vote'?'v'+R.round:R.phase==='phao'?'p'+R.round:'';

  /* ================= BOT (chế độ chơi thử) ================= */
  const BT={plan:{},mem:{},said:{},chat:{},auto:null};
  const BOTN=['Hoa','Minh','Lan','Tú','Nam','Vy','Khoa','Quân','Thảo','Long','Mai'];
  async function addBot(){const used=new Set(Object.keys(P));let i=0;while(used.has('bot'+i))i++;await BE.set(pp('bot'+i),{name:BOTN[i%BOTN.length]+' (bot)',joinedAt:Date.now(),kicked:false,bot:true})}
  async function addBots(){for(let i=0;i<BOT.n-1;i++)await BE.set(pp('bot'+i),{name:BOTN[i]+' (bot)',joinedAt:Date.now()+i,kicked:false,bot:true})}
  const isBot=p=>P[p]&&P[p].bot;
  const mem=p=>BT.mem[p]=BT.mem[p]||{inn:new Set([p]),wolf:'',clue:'',seen:''};
  const pidOf=n=>(R.order||[]).find(x=>R.names[x]===n);
  function botLearn(ctx){for(const p in ctx.msgs){if(!isBot(p))continue;const m=mem(p);
    for(const t of ctx.msgs[p]){let x;
      if(x=t.match(/Kết quả soi: (.+?) LÀ MÃ LỖI!/)){m.wolf=pidOf(x[1])||''}
      else if(x=t.match(/Kết quả soi: (.+?) không phải Mã Lỗi/)){const q=pidOf(x[1]);if(q){m.inn.add(q);m.seen=q}}
      else if(x=t.match(/Manh mối.*?: (.+?) KHÔNG phải Mã Lỗi/)){const q=pidOf(x[1]);if(q){m.inn.add(q);m.clue=q}}}}}
  const claimOk=()=>R.claim&&R.alive[R.claim.by]&&R.alive[R.claim.target]?R.claim:null;
  function botTarget(p,st){const ro=roleOf(p),m=mem(p),T=st.targets||[],cl=claimOk(),rnd1=()=>Math.random();
    const free=T.filter(x=>!m.inn.has(x)&&x!==p);
    if(st.kind==='vote'){
      if(m.wolf&&T.includes(m.wolf))return m.wolf;
      if(ro==='wolf'){if(cl&&cl.target===p&&T.includes(cl.by))return cl.by;if(rnd1()<.25)return'skip';const tw=T.filter(x=>roleOf(x)!=='wolf');return tw.length?pick(tw):'skip'}
      if(cl&&cl.by!==p&&T.includes(cl.target)&&!m.inn.has(cl.target)&&rnd1()<.75)return cl.target;
      if(rnd1()<.3||!free.length)return'skip';return pick(free)}
    if(!T.length)return'';
    if(ro==='wolf'){if(cl&&T.includes(cl.by)&&roleOf(cl.by)!=='wolf')return cl.by;return pick(T)}
    if(ro==='guard'){if(cl&&T.includes(cl.by)&&rnd1()<.7)return cl.by;if(T.includes(p)&&rnd1()<.4)return p;return pick(T)}
    return pick(free.length?free:T)}
  function botAct(p,st,o){const acc=.7;let ans=-1;
    const wrong=(c,n)=>(c+1+rnd(1)[0]%Math.max(1,n-1))%n;
    if(st.objs){const K=H.objKey[o],n=st.objs.find(x=>x.id===o).q.opts.length;ans=Math.random()<acc?K.c[0]:wrong(K.c[0],n)}
    else if(st.qs){const K=H.key[p];ans=K.c.map((c,i)=>Math.random()<acc?c:wrong(c,st.qs[i].opts.length))}
    let target=st.targets?botTarget(p,st):'';
    if(st.near){const now=Date.now(),me=posIn(R,p,now),nb=(st.targets||[]).filter(t=>R.alive[t]&&Math.hypot(posIn(R,t,now).x-me.x,posIn(R,t,now).y-me.y)<=VIS);target=nb.length?pick(nb):'none'}
    return{key:st.key,obj:o||'',target,ans,t:Date.now()}}
  function botLine(p){const ro=roleOf(p),m=mem(p),cl=claimOk(),al=alive().filter(x=>x!==p),any=()=>pick(al);
    if(ro==='seer'&&m.wolf&&R.alive[m.wolf]){return{t:`Mình là Giám sát QA. Mình soi ra ${nm(m.wolf)} LÀ MÃ LỖI!`,claim:m.wolf}}
    if(ro==='wolf'){if(cl&&cl.target===p)return{t:`Mình là người tốt! ${nm(cl.by)} đang nói dối đó.`};
      const town=al.filter(x=>roleOf(x)!=='wolf');if(!cl&&town.length&&Math.random()<.35){const x=pick(town);return{t:`Mình là Giám sát QA, soi ra ${nm(x)} LÀ MÃ LỖI!`,claim:x}}
      if(town.length&&Math.random()<.5)return{t:`Mình được manh mối: ${nm(pick(town))} không phải Mã Lỗi.`}}
    if(ro==='seer'&&m.seen&&Math.random()<.5)return{t:`Mình soi ${nm(m.seen)} rồi, người này không phải Mã Lỗi.`};
    if(ro==='villager'&&m.clue&&R.alive[m.clue])return{t:`Mình được manh mối: ${nm(m.clue)} không phải Mã Lỗi.`};
    if(cl&&cl.by!==p&&Math.random()<.6)return{t:`Mình tin ${nm(cl.by)}, bầu ${nm(cl.target)} đi.`};
    if(!al.length)return{t:'Mình chưa có thông tin gì.'};
    return pick([{t:'Mình chưa có thông tin gì, nghe mọi người đã.'},{t:`Mình hơi nghi ${nm(any())}.`},{t:`${nm(any())} nói gì đi chứ?`}])}
  function botMove(p,key,[x,y]){const now=Date.now(),e=(R.mv||[]).find(m=>m[0]===p),c=e?mvPos(e.slice(1),now):(()=>{const [a,b]=spawnPt((R.order||[]).indexOf(p));return{x:a,y:b}})();
    const m=[Math.round(c.x),Math.round(c.y),Math.round(x),Math.round(y),now];BE.set(pp(p),{mv:{k:key,m}});return Math.hypot(x-c.x,y-c.y)/SPEED*1000}
  async function addChat(p,t,claim){const chat=[...(R.chat||[]),{p,t}].slice(-30),up={chat};if(claim&&!claimOk())up.claim={by:p,target:claim};Object.assign(R,up);await BE.set(rp(),up)}
  function next(){if(!R||busy)return;BT.auto={ph:'x'};const ph=R.phase;
    if(ph==='lobby')run(deal);else if(ph==='intro'||ph==='result')run(startNight);else if(ph==='night')run(resolveNight);
    else if(ph==='day')run(openVote);else if(ph==='vote')run(resolveVote);else if(ph==='phao')run(resolvePhao);
    else if(ph==='end'){BT.mem={};BT.auto=null;run(newGame)}}
  function botTick(){if(!R||!H)return;LAYC=layOf(R);const now=Date.now(),key=R.phase+R.round;
    if(BOT){if(R.phase==='lobby'){const ids=Object.keys(P).filter(p=>P[p].name&&!P[p].kicked);if(ids.some(p=>!P[p].bot)&&ids.length>=BOT.n&&(!BT.auto||BT.auto.ph!==key))BT.auto={ph:key,at:now+1500}}
    if((R.phase==='intro'||R.phase==='result')&&(!BT.auto||BT.auto.ph!==key)){const at=now+(R.phase==='intro'?25000:12000);BT.auto={ph:key,at};R.deadline=at;BE.set(rp(),{deadline:at})}
    if(BT.auto&&BT.auto.ph===key&&BT.auto.at&&now>BT.auto.at){next();return}}
    for(const p of (R.order||[])){if(!isBot(p))continue;const st=P[p].priv&&P[p].priv.step;
      if(R.phase==='day'&&R.alive[p]){const ck='d'+R.round+p;if(!BT.chat[ck])BT.chat[ck]=now+3000+Math.random()*Math.min(35000,S.talkSec*600);
        else if(BT.chat[ck]>0&&now>BT.chat[ck]){BT.chat[ck]=-1;const l=botLine(p);addChat(p,l.t,l.claim)}}
      if(!st||st.kind==='wait'||(P[p].act&&P[p].act.key===st.key))continue;
      const pk=st.key+p;let pl=BT.plan[pk];
      if(!pl)pl=BT.plan[pk]={wander:now+300+Math.random()*1500,obj:now+3500+Math.random()*7000,act:now+4000+Math.random()*Math.max(2500,(R.deadline-now)*.5),o:''};
      if(pl.sent)continue;
      if(st.objs&&!pl.w&&now>pl.wander){pl.w=1;botMove(p,st.key,walkTo(80+Math.random()*740,260+Math.random()*400))}
      if(st.objs&&!pl.o&&now>pl.obj){const tk=new Set((R.spots||[]).map(x=>x[0])),fr=st.objs.map(o=>o.id).filter(o=>!tk.has(o));if(fr.length){pl.o=pick(fr);if(st.near&&st.targets&&st.targets.length){const v=pick(st.targets),vp=posIn(R,v,now);let bd=1e9;for(const o of fr){const [ux,uy]=usePt(o),d=Math.hypot(ux-vp.x,uy-vp.y);if(d<bd){bd=d;pl.o=o}}}BE.set(pp(p),{spot:{k:st.key,o:pl.o}});const dur=botMove(p,st.key,usePt(pl.o));pl.act=Math.min(Math.max(pl.act,now+dur+1000+Math.random()*2500),R.deadline-1500)}}
      if(now>pl.act&&(!st.objs||pl.o)){pl.sent=true;BE.set(pp(p),{act:botAct(p,st,pl.o)})}}}
  if(BOT)window.addEventListener('message',e=>{if(e.origin!==location.origin&&location.protocol!=='file:')return;if(e.data&&e.data.msTD==='next')next()});
  setInterval(()=>{if(BOT||(R&&R.bots))botTick()},500);

  const saved=LS.get('msTD_mc',null);
  if(BOT)setTimeout(()=>attach(BOT.code,true).then(addBots).catch(showErr));
  else if(saved&&saved.code)attach(saved.code).catch(e=>{showErr(e);setup()});else setup();

  function setup(){
    $('#hcode').innerHTML='';
    $('#t-room').innerHTML=`<div class="setup"><div class="sv">
      <h1 class="pt">Tạo phòng chơi</h1>
      <p class="lead2">Chọn cách kết nối, chỉnh thời gian rồi tạo mã QR cho cả phòng quét.</p>
      <section class="step"><h3><span class="sn">1</span>Kết nối điện thoại</h3>
        <div class="mode seg"><label><input type="radio" name="md" value="F" ${S.mode==='F'?'checked':''}> Điện thoại thật (Firebase)</label><label><input type="radio" name="md" value="L" ${S.mode==='L'?'checked':''}> Thử trên 1 máy (nhiều tab)</label></div>
        <div id="fbox" class="${S.mode==='F'?'':'hide'}">
          <label for="cfg">Cấu hình Firebase (dán nguyên đoạn firebaseConfig)</label><textarea id="cfg" placeholder="const firebaseConfig = { apiKey: &quot;...&quot;, projectId: &quot;...&quot;, ... }">${esc(S.cfgRaw)}</textarea>
          <p class="small" id="cfgok"></p>
        </div>
        <label for="base">Địa chỉ trang web (GitHub Pages)</label><input id="base" value="${esc(S.base)}">
      </section>
      <section class="step"><h3><span class="sn">2</span>Thời gian và vai</h3>
        <div class="cols3">
          <div><label for="s1">Đêm (giây)</label><input id="s1" type="number" min="20" value="${S.nightSec}"></div>
          <div><label for="s2">Thảo luận (giây)</label><input id="s2" type="number" min="30" value="${S.talkSec}"></div>
          <div><label for="s3">Bỏ phiếu (giây)</label><input id="s3" type="number" min="20" value="${S.voteSec}"></div>
          <div><label for="s4">Phao (giây)</label><input id="s4" type="number" min="30" value="${S.phaoSec}"></div>
        </div>
        <div class="cols2"><div><label for="sw">Số Mã Lỗi</label><select id="sw"><option value="auto">Tự động theo số người</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div>
        <div><label for="sdl">Hạn chót ca trực</label><select id="sdl"><option value="auto">Bật, theo số người</option><option value="off">Tắt</option></select></div></div>
      </section>
      <section class="step"><h3><span class="sn">3</span>Nhóm câu hỏi</h3>
        <div class="mode" id="gbox"></div><p class="small">Bỏ chọn nhóm chưa muốn dùng. Thêm, sửa câu hỏi ở tab "Ngân hàng câu hỏi".</p>
      </section>
      <p class="warn" id="se"></p><button class="btn red big" id="create">Tạo phòng và mã QR</button>
    </div><aside class="sa">
      <div class="card tryb"><h3>Chơi thử với bot</h3><p class="small">Thử một mình trên điện thoại hoặc máy tính, các bot đóng vai người chơi còn lại. Mở trên điện thoại bằng link trang + <b>#bot</b>.</p><a class="btn" href="#bot" onclick="setTimeout(()=>location.reload(),50)">Chơi thử với bot</a></div>
      <div class="card"><h3>Bộ vai theo số người</h3><table class="comp"><thead><tr><th>Người</th><th class="r">Mã Lỗi</th><th class="r">QA</th><th class="r">KTV</th><th class="r">TĐV</th><th class="r">Hạn chót</th></tr></thead><tbody>${[4,5,6,7,8,9,10,11,12,13].map(n=>{const c=suggest(n,'auto'),d=lastDayOf(n,c.wolf);return`<tr${n===5?' class="std"':''}><td>${n}${n===5?' <small>chuẩn</small>':''}</td><td class="r">${c.wolf}</td><td class="r">1</td><td class="r">${c.guard}</td><td class="r">${n-c.wolf-1-c.guard}</td><td class="r">${d?'Ngày '+d:'Không'}</td></tr>`}).join('')}</tbody></table>
      <p class="small">MC không chơi, chỉ điều khiển màn hình này. Chơi bao nhiêu ván cũng được, điểm tự cộng dồn cả buổi.</p></div>
      <details class="card fb"><summary><b>Cách tạo Firebase (làm 1 lần, miễn phí)</b></summary>
      <ol><li>Vào console.firebase.google.com, bấm tạo project mới (ví dụ tên <b>masoi-tongdai</b>), có thể tắt Google Analytics.</li>
      <li>Vào <b>Build → Firestore Database → Create database</b>, chọn vị trí gần (ví dụ asia-southeast1).</li>
      <li>Mở tab <b>Rules</b>, thay bằng đoạn dưới rồi bấm <b>Publish</b>:</li></ol>
      <pre>rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /msTD/{room} {
      allow read, write: if true;
      match /players/{pid} {
        allow read, write: if true;
      }
    }
  }
}</pre>
      <ol start="4"><li>Bấm bánh răng <b>Project settings</b>, kéo xuống <b>Your apps</b>, bấm biểu tượng Web <b>&lt;/&gt;</b>, đặt tên app rồi đăng ký.</li><li>Sao chép đoạn <b>firebaseConfig</b> hiện ra và dán vào ô bên trái.</li></ol>
      <p class="small">Nên dùng project riêng cho game, đừng sửa Rules của project web tra cứu mã lỗi.</p></details>
    </aside></div>`;
    $('#sw').value=S.wolves;$('#sdl').value=S.dl||'auto';refreshGroups();
    const md=()=>document.querySelector('input[name=md]:checked').value;
    document.querySelectorAll('input[name=md]').forEach(r=>r.onchange=()=>$('#fbox').classList.toggle('hide',md()!=='F'));
    const chk=()=>{const c=parseCfg($('#cfg').value);$('#cfgok').innerHTML=c?`<span class="okc">Đã nhận: project ${esc(c.p)}</span>`:'Chưa nhận được apiKey và projectId.';return c};
    $('#cfg').oninput=chk;if(S.cfgRaw)chk();
    $('#create').onclick=async()=>{
      const m=md(),c=m==='F'?chk():null;$('#se').textContent='';
      if(m==='F'&&!c){$('#se').textContent='Dán cấu hình Firebase trước.';return}
      const gall=[...document.querySelectorAll('#gbox input')],gs=gall.filter(x=>x.checked).map(x=>x.value);
      if(!gs.length){$('#se').textContent='Chọn ít nhất 1 nhóm câu hỏi.';return}
      if(getBank().filter(x=>gs.includes(x.g)).length<6){$('#se').textContent='Các nhóm đã chọn cần ít nhất 6 câu hỏi.';return}
      const sg=gs.length===gall.length?[]:gs;
      Object.assign(S,{mode:m,cfg:c,cfgRaw:m==='F'?$('#cfg').value:S.cfgRaw,base:$('#base').value.trim()||location.href.split('#')[0],nightSec:Math.max(20,+$('#s1').value||60),talkSec:Math.max(30,+$('#s2').value||180),voteSec:Math.max(20,+$('#s3').value||60),phaoSec:Math.max(30,+$('#s4').value||90),wolves:$('#sw').value,dl:$('#sdl').value,groups:sg});saveS();
      $('#create').disabled=true;
      try{code=rid(5);await attach(code,true)}catch(e){$('#se').textContent='Không kết nối được: '+e.message;$('#create').disabled=false}
    };
  }
  function parseCfg(t){const g=k=>(t.match(new RegExp(k+'["\']?\\s*:\\s*["\']([^"\']+)["\']'))||[])[1];const a=g('apiKey'),p=g('projectId');return a&&p?{a,p}:null}

  async function attach(c,fresh){
    code=c;BE=S.mode==='F'?await FireBE(S.cfg):LocalBE();
    H=LS.get(hk(),null)||{key:{},done:[],stats:{},used:[],seen:{},roles:{}};
    if(!BOT)LS.set('msTD_mc',{code});
    link=`${S.base}#j.${code}.${S.mode}${S.mode==='F'?'.'+b64e(S.cfg):''}`;
    if(fresh){H={key:{},done:[],stats:{},used:[],seen:{},roles:{}};saveH();await BE.set(rp(),lobbyRoom())}
    BE.watch(rp(),d=>{R=d;render();check()});
    BE.watchCol(rp()+'/players',o=>{P=o||{};const k=R&&stepKey();
      if(R&&R.phase==='night'){const sp=(R.order||[]).filter(p=>P[p]&&P[p].spot&&P[p].spot.k===k&&P[p].spot.o).map(p=>[P[p].spot.o,p]),mv=(R.order||[]).filter(p=>P[p]&&P[p].mv&&P[p].mv.k===k&&Array.isArray(P[p].mv.m)).map(p=>[p,...P[p].mv.m]),up={};
        if(JSON.stringify(sp)!==JSON.stringify(R.spots||[])){R.spots=sp;up.spots=sp}if(JSON.stringify(mv)!==JSON.stringify(R.mv||[])){R.mv=mv;up.mv=mv}if(up.spots||up.mv)BE.set(rp(),up)}if(k){for(const p in P)if(P[p].act&&P[p].act.key===k&&!H.seen[k+p]){H.seen[k+p]=Date.now();saveH()}}
      if(BOT&&R&&R.phase==='day')for(const p in P){const sy=P[p].say;if(sy&&sy.id&&!BT.said[sy.id]&&sy.k==='d'+R.round){BT.said[sy.id]=1;addChat(p,sy.t,sy.claim)}}render();check()});
  }
  const lobbyRoom=()=>({v:3,bots:0,scene:null,mv:[],bot:!!BOT,chat:[],claim:null,tally:null,lastDay:0,ann:null,phase:'lobby',round:0,names:{},alive:{},kpi:{},phaoUsed:{},order:[],news:[],headline:'Quét mã QR để vào phòng',deadline:0,winner:'',reveal:null,final:null,phao:null,comp:''});

  /* ---- ghi dữ liệu ---- */
  const mkAnn=(icon,tone,title,lead,lines,bars)=>({id:'a'+Date.now()+rid(3),icon,tone,title,lead:lead||'',lines:lines||[],bars:bars||[]});
  const newCtx=()=>({room:{},msgs:{},steps:{},priv:{}});
  const say=(c,p,m)=>(c.msgs[p]=c.msgs[p]||[]).push(m);
  async function commit(c){
    const ops=[],ids=new Set([...Object.keys(c.msgs),...Object.keys(c.steps),...Object.keys(c.priv)]),an=c.room.ann;
    if(an)(c.room.order||R.order||[]).forEach(p=>ids.add(p));
    for(const p of ids){const pr=Object.assign({},c.priv[p]||{});
      if(c.msgs[p]&&c.msgs[p].length)pr.msgs=[...((P[p]&&P[p].priv&&P[p].priv.msgs)||[]),...c.msgs[p]].slice(-30);
      if(c.steps[p])pr.step=c.steps[p];
      if(an)pr.last={id:an.id,m:c.msgs[p]||[]};
      P[p]=P[p]||{};P[p].priv=Object.assign(P[p].priv||{},pr);ops.push(BE.set(pp(p),{priv:pr}))}
    Object.assign(R,c.room);saveH();ops.push(BE.set(rp(),c.room));await Promise.all(ops);render();
  }
  const run=async f=>{if(busy)return;busy=true;try{await f()}catch(e){showErr(e)}finally{busy=false;setTimeout(check,50)}};
  function pickQ(kw){
    const gs=S.groups||[],b=getBank().filter(x=>!gs.length||gs.includes(x.g));
    let pool=b.filter(x=>!H.used.includes(nk(x.q)));if(!pool.length){H.used=[];pool=b}
    if(kw){const m=pool.filter(x=>nk(x.g).includes(nk(kw)));if(m.length)pool=m}
    const x=pick(pool),k=nk(x.q);H.used.push(k);const opts=shuffle([x.a,...x.w]);H.stats[k]=H.stats[k]||{q:x.q,n:0,c:0};
    return{qi:k,q:{q:x.q,opts},c:opts.indexOf(x.a),ans:x.a}}
  function grade(p,key){const a=P[p]&&P[p].act;let K=H.key[p];
    if(!K||K.k!==key)return{sub:false,ok:false,parts:[]};
    if(K.obj){if(!a||a.key!==key||!H.objKey||!H.objKey[a.obj])return{sub:false,ok:false,parts:[false],K:null};K=H.objKey[a.obj]}
    else if(!a||a.key!==key)return{sub:false,ok:false,parts:K.c.map(()=>false),K};
    const ans=Array.isArray(a.ans)?a.ans:[a.ans],parts=K.c.map((c,i)=>ans[i]===c);
    parts.forEach((ok,i)=>{const s=H.stats[K.qi[i]];if(s){s.n++;if(ok)s.c++}});
    return{sub:true,ok:parts.every(Boolean),parts,a,K}}

  /* ---- luật: chia vai ---- */
  async function deal(){
    const ids=Object.keys(P).filter(p=>P[p].name&&!P[p].kicked).sort((a,b)=>P[a].joinedAt-P[b].joinedAt);
    if(ids.length<4)return;
    const c=suggest(ids.length,S.wolves),deck=[];for(let i=0;i<c.wolf;i++)deck.push('wolf');deck.push('seer');if(c.guard)deck.push('guard');while(deck.length<ids.length)deck.push('villager');
    const roles=shuffle(deck);if(!BOT&&!S.botWolf){const isB=i=>P[ids[i]]&&P[ids[i]].bot;for(let i=0;i<ids.length;i++)if(isB(i)&&roles[i]==='wolf'){const j=ids.findIndex((_,k)=>!isB(k)&&roles[k]!=='wolf');if(j>=0)[roles[i],roles[j]]=[roles[j],roles[i]]}}
    BT.mem={};const map={},names={},cols=shuffle([...Array(12).keys()]),accs=shuffle([...Array(6).keys()]),chars={};ids.forEach((p,i)=>{map[p]=roles[i];names[p]=P[p].name;chars[p]={c:cols[i%12],a:accs[i%6]}});
    H={key:{},done:[],stats:H.stats||{},used:H.used||[],seen:{},roles:map};
    const ctx=newCtx();
    for(const p of ids){const r=map[p],mates=r==='wolf'?ids.filter(q=>q!==p&&map[q]==='wolf').map(q=>names[q]):[];
      ctx.priv[p]={role:r,mates,susp:0,lastGuard:''};ctx.steps[p]=WAIT;
      P[p].priv=Object.assign(P[p].priv||{},{msgs:[]});
      say(ctx,p,`Bạn là ${ROLE[r].n}.${mates.length?' Đồng bọn: '+mates.join(', ')+'.':''} Nhân vật của bạn: ${charName(chars[p])}.`)}
    const comp=compText(ids.length,c),ld=S.dl==='off'?0:lastDayOf(ids.length,c.wolf),all=v=>Object.fromEntries(ids.map(p=>[p,v]));
    ctx.room={phase:'intro',round:0,names,alive:all(true),kpi:all(0),phaoUsed:all(false),order:ids,news:[`Ván bắt đầu: ${ids.length} người gồm ${comp}. ${dlText(ld)}.`],headline:'Mở điện thoại, đọc vai và giữ bí mật',deadline:0,winner:'',reveal:null,final:null,phao:null,comp,lastDay:ld,chars,bots:ids.filter(p=>P[p].bot).length,objs:[],spots:[],
      ann:mkAnn('s','b','Ván bắt đầu!',`${ids.length} người: ${comp}.`,[ld?`Hạn chót: ${dlText(ld)}.`:'',ld?'Phe Tổng đài phải tìm ra Mã Lỗi trước hạn chót.':'','Mỗi người được bốc 1 nhân vật riêng, ai cũng thấy nhân vật của nhau.','Đọc vai trên điện thoại và giữ bí mật.'])};
    await commit(ctx);
  }
  /* ---- đêm ---- */
  async function startNight(){
    const r=(R.round||0)+1,key='n'+r,ctx=newCtx(),al=alive();H.key={};H.objKey={};
    const ri=(r-1)%ROOMS.length,rl=ROOMS[ri].lay,m=Math.min(Object.keys(rl).length,R.order.length+2),objs=shuffle(Object.keys(rl)).slice(0,m).map(id=>({id,s:0})),oq=[];
    for(const o of objs){const q=pickQ(OBJ[o.id].kw);H.objKey[o.id]={k:key,c:[q.c],qi:[q.qi],ans:[q.ans]};oq.push({id:o.id,q:q.q})}
    for(const p of R.order){const ro=roleOf(p);
      if(R.alive[p]){let prompt,targets;
        if(ro==='wolf'){prompt='Chọn người để đánh sập';targets=al.filter(x=>roleOf(x)!=='wolf')}
        else if(ro==='seer'){prompt='Chọn người để soi';targets=al.filter(x=>x!==p)}
        else if(ro==='guard'){prompt='Chọn người để bảo vệ (không trùng đêm trước)';const lg=P[p].priv&&P[p].priv.lastGuard;targets=al.filter(x=>x!==lg)}
        else{prompt='Bạn nghi ai là Mã Lỗi nhất?';targets=al.filter(x=>x!==p)}
        ctx.steps[p]={key,kind:'night',q:null,qs:null,objs:oq,prompt,targets,near:false};
      }else ctx.steps[p]={key,kind:'quiz',q:null,qs:null,objs:oq,prompt:'Bạn đã rời ca: trả lời đúng vẫn được +1 KPI',targets:null};
      H.key[p]={k:key,obj:true}}
    ctx.room={phase:'night',round:r,deadline:Date.now()+S.nightSec*1000,headline:`Đêm ${r}: vào ${ROOMS[ri].n}, tìm đồ vật có dấu ! để làm nhiệm vụ`,room:ri,objs:objs,spots:[],mv:[],chat:[],scene:null};
    await commit(ctx);
  }
  async function resolveNight(){
    const key='n'+R.round;if(H.done.includes(key))return;H.done.push(key);
    const ctx=newCtx(),al=alive(),kpi=Object.assign({},R.kpi),G={},t=p=>H.seen[key+p]||Infinity;
    for(const p of R.order){G[p]=grade(p,key);if(G[p].ok)kpi[p]=(kpi[p]||0)+1}
    const okW=al.filter(p=>roleOf(p)==='wolf'&&G[p].ok&&G[p].a.target&&R.alive[G[p].a.target]);let attack='';
    if(okW.length){const c={};okW.forEach(p=>c[G[p].a.target]=(c[G[p].a.target]||0)+1);const mx=Math.max(...Object.values(c));attack=pick(Object.keys(c).filter(k=>c[k]===mx))}
    const gd=al.find(p=>roleOf(p)==='guard');let protect='';
    if(gd){if(G[gd].ok)protect=G[gd].a.target;ctx.priv[gd]={lastGuard:G[gd].sub?G[gd].a.target:''}}
    const victim=attack&&attack!==protect?attack:'',alv=Object.assign({},R.alive);if(victim)alv[victim]=false;
    H.disg=H.disg||{};let fake='';
    {const sp=al.find(p=>roleOf(p)==='seer'),tg=sp&&G[sp].ok&&G[sp].a.target;
     if(tg&&roleOf(tg)==='wolf'&&G[tg]&&G[tg].ok&&!H.disg[tg]){H.disg[tg]=true;fake=tg;say(ctx,tg,`Đêm ${R.round}: Giám sát QA vừa soi trúng bạn, nhưng bạn đã NGỤY TRANG thành công: họ thấy bạn "không phải Mã Lỗi". Bạn đã dùng hết ngụy trang.`)}}
    for(const p of R.order){const g=G[p],K=g.K,ro=roleOf(p),n=`Đêm ${R.round}: `;
      if(!g.sub){say(ctx,p,`${n}bạn chưa gửi kịp${R.alive[p]&&ro!=='villager'?', kỹ năng không có hiệu lực':''}.`);continue}
      const fb=(g.a&&g.a.obj&&OBJ[g.a.obj]?`[${OBJ[g.a.obj].n}] `:'')+(g.ok?'trả lời ĐÚNG (+1 KPI).':`trả lời SAI. Đáp án đúng: ${K.ans[0]}.`);
      if(!R.alive[p]){say(ctx,p,n+fb);continue}
      let x='';
      if(ro==='wolf')x=g.ok?' Lệnh đánh sập đã gửi.':' Lệnh đánh sập thất bại.';
      if(ro==='guard')x=g.ok?` Bạn đã bảo vệ ${nm(g.a.target)}.`:' Bảo vệ không có hiệu lực.';
      if(ro==='seer')x=g.ok?` Kết quả soi: ${nm(g.a.target)} ${roleOf(g.a.target)==='wolf'&&g.a.target!==fake?'LÀ MÃ LỖI!':'không phải Mã Lỗi.'}`:' Không soi được.';
      say(ctx,p,n+fb+x)}
    const vs=al.filter(p=>roleOf(p)==='villager'&&G[p].ok).sort((a,b)=>t(a)-t(b));let clue=false;
    if(vs.length&&R.round>=2){clue=true;const w=vs[0],pool=R.order.filter(x=>alv[x]&&x!==w&&roleOf(x)!=='wolf');if(pool.length)say(ctx,w,`Manh mối (bạn đúng nhanh nhất): ${nm(pick(pool))} KHÔNG phải Mã Lỗi.`)}
    for(const p of al)if(roleOf(p)==='villager'&&G[p].sub&&roleOf(G[p].a.target)==='wolf')ctx.priv[p]={susp:((P[p].priv&&P[p].priv.susp)||0)+1};
    LAYC=layOf(R);const wf=okW.find(p=>G[p].a.target===attack),wo=wf&&G[wf].a.obj,scene=attack&&wo&&LAYC[wo]?zoneOf(LAYC[wo][0]):'',zo=scene?zoneObjs(R,scene):[];
    const lead=victim?`${nm(victim)} bị Mã Lỗi đánh sập và rời ca. Vai: ${ROLE[roleOf(victim)].n}.`:attack?'Mã Lỗi đã ra tay nhưng Kỹ thuật viên bảo vệ thành công. Không ai rời ca!':'Đêm bình yên: lệnh đánh sập thất bại vì Mã Lỗi trả lời sai.';
    const okN=al.filter(p=>G[p].ok).length,nAl=R.order.filter(p=>alv[p]).length,last=R.lastDay&&R.round>=R.lastDay;
    const lines=[scene?`Dấu vết: lệnh đánh sập được gửi từ ${scene}${zo.length?` (khu ${zo.join(', ')})`:''}.`:'',`Cả ca trả lời đúng ${okN}/${al.length} câu hỏi đêm nay.`,clue?'1 Tổng đài viên trả lời đúng nhanh nhất đã nhận manh mối bí mật.':R.round<2?'Manh mối cho Tổng đài viên bắt đầu từ Đêm 2.':'Đêm nay không Tổng đài viên nào trả lời đúng nên không có manh mối.',
      `Còn ${nAl} người trong ca.`+(R.lastDay?last?' Hôm nay là NGÀY CUỐI: không tìm ra Mã Lỗi thì Mã Lỗi thắng!':` Hạn chót: hết Ngày ${R.lastDay} (còn ${R.lastDay-R.round+1} ngày).`:''),
      `Tiếp theo: thảo luận ${mmss(S.talkSec*1000)} rồi bỏ phiếu.`];
    const news=[...R.news,`Đêm ${R.round}: ${lead}`];
    for(const p of R.order)ctx.steps[p]=WAIT;
    ctx.room={alive:alv,kpi,news,phase:'day',deadline:Date.now()+S.talkSec*1000,headline:lead,scene:scene?{p:attack,at:scene,objs:zo,dead:!!victim}:null,ann:mkAnn('n',victim?'bad':'n',`Trời sáng! Kết quả Đêm ${R.round}`,lead,lines)};
    if(R.bots||BOT)botLearn(ctx);checkWin(ctx,alv);await commit(ctx);
  }
  /* ---- ngày ---- */
  async function openVote(){
    const key='v'+R.round;if(H.done.includes('d'+R.round))return;H.done.push('d'+R.round);
    const ctx=newCtx(),al=alive();
    for(const p of R.order)ctx.steps[p]=R.alive[p]?{key,kind:'vote',q:null,qs:null,objs:null,prompt:'Đưa ai ra xử lý ca?',targets:al.filter(x=>x!==p)}:WAIT;
    ctx.room={phase:'vote',deadline:Date.now()+S.voteSec*1000,headline:`Ngày ${R.round}: bỏ phiếu bí mật trên điện thoại`};
    await commit(ctx);
  }
  async function resolveVote(){
    const key='v'+R.round;if(H.done.includes(key))return;H.done.push(key);
    const ctx=newCtx(),al=alive(),cnt={},lines=[];let skip=0;
    for(const p of al){const a=P[p]&&P[p].act,tg=a&&a.key===key?a.target:'';if(tg&&tg!=='skip'&&R.alive[tg]){cnt[tg]=(cnt[tg]||0)+1;lines.push(`${nm(p)} → ${nm(tg)}`)}else{skip++;lines.push(`${nm(p)} → bỏ qua`)}}
    const mx=Math.max(0,...Object.values(cnt)),top=Object.keys(cnt).filter(k=>cnt[k]===mx),news=[...R.news,`Ngày ${R.round}, phiếu bầu: ${lines.join('; ')}.`];
    const bars=[...Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]).map(k=>({n:nm(k),v:cnt[k],top:cnt[k]===mx&&top.length===1})),...(skip?[{n:'Bỏ qua',v:skip,top:false}]:[])],vt=`Kết quả bỏ phiếu Ngày ${R.round}`;
    for(const p of R.order)ctx.steps[p]=WAIT;
    if(mx>0&&top.length===1&&mx>skip){const acc=top[0];
      if(!R.phaoUsed[acc]){const q1=pickQ(),q2=pickQ(),k='p'+R.round;
        H.key={[acc]:{k,c:[q1.c,q2.c],qi:[q1.qi,q2.qi],ans:[q1.ans,q2.ans]}};
        ctx.steps[acc]={key:k,kind:'phao',q:null,objs:null,qs:[q1.q,q2.q],prompt:'Trả lời ĐÚNG CẢ 2 câu để ở lại ca (chỉ 1 lần mỗi ván).',targets:null};
        news.push(`${nm(acc)} bị nhiều phiếu nhất (${mx} phiếu) và dùng Phao nghiệp vụ.`);
        ctx.room={news,phase:'phao',phao:{pid:acc},deadline:Date.now()+S.phaoSec*1000,headline:`${nm(acc)} đang trả lời Phao nghiệp vụ (2 câu)`,
          ann:mkAnn('v','n',vt,`${nm(acc)} bị nhiều phiếu nhất (${mx} phiếu).`,[`${nm(acc)} được dùng Phao nghiệp vụ: trả lời đúng cả 2 câu thì ở lại ca.`,'Mọi người chờ kết quả phao trên màn hình.'],bars)};
      }else{news.push(`${nm(acc)} bị nhiều phiếu nhất (${mx} phiếu), đã dùng phao từ trước.`);eliminate(ctx,acc,news,'bị bỏ phiếu',mkAnn('v','bad',vt,'',[`${nm(acc)} bị nhiều phiếu nhất (${mx} phiếu) và đã dùng phao từ trước.`],bars))}
    }else{const why=mx===0?'Không ai bị bầu':top.length>1?'Phiếu hoà':'Số phiếu bỏ qua nhiều hơn hoặc bằng';news.push(`Ngày ${R.round}: ${why.toLowerCase()}, không ai rời ca.`);
      ctx.room={news,phase:'result',deadline:0,headline:news[news.length-1],ann:mkAnn('v','n',vt,`${why}: không ai rời ca.`,['Cần 1 người nhiều phiếu nhất, không hoà, và nhiều hơn số phiếu bỏ qua.'],bars)};checkWin(ctx,R.alive,true)}
    await commit(ctx);
  }
  async function resolvePhao(){
    const key='p'+R.round;if(H.done.includes(key))return;H.done.push(key);
    const acc=R.phao&&R.phao.pid;if(!acc)return;
    const ctx=newCtx(),g=grade(acc,key),K=H.key[acc],n=g.parts.filter(Boolean).length,news=[...R.news],kpi=Object.assign({},R.kpi);kpi[acc]=(kpi[acc]||0)+n;
    say(ctx,acc,`Phao nghiệp vụ: đúng ${n}/2. Đáp án: (1) ${K.ans[0]} (2) ${K.ans[1]}.`);
    for(const p of R.order)ctx.steps[p]=WAIT;
    ctx.room={kpi,phaoUsed:Object.assign({},R.phaoUsed,{[acc]:true})};
    if(g.ok){news.push(`${nm(acc)} trả lời đúng cả 2 câu phao và ở lại ca!`);Object.assign(ctx.room,{news,phase:'result',phao:null,deadline:0,headline:news[news.length-1],ann:mkAnn('p','ok','Kết quả Phao nghiệp vụ',`${nm(acc)} đúng 2/2 và ở lại ca!`,['Vai của người này vẫn được giữ bí mật.'])});checkWin(ctx,R.alive,true)}
    else eliminate(ctx,acc,news,`trả lời phao đúng ${n}/2`,mkAnn('p','bad','Kết quả Phao nghiệp vụ','',[`${nm(acc)} chỉ đúng ${n}/2 câu phao.`]));
    await commit(ctx);
  }
  function eliminate(ctx,p,news,why,an){const alv=Object.assign({},R.alive,{[p]:false}),ro=roleOf(p),m=`${nm(p)} rời ca. Vai: ${ROLE[ro].n}.`;news.push(`${nm(p)} rời ca (${why}). Vai: ${ROLE[ro].n}.`);
    an.lead=m;an.tone=ro==='wolf'?'ok':'bad';an.lines.push(ro==='wolf'?'Cả ca đã bắt đúng một Mã Lỗi!':'Tiếc quá, người này thuộc phe Tổng đài.');
    ctx.room=Object.assign(ctx.room,{alive:alv,news,phase:'result',deadline:0,phao:null,headline:news[news.length-1],ann:an});checkWin(ctx,alv,true)}
  function checkWin(ctx,alv,dayEnd){const al=R.order.filter(p=>alv[p]),w=al.filter(p=>roleOf(p)==='wolf').length;
    let win=!w?'town':w>=al.length-w?'wolf':'',late=false;
    if(!win&&dayEnd&&R.lastDay&&R.round>=R.lastDay){win='wolf';late=true}
    if(!win){if(dayEnd&&R.lastDay&&ctx.room.ann)ctx.room.ann.lines.push(R.round+1>=R.lastDay?`Ngày mai (Ngày ${R.round+1}) là ngày cuối để tìm Mã Lỗi!`:`Còn ${R.lastDay-R.round} ngày trước hạn chót.`);return}
    const kpi=ctx.room.kpi||R.kpi,reveal={};R.order.forEach(p=>reveal[p]=roleOf(p));
    const final=R.order.map(p=>{const won=(win==='wolf')===(roleOf(p)==='wolf'),s=(ctx.priv[p]&&ctx.priv[p].susp!==undefined)?ctx.priv[p].susp:((P[p].priv&&P[p].priv.susp)||0),k=kpi[p]||0;return{p,k,b:won?3:0,s,t:k+(won?3:0)+s}}).sort((a,b)=>b.t-a.t);
    const msg=win==='town'?'Phe Tổng đài thắng! Đã loại hết Mã Lỗi.':late?`Phe Mã Lỗi thắng! Hết hạn chót Ngày ${R.lastDay} mà Mã Lỗi vẫn còn ẩn.`:'Phe Mã Lỗi thắng! Ca trực đã bị đánh sập.';
    const tk='msTD_tally_'+code,TL=LS.get(tk,{games:0,p:{}});
    if(!H.tallied){H.tallied=true;TL.games++;final.forEach(x=>{const n=nm(x.p),k=nk(n),o=TL.p[k]=TL.p[k]||{n,t:0,g:0,w:0,k:0};o.n=n;o.t+=x.t;o.k=(o.k||0)+x.k;o.g++;if(x.b)o.w++});LS.set(tk,TL)}
    const rows=Object.values(TL.p).sort((a,b)=>b.t-a.t||(b.k||0)-(a.k||0)),tally={games:TL.games,rows};
    const prev=ctx.room.ann,wl=R.order.filter(p=>roleOf(p)==='wolf').map(nm).join(', '),best=final[0];
    Object.assign(ctx.room,{phase:'end',winner:win,reveal,final,deadline:0,phao:null,headline:msg,news:[...(ctx.room.news||R.news),msg],
      tally,ann:mkAnn('e',win==='town'?'ok':'bad',win==='town'?'Phe Tổng đài thắng!':'Phe Mã Lỗi thắng!',prev&&prev.lead||'',[late?`Đã hết hạn chót Ngày ${R.lastDay} mà Mã Lỗi vẫn còn ẩn.`:win==='town'?'Đã loại hết Mã Lỗi.':'Số Mã Lỗi đã bằng số người phe Tổng đài.',`Mã Lỗi là: ${wl}.`,`Xuất sắc ván này: ${nm(best.p)} (${best.t} điểm).`,TL.games>1?`Dẫn đầu tổng điểm sau ${TL.games} ván: ${rows[0].n} (${rows[0].t} điểm).`:''],prev&&prev.bars)});
    for(const p of R.order)ctx.steps[p]=WAIT}
  async function newGame(){
    const ctx=newCtx();for(const p of Object.keys(P)){ctx.priv[p]={role:null,mates:[],susp:0,lastGuard:''};ctx.steps[p]=WAIT;P[p].priv=Object.assign(P[p].priv||{},{msgs:[]});ctx.msgs[p]=['Ván mới: chờ MC chia vai.']}
    H={key:{},done:[],stats:H.stats,used:H.used,seen:{},roles:{}};ctx.room=lobbyRoom();ctx.room.tally=R.tally||null;await commit(ctx);
  }

  /* ---- tự động chuyển bước ---- */
  function check(){
    if(!R||!H||busy)return;const now=Date.now(),k=stepKey(),sub=p=>P[p]&&P[p].act&&P[p].act.key===k;
    if(R.phase==='night'&&!H.done.includes(k)&&(alive().every(sub)||now>R.deadline))run(resolveNight);
    else if(R.phase==='day'&&now>R.deadline&&!H.done.includes('d'+R.round))run(openVote);
    else if(R.phase==='vote'&&!H.done.includes(k)&&(alive().every(sub)||now>R.deadline))run(resolveVote);
    else if(R.phase==='phao'&&!H.done.includes(k)&&(sub(R.phao.pid)||now>R.deadline))run(resolvePhao);
  }
  setInterval(()=>{tick();check()},500);

  /* ---- giao diện MC ---- */
  function qrSvg(){if(qrCache[link])return qrCache[link];try{const q=qrcode(0,'L');q.addData(link);q.make();return qrCache[link]=q.createSvgTag({cellSize:5,margin:2,scalable:true})}catch(e){return'<p style="color:#000">Link quá dài để tạo QR.</p>'}}
  function rosterHTML(ids,lobby,k){
    return ids.map(p=>{const out=!lobby&&!R.alive[p],ro=lobby?'':(R.phase==='end'?R.reveal[p]:roleOf(p)),sent=!!(k&&!out&&P[p]&&P[p].act&&P[p].act.key===k),bot=P[p]&&P[p].bot,ch=R.chars&&R.chars[p];
      const st=lobby?(bot?'Bot':'Đã vào phòng'):out?'Rời ca':k?(sent?'Đã gửi':'Đang làm'):`${R.kpi[p]||0} KPI`;
      return`<div class="chip${out?' out':''}${sent?' sent':''}">${!lobby&&ch?av(ch,out):`<span class="ini">${esc((nm(p)[0]||'?').toUpperCase())}</span>`}<span class="cn"><b>${esc(nm(p))}</b><small>${st}${ro&&(showRoles||R.phase==='end')?` · <em class="${ro==='wolf'?'bad':''}">${ROLE[ro].n}</em>`:''}${R.phaoUsed&&R.phaoUsed[p]&&!lobby?' · đã dùng phao':''}</small></span>${lobby?`<button class="x" data-kick="${p}" aria-label="Bỏ ${esc(nm(p))} khỏi phòng">×</button>`:''}</div>`}).join('')}
  function render(){
    if(!R){$('#t-room').innerHTML='<div class="card">Đang kết nối phòng…</div>';return}
    const ph=R.phase,lobby=ph==='lobby';
    document.body.dataset.phase=ph==='night'?'night':'day';
    $('#hcode').innerHTML=lobby?'':`<span class="small">Mã phòng</span><span class="code">${esc(code.toUpperCase())}</span>`;
    const ids=lobby?Object.keys(P).filter(p=>P[p].name&&!P[p].kicked).sort((a,b)=>P[a].joinedAt-P[b].joinedAt):R.order,k=stepKey();
    const subN=k?alive().filter(p=>P[p]&&P[p].act&&P[p].act.key===k).length:0,need=k==='p'+R.round?1:alive().length,n=ids.length,c=suggest(n,S.wolves);
    const plus='<button class="btn ghost sm" data-a="plus">+1 phút</button>';let main='',extra='';
    if(lobby){main=`<button class="btn red big full" data-a="deal" ${n<4?'disabled':''}>Chia vai và bắt đầu</button>`;extra=BOT?'':`<button class="btn ghost sm" data-a="addbot" ${n>=12?'disabled':''}>+ Thêm bot</button><button class="btn ghost sm" data-a="botwolf">Bot làm Mã Lỗi: ${S.botWolf?'Có':'Không'}</button>`}
    else if(ph==='intro'||ph==='result')main=`<button class="btn red big full" data-a="night">Bắt đầu đêm ${R.round+1}</button>`;
    else if(ph==='night'){main='<button class="btn full" data-a="endnight">Kết thúc đêm ngay</button>';extra=plus+`<button class="btn ghost sm" data-a="pos">${showPos?'Ẩn vị trí':'Hiện vị trí (chỉ MC xem)'}</button>`}
    else if(ph==='day'){main='<button class="btn red big full" data-a="vote">Mở bỏ phiếu ngay</button>';extra=plus}
    else if(ph==='vote'){main='<button class="btn full" data-a="endvote">Chốt phiếu ngay</button>';extra=plus}
    else if(ph==='phao'){main='<button class="btn full" data-a="endphao">Chốt phao ngay</button>';extra=plus}
    else if(ph==='end'){main='<button class="btn red big full" data-a="again">Ván tiếp theo</button>';extra='<button class="btn ghost sm" data-a="reset">Xoá tổng điểm, bắt đầu buổi mới</button>'}
    const status=lobby||ph==='end'?'':`<section class="status"><div class="sl"><span class="ph ${ph==='night'?'n':'d'}">${phaseName(R)}</span>${R.lastDay&&ph!=='end'?`<span class="dl">Hạn chót: hết Ngày ${R.lastDay}</span>`:''}</div>
      <div class="head">${esc(ph==='day'?'Cả ca thảo luận để tìm ra Mã Lỗi':ph==='result'?'Chuẩn bị sang đêm tiếp theo':ph==='vote'?'Bỏ phiếu bí mật trên điện thoại':R.headline)}</div>${R.deadline&&R.deadline>Date.now()?`<div class="timer cd" data-d="${R.deadline}"></div>`:''}
      ${k?`<div class="prog"><span>${ph==='vote'?'Đã bầu':'Đã gửi'} <b>${subN}/${need}</b></span><i><u style="width:${Math.round(100*subN/Math.max(1,need))}%"></u></i></div>`:''}</section>`;
    let stage='';
    if(lobby)stage=BOT?'<div class="lobby"><div><h2>Chơi thử với bot</h2><p>Đây là màn hình MC chạy ngầm. Các bot tự vào phòng và tự chơi, bấm Tiếp tục trên điện thoại để sang bước sau.</p></div></div>'
      :`<div class="lobby"><div class="qr">${qrSvg()}</div><div class="lj"><h2>Quét mã để vào ca trực</h2><p>Mở camera điện thoại, quét mã rồi nhập tên của bạn.</p><div class="code huge">${esc(code.toUpperCase())}</div><p class="url">${esc(link)}</p><div class="row"><button class="btn ghost sm" data-a="copy">Sao chép link</button>${S.mode==='L'?'<button class="btn ghost sm" data-a="tab">Mở tab người chơi thử</button>':''}</div><p class="small" id="cp"></p></div></div>`;
    else if(ph==='intro')stage=`<div class="cast"><h2>Mọi người đang xem thẻ vai</h2><p class="small">Giữ bí mật vai của mình. MC bắt đầu đêm khi cả ca sẵn sàng.</p><div class="castg">${R.order.map(p=>`<div class="ca">${av(R.chars&&R.chars[p],false,'av big')}<b>${esc(nm(p))}</b><small>${charName(R.chars&&R.chars[p])}</small></div>`).join('')}</div></div>`;
    else if(ph==='night')stage='<div id="mwslot"></div>';
    else if(ph==='end')stage=endHTML(R,false);
    else stage=meetSVG(R)+chatHTML(R);
    let side=`<div class="card ctl">${lobby?`<div class="cnt"><b>${n}</b><span>người đã vào phòng</span></div><p class="small">${n>=4?'Bộ vai: '+compText(n,c)+'. '+dlText(S.dl==='off'?0:lastDayOf(n,c.wolf))+'.':'Cần ít nhất 4 người để chia vai.'}</p>`:''}${main}${extra?`<div class="row">${extra}</div>`:''}</div>`;
    if(R.ann&&['day','phao','result'].includes(ph))side+=`<div class="card ann t-${R.ann.tone}">${annHTML(R.ann,true)}</div>`;
    if(ph==='day')side+=`${R.scene?`<div class="trace"><span>Dấu vết đêm qua</span><b>Mã Lỗi ra tay từ ${esc(R.scene.at)}</b>${(R.scene.objs||[]).length?`<div class="chips">${R.scene.objs.map(o=>`<i>${esc(o)}</i>`).join('')}</div>`:''}</div>`:''}<div class="card asks"><h3>Hỏi nhau</h3><ul>${debateQs(R).map(q=>`<li>${esc(q)}</li>`).join('')}</ul></div>`;
    if(ph==='end'||(lobby&&R.tally))side+=tallyHTML(R)+(lobby&&R.tally?'<button class="btn ghost sm" data-a="reset">Xoá tổng điểm, bắt đầu buổi mới</button>':'');
    const stats=Object.values(H.stats).filter(s=>s.n).sort((a,b)=>a.c/a.n-b.c/b.n).slice(0,8);
    const roster=`<section class="rost"><div class="rh"><h3>Ca trực <small>${n} người</small></h3>${!lobby&&ph!=='end'?`<button class="btn ghost sm" data-a="eye">${showRoles?'Che vai':'Hiện vai (đừng chiếu)'}</button>`:''}</div><div class="chips2">${rosterHTML(ids,lobby,k)||'<p class="small">Chưa có ai vào phòng.</p>'}</div></section>`;
    const foot=lobby?'':`<section class="foot"><div class="card"><h3>Bảng tin</h3><ol class="log">${(R.news||[]).slice().reverse().map(m=>`<li>${esc(m)}</li>`).join('')}</ol></div>
      <div class="card"><h3>Câu hỏi khó nhất</h3>${stats.length?`<table class="hard"><tbody>${stats.map(s=>{const pc=Math.round(100*s.c/s.n);return`<tr><td>${esc(s.q)}</td><td class="r"><span class="pct${pc<50?' lo':''}">${pc}%</span><small>${s.c}/${s.n}</small></td></tr>`}).join('')}</tbody></table>`:'<p class="small">Hiện sau đêm đầu tiên. Câu nào tỉ lệ đúng thấp là nội dung cần training lại.</p>'}</div></section>`;
    const tools=BOT?'':`<div class="tools">${lobby?'':'<button class="btn ghost sm" data-a="copy">Sao chép link phòng</button><span class="small" id="cp"></span>'}<button class="btn ghost sm" data-a="close">Đóng phòng</button></div>`;
    $('#t-room').innerHTML=`<div class="mcg${lobby?' is-lobby':''}">${status}<div class="stage">${stage}</div><aside class="side">${side}</aside>${roster}${foot}${tools}</div>`;
    tick();const ms=$('#mwslot');if(ms){if(!mcWorld)mcWorld=World({mode:'view'});mcWorld.update(R);mcWorld.el.classList.toggle('nopeople',!showPos);ms.appendChild(mcWorld.el)}
  }
  $('#t-room').addEventListener('click',async e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.kick){await BE.set(pp(b.dataset.kick),{kicked:true});return}
    const a=b.dataset.a;
    if(a==='deal')run(deal);else if(a==='night')run(startNight);else if(a==='endnight')run(resolveNight);
    else if(a==='vote')run(openVote);else if(a==='endvote')run(resolveVote);else if(a==='endphao')run(resolvePhao);
    else if(a==='again')run(newGame);
    else if(a==='reset'){if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Bấm lần nữa để xoá tổng điểm';return}LS.del('msTD_tally_'+code);R.tally=null;await BE.set(rp(),{tally:null});render()}
    else if(a==='plus'){R.deadline=Math.max(R.deadline,Date.now())+60000;await BE.set(rp(),{deadline:R.deadline});render()}
    else if(a==='eye'){showRoles=!showRoles;render()}
    else if(a==='pos'){showPos=!showPos;render()}
    else if(a==='addbot'){await addBot()}
    else if(a==='botwolf'){S.botWolf=!S.botWolf;saveS();render()}
    else if(a==='copy'){try{await navigator.clipboard.writeText(link);$('#cp').textContent='Đã sao chép'}catch(err){$('#cp').textContent='Hãy chọn link và sao chép thủ công'}}
    else if(a==='tab'){window.open(link,'_blank')}
    else if(a==='close'){if(b.dataset.sure){LS.del('msTD_mc');location.reload()}else{b.dataset.sure=1;b.textContent='Bấm lần nữa để đóng phòng'}}
  });
}
