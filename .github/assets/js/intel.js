(async function(){
  // KPI hydration
  try {
    const res = await fetch('/data/msa/houston.json', {cache:'no-store'});
    const json = await res.json();
    document.querySelectorAll('[data-kpi]').forEach(el => {
      const key = el.getAttribute('data-kpi');
      if (json[key] != null) {
        const val = json[key];
        el.textContent = typeof val === 'number' ? val.toFixed(1) : val;
      }
    });
  } catch(err) {
    console.error('KPI hydration failed', err);
  }

  // Thesis Wizard
  function irr(cashflows, guess=0.1){
    for (let i=0;i<50;i++){
      let npv=0,d=0;
      cashflows.forEach((c,t)=>{ const k=(1+guess)**t; npv += c/k; d -= t*c/k/(1+guess); });
      const newGuess = guess - npv/d;
      if (Math.abs(newGuess-guess)<1e-6) return newGuess;
      guess=newGuess;
    }
    return guess;
  }
  function simulate({leverage, entryCap}){
    const exitCap = entryCap + 0.25;
    const NOI = 1_000_000, growth=0.03, hold=5;
    const price = NOI/ (entryCap/100);
    const exitNOI = NOI * (1+growth)**hold;
    const exitValue = exitNOI / (exitCap/100);
    const equity = price*(1-leverage);
    const flows=[-equity];
    for(let t=1;t<=hold;t++) flows.push(NOI* (1+growth)**(t-1));
    flows[hold] += exitValue - price*leverage;
    const r = irr(flows);
    return { irrPct:(r*100).toFixed(1), MoM:(flows.reduce((a,b)=>a+b,0)/Math.abs(flows[0])).toFixed(2) };
  }
  (function(){
    const out = document.getElementById('thesis-output');
    const inputs = ['leverage','entryCap'].map(id=>document.getElementById(id));
    if (!out || inputs.some(i=>!i)) return;
    const render = () => {
      const res = simulate({ leverage: +inputs[0].value, entryCap:+inputs[1].value });
      out.textContent = `IRR: ${res.irrPct}% · MoM: ${res.MoM}x`;
    };
    inputs.forEach(i=>i.addEventListener('input', render)); render();
  })();

  // Methodology dialog
  const dialog = document.getElementById('methodology-dialog');
  const content = document.getElementById('methodology-content');
  const close = document.getElementById('methodology-close');
  document.querySelectorAll('[data-method]').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const path = link.getAttribute('data-method');
      try {
        const data = await (await fetch(path, {cache:'no-store'})).json();
        const meta = data.meta || data.metadata || {};
        content.textContent = `Source: ${meta.source || 'n/a'} • Refresh: ${meta.refresh || 'n/a'}`;
      } catch(err) {
        content.textContent = 'No metadata available';
      }
      dialog.showModal();
    });
  });
  close?.addEventListener('click', () => dialog.close());
})();
