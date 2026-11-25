/* ================================================================
   MÀN HÌNH NGƯỜI CHƠI (điện thoại)
================================================================ */
async function playerApp(code,mode,cfgS){
  const app=$('#app');
  app.innerHTML=`<header class="ptop"><span class="logo">Ma Sói Tổng Đài</span><span class="pcode">${esc(code.toUpperCase())}</span></header><main class="pv"><div class="card">Đang kết nối…</div></main>`;
  let BE;
  try{BE=mode==='L'?LocalBE():await FireBE(b64d(cfgS))}catch(e){app.querySelector('.pv').innerHTML=`<div class="card warn">Không kết nối được: ${esc(e.message)}</div>`;return}
  const st=mode==='L'?SS:LS,pk='msTD_pid_'+code;
  let pid=st.get(pk,'');if(!pid){pid=rid(10);st.set(pk,pid)}
  const rp='msTD/'+code,pp=rp+'/players/'+pid;
  let R=null,ME=null,sel={key:'',target:'',ans:[]},showRole=null,sending=false,world=null,wKey='',sheet='',seenMsg=0;const ak='msTD_ann_'+code+'_'+pid;let seenAnn=st.get(ak,'');
  BE.watch(rp,d=>{R=d;render()});BE.watch(pp,d=>{ME=d;render()});
  const view=app.querySelector('.pv');
  function render(){
    if(!R){view.innerHTML='<div class="card">Đang tìm phòng… Nếu lâu không vào được, hãy quét lại mã QR.</div>';return}
    if(!ME||!ME.name||ME.kicked){
      if(R.phase!=='lobby'){view.innerHTML='<div class="card">Ván đang diễn ra. Chờ MC mở ván mới rồi quét lại nhé.</div>';return}
      if(view.querySelector('#jn'))return;
      view.innerHTML=`<div class="join"><div class="jt">Vào ca trực</div><p class="small">Phòng <b class="mono">${esc(code.toUpperCase())}</b> · nhập tên để mọi người nhận ra bạn.</p><label for="jn">Tên của bạn</label><input id="jn" autocomplete="name" maxlength="20" placeholder="Ví dụ: Tuấn Anh"><p class="warn" id="je"></p><button class="btn red full" id="jb">Vào phòng</button></div>`;
      return}
    const pr=ME.priv||{},stp=pr.step||{kind:'wait'},role=pr.role,done=ME.act&&ME.act.key===stp.key;
    if(stp.key!==sel.key)sel={key:stp.key,target:'',ans:[],obj:''};const myCh=R.chars&&R.chars[pid];
    let h='';
    if(R.phase==='lobby'||!role){
      h+=`<div class="wait"><div class="radar" aria-hidden="true"></div><div class="jt">Chào ${esc(ME.name)}</div><p>Bạn đã vào phòng. MC sẽ chia vai khi đủ người.</p><p class="small">Giữ màn hình này mở.</p></div>`;
    }else{
      const r=ROLE[role],alive=R.alive&&R.alive[pid],ms=(pr.msgs||[]),unread=ms.length>seenMsg,ph=R.phase;
      h+=`<div class="hud">${myCh?av(myCh,!alive):''}<span class="ph ${ph==='night'?'n':'d'}">${phaseShort(R)}</span>${R.deadline&&R.deadline>Date.now()&&ph!=='intro'?`<span class="cd hudt" data-d="${R.deadline}"></span>`:''}<span style="flex:1"></span><button class="hb" id="rb">Thẻ vai</button><button class="hb" id="ib">Tin${unread?'<i class="dot"></i>':''}</button></div>`;
      const badge=full=>`<div class="badge ${r.bad?'bad':''}"><i class="hole"></i><div class="bteam">${r.team}</div><div class="bico">${svg(role)}</div><div class="bname">${r.n}</div>${pr.mates&&pr.mates.length?`<div class="bmates">Đồng bọn: ${esc(pr.mates.join(', '))}</div>`:''}<p class="bskill">${r.p}</p>${full?`<p class="bgoal">${r.g}</p>`:''}${myCh?`<div class="bfoot">${av(myCh,false,'av big')}<div><span>Nhân vật</span><b>${charName(myCh)}</b></div></div>`:''}</div>`;
      if(ph==='intro'){h+=badge(true)}
      else if(ph==='end')h+=endHTML(R);
      else if(stp.kind!=='wait'&&!done)h+=stepHTML(stp);
      else if(ph==='night')h+=`<div id="wslot"></div><div class="nearbox" id="nearbox"></div>`;
      else if(['day','vote','phao','result'].includes(ph)){
        if(ph==='day'){h+=`<div class="talk"><svg class="sun" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="12"/><g><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13.6 13.6l5.7 5.7M44.7 44.7l5.7 5.7M13.6 50.4l5.7-5.7M44.7 19.3l5.7-5.7"/></g></svg><div class="tk1">Đặt điện thoại xuống, tranh luận!</div>${R.lastDay&&R.round>=R.lastDay?'<div class="last">Ngày cuối: phải tìm ra Mã Lỗi hôm nay</div>':''}</div>`;
          if(R.scene)h+=`<div class="trace"><span>Dấu vết đêm qua</span><b>Mã Lỗi ra tay từ ${esc(R.scene.at)}</b>${(R.scene.objs||[]).length?`<div class="chips">${R.scene.objs.map(o=>`<i>${esc(o)}</i>`).join('')}</div>`:''}</div>`;
          h+=`<div class="asks"><h3>Hỏi nhau</h3><ul>${debateQs(R).map(q=>`<li>${esc(q)}</li>`).join('')}</ul><p class="hint">${todo(R,role,alive,done,pid)}</p></div>`}
        else h+=`<div class="talk small-talk"><div class="tk2">${ph==='vote'?'Đã bầu, chờ mọi người':ph==='phao'?esc(R.headline||''):'Sắp sang đêm tiếp theo'}</div></div>`;
        if(R.bot||R.bots)h+=chatHTML(R);
        if(R.bot&&ph==='day'&&alive)h+=sayHTML();
      }
      if(sheet==='role')h+=`<div class="ov" id="sheet"><div class="ovw">${badge(true)}<button class="btn full" id="shx">Úp thẻ</button></div></div>`;
      if(sheet==='info')h+=`<div class="ov" id="sheet"><div class="ovc info"><h3>Tin riêng</h3>${ms.length?`<ul class="msgs">${ms.slice().reverse().map(m=>`<li>${esc(m)}</li>`).join('')}</ul>`:'<p class="small">Chưa có.</p>'}
        <h3>Bảng tin</h3><ul class="msgs">${(R.news||[]).slice().reverse().map(m=>`<li>${esc(m)}</li>`).join('')}</ul>${R.lastDay?`<p class="small">Hạn chót: hết Ngày ${R.lastDay}</p>`:''}
        <p>${(R.order||[]).map(p=>`<span class="tag ${R.alive[p]?'':'bad'}" style="margin:2px">${esc(R.names[p])}${R.alive[p]?'':' (rời ca)'} · ${R.kpi[p]||0} KPI</span>`).join(' ')}</p><button class="btn red full" id="shx">Đóng</button></div></div>`;
    }
    const busyStep=role&&R.phase!=='end'&&stp.kind!=='wait'&&!done;
    const g=!!(role&&R.phase!=='lobby');view.classList.toggle('game',g);const pt=app.querySelector('.ptop');if(pt)pt.style.display=g?'none':'';
    if(R.ann&&R.ann.id!==seenAnn&&!busyStep&&!sheet){const l=pr.last&&pr.last.id===R.ann.id?pr.last.m:[];
      h+=`<div class="ov" role="dialog" aria-modal="true"><div class="ovc t-${R.ann.tone||'n'}">${annHTML(R.ann)}${l.length?`<div class="priv"><b>Tin riêng của bạn</b>${l.map(m=>`<p>${esc(m)}</p>`).join('')}</div>`:''}<button class="btn red full" id="ovok">Đã xem</button></div></div>`}
    document.body.dataset.phase=role&&R.phase==='night'?'night':'day';
    view.innerHTML=h;tick();
    const slot=view.querySelector('#wslot');
    if(slot&&R.phase==='night'){
      if(!world)world=World({mode:'play',pid,onMove:m=>{BE.set(pp,{mv:{k:'n'+R.round,m:m.map(v=>Math.round(v))}}).catch(showErr)},onNear:paintNear});
      if(wKey!=='n'+R.round){wKey='n'+R.round;const e=(R.mv||[]).find(x=>x[0]===pid);world.setMe(e?e.slice(1):null)}
      world.update(R);slot.appendChild(world.el);paintNear()}
  }
  function paintNear(){const box=view.querySelector('#nearbox');if(!box||!world)return;const n=world.near,st=(ME&&ME.priv&&ME.priv.step)||{},done=ME.act&&ME.act.key===st.key;
    if(!n){box.innerHTML=done?`<p class="small okc">✓ Đã gửi · chờ mọi người</p>`:`<p class="small">Chạm sàn để đi · tìm dấu <b>!</b> vàng</p>`;return}
    const O=OBJ[n],tk=(R.spots||[]).some(([o,p])=>o===n&&p!==pid);
    box.innerHTML=done||!st.objs?`<p class="small okc">✓ Đã gửi · chờ mọi người</p>`:tk?`<p class="warn">${esc(O.n)} đã có người làm</p>`:`<button class="btn red full" data-near="${n}">Làm nhiệm vụ: ${esc(O.n)}</button>`}
  let sayT='';
  function sayHTML(){const al=(R.order||[]).filter(p=>p!==pid&&R.alive[p]);
    return`<div class="card"><h3 style="margin:0 0 8px">Bạn nói</h3><div class="opts two">${al.map(p=>`<button class="opt pp ${sayT===p?'on':''}" data-st="${p}">${av(R.chars&&R.chars[p])}<span>${esc(R.names[p])}</span></button>`).join('')}</div>
      <div class="row" style="margin-top:10px"><button class="btn" data-sy="sus">Nghi</button><button class="btn" data-sy="inn">Trong sạch</button><button class="btn red" data-sy="claim">Tôi soi ra LÀ Mã Lỗi</button></div></div>`}
  const title={night:'Nhiệm vụ đêm',quiz:'Hội đồng chấm',vote:'Bỏ phiếu',phao:'Phao nghiệp vụ'};
  function stepHTML(s){
    if(s.objs&&!sel.obj)return`<div id="wslot"></div><div class="nearbox" id="nearbox"></div><p class="warn" id="se"></p>`;
    let h=s.objs?`<div id="wslot" class="under"></div><div class="tsheet" role="dialog" aria-label="Nhiệm vụ">`:`<div class="task">`;
    if(s.objs){const O=OBJ[sel.obj];h+=`<div class="objp">${objIcon(sel.obj,R)}<div><b>${esc(O.n)}</b><button class="btn ghost sm" id="chg">Đổi đồ vật</button></div></div>`}
    else h+=`<h2 class="tt">${title[s.kind]||''}</h2>`;
    if(s.prompt)h+=`<p class="lbl">${esc(s.prompt)}</p>`;
    if(s.targets){let tg=s.targets;if(s.near){const now=Date.now(),me=posIn(R,pid,now);tg=tg.filter(t=>{const q=posIn(R,t,now);return Math.hypot(q.x-me.x,q.y-me.y)<=VIS})}
      const list=tg.map(t=>[t,R.names[t]]);if(s.kind==='vote')list.push(['skip','Bỏ qua, không bầu ai']);if(s.near)list.push(['none',tg.length?'Không đánh sập đêm nay':'Không có ai ở gần · không đánh sập']);
      h+=`<div class="opts two">${list.map(([v,l])=>`<button class="opt pp ${sel.target===v?'on':''}" data-t="${v}">${v!=='skip'&&R.chars&&R.chars[v]?av(R.chars[v]):''}<span>${esc(l)}</span></button>`).join('')}</div>`}
    const qs=s.objs?[s.objs.find(o=>o.id===sel.obj).q]:s.qs||(s.q?[s.q]:[]);
    qs.forEach((q,i)=>{h+=`${qs.length>1?`<p class="lbl">Câu ${i+1}</p>`:''}<p class="q">${esc(q.q)}</p><div class="opts">${q.opts.map((o,j)=>`<button class="opt ${sel.ans[i]===j?'on':''}" data-q="${i}" data-a="${j}">${'ABCD'[j]}. ${esc(o)}</button>`).join('')}</div>`});
    return h+`<p class="warn" id="se"></p><button class="btn red full" id="sb" ${sending?'disabled':''}>Gửi</button></div>`;
  }
  async function pickObj(o){const s=ME.priv.step;if(!s||!s.objs||sel.obj)return;
    if((R.spots||[]).some(([ob,p])=>ob===o&&p!==pid)){const w=$('#se');if(w)w.textContent='Đồ vật này đã có người chọn, hãy chọn đồ vật khác.';return}
    sel.obj=o;sel.ans=[];render();try{await BE.set(pp,{spot:{k:s.key,o}})}catch(err){showErr(err)}}
  view.addEventListener('click',async e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.near){pickObj(b.dataset.near);return}
    if(b.dataset.st){sayT=b.dataset.st;render();return}
    if(b.dataset.sy){if(!sayT)return;const n=R.names[sayT],t={sus:`Mình nghi ${n}.`,inn:`Mình nghĩ ${n} không phải Mã Lỗi.`,claim:`Mình là Giám sát QA. Mình soi ra ${n} LÀ MÃ LỖI!`}[b.dataset.sy];
      try{await BE.set(pp,{say:{id:rid(6),k:'d'+R.round,t,claim:b.dataset.sy==='claim'?sayT:''}})}catch(err){showErr(err)}sayT='';return}
    if(b.id==='chg'){sel.obj='';sel.ans=[];render();try{await BE.set(pp,{spot:{k:ME.priv.step.key,o:''}})}catch(err){showErr(err)}return}
    if(b.id==='jb'){const n=$('#jn').value.trim();if(!n){$('#je').textContent='Nhập tên của bạn.';return}b.disabled=true;await BE.set(pp,{name:n,joinedAt:Date.now(),kicked:false});return}
    if(b.id==='rb'){sheet='role';render();return}
    if(b.id==='ib'){sheet='info';seenMsg=((ME.priv||{}).msgs||[]).length;render();return}
    if(b.id==='shx'){sheet='';render();return}
    if(b.id==='ovok'){seenAnn=R.ann.id;st.set(ak,seenAnn);render();return}
    if(b.dataset.t!==undefined){sel.target=b.dataset.t;render();return}
    if(b.dataset.q!==undefined){sel.ans[+b.dataset.q]=+b.dataset.a;render();return}
    if(b.id==='sb'){const s=ME.priv.step,qs=s.objs?(sel.obj?[1]:[]):s.qs||(s.q?[s.q]:[]);
      if(s.objs&&!sel.obj){$('#se').textContent='Hãy chạm vào 1 đồ vật.';return}
      if(s.targets&&!sel.target){$('#se').textContent='Hãy chọn 1 người.';return}
      if(qs.some((_,i)=>sel.ans[i]===undefined)){$('#se').textContent='Hãy trả lời câu hỏi.';return}
      sending=true;b.disabled=true;
      try{await BE.set(pp,{act:{key:s.key,obj:sel.obj||'',target:sel.target||'',ans:qs.length>1?sel.ans:(qs.length?sel.ans[0]:-1),t:Date.now()}})}catch(err){showErr(err)}
      sending=false}
  });
  setInterval(tick,500);
}
const ICO={n:'<svg class="ovi" viewBox="0 0 64 64"><circle cx="32" cy="32" r="13" fill="#f2a900"/><g stroke="#f2a900" stroke-width="5" stroke-linecap="round"><path d="M32 4v8M32 52v8M4 32h8M52 32h8M12 12l6 6M46 46l6 6M12 52l6-6M46 18l6-6"/></g></svg>',
 v:'<svg class="ovi" viewBox="0 0 64 64"><rect x="10" y="26" width="44" height="30" rx="5" fill="#1f5cff"/><rect x="22" y="8" width="20" height="26" rx="3" fill="#fff" stroke="#1f5cff" stroke-width="3"/><path d="M26 20l4 4 8-8" stroke="#1f5cff" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="18" y="32" width="28" height="4" rx="2" fill="#0b2e8a"/></svg>',
 p:'<svg class="ovi" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="none" stroke="#d4001a" stroke-width="12"/><circle cx="32" cy="32" r="24" fill="none" stroke="#fff" stroke-width="12" stroke-dasharray="19 19"/></svg>',
 e:'<svg class="ovi" viewBox="0 0 64 64"><path d="M14 8v50" stroke="#555" stroke-width="5" stroke-linecap="round"/><path d="M16 10h34l-8 10 8 10H16z" fill="#d4001a"/></svg>',
 s:'<svg class="ovi" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="#1f5cff"/><path d="M26 20l18 12-18 12z" fill="#fff"/></svg>'};
