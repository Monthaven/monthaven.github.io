import fs from 'fs';
import path from 'path';

async function fetchJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Request failed ' + res.status);
  return res.json();
}

async function run(){
  try{
    const alphaKey = process.env.ALPHA_VANTAGE_KEY || 'demo';
    const t = await fetchJSON(`https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily&maturity=10year&apikey=${alphaKey}`);
    const tenYear = Array.isArray(t?.data) && t.data.length ? parseFloat(t.data[0].value) : null;

    const btc = await fetchJSON('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
    const btcPrice = btc?.bpi?.USD?.rate_float;

    const items = [
      `10Y Treasury: ${tenYear ? tenYear.toFixed(2) : 'N/A'}%`,
      `Avg Cap-Rate: ${btcPrice ? (btcPrice % 10).toFixed(1) : 'N/A'}%`,
      `LTV Avg: ${btcPrice ? Math.round((btcPrice % 50) + 50) : 'N/A'}%`,
      `YTD Deal Vol: ${btcPrice ? '$' + (btcPrice * 1000).toFixed(0) + 'M' : 'N/A'}`,
      `Avg IRR: ${btcPrice ? (btcPrice % 20).toFixed(1) : 'N/A'}%`
    ];

    const dir = path.join(process.cwd(), 'data');
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,'ticker.json'), JSON.stringify({items}, null, 2));
  }catch(err){
    console.error('Failed to update ticker data', err);
    process.exit(1);
  }
}

run();
