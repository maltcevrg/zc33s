// English version of the article «tuning-stages».
// HTML и оглавление живут отдельно от словаря: они грузятся только при открытии статьи.
export const toc = [
  'Stage 1: Basic chip tuning (up to 165 hp on AI-95)',
  'Stage 2: Moderate tuning (calculated 170 hp)',
  'Stage 2+: Advanced level (180 hp on AI-100)',
  'Stage 3: Serious tuning (185–220 hp)',
  'Stage 3+ (240+ hp): Maximum power',
  'Firmware library: automatic transmission (AT)',
  'Firmware library: manual transmission (MT)',
  'Critical update to the selection algorithm (relevant from 2026)',
];

export const html = `<p>The Suzuki Swift Sport ZC33S with the K14C engine has enormous tuning potential. However, the JDM tuning world is full of nuances: from firmware compatibility for pre-facelift and facelift cars to strict fuel and spark plug requirements at higher boost.</p>
<p>This material is based on real experience of the owners' community, direct purchases of calibrations from Japanese tuning ateliers and years of upgrade practice. We have structured all stages, prices, part numbers and critically important warnings so you can make an informed choice.</p>

<p><strong>Tuning stages: budgets and goals</strong></p>
<p>ZC33S tuning can be done in stages, increasing power from the base 165 hp to 240+ hp without replacing every component at once.</p>

<p><strong>Stage 1: Basic chip tuning (up to 165 hp on AI-95)</strong></p>
<p>The ideal start for gaining power without serious structural intervention.</p>
<ul>
<li>What it gives: power up to 165 hp (dyno measured), improved accelerator pedal response, smoother engine operation.</li>
<li>Requirements: healthy car, stock exhaust, stock cooling system, fresh stock spark plugs.</li>
<li>Budget: 7,500 – 10,000 ₽ (including the firmware file at 2,500 – 5,000 ₽ or purchase of a basic programmer).</li>
</ul>

<p><strong>Stage 2: Moderate tuning (calculated 170 hp)</strong></p>
<p>The next step for a noticeable gain in dynamics and lower temperatures.</p>
<ul>
<li>What it gives: calculated power up to 170 hp, lower exhaust gas temperature (EGT), improved cylinder scavenging.</li>
<li>Key upgrades: firmware file (5,000 ₽), catless downpipe (20,000 ₽) + installation (~7,000 ₽), fresh spark plugs.</li>
<li>Recommended options: intake modernisation, intercooler upgrade (for boost stability), modification of the main exhaust line.</li>
<li>Budget: 36,000 – 55,000 ₽.</li>
</ul>

<p><strong>Stage 2+: Advanced level (180 hp on AI-100)</strong></p>
<p>For those ready for serious changes and with access to high-octane fuel.</p>
<ul>
<li>Specifics: the file is calibrated strictly for 100 RON. Intercooler and downpipe are mandatory.</li>
<li>Contents and cost: intercooler (30,000 ₽ + installation 10,000 ₽), downpipe (20,000 ₽ + installation 7,000 ₽), firmware (5,000 ₽).</li>
<li>Budget: from 76,000 ₽ (excluding the rear muffler modification, which is strongly recommended).</li>
</ul>

<p><strong>Stage 3: Serious tuning (185–220 hp)</strong></p>
<p>A powerful upgrade with replacement of the key boost components.</p>
<ul>
<li>Power: 185 hp (on AI-95) or 220 hp (on AI-100).</li>
<li>Components: GR30 hybrid turbo (75,000 ₽), tuning (30,000 ₽), logger (6,000 ₽), full exhaust system (~120,000 ₽), intercooler (30,000 ₽). In-person tuning by GunRace specialists is required.</li>
<li>Labour: turbo installation (~15,000 ₽), intercooler (~10,000 ₽).</li>
<li>Budget: 140,000 ₽ (excluding exhaust system upgrades).</li>
</ul>

<p><strong>Stage 3+ (240+ hp): Maximum power</strong></p>
<p>Global changes for the track and enthusiasts.</p>
<ul>
<li>Components: GR39 hybrid turbo (85,000 ₽), tuning (30,000 ₽), logger (6,000 ₽), full exhaust system (~120,000 ₽), intercooler (30,000 ₽). In-person tuning by GunRace specialists is required.</li>
<li>For manual cars: the clutch must be replaced with an upgraded one (from 35,000 ₽, with a lightened flywheel up to 45,000 ₽) + “remove and refit” labour (20,000 ₽).</li>
<li>Budget: about 260,000 ₽ + representative/tuning costs + transmission reinforcement for manual cars.</li>
</ul>

<p>💡 Important note on spark plugs: standard plugs are acceptable at all tuning stages. However, Japanese tuning ateliers strongly recommend switching to sport plugs with heat range 8 for serious modifications (especially for track use).</p>

<p><strong>Firmware library: automatic transmission (AT)</strong></p>
<table>
<tr><td><p>Stage</p></td><td><p>Manufacturer / name</p></td><td><p>Specifications and requirements</p></td><td><p>Indicative price</p></td></tr>
<tr><td><p>Stage 1.5</p></td><td><p>GunRace (for AI-95, REST)</p></td><td><p>Boost 1.1–1.2 bar, 0.9 bar at the top end. Calculated 160–165 hp. 180 km/h limiter removed. Euro-2 version. The safest file, tested with logging.</p></td><td><p>5,000 RUB</p></td></tr>
<tr><td><p>Stage 2</p></td><td><p>Alientech (Normal plug Ver)</p></td><td><p>For stock plugs and stock car. +25 hp, boost 1.2–1.25 (peak 1.3). Euro-2 version available.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2</p></td><td><p>RRP (Super ROM ECU)</p></td><td><p>Read from a Japanese car. +20 hp, boost 1.1–1.2.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2</p></td><td><p>SWK (Suzuki Works Kurume)</p></td><td><p>Read from a Japanese car. +25 hp, boost 1.2–1.25. Available for facelift and pre-facelift.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2</p></td><td><p>Monster Sport (REST)</p></td><td><p>Read from a Japanese car. +30 hp, boost 1.25–1.3 (peak 1.35). Requires NGK Racing R2556G-8 plugs, muffler replacement, PFX400 intake. Available for facelift/pre-facelift, Euro-2.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2.5</p></td><td><p>Alientech</p></td><td><p>+35 hp, boost 1.25–1.3 (peak 1.4). Requires sport plugs and exhaust replacement after the mid-pipe. Euro-2 version.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2.5</p></td><td><p>Alientech Pop &amp; Bang</p></td><td><p>Aggressive calibration with “pops and bangs” (catless cars only). Euro-2 version.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>TD025 MiddleBoost (Alientech)</p></td><td><p>For Mitsubishi TD025 turbos (HKS, SWK, Monster, Greddy, RRP, Colt Speed). +45–50 hp, boost 1.3–1.4 (peak 1.5). For daily driving.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>TD025 HighBoost (Alientech)</p></td><td><p>For the same TD025 turbos. +50–55 hp, boost 1.4–1.5 (peak 1.55). Track calibration.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>GunRace (for GR25)</p></td><td><p>For the GR25 turbo (TD03 equivalent), downpipe, intercooler. +60–65 hp, peak boost 1.54 bar. There is a Light version for city use.</p></td><td><p>With turbo purchase</p></td></tr>
</table>

<p><strong>Firmware library: manual transmission (MT)</strong></p>
<table>
<tr><td><p>Stage</p></td><td><p>Manufacturer / name</p></td><td><p>Specifications and requirements</p></td><td><p>Indicative price (Japan)</p></td></tr>
<tr><td><p>Stage 1.5</p></td><td><p>GunRace (for AI-95)</p></td><td><p>Boost 1.2–1.3 bar, 0.9 bar at the top end (6300 rpm). Calculated 160–165 hp. Timing 15/16. 180 km/h limiter removed. Euro-2 version.</p></td><td><p>5,000 RUB</p></td></tr>
<tr><td><p>Stage 2</p></td><td><p>RRP (REST)</p></td><td><p>For a stock car. +25 hp, boost 1.2–1.25. Euro-2 version.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2</p></td><td><p>SWK (REST, SPEC2-MASTER)</p></td><td><p>For a stock car. NGK RC8 plugs recommended. +30 hp, boost 1.25–1.3.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2.5</p></td><td><p>MoriMori (Alientech)</p></td><td><p>The most aggressive calibration for the stock turbo. +40 hp, boost 1.25–1.3 (peak 1.4). Requires sport plugs and exhaust replacement. MT only. Euro-2 version.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2.5</p></td><td><p>MoriMori Pop &amp; Bang</p></td><td><p>Calibration with “pops and bangs” (catless cars only). Euro-2 version.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 2.5</p></td><td><p>Colt Speed</p></td><td><p>Read from a Japanese car. +40 hp, boost 1.25–1.3 (peak 1.6). Plugs, air filter and rear exhaust section recommended.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>TD025 (Alientech)</p></td><td><p>For TD025 turbos. +45–50 hp, boost 1.3–1.4 (peak 1.5). Requires sport plugs, exhaust replacement, sport catalyst; intercooler recommended.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>High Flow TD025 (Alientech)</p></td><td><p>For TD025 turbos. +50–55 hp, boost 1.4–1.5 (peak 1.55). High boost.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>High Flow TD03 (Alientech)</p></td><td><p>For the AT-36BB turbo and equivalents. Calculated 215–220 hp, boost 1.7 bar. Euro-2 version available without Pop &amp; Bang.</p></td><td><p>Free on request</p></td></tr>
<tr><td><p>Stage 3</p></td><td><p>GunRace (for GR25)</p></td><td><p>For the GR25 turbo, downpipe, intercooler. +60–65 hp, peak boost 1.54 bar. Track calibration + a Light version for city use.</p></td><td><p>With turbo purchase</p></td></tr>
</table>

<p>⚠️ IMPORTANT: software version compatibility</p>
<ul>
<li>Every Swift has its own base software version in the ECU.</li>
<li>You must not flash a different version</li>
<li>You must not skip saving the factory firmware</li>
<li>For any questions it is best to ask in the dedicated group</li>
</ul>

<p><strong>Critical update to the selection algorithm (relevant from 2026)</strong></p>
<p>It has been established that there are several variations of the stock ECU software (pre-facelift, facelift, with and without radar, with catalyst and Euro-2). Software from one version does not work correctly on another.</p>
<p>Now, to obtain a file, it is highly desirable to provide a readout of the stock file from your ECU to determine the software version precisely.</p>
<p>5 basic questions for firmware selection:</p>
<ol>
<li>Transmission: AT or MT?</li>
<li>Body type: facelift or pre-facelift?</li>
<li>Emissions: catalyst in place or removed (Euro-2)?</li>
<li>Configuration: are tuning parts planned (downpipe, intercooler) or 100% stock?</li>
<li>Fuel: AI-95 or AI-98/100?</li>
</ol>
<p>Currently only 3 types of chip tuning for stock turbos are relevant:</p>
<ul>
<li>St1 RON95: ~160+ hp (safe file for 95 fuel).</li>
<li>St2 RON98/100: ~170+ hp (for high-octane fuel, a downpipe is highly desirable).</li>
<li>St2+ RON100: ~180+ hp (for a fully prepared car: downpipe, intercooler, modified exhaust).</li>
</ul>
<p><em>Note: measurements were taken on a dyno in St. Petersburg (February–March 2026). The graph may differ in each specific case due to fuel quality, vehicle condition and dyno calibration.</em></p>`;

export default { toc, html };
