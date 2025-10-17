(async function(){
  const el = document.getElementById('market-navigator');
  if (!el) return;
  const payload = await (await fetch('/data/navigator/points.json', {cache:'no-store'})).json();
  const pts = payload.points || payload;
  const chart = echarts.init(el);
  chart.setOption({
    tooltip: { trigger: 'item', formatter: p => `${p.data.msa} • ${p.data.sector}<br/>Cap: ${p.data.capRate}% · Rent: ${p.data.rentCAGR}%` },
    xAxis: { name: 'Cap Rate (%)' }, yAxis: { name: 'Rent CAGR (%)' },
    series: [{ type: 'scatter', symbolSize: d => 6 + Math.sqrt(d[2])*2,
      data: pts.map(p => ({ value:[p.capRate, p.rentCAGR, p.liquidity], ...p })) }]
  });
})();