function annHTML(a,big){if(!a)return'';const mx=Math.max(1,...(a.bars||[]).map(b=>b.v));
  return`${big?'':ICO[a.icon]||''}<h2>${esc(a.title)}</h2>${a.lead?`<p class="lead">${esc(a.lead)}</p>`:''}${(a.bars||[]).length?`<div class="bars">${a.bars.map(b=>`<div class="bar ${b.top?"hi":""}"><span>${esc(b.n)}</span><i style="width:${Math.max(4,100*b.v/mx)}%"></i><b>${b.v}</b></div>`).join('')}</div>`:''}${(a.lines||[]).filter(Boolean).map(l=>`<p>${esc(l)}</p>`).join('')}`}
function todo(R,role,alive,done,pid){
  if(R.phase==='intro')return'Đọc kỹ vai và kỹ năng. Khi MC bắt đầu đêm, nhiệm vụ sẽ hiện ngay tại đây.';
  if(!alive&&R.phase!=='night')return'Bạn đã rời ca: không tiết lộ vai của người khác. Đêm vẫn có câu hỏi để bạn lấy thêm KPI.';
  if(R.phase==='night')return done?'Đã gửi. Xem mọi người đang đứng ở đồ vật nào, chờ kết quả đêm.':'Đi tới 1 đồ vật trong Phòng 1 để làm nhiệm vụ.';
  if(R.phase==='day')return{wolf:'Giả làm người tốt. Có thể nhận là Tổng đài viên có manh mối để đánh lạc hướng. Câu giờ đến hết hạn chót cũng là cách thắng.',
    seer:'Nếu đã soi ra Mã Lỗi, hãy công khai để cả ca bỏ phiếu. Lộ vai thì Mã Lỗi sẽ nhắm vào bạn đêm sau.',
    guard:'Nghe xem ai đáng tin để bảo vệ đêm sau. Không cần lộ vai.',
    villager:'Kể manh mối nếu có, hỏi người nói mâu thuẫn. Phải tìm ra Mã Lỗi trước hạn chót.'}[role];
  if(R.phase==='vote')return done?'Đã bầu. Chờ kết quả.':'Bầu người bạn nghi nhất. Không chắc thì chọn bỏ qua.';
  if(R.phase==='phao')return R.phao&&R.phao.pid===pid?'Trả lời phao ở trên.':'Người bị bầu đang trả lời 2 câu phao. Đoán xem họ có phải Mã Lỗi không.';
  if(R.phase==='result')return'Bàn nhanh kết quả, chờ MC bắt đầu đêm tiếp theo.';
  return'';
}
function botApp(){
  const app=$('#app'),n0=LS.get('msTD_botn',5);
  app.innerHTML=`<div class="ptop"><b>Ma Sói Tổng Đài</b><span>Chơi thử với bot</span></div><div class="pv"><div class="card"><h2>Chơi thử với bot</h2>
    <p>Bạn chơi 1 vai trên máy này, các bot tự vào phòng, tự đi tới đồ vật, tự trả lời câu hỏi, tự nói chuyện và bỏ phiếu. Máy MC chạy ngầm trong trang.</p>
    <label for="bn">Tổng số người chơi (gồm bạn)</label><select id="bn">${[4,5,6,7,8].map(n=>`<option value="${n}" ${n===n0?'selected':''}>${n} người (${n-1} bot)</option>`).join('')}</select>
    <p class="small">Thời gian rút gọn: đêm 60 giây, thảo luận 60 giây, bỏ phiếu 40 giây. Bấm "Tiếp tục" ở thanh dưới để sang bước sau ngay. Câu hỏi lấy từ ngân hàng câu hỏi trên máy này.</p>
    <button class="btn red full" id="bgo">Bắt đầu</button></div></div>`;
  $('#bgo').onclick=()=>{const n=+$('#bn').value;LS.set('msTD_botn',n);const code='b'+rid(5);
    const f=document.createElement('iframe');f.id='mcf';f.title='Màn hình MC';f.src=location.href.split('#')[0]+'#mcbot.'+code+'.'+n;document.body.appendChild(f);
    const bar=document.createElement('div');bar.className='botbar';bar.innerHTML='<button class="btn red" id="bnx">Tiếp tục</button><button class="btn" id="bmc">Màn hình MC</button><button class="btn ghost" id="bq">Thoát</button>';document.body.appendChild(bar);
    const x=document.createElement('button');x.id='mcx';x.className='btn red hide';x.textContent='Đóng màn hình MC';document.body.appendChild(x);
    $('#bnx').onclick=()=>f.contentWindow.postMessage({msTD:'next'},'*');
    $('#bmc').onclick=()=>{f.classList.add('show');x.classList.remove('hide')};x.onclick=()=>{f.classList.remove('show');x.classList.add('hide')};
    $('#bq').onclick=()=>{location.hash='';location.reload()};
    setTimeout(()=>{playerApp(code,'L');document.querySelector('.pv').classList.add('botpad')},300)}
}
function debateQs(R){const at=R.scene&&R.scene.at;return[
  'Đêm qua bạn làm nhiệm vụ ở đồ vật nào? Câu hỏi là gì, bạn chọn đáp án nào?',
  at?`Đêm qua ai làm nhiệm vụ ở ${at}? Ai thấy ai ở đó?`:'Trong vòng sáng của bạn đêm qua có những ai?',
  'Ai nói khác với lúc nãy? Ai im lặng bất thường?']}
