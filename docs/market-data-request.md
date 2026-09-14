# Market data request — what I need from you to fill the city pages

## Why this exists

Every city page has a market-statistics block already built into it. Right now it renders on
**Gastonia only**, because Gastonia is the one town with real numbers behind it. The other 27
pages silently skip it.

I can't fill these myself. Every real-estate data source — Zillow, Redfin, Realtor.com,
Homes.com, RealtyTrac — is blocked from the environment I work in. I can read search-result
snippets, but a snippet is not a source I can stand behind, and this is the one site where
publishing a number I can't defend costs us the whole argument. You have MLS access. You are
the better source anyway.

## The rule the build now enforces

`scripts/check-content.mjs` **fails the build** if:

- a town has market data but no `marketDataSource`
- a town has market data but no `marketDataAsOf`
- `marketDataAsOf` isn't in `YYYY-MM` form
- `marketDataAsOf` is **more than 6 months old**

That last one is deliberate. Stale market data on this site isn't an untidy detail, it's a
credibility hole — we spend three pages telling sellers that other people's numbers don't hold
up. So the site will refuse to build rather than quietly serve numbers that have aged out. Twice
a year, this will break the build on purpose and you'll need to refresh it or null it out.

## What I need per town

Four numbers. If you only have two, send two — the block renders whatever is there.

| Field | What it means | Example |
|---|---|---|
| `medianHomeValue` | Median **sold** price, last 6 months, whole town. Not list price, not an AVM. | `255000` |
| `medianDaysOnMarket` | Median days on market for those same sales | `21` |
| `monthsInventory` | Months of supply | `1.4` |
| `marketDataSource` | Where it came from, named | `Canopy MLS, Grover NC` |

`marketDataAsOf` I'll set to the month you pull it.

**Skip any town with fewer than about 5 sales in the window.** A median built on two sales is
noise, and the page is better with no number than a misleading one. Just leave the row blank.

## The table — fill and send back

| Town | County | Median sold | Days on market | Months inventory | Source |
|---|---|---|---|---|---|
| Gastonia | Gaston | | | | |
| Shelby | Cleveland | | | | |
| Kings Mountain | Cleveland | | | | |
| Belmont | Gaston | | | | |
| Mount Holly | Gaston | | | | |
| Bessemer City | Gaston | | | | |
| Cherryville | Gaston | | | | |
| Dallas | Gaston | | | | |
| Stanley | Gaston | | | | |
| Lincolnton | Lincoln | | | | |
| McAdenville | Gaston | | | | |
| Cramerton | Gaston | | | | |
| Lowell | Gaston | | | | |
| Ranlo | Gaston | | | | |
| High Shoals | Gaston | | | | |
| Boiling Springs | Cleveland | | | | |
| Grover | Cleveland | | | | |
| Kingstown | Cleveland | | | | |
| Lattimore | Cleveland | | | | |
| Fallston | Cleveland | | | | |
| Lawndale | Cleveland | | | | |
| Casar | Cleveland | | | | |
| Belwood | Cleveland | | | | |
| Patterson Springs | Cleveland | | | | |
| Polkville | Cleveland | | | | |
| Denver | Lincoln | | | | |
| Iron Station | Lincoln | | | | |
| Vale | Lincoln | | | | |

## Also useful, separately

These are stable Census-grade figures that update annually rather than monthly, so they carry no
staleness risk and I'd like them everywhere. I have them for Grover already. If you have a data
source that gives them in bulk, one export covers all 28:

- `housingUnits` — total housing units in the town
- `medianHouseholdIncome`
- `ownerOccupiedPct`

Grover's are a good illustration of why they matter: 307 housing units, 64.1% owner-occupied,
$36,736 median household income. Those three numbers explain more about why a house sits on the
market there than any price chart does, and no competitor publishes them.
