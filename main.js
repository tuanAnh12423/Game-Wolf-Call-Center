/* ================= điều hướng ================= */
const jm=location.hash.match(/^#j\.([a-z0-9]+)\.(L|F)(?:\.([A-Za-z0-9_-]+))?$/);
const bm=location.hash.match(/^#mcbot\.([a-z0-9]+)\.(\d+)$/);
if(jm)playerApp(jm[1],jm[2],jm[3]);else if(bm)mcApp({code:bm[1],n:+bm[2]});else if(location.hash==='#bot')botApp();else mcApp();

