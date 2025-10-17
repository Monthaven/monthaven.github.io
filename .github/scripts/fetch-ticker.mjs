import fs from 'node:fs';
import fetch from 'node-fetch';

const nowISO = new Date().toISOString();

// FRED 10Y (DGS10) CSV-free JSON via St. Louis FRED
async function fred10y() {
  const r = await fetch("https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=&file_type=json&observation_start=2023-01-01");
  const j = await r.json();
  const last = j.observations.filter(o => o.value !== ".").pop();
  return { id:"10Y", value: Number(last.value), date: last.date, source:"FRED" };
}

// TODO: plug in SOFR/CMBS sources as you license them
const data = {};
data.series = [ await fred10y() ];
data.updatedAt = nowISO;

fs.mkdirSync("data", { recursive:true });
fs.writeFileSync("data/ticker.json", JSON.stringify(data, null, 2));
console.log("Wrote data/ticker.json");