function phaseShort(R){const ri=(R.room||0)%ROOMS.length;return{intro:'Xem vai',night:`Đêm ${R.round}`,day:`Ngày ${R.round}`,vote:'Bỏ phiếu',phao:'Phao nghiệp vụ',result:'Kết quả',end:'Kết thúc'}[R.phase]||''}
function phaseName(R){return{lobby:'Phòng chờ',intro:'Xem vai',night:`Đêm ${R.round}`,day:`Ngày ${R.round} · thảo luận`,vote:`Ngày ${R.round} · bỏ phiếu`,phao:`Ngày ${R.round} · phao`,result:`Ngày ${R.round} · kết quả`,end:'Kết thúc'}[R.phase]||''}
function tick(){document.querySelectorAll('.cd').forEach(el=>{const ms=+el.dataset.d-Date.now();el.textContent=mmss(ms);el.classList.toggle('low',ms<10000)})}
function tallyHTML(R){const T=R.tally;if(!T||!T.rows||!T.rows.length)return'';
  return`<div class="card"><h3>Tổng điểm cả buổi (${T.games} ván)</h3><table><thead><tr><th>#</th><th>Người chơi</th><th class="r">Số ván</th><th class="r">Thắng</th><th class="r">Câu đúng</th><th class="r">Tổng điểm</th></tr></thead><tbody>${T.rows.map((x,i)=>{const f=T.rows[0],top=x.t===f.t&&(x.k||0)===(f.k||0),nTop=T.rows.filter(y=>y.t===f.t&&(y.k||0)===(f.k||0)).length;return`<tr><td>${i+1}</td><td>${top?'<b>':''}${esc(x.n)}${top?'</b> · TĐV xuất sắc của buổi'+(nTop>1?' (đồng hạng)':''):''}</td><td class="r">${x.g}</td><td class="r">${x.w}</td><td class="r">${x.k||0}</td><td class="r"><b>${x.t}</b></td></tr>`}).join('')}</tbody></table></div>`}
function endHTML(R){
  return tallyHTML(R)+`<div class="card"><p class="big">${esc(R.headline)}</p><table><thead><tr><th>Người chơi</th><th>Vai</th><th class="r">KPI</th><th class="r">Thắng</th><th class="r">Nghi đúng</th><th class="r">Tổng</th></tr></thead><tbody>${(R.final||[]).map((x,i)=>`<tr><td>${i===0?'<b>':''}${esc(R.names[x.p])}${i===0?'</b> · xuất sắc':''}</td><td><span class="tag ${R.reveal[x.p]==='wolf'?'bad':''}">${ROLE[R.reveal[x.p]].n}</span></td><td class="r">${x.k}</td><td class="r">+${x.b}</td><td class="r">+${x.s}</td><td class="r"><b>${x.t}</b></td></tr>`).join('')}</tbody></table></div>`;
}

