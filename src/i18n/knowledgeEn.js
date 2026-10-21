// Английские версии статей базы знаний
// Для краткости — переведены ключевые заголовки, таблицы и рекомендации.
// OEM-номера, давления и спецификации сохранены.

export const enSectionIds = {
  faqShort: [
    'Fuel System: What Fuel to Use?',
    'Engine Oil & Filter',
    'Filters',
    'Coolant (Antifreeze)',
    'ATF & Manual Transmission Oil',
    'Spark Plugs',
    'Brake System',
    'Windshield Wipers',
    'Wheels, Tires & Fasteners',
    'Lighting Bulbs',
    'Battery (12V)',
    'Turbo Gaskets & Hardware',
    'Engine Mounts & Brackets',
    'Clutch Kit (MT)',
    'Driveshafts, Stabilizers & Other Parts',
    'Factory Paint Codes',
  ],
  selfFlash: [
    'WHERE TO BUY',
    'WHAT YOU NEED',
    'CONNECTOR & POWER PREPARATION',
    'CONNECTION PROCEDURE',
    'GENERAL SOFTWARE WORKFLOW',
    'BEFORE FLASHING NEW FILE',
  ],
  flashGuides: [
    'Stage 1: Basic Chip Tune (up to 165 hp on AI-95)',
    'Stage 2: Mild Tune (est. 170 hp)',
    'Stage 2+: Advanced Level (180 hp on AI-100)',
    'Stage 3: Serious Tune (185–220 hp)',
    'Stage 3+ (240+ hp): Maximum Power',
    'Firmware Library: Automatic Transmission (AT)',
    'Firmware Library: Manual Transmission (MT)',
    'Critical Algorithm Update (Actual from 2026)',
  ],
  buyGuide: [
    'Body Indexes: How to Tell Facelift from Pre-facelift',
    'Trims: Base vs Safety',
    'Key Differences Between Facelift and Pre-facelift',
    'Common Issues (“Sores”) of ZC33S',
    'Radar Diagnostics (Safety trim)',
    'Pre-purchase Checklist in Russia',
    'Characteristic Sounds & K14C Engine Features',
  ],
};

export const enDiagnosticsHtml = `
<p>Monitoring engine parameters via logs is the main tool for safe K14C tuning. Without instrumental analysis of AFR, ignition retard and boost pressure, running a tuned engine risks thermal damage to pistons or turbocharger.</p>

<p><strong>1. AFR (Air-Fuel Ratio)</strong></p>
<p>The stock wideband O2 sensor on ZC33S provides high measurement accuracy.</p>
<ul>
  <li><strong>Idle & part load (Closed Loop):</strong> lambda 1.00 (AFR 14.7:1 on gasoline). For emissions and economy.</li>
  <li><strong>Stock WOT:</strong> AFR 11.8–12.2:1.</li>
  <li><strong>Tune Stage 1 / Stage 2 (GunRace):</strong> AFR 11.5–11.8:1 under high boost to cool combustion chamber with evaporated fuel.</li>
  <li><strong>Turbos GR30 / GR39 (Stage 3):</strong> AFR 11.2–11.5:1.</li>
  <li>⚠️ <em>Critical:</em> AFR leaner than 12.5:1 at boost over 1.2 bar is not allowed — risk of piston burn-through and exhaust valve overheating.</li>
</ul>

<p><strong>2. Knock (Detonation & Ignition Retard)</strong></p>
<p>Bosch MED17.9.63 ECU constantly analyzes knock sensor signal and retards ignition (Ignition Retard) per cylinder when micro-detonations occur.</p>
<ul>
  <li><strong>Normal:</strong> 0.0° (no retard) across RPM at WOT.</li>
  <li><strong>Acceptable:</strong> Brief single retards up to -1.5°…-2.0° on tip-in (Tip-in Knock).</li>
  <li>⚠️ <em>Dangerous:</em> Systematic retard beyond -3.0° at 4000–6000 rpm indicates low octane, wrong plugs or excessive advance. Stop WOT operation until fuel or calibration is changed.</li>
</ul>

<p><strong>3. Boost — Charge Pressure</strong></p>
<p>ZC33S has a MAP sensor measuring intake manifold pressure.</p>
<ul>
  <li><strong>Stock:</strong> peak 0.95–1.0 bar mid-range, drop to 0.75–0.8 bar by 6000 rpm.</li>
  <li><strong>Stage 1 (AI-95):</strong> peak 1.15–1.2 bar, 0.85–0.9 bar at 6000 rpm.</li>
  <li><strong>Stage 2 (AI-100):</strong> peak 1.25–1.3 bar, holding 1.0–1.05 bar.</li>
  <li><strong>GunRace GR30:</strong> working boost 1.4–1.55 bar.</li>
  <li><strong>GunRace GR39:</strong> working boost 1.5–1.68 bar.</li>
  <li>⚠️ <em>Note:</em> Stock TD025 cannot hold over 1.1 bar above 5500 rpm due to small hot side — raising wastegate only overheats air and raises EGT.</li>
</ul>

<p><strong>4. IAT (Intake Air Temperature)</strong></p>
<p>Measured by sensor in manifold post-intercooler (IAT post-IC).</p>
<ul>
  <li><strong>Stock intercooler:</strong> at +25°C ambient, IAT jumps to +55…+65°C by 3rd gear. At +60°C ECU retards ignition and cuts boost.</li>
  <li><strong>Upgraded intercooler (Bar & Plate 65–70 mm):</strong> Delta vs ambient only +8…+14°C even after repeated pulls.</li>
  <li><em>Conclusion:</em> Upgraded intercooler is mandatory for any tune above base Stage 1.</li>
</ul>

<p><strong>5. EGT (Exhaust Gas Temperature)</strong></p>
<p>Bosch MED17.9.63 calculates EGT model from airflow, RPM, AFR and ignition.</p>
<ul>
  <li><strong>Safe working range:</strong> up to 860°C.</li>
  <li><strong>Max short peak:</strong> 900–910°C.</li>
  <li>⚠️ <em>Danger zone:</em> Above 920°C deforms turbine wheel, burns catalyst and damages exhaust seats. Catless downpipe lowers peak EGT by ~40–60°C.</li>
</ul>
`;

export const enDiagnosticsToc = [
  'AFR (Air-Fuel Ratio)',
  'Knock (Detonation & Ignition Retard)',
  'Boost — Charge Pressure',
  'IAT (Intake Air Temperature)',
  'EGT (Exhaust Gas Temperature)',
];

export const enHardwareHtml = `
<p>Balanced hardware modification of Suzuki Swift Sport ZC33S with K14C requires understanding flow capacity and interaction of all intake and exhaust components.</p>

<p><strong>1. Intercooler</strong></p>
<p>Stock intercooler has very small volume and thin core. After one hard pull it heat-soaks, raising IAT to +60°C and higher.</p>
<ul>
  <li><strong>Solution:</strong> All-aluminum front-mount intercooler with Bar & Plate core, 65–70 mm thick.</li>
  <li><strong>Result:</strong> IAT stabilizes at +30…+38°C in summer heat, no detonation, boost holds.</li>
</ul>

<p><strong>2. Downpipe</strong></p>
<p>Stock catalyst sits right next to turbo hot side, creating high backpressure and heat trap.</p>
<ul>
  <li><strong>Options:</strong> Catless downpipe (Decat, 63–70 mm) or downpipe with 200 cpsi sport metal catalyst.</li>
  <li><strong>Result:</strong> EGT drop by 50°C, faster spool (200–300 rpm earlier), better scavenging. Requires Euro-2 tune.</li>
</ul>

<p><strong>3. Turbochargers (GunRace GR Series)</strong></p>
<p>Stock Mitsubishi TD025 is efficient up to ~175 hp, then compressor and turbine become bottleneck.</p>
<ul>
  <li><strong>GunRace GR30:</strong> Hybrid with enlarged compressor wheel, bolt-on to stock location with stock oil and cooling. Potential up to 215–220 hp.</li>
  <li><strong>GunRace GR39:</strong> Enlarged hybrid based on TD02L with larger hot and cold sides. Potential 240+ hp. Requires inlet pipe mod, larger intercooler and exhaust.</li>
</ul>

<p><strong>4. Clutch Kit</strong></p>
<p>Stock clutch on manual reliably holds up to 270–280 N·m (Stage 1 and mild Stage 2). Over 300 N·m (GR30/GR39) stock disc life drops sharply.</p>
<ul>
  <li><strong>Solution:</strong> Upgraded pressure plate and organic SST high-friction disc or metallic for track.</li>
  <li><strong>Lightweight flywheel:</strong> Reduces inertia by 2.5–3.5 kg, gives instant rev response.</li>
</ul>

<p><strong>5. Spark Plugs</strong></p>
<p>High boost requires stronger spark and better heat dissipation to avoid pre-ignition.</p>
<ul>
  <li><strong>For stock & Stage 1:</strong> Genuine NGK ILZKR7D8 (heat range 7, gap 0.8 mm) or ruthenium NGK RX LKR7ARX-P.</li>
  <li><strong>For Stage 2 and GR turbos:</strong> “Colder” sport plugs heat range 8 — <em>NGK Racing Competition R2556G-8</em> (stock No. 91975). Effectively removes excess heat from insulator.</li>
</ul>
`;

export const enHardwareToc = [
  'Intercooler',
  'Downpipe',
  'Turbochargers (GunRace GR Series)',
  'Clutch Kit',
  'Spark Plugs',
];

/* ============================================================
 * Полные английские версии статей базы знаний.
 * Структура, таблицы и артикулы повторяют русские оригиналы.
 * ============================================================ */

export const enFaqShortHtml = `<p><strong>Fuel System: What Fuel to Use?</strong></p>
<p>Fuel tank capacity — 37 L.</p>
<p>Europe, Russia and Japan use the same octane rating method (different from the US), but Russian and Japanese standards only partly match. In Japan only two grades are produced and sold:</p>
<ul>
<li>REGULAR: RON 90–92 (full equivalent of our AI-92).</li>
<li>PREMIUM: RON 98–100 (full equivalent of our AI-98).</li>
<li><em>There is no equivalent of our and European AI-95 on the Japanese market!</em></li>
</ul>
<p>Manufacturer recommendations:</p>
<ul>
<li>For naturally aspirated engines: AI-92 (AI-95 is allowed).</li>
<li>For turbocharged engines: strictly AI-98 <em>(the author uses only AI-100/101)</em>.</li>
</ul>
<p>💡 Tip: Open the fuel filler flap and point a phone with Google Translate at its inner side. If you see “Premium”, your engine is tuned for high-octane fuel. The decision on which fuel to use is yours. But if you firmly want to switch to AI-95, a custom ECU tune developed and tested specifically for that fuel is strongly recommended.</p>
<p>⚠️ Important geography note: in Russia the ZC33S is mostly a Japanese-market car. European versions or cars from Mexico/Chile (where the manual states RON95) are almost never seen. However, if you come across a “Mexican” car, keep in mind that its factory fuel maps may have their own corrections.</p>

<p><strong>Engine Oil & Filter</strong></p>
<ul>
<li>Interval: replace every 5,000 km.</li>
<li>Capacity: 3.3 L.</li>
<li>OEM: Ecstar Suzuki Motor Oil 5W-30. Part numbers: 99M00-22R02-004 (4 L can), 99M00-22R02-001 (1 L can).</li>
<li>Alternatives: any quality 5W-30 synthetic with API GF-5 / GF-6 approvals.</li>
</ul>
<p>Oil filter</p>
<ul>
<li>Interval: replace every 5,000 km.</li>
<li>OEM: 16510-82703, 16510-81420, 16510-61J00, 16510-61A31.</li>
</ul>
<table><tr><td><p>Brand</p></td><td><p>Part number</p></td><td><p>Note</p></td></tr>
<tr><td><p>Vic</p></td><td><p>932</p></td><td><p>Excellent choice, best value</p></td></tr>
<tr><td><p>Vic</p></td><td><p>933</p></td><td><p>Great replacement</p></td></tr>
<tr><td><p>Goodwill</p></td><td><p>OG516HQ</p></td><td><p>Quality equivalent</p></td></tr>
<tr><td><p>Nitto</p></td><td><p>4SF-102</p></td><td><p>Japanese production</p></td></tr>
<tr><td><p>Masuma</p></td><td><p>MFC1943</p></td><td><p>Budget and reliable</p></td></tr>
<tr><td><p>Nitto</p></td><td><p>4SF-103 18004</p></td><td><p>Direct equivalent of Vic-933</p></td></tr>
<tr><td><p>RB-exide</p></td><td><p>C-933</p></td><td><p>Korean equivalent of Vic-933</p></td></tr>
</table>

<p><strong>Filters</strong></p>
<p>Air filter</p>
<ul>
<li>Interval: inspect and clean every 7,500 km, replace every 15,000 km (can be more often).</li>
<li>OEM: 13780-67R00 (Denso).</li>
</ul>
<p>Standard equivalents</p>
<table><tr><td><p>Brand</p></td><td><p>Part number</p></td></tr>
<tr><td><p>Bronco Filter</p></td><td><p>BRA-0760</p></td></tr>
<tr><td><p>Denckermann</p></td><td><p>A146996</p></td></tr>
<tr><td><p>Alco Filters</p></td><td><p>MD-3046</p></td></tr>
<tr><td><p>Jakoparts</p></td><td><p>J1328056</p></td></tr>
<tr><td><p>FQ</p></td><td><p>A-0900F</p></td></tr>
<tr><td><p>Herth+Buss</p></td><td><p>J1328056</p></td></tr>
<tr><td><p>JS Asakashi</p></td><td><p>A2917</p></td></tr>
</table>
<p>Tuning options (high-flow)</p>
<ul>
<li>K&amp;N: 33-3130</li>
<li>BMC: FB01088</li>
<li>Blitz: 59636A</li>
<li>Greddy: SZ-10 12592510</li>
<li>Simota: OS-014</li>
</ul>
<p>🛠 Note on tuning filters: some high-flow filters need special oil. Use Mannol 9964, Motul MC Care A2, LIQUI MOLY racing luftfilter oil 3950 or direct equivalents.</p>
<p>Cabin filter</p>
<ul>
<li>Interval: replace every 10,000 km (more often in dusty regions).</li>
<li>OEM: 95861-81P00.</li>
</ul>
<table><tr><td><p>Brand</p></td><td><p>Part number</p></td></tr>
<tr><td><p>Vic</p></td><td><p>AC-937</p></td></tr>
<tr><td><p>Masuma</p></td><td><p>MC1060</p></td></tr>
<tr><td><p>Mann</p></td><td><p>FP2040</p></td></tr>
<tr><td><p>BRC</p></td><td><p>0710</p></td></tr>
</table>

<p><strong>Coolant (Antifreeze)</strong></p>
<ul>
<li>Interval: replace every 30,000 km <em>(per the dealer service schedule, although the manual may state a longer interval)</em>.</li>
<li>Capacity: 5.4 L (MT), 5.6 L (AT).</li>
<li>OEM: Suzuki LLC Super (Blue) Coolant. Part number: 990F0-ECSC2-005 (5 L can).</li>
<li>Alternatives: any quality Japanese blue coolant. Proven options: Joyfull Super Long Life Coolant SLLC Blue, TCL Power Coolant Blue SLLC, Carcool 50% RA-144 Super Coolant Super LLC Blue.</li>
</ul>

<p><strong>ATF & Manual Transmission Oil</strong></p>
<p>ATF</p>
<ul>
<li>Interval: replace every 30,000 km or 24 months.</li>
<li>Capacity: 6.2 L.</li>
<li>OEM: Suzuki AT Oil AW-1. Part number: 99000-22B28-017.</li>
</ul>
<table><tr><td><p>Brand</p></td><td><p>Part number / specification</p></td></tr>
<tr><td><p>Toyota</p></td><td><p>ATF WS</p></td></tr>
<tr><td><p>United Oil</p></td><td><p>ATF MW66</p></td></tr>
<tr><td><p>United Oil</p></td><td><p>ATF WS</p></td></tr>
<tr><td><p>Opel / GM</p></td><td><p>AW-1</p></td></tr>
<tr><td><p>Aisin Warner</p></td><td><p>AW-1</p></td></tr>
<tr><td><p>Ravenol</p></td><td><p>ATF T-WS Lifetime</p></td></tr>
<tr><td><p>Liqui Moly</p></td><td><p>Top Tec ATF 1800</p></td></tr>
<tr><td><p>ZIC</p></td><td><p>ATF MULTI LF</p></td></tr>
<tr><td><p>Mannol</p></td><td><p>ATF-WS 8217</p></td></tr>
<tr><td><p>Idemitsu</p></td><td><p>ATF TYPE-TLS-LV</p></td></tr>
<tr><td><p>Petronas Tutela</p></td><td><p>GI/VI TUTELA (art. 1461-1619)</p></td></tr>
</table>
<p>Manual transmission oil</p>
<ul>
<li>Interval: replace every 30,000 km or 24 months.</li>
<li>Capacity: 1.65 L <em>(some manuals state 1.45 L)</em>.</li>
<li>OEM: Suzuki Gear Oil 75W GL-4. Part number: 99000-22B27-036.</li>
</ul>
<p>Standard equivalents</p>
<table><tr><td><p>Brand</p></td><td><p>Part number / specification</p></td></tr>
<tr><td><p>Ravenol</p></td><td><p>MTF-3</p></td></tr>
<tr><td><p>Motul</p></td><td><p>Gear Power FE 75W</p></td></tr>
<tr><td><p>Motul</p></td><td><p>Gear 300LS 75W90</p></td></tr>
<tr><td><p>SWAG</p></td><td><p>10921829</p></td></tr>
<tr><td><p>Febi</p></td><td><p>21829</p></td></tr>
<tr><td><p>Toyota</p></td><td><p>Gear Oil Lv Gl-4 75W Mt</p></td></tr>
<tr><td><p>Fuchs</p></td><td><p>TITAN SINTOFLUID FE 75W (600631680)</p></td></tr>
<tr><td><p>Ford</p></td><td><p>1547953</p></td></tr>
<tr><td><p>VAG</p></td><td><p>G052527A2</p></td></tr>
</table>
<p>⚠️ IMPORTANT! If a limited-slip differential (LSD) is installed, you need a high-quality oil specifically for LSD.</p>
<ul>
<li>For the Cusco 1.5-way LSD (LSD-620-C15) the author uses Motul Gear 300 LS 75W90.</li>
<li>For the KAAZ Super Q LSD 1.5-WAY (DBS1620-WPC), the factory fill was Japanese KAAZ Power Train Gear Oil (GL-5/80W-90) 2L for Limited Slip Differential and Manual Transmission.</li>
<li>LSD alternatives: CUSCO LSD Oil GL-5 80W-90, RAVENOL LS 75W-90.</li>
</ul>

<p><strong>Spark Plugs</strong></p>
<ul>
<li>Interval: replace every 30,000 km or 24 months.</li>
<li>OEM: Suzuki 09482-00642 (NGK ILZKR7D8 no 96412).</li>
<li>NGK ILZKR7D8 specs: gap 0.8 mm, heat range 7, thread diameter 12 mm, thread length 26.5 mm, thread pitch 1.25 mm, hex size 16 mm.</li>
</ul>
<p>Equivalents and tuning</p>
<ul>
<li>Ruthenium (excellent equivalent): NGK RX LKR7ARX-P no 90020 <em>(the author notes these were the plugs fitted to both of his cars imported from Japan)</em>.</li>
<li>Tuning: NGK Racing Competition R2556G-8 stock no 91975.</li>
</ul>
<p>🔗 <a href="https://www.ngk-sparkplugs.jp/ngk/sparkplugs/search/vehicle_type/result?type=1&amp;maker=%E3%82%B9%E3%82%BA%E3%82%AD&amp;tab_car=3&amp;car=%E3%82%B9%E3%82%A4%E3%83%95%E3%83%88&amp;cc=1400">Open the NGK spark plug selector</a> <em>(link goes to the manufacturer's official site)</em>.</p>

<p><strong>Brake System</strong></p>
<p>Brake pads</p>
<p>Genuine numbers (OEM):</p>
<ul>
<li>Front: 55810-52R00, 55810-52R50, 55810-68R10</li>
<li>Rear: 55800-52R00, 55800-61M10, 55800-68R00</li>
</ul>
<table><tr><td><p>Axle</p></td><td><p>Brand</p></td><td><p>Part number</p></td><td><p>Note</p></td></tr>
<tr><td><p>Front</p></td><td><p>Akebono</p></td><td><p>AN-754WK</p></td><td><p>Excellent Japanese equivalent</p></td></tr>
<tr><td><p>Front</p></td><td><p>Kashiyama</p></td><td><p>D0051M</p></td><td><p>Budget and reliable</p></td></tr>
<tr><td><p>Front</p></td><td><p>Nisshinbo</p></td><td><p>NP5030</p></td><td><p>Premium Japanese brand</p></td></tr>
<tr><td><p>Front</p></td><td><p>Brembo</p></td><td><p>P 16 013 Prime</p></td><td><p>Standard replacement</p></td></tr>
<tr><td><p>Front</p></td><td><p>Brembo</p></td><td><p>P 16 013X Xtra</p></td><td><p>Upgraded (Xtra)</p></td></tr>
<tr><td><p>Front</p></td><td><p>Brembo</p></td><td><p>07.D435.67</p></td><td><p>Sport (SPORT / HP2)</p></td></tr>
<tr><td><p>Front</p></td><td><p>MILES</p></td><td><p>Ceramic Pro E500403</p></td><td><p>Ceramic compound</p></td></tr>
<tr><td><p>Rear</p></td><td><p>Advics</p></td><td><p>SN248P</p></td><td><p>Original Japanese supplier</p></td></tr>
<tr><td><p>Rear</p></td><td><p>Kashiyama</p></td><td><p>D9066M</p></td><td></td></tr>
<tr><td><p>Rear</p></td><td><p>G-Brake</p></td><td><p>GP09066</p></td><td></td></tr>
<tr><td><p>Rear</p></td><td><p>Akebono</p></td><td><p>AN773WK</p></td><td></td></tr>
<tr><td><p>Rear</p></td><td><p>Nisshinbo</p></td><td><p>NP9016</p></td><td></td></tr>
<tr><td><p>Rear</p></td><td><p>Brembo</p></td><td><p>P 79 029 Prime</p></td><td></td></tr>
<tr><td><p>Rear</p></td><td><p>MILES</p></td><td><p>Ceramic Pro E510560</p></td><td><p>Ceramic compound</p></td></tr>
</table>
<p>🔗 <a href="https://www.drive2.ru/l/683313492387702709/">Open the detailed brake pad equivalents list</a></p>
<p>Brake discs</p>
<p>Genuine numbers (OEM) and dimensions:</p>
<ul>
<li>Front: 55311-68R00 (diameter 285 mm, thickness 24 mm)</li>
<li>Rear: 55611-68R00 (diameter 252 mm, thickness 9 mm)</li>
</ul>
<table><tr><td><p>Axle</p></td><td><p>Brand</p></td><td><p>Part number</p></td></tr>
<tr><td><p>Front</p></td><td><p>Brembo</p></td><td><p>09.E533.11</p></td></tr>
<tr><td><p>Front</p></td><td><p>A.B.S.</p></td><td><p>18813</p></td></tr>
<tr><td><p>Front</p></td><td><p>MINTEX</p></td><td><p>MDC3041C</p></td></tr>
<tr><td><p>Front</p></td><td><p>FERODO</p></td><td><p>DDF2855C</p></td></tr>
<tr><td><p>Front</p></td><td><p>TRW</p></td><td><p>DF6576</p></td></tr>
<tr><td><p>Rear</p></td><td><p>Brembo</p></td><td><p>08.E534.11</p></td></tr>
<tr><td><p>Rear</p></td><td><p>A.B.S.</p></td><td><p>18810</p></td></tr>
<tr><td><p>Rear</p></td><td><p>MINTEX</p></td><td><p>MDC2882C</p></td></tr>
<tr><td><p>Rear</p></td><td><p>FERODO</p></td><td><p>DDF2856C</p></td></tr>
</table>

<p><strong>Windshield Wipers</strong></p>
<p>Genuine numbers (OEM) and sizes:</p>
<table><tr><td><p>Position</p></td><td><p>Genuine number (OEM)</p></td><td><p>Size</p></td></tr>
<tr><td><p>Front right (driver)</p></td><td><p>38340-52R00</p></td><td><p>500 mm</p></td></tr>
<tr><td><p>Front left (passenger)</p></td><td><p>38340-52R60</p></td><td><p>475 mm</p></td></tr>
<tr><td><p>Rear</p></td><td><p>38340-52R40</p></td><td><p>250 mm</p></td></tr>
</table>
<p>Winter blades (OEM): 3835052R00, 3835072M10, 3835074P00.</p>
<p>Proven equivalents:</p>
<ul>
<li>Denso: DUR-050R, DUR-048R</li>
<li>Masuma: MU-020, MU-019</li>
<li><em>Conventional and flat-blade wipers of other brands also fit well when selected strictly by the sizes above.</em></li>
</ul>

<p><strong>Wheels, Tires & Fasteners</strong></p>
<p>Factory wheel and fastener specs</p>
<ul>
<li>Factory wheel (stock): R17 x 6.5J, offset ET50, bolt pattern 5x114.3, centre bore 60.1.</li>
<li>Wheel nuts: M12 x P1.25.</li>
<li>Factory tires: Continental ContiSportContact 5, size 195/45 R17.</li>
</ul>
<p>Tire and non-standard wheel options</p>
<table><tr><td><p>Size</p></td><td><p>Note and nuances</p></td></tr>
<tr><td><p>195/45 R17</p></td><td><p>Factory size. Ideal handling.</p></td></tr>
<tr><td><p>205/45 R17</p></td><td><p>Fits stock wheels perfectly. Optimal balance.</p></td></tr>
<tr><td><p>205/40 R17</p></td><td><p>Fits stock wheels perfectly. Lower profile.</p></td></tr>
<tr><td><p>195/50 R16</p></td><td><p>Factory size for Mexican versions. Great winter option.</p></td></tr>
<tr><td><p>215/45 R17</p></td><td><p>Can be fitted. The author runs them on 7J ET42 wheels (flush with the body).</p></td></tr>
<tr><td><p>215/40 R17</p></td><td><p>Can be fitted.</p></td></tr>
<tr><td><p>205/50 R17</p></td><td><p>There are negative summer reviews: the car “floats” above 150 km/h and handling worsens. For a winter set, however, it is a great and comfortable option.</p></td></tr>
<tr><td><p>225/45 R17</p></td><td><p>Fitted on 7.5J wide wheels.</p></td></tr>
<tr><td><p>R18</p></td><td><p>R18 wheels fit well, but to keep a normal look and comfort the tire profile should be no more than 40, ideally 35.</p></td></tr>
</table>
<p>⚠️ Important when choosing wheels: as wheel width increases, offset (ET) must decrease so the wheel does not touch the strut and looks right in the arch. Also note that the 125/70 R17 space saver fits the well, but the boot floor rises noticeably. Mexican versions use a 135/70 R15 spare.</p>

<p><strong>Lighting Bulbs</strong></p>
<table><tr><td><p>Unit / element</p></td><td><p>Bulb type</p></td></tr>
<tr><td><p>Front fog lamp</p></td><td><p>H11 <em>(if fitted)</em></p></td></tr>
<tr><td><p>Front turn signal</p></td><td><p>PY21W</p></td></tr>
<tr><td><p>Rear turn signal</p></td><td><p>WY21W</p></td></tr>
<tr><td><p>Reverse lamp</p></td><td><p>W16W</p></td></tr>
<tr><td><p>License plate light</p></td><td><p>W5W</p></td></tr>
<tr><td><p>Rear fog lamp</p></td><td><p>P21W <em>(if fitted)</em></p></td></tr>
</table>

<p><strong>Battery (12V)</strong></p>
<ul>
<li>Factory allowance (JIS): 46B24L (20HR, 45 Ah, cold cranking current CCA 295 A).</li>
</ul>
<p>💡 Tip: if you want higher cranking current and capacity, you can safely look at the next size. The author successfully installed a Rocket 75B24L — it fitted the stock location without modification. <em>Interesting fact:</em> many cars imported from the Japanese secondary market already come with a stronger 65B24L rather than the base 46B24L.</p>

<p><strong>Turbo Gaskets & Hardware</strong></p>
<p>If you plan to remove, service or replace the turbocharger, it is strongly recommended to replace all seals and gaskets with new ones to avoid air leaks and oil leaks.</p>
<p>Genuine gaskets and hardware (OEM)</p>
<table><tr><td><p>No.</p></td><td><p>Name (genuine)</p></td><td><p>Part number (OEM)</p></td><td><p>Qty</p></td></tr>
<tr><td><p>1</p></td><td><p>Gasket, turbocharger</p></td><td><p>14181-86P00</p></td><td><p>1 pc</p></td></tr>
<tr><td><p>2</p></td><td><p>Gasket, TC turbo outlet</p></td><td><p>14182-86P00</p></td><td><p>1 pc</p></td></tr>
<tr><td><p>3</p></td><td><p>Gasket, intake air pipe</p></td><td><p>13955-75F50</p></td><td><p>2 pcs</p></td></tr>
<tr><td><p>4</p></td><td><p>Washer 10x15x1.5</p></td><td><p>09161-10009</p></td><td><p>4 pcs</p></td></tr>
<tr><td><p>5</p></td><td><p>Gasket, oil drain</p></td><td><p>13945-86P00</p></td><td><p>1 pc</p></td></tr>
<tr><td><p>6</p></td><td><p>Bolt, exhaust M8x25</p></td><td><p>14118-70G50</p></td><td><p>2 pcs</p></td></tr>
<tr><td><p>7</p></td><td><p>Nut, exhaust M8</p></td><td><p>09159-08130</p></td><td><p>2 pcs</p></td></tr>
<tr><td><p>8</p></td><td><p>Stud</p></td><td><p>09108-08297</p></td><td><p>2 pcs</p></td></tr>
<tr><td><p>9</p></td><td><p>Gasket 12x17x1</p></td><td><p>09168-12017</p></td><td><p>4 pcs</p></td></tr>
</table>
<p>Proven gasket equivalents</p>
<table><tr><td><p>Genuine number (OEM)</p></td><td><p>Brand</p></td><td><p>Part number / name</p></td></tr>
<tr><td><p>14181-86P00</p></td><td><p>Victor Reinz</p></td><td><p>71-17708-00 (exhaust manifold gasket)</p></td></tr>
<tr><td><p>14182-86P00</p></td><td><p>FA1</p></td><td><p>760-914 (exhaust pipe gasket)</p></td></tr>
<tr><td><p>13945-86P00</p></td><td><p>FA1</p></td><td><p>433-520 (oil drain gasket)</p></td></tr>
</table>

<p><strong>Engine Mounts & Brackets</strong></p>
<p>The ZC33S powertrain rests on three points. When replacing or tuning, it is important to consider compatibility nuances between MT and AT versions.</p>
<p>Genuine numbers (OEM):</p>
<ul>
<li>Right engine mount: 11610-67R01 (MT) / 11610-67R00 (AT). <em>Both versions are interchangeable and fit both transmissions.</em> Number 11610-67RV0 is also found.</li>
<li>Left engine mount bracket: 11620-67R01 (or 11620-67R03) for MT / 11620-67R11 for AT.</li>
<li>Rear engine bracket (lower middle): 11910-67R00 (MT) / 11910-67R10 (AT).</li>
</ul>
<p>💡 Tip (interchangeability nuances):</p>
<ul>
<li>Left bracket: the MT version fits the AT perfectly, but the mounting arm must be re-clocked.</li>
<li>Rear bracket: the MT part is thicker and more massive. In practice it has been successfully fitted to AT versions without critical issues.</li>
</ul>
<p>Right engine mount equivalents</p>
<p>If you are looking for a replacement, you can consider parts from the base naturally aspirated Swift 1.2L (not Sport). They fit, but require certain modifications during installation.</p>
<table><tr><td><p>Region / market</p></td><td><p>Genuine numbers (OEM) from 1.2L</p></td></tr>
<tr><td><p>India</p></td><td><p>11610-M55RB0 or 11610-M55R00</p></td></tr>
<tr><td><p>Japan</p></td><td><p>11610-52R50 or 11610-52R51</p></td></tr>
<tr><td><p>UAE</p></td><td><p>11610-52R00 or 11610-52R01</p></td></tr>
</table>
<p>Upgraded mount kits</p>
<p>For track or spirited driving, standard rubber mounts are better replaced with polyurethane or reinforced ones.</p>
<table><tr><td><p>Brand</p></td><td><p>Part number</p></td><td><p>Kit contents</p></td></tr>
<tr><td><p>Cusco</p></td><td><p>60J 911 SET</p></td><td><p>Kit of 2 pcs (right and left)</p></td></tr>
<tr><td><p>Cusco</p></td><td><p>60J-911-PS</p></td><td><p>Lower mount (separately)</p></td></tr>
<tr><td><p>TM-SQUARE</p></td><td><p>TMEM-AF3521</p></td><td><p>Kit of 3 pcs (right, left, lower)</p></td></tr>
<tr><td><p>TM-SQUARE</p></td><td><p>TMEM-AF3523</p></td><td><p>Lower mount only</p></td></tr>
</table>

<p><strong>Clutch Kit (MT)</strong></p>
<p>The manual transmission requires periodic clutch service. Genuine parts can be replaced with quality equivalents, including parts from Suzuki Vitara or top manufacturers.</p>
<p>Genuine numbers (OEM) and main components:</p>
<ul>
<li>Release bearing: 23820-79J00 (full number 23820-79J00-000).</li>
<li>Clutch cover (pressure plate): 22100-68R00. <em>Direct Suzuki Vitara equivalent — 22100-68M00.</em></li>
<li>Clutch disc: 22400-68R00. <em>Direct Suzuki Vitara equivalent — 22400-68M00.</em></li>
<li>Flywheel: 12620-68M00.</li>
<li>Clutch kit (disc + cover): SACHS 3000 950 859 or Exedy SZS2100 kit.</li>
</ul>
<p>Release bearing equivalents</p>
<table><tr><td><p>Brand</p></td><td><p>Part number</p></td></tr>
<tr><td><p>FTE</p></td><td><p>ZA3102831 (or 1100431)</p></td></tr>
<tr><td><p>Exedy</p></td><td><p>CSC406</p></td></tr>
<tr><td><p>LYNXauto</p></td><td><p>CL-8220</p></td></tr>
<tr><td><p>Haft</p></td><td><p>KG0116</p></td></tr>
<tr><td><p>LUK</p></td><td><p>510 0170 10</p></td></tr>
<tr><td><p>Miles</p></td><td><p>GE16096</p></td></tr>
<tr><td><p>Trialli</p></td><td><p>CT 2403</p></td></tr>
</table>

<p><strong>Driveshafts, Stabilizers & Other Parts</strong></p>
<p>When repairing running gear or transmission, driveshafts must be selected strictly for your transmission type.</p>
<p>Driveshafts (complete CV shafts)</p>
<table><tr><td><p>Axle / transmission</p></td><td><p>Genuine number (OEM)</p></td></tr>
<tr><td><p>Right shaft (AT)</p></td><td><p>44101-68R10</p></td></tr>
<tr><td><p>Left shaft (AT)</p></td><td><p>44118-68R30</p></td></tr>
<tr><td><p>Right shaft (MT)</p></td><td><p>44101-68R00</p></td></tr>
<tr><td><p>Left shaft (MT)</p></td><td><p>44118-68R20</p></td></tr>
</table>
<p>Consumables and suspension parts</p>
<ul>
<li>Stabilizer bushes: part number 42431-68R10. <em>Important: these bushes were fitted exclusively to SPORT versions with the K14C turbo engine.</em></li>
<li>Fuel filter mesh (in tank): MPU034 (manufacturer Masuma).</li>
<li>Fuel filter (inline / assembly): AD9854C.</li>
</ul>
<p>Bearings for LSD installation</p>
<p>If you plan to install a limited-slip differential, specific bearings are required. Below are possible replacements of genuine parts with standard rolling bearings:</p>
<table><tr><td><p>Genuine number (OEM)</p></td><td><p>Possible replacements (bearings)</p></td></tr>
<tr><td><p>27524-79JA0</p></td><td><p>32009J, NSK HR32009XJ</p></td></tr>
<tr><td><p>27521-79JA0</p></td><td><p>320010J, 3088, NTN 32010X</p></td></tr>
</table>

<p><strong>Factory Paint Codes</strong></p>
<p>If you need local or full body repair, use these codes for precise paint matching. The FE letters in the list denote a colour modification (often related to coating, clear coat or a market-specific shade).</p>
<table><tr><td><p>Body colour</p></td><td><p>Base paint code</p></td><td><p>FE version code (if applicable)</p></td></tr>
<tr><td><p>White</p></td><td><p>ZVR</p></td><td><p>CA1</p></td></tr>
<tr><td><p>Grey</p></td><td><p>ZNC</p></td><td><p>CA3</p></td></tr>
<tr><td><p>Blue</p></td><td><p>ZWG</p></td><td><p>E6L</p></td></tr>
<tr><td><p>Blue (black roof)</p></td><td><p>C7R</p></td><td><p>—</p></td></tr>
<tr><td><p>Red</p></td><td><p>ZWP</p></td><td><p>D7Z</p></td></tr>
<tr><td><p>Red (black roof)</p></td><td><p>D7Z</p></td><td><p>—</p></td></tr>
<tr><td><p>Yellow</p></td><td><p>ZFT</p></td><td><p>ZFT</p></td></tr>
<tr><td><p>Black</p></td><td><p>ZMV</p></td><td><p>—</p></td></tr>
<tr><td><p>Orange</p></td><td><p>CFK</p></td><td><p>—</p></td></tr>
</table>
<p>🎨 Tip: when ordering paint from a dealer or a colour lab, always specify not only the colour but also the model year. The ZC33S paint has its own blending nuances, and an experienced painter can match the tone perfectly using the factory code plus spectral analysis.</p>

<p><strong>Useful links</strong><br />
<a href="https://www.drive2.ru/l/672516563080839355/">ONE about Japanese TD025 units.</a><br />
<a href="https://www.drive2.ru/l/677419835184910663/">TWO about GR25.</a><br />
<a href="https://www.drive2.ru/l/677499274900017240/">THREE about GR35.</a><br />
<a href="https://www.drive2.ru/l/681383574603041307/">220 confirmed horses on the AT36BB turbo.</a><br />
<a href="https://www.drive2.ru/l/683591668829521466/">Confirmed 237 hp, GR35 turbo.</a><br />
<a href="https://www.drive2.ru/l/695470792456012104/">Power moves. GR25 turbo at 210–220 hp.</a><br />
About intercoolers:<br />
<a href="https://www.drive2.ru/l/667030824691959203/">Adapting an AJS 9.6L cooler for a radar-equipped car.</a><br />
<a href="https://www.drive2.ru/l/695543635101353777/">Adapting an AJS 9.6L cooler for a NON-radar car.</a><br />
<a href="https://www.drive2.ru/l/701705848019224101/">Alternative solution. Intercooler for a “radar” car without welding.</a> (AJS 9.6L for radar, by DiKiy-DeN)<br />
<a href="https://www.drive2.ru/l/688790434683564732/">Custom ZC33S intercooler for radar cars</a> (AJS 9.6L for radar, by dru847)<br />
<a href="https://www.drive2.ru/l/688790434683564732/">Larger intercooler</a> (AJS 9.6L for radar, by Latanovskiy)<br />
<a href="https://www.drive2.ru/l/712379357145869113/">Intercooler installed</a> (AJS 9.6L for radar, by Turanovvv)<br />
<a href="https://www.drive2.ru/l/710559115646082941/">Fitting a HKS intercooler.</a> (HKS 10.5L for radar, by Michael760)<br />
<a href="https://www.drive2.ru/l/695292396694422430/">Bolt On — HKS vs angle grinder (prod by Group B)</a> (HKS 10.5L for NON-radar, by SkinnyTony)<br />
<a href="https://www.drive2.ru/l/703298215734152557/">Intercooler piping</a> by our power guy<br />
<a href="https://www.drive2.ru/l/702689086292372909/">Monster Sport hoses</a> by Latanovskiy<br />
<a href="https://www.drive2.ru/l/713040163634154139/">While it is still warm, or a post about the intercooler</a> by Amigoz125<br />
About exhaust:<br />
<a href="https://www.drive2.ru/l/640057605439363174/">Vacuum exhaust valve with remote opening/closing.</a><br />
<a href="https://www.drive2.ru/l/655446370181713444/">We welded a downpipe.</a><br />
<a href="https://www.drive2.ru/l/681612547899524241/">A variant of stock exhaust modification.</a><br />
<a href="https://www.drive2.ru/l/727151845620848646/">Straight-through exhaust based on the original muffler.</a> by TEMAGOVOR<br />
<a href="https://www.drive2.ru/l/696430391229160430/">Stock downpipe without a cat.</a><br />
<a href="https://www.drive2.ru/l/699045854513748623/">What NOT to do with the exhaust. Modernising the stock exhaust.</a><br />
<a href="https://www.drive2.ru/l/722057533371455329/">"EXHAUST MUFFLER" Lesson 1</a> by GlitchIllusion<br />
<a href="https://www.drive2.ru/l/722097115790071808/">"EXHAUST MUFFLER" Lesson 2</a> by GlitchIllusion<br />
<a href="https://www.drive2.ru/l/722242526202833044/">"EXHAUST MUFFLER" Lesson 3</a> by GlitchIllusion<br />
<a href="https://www.drive2.ru/l/722509157772567963/">"EXHAUST MUFFLER" Lesson 4</a> by GlitchIllusion<br />
<a href="https://www.drive2.ru/l/713551161663178834/">Exhale (about Rustam's downpipe and a stock muffler V.3)</a> by Matik-Sochi<br />
<a href="https://www.drive2.ru/l/723177660842249283/">Exhaust. Feet first into the deep end.</a> by VRNKHV<br />
About intake:<br />
<a href="https://www.drive2.ru/l/628989646516263265/">K&amp;N filter in the stock airbox.</a><br />
<a href="https://www.drive2.ru/l/632781587242560724/">Simota cone filter (Trust Greddy equivalent).</a><br />
<a href="https://www.drive2.ru/l/655017560646878120/">Black, white, red (washing a K&amp;N filter).</a><br />
<a href="https://www.drive2.ru/l/695233847700226803/">Cone filter with a 3D-printed intake pipe.</a><br />
<a href="https://www.drive2.ru/l/697548044798792445/">Cold, but hot, people's intake.</a><br />
<a href="https://www.drive2.ru/l/706198727408229283/">Colt Speed intake KRSK edition</a> by Kiruha051<br />
<a href="https://www.drive2.ru/l/717694121476639775/">100% cold intake</a> by ON-Toxa<br />
<a href="https://www.drive2.ru/l/705132476007192729/">3D-printed cold intake</a> by realnameisjohn<br />
About clutch:<br />
<a href="https://www.drive2.ru/l/650029901025381857/">Exedy clutch kit.</a><br />
<a href="https://www.drive2.ru/l/674645492470121179/">Upgraded clutch for Stage 2.5 MoriMori from Alientech.</a><br />
<a href="https://www.drive2.ru/l/676314551121087391/">ORC Light Clutch.</a><br />
<a href="https://www.drive2.ru/l/701013155693729597/">Upgraded stock clutch from Remontscepleniya.rf</a><br />
About brakes:<br />
<a href="https://www.drive2.ru/l/686927312230291416/">RRP 4pot brakes</a><br />
<a href="https://www.drive2.ru/l/717654264180129118/">Brakes from a CR-V</a> by DiKiy-DeN<br />
<a href="https://www.drive2.ru/l/722988544842279212/">Big brakes on a Suzuki Swift Sport ZC33S</a> by YourMommy<br />
<a href="https://www.drive2.ru/l/712548132180737419/">In detail about racing brake pads</a> by YourMommy<br />
<a href="https://www.drive2.ru/l/709973900582213002/">Big brake kit from a Toyota Celsior</a> by YourMommy<br />
<a href="https://www.drive2.ru/l/708169876878919721/">Brembo brakes from a Subaru GH</a> by Michael760<br />
About LSDs:<br />
<a href="https://www.drive2.ru/l/698705280787022468/">LSD, or how to do it on an AT</a> by ON-Toxa<br />
<a href="https://www.drive2.ru/l/715042649186260617/">LSD in the automatic</a> by Matik-Sochi<br />
<a href="https://www.drive2.ru/l/702169292170337154/">AT LSD on board</a> by ON-Toxa<br />
<a href="https://www.drive2.ru/l/688636777933581834/">LSD in the manual</a> by YourMommy<br />
<a href="https://www.drive2.ru/l/700284454362422933/">Fitting an RRP LSD + replacement bearing numbers for the mechanical diff</a> by YourMommy<br />
MISC useful and interesting:<br />
<a href="https://www.drive2.ru/s/a/CeZfQEAABxI">A collection of various wheels</a><br />
<a href="https://www.drive2.ru/l/690537283782191280/">WK MOTORSPORT SHORT SHIFTER FOR SWIFT SPORT (ZC33S, ZC32S)</a><br />
<a href="https://www.drive2.ru/l/640861073561381794/">RRP Racing Quick Shift for ZC33S</a><br />
<a href="https://www.drive2.ru/l/720579239987925445/">Increasing steering wheel reach</a><br />
<a href="https://www.drive2.ru/l/720824705958809161/">Steering wheel spacers</a><br />
<a href="https://www.drive2.ru/l/708930189169527961/">Russification of the Suzuki Swift Sport ZC33S instrument cluster</a><br />
<a href="https://www.drive2.ru/l/629353584865056317/">Disabling mirror folding</a><br />
<a href="https://www.drive2.ru/l/723699653987537098/">Installing passenger seat heating on a Suzuki Swift Sport ZC33</a><br />
<a href="https://www.drive2.ru/l/717223255622029172/">Adding some warmth — passenger seat heating</a><br />
<a href="https://www.drive2.ru/l/673471763807493986/">Everyone ran and I ran too: a tale of buying a Teyes CC3 2K.</a><br />
<a href="https://www.drive2.ru/l/678015770487185365/">TEYES CC3 2K installation, 360 surround view, Raise CAN bus</a><br />
<a href="https://www.drive2.ru/l/655584908646813189/">About the OBDII adapter I am 100% happy with</a><br />
<a href="https://www.drive2.ru/l/668335395238337103/">V-Sky braces: lower front and rear, upper rear.</a><br />
<a href="https://www.drive2.ru/l/704351547873562948/">Braces from Vova V-Sky</a><br />
<a href="https://www.drive2.ru/l/702678915809815384/">Braces-braces from V-Sky Made in Khabarovsk</a><br />
<a href="https://www.drive2.ru/l/701427946455316794/">The V-Sky brace collection. Part one.</a> by VRNKHV<br />
<a href="https://www.drive2.ru/l/713142693093442682/">The V-Sky brace collection. Part 2, not final</a> by VRNKHV<br />
<a href="https://www.drive2.ru/l/702702830187724923/">Raising the accelerator pedal</a><br />
<a href="https://www.drive2.ru/l/682323657044788175/">A selection of interesting and useful ZC33S videos</a><br />
<a href="https://www.drive2.ru/l/693422677171381356/">3D models for 3D printing various useful things for the Suzuki Swift Sport ZC33S</a></p>`;

export const enFaqSelfHtml = `<p><strong>WHERE TO BUY</strong></p>
<p>Search for “SM2 Pro J2534” or “Scanmatik 2 Pro”:</p>
<ul>
<li>Ozon: <a href="https://www.ozon.ru/product/sm-2-pro-j2534-pcmflash-sm2-pro-smennye-aksessuary-podhodyat-dlya-vci-scanmatik-ecu-programmer-tool-2049224731/?at=BrtzrYBg1unDvY90iYEz18zHzMJ23ESz022w6SkgpwZW">SM2 Pro on Ozon</a></li>
<li>AliExpress: <a href="https://aliexpress.ru/item/1005009281603193.html?sku_id=12000048597875717&amp;spm=a2g2w.productlist.search_results.0.21895ff9UJLGIL">SM2 Pro on AliExpress</a></li>
</ul>

<p><strong>WHAT YOU NEED</strong></p>
<ul>
<li>The SM2 Pro adapter itself + boot-bench cable (included)</li>
<li>A Windows laptop/PC</li>
<li>Software for the adapter + drivers (shipped with the device or downloadable from the link below)</li>
<li>Disk link: <a href="https://drive.google.com/file/d/1FFFLwUQ2KWnhD9bIp2JFkexkCWyo45tv/view?usp=sharing">Files for working with SM2 Pro</a></li>
<li>A key for the flash modules via PCMflash (comes with SM2 Pro)</li>
<li>A 12V power supply or a cable powered from the battery</li>
</ul>

<p><strong>CONNECTOR & POWER PREPARATION</strong></p>
<p>For bench mode you need the lines: GPT1, GPT2, CAN-H, CAN-L, 12V (sometimes labelled VCC) and GND.</p>
<table><tr><td><p><strong>⚠ Red cables labelled BATT are not needed — they are not 12V power.</strong></p></td></tr></table>
<p>The connectors on the cable are usually tight — before connecting, slightly spread the contacts with a needle or an awl so the cable goes in more easily.</p>
<table><tr><td><p><em>+12V</em></p></td><td></td><td><p><em>+VCC (same +12V)</em></p></td><td></td><td><p><em>❌ +BATT — not power</em></p></td></tr></table>
<p>Power can be taken from a wall socket via the PSU included in the kit. Alternatively, cut off the PSU, solder crocodile clips to the wires and take 12V from the car battery.</p>
<table><tr><td><p><em>DIY cable with crocodile clips</em></p></td><td></td><td><p><em>Connection to the car battery</em></p></td></tr></table>

<p><strong>CONNECTION PROCEDURE</strong></p>
<table><tr><td><p><em>T60 / T94 connector pinout — MEDC17.9.63, TC1793. The ECU pinout is shown in the inverted position.</em></p></td></tr></table>
<p><strong>1.</strong> Disconnect the connectors from the car's ECU, take the cable with coloured wires and look at the diagram. You need to connect 7 wires: GPT1 (brown) → 20, GPT2 (orange) → 50, +12V (red, wide) → 5, +12V (thin) → 92, GND (black, wide) → 2, CAN-L (green) → 61, CAN-H (white) → 83.</p>
<table><tr><td><p><strong>⚠ Be sure to check that the switch is in the AUTO position. Wire colours may differ — always verify against the labels on them.</strong></p></td></tr></table>
<table><tr><td><p><em>Wires connected to the ECU connector (GPT2 visible)</em></p></td><td></td><td><p><em>SM2 adapter switch in the AUTO position</em></p></td></tr></table>
<p><strong>2.</strong> Connect the cable to the SM2Pro</p>
<p><strong>3.</strong> Connect the SM2Pro to the laptop</p>
<p><strong>4.</strong> Insert the USB key</p>
<p><strong>5.</strong> Connect 12V to the cable</p>
<table><tr><td><p><em>Final setup: laptop + SM2 Pro + power from the battery under the bonnet</em></p></td></tr></table>

<p><strong>GENERAL SOFTWARE WORKFLOW</strong></p>
<p>After connecting the adapter and launching PCMflash:</p>
<table><tr><td><p><em>Program launched, key detected</em></p></td></tr></table>
<p><strong>1.</strong> Select the module [71] Bosch: MEDC17(1791/1793) FLASH</p>
<p><strong>2.</strong> Click “Identification” — the program will ask whether to use automatic power control: YES. If everything is connected correctly, the program will see the ECU and report Done</p>
<table><tr><td><p><em>Auto-power prompt — click “Yes”</em></p></td><td></td><td><p><em>Identification completed</em></p></td></tr></table>
<p><strong>3.</strong> Click “Read” — the program will ask about automatic power control: YES. After reading, the program will offer to save the file — be sure to save the read file, this is your stock file, without it you cannot pick a firmware file</p>
<table><tr><td><p><em>Reading in progress — data blocks being transferred from the ECU</em></p></td></tr></table>
<p><strong>4.</strong> Switch to the module [71] Bosch: MEDC17(1791/1793) EEPROM, repeat identification and reading — also saving the file</p>
<p><strong>5.</strong> Return to the module [71] Bosch: MEDC17(1791/1793) FLASH, select the prepared firmware file and click “Write” — a window will appear, change nothing. Click OK. The window “Checksums corrected. Continue?” will appear. Click YES.</p>
<table><tr><td><p><em>Firmware file selected</em></p></td><td></td><td><p><em>Infineon Tricore BSL window — click OK</em></p></td></tr></table>
<table><tr><td><p><em>Pre-write verification in progress</em></p></td><td></td><td><p><em>“Checksums corrected. Continue?” — click YES</em></p></td></tr></table>
<table><tr><td><p><em>Write completed successfully</em></p></td></tr></table>
<table><tr><td><p><strong>⚠ Do not disconnect anything or close the program during writing — a connection loss at this stage can brick the ECU.</strong></p></td></tr></table>

<p><strong>BEFORE FLASHING NEW FILE</strong></p>
<ul>
<li>Save the original ECU firmware before any changes</li>
<li>Power must be stable</li>
<li>Make sure the laptop will not run out of battery during the process</li>
<li>Check that the mode switch is in the AUTO position.</li>
</ul>`;

export const enFaqFlashHtml = `<p>The Suzuki Swift Sport ZC33S with the K14C engine has enormous tuning potential. However, the JDM tuning world is full of nuances: from firmware compatibility for pre-facelift and facelift cars to strict fuel and spark plug requirements at higher boost.</p>
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

export const enFaqBuyHtml = `<p>A complete guide to choosing a Suzuki Swift Sport ZC33S from Japanese auctions: trims, facelift differences and hidden defects</p>
<p>Buying a “live” Suzuki Swift Sport ZC33S from Japan is always a lottery in which only those who know the rules of the game win. Visually the cars may look identical, but under the bonnet and in the electronics there are critical differences that affect both tuning cost and reliability.</p>
<p>In this part of our extensive guide we will break down body indexes, the real differences between trims, typical “sores” and put together a bulletproof checklist for inspecting a car before buying in Russia.</p>

<p><strong>Body indexes: how to tell facelift from pre-facelift</strong></p>
<p>Visually it is hard to determine the model year. The only reliable way is to look at the body number (VIN).</p>
<ul>
<li>Pre-facelift (until 05.2020): index DBA-ZC33S. All cars of this period have a body number starting with ZC33S-1______.</li>
<li>Facelift (from 05.2020): index 4BA-ZC33S. The body number starts with ZC33S-4______ (and in late versions with ZC33S-5______).</li>
</ul>

<p><strong>Trims: Base vs Safety</strong></p>
<p>On the Japanese domestic market the Swift Sport ZC33S was offered in only two trims.</p>
<p>⚠️ Important: Japanese auction sheets often contain errors in the stated trim. The most reliable way to determine the version is a visual inspection: a black rectangular radar in the lower bumper grille and machine-vision cameras behind the rear-view mirror mean the Safety trim.</p>
<table><thead><tr><th><p>Characteristic</p></th><th><p>Base (Base Grade)</p></th><th><p>Safety (Safety Package)</p></th></tr></thead><tbody>
<tr><td><p>Common nickname</p></td><td><p>“No radar”</p></td><td><p>“Fully loaded”</p></td></tr>
<tr><td><p>Assistance systems</p></td><td><p>Conventional cruise control. No lane keeping.</p></td><td><p>Adaptive cruise control, lane keeping. Facelift recognises road signs.</p></td></tr>
<tr><td><p>Airbags</p></td><td><p>2 pcs (driver and front passenger).</p></td><td><p>6 pcs (front, side in seats, curtains).</p></td></tr>
<tr><td><p>Vehicle weight</p></td><td><p>Slightly lighter (less equipment).</p></td><td><p>Slightly heavier (radar, cameras, extra airbags).</p></td></tr>
<tr><td><p>Tuning nuance</p></td><td><p>Easier to install a performance intercooler (nothing in the way).</p></td><td><p>Harder to install an intercooler: a cut-out for the radar unit is required.</p></td></tr>
</tbody></table>
<p>Additional options (found in both trims)</p>
<p>The presence of these options varies from car to car:</p>
<ul>
<li>Rear-view camera or a 360° surround-view system.</li>
<li>6-speaker audio system (in front and rear doors + tweeters in the upper corners). <em>With 6 speakers a factory USB output on the head unit is often present.</em></li>
<li>Interior lighting (controlled by a small ON/OFF button on the left side of the steering wheel).</li>
<li>Various head unit types (or none at all).</li>
<li>Branded floor mats (a separate option in Japan).</li>
<li>Factory dash cam and other small items.</li>
</ul>

<p><strong>Key differences between facelift and pre-facelift</strong></p>
<p>Besides the body index and emissions class (DBA vs 4BA), there are a number of functional differences between the generations.</p>
<table><thead><tr><th><p>Unit / function</p></th><th><p>Pre-facelift (until 05.2020)</p></th><th><p>Facelift (from 05.2020)</p></th></tr></thead><tbody>
<tr><td><p>Headlights</p></td><td><p>Auto light. Parking lights can be switched on manually or set to “Auto”.</p></td><td><p>Auto light. Only two modes: “Auto” or “Low beam”. Manual parking light activation removed.</p></td></tr>
<tr><td><p>Cruise control</p></td><td><p>Works only from 40 km/h.</p></td><td><p>On the Safety version: adaptive cruise with Stop&amp;Go (the car brakes to zero and pulls away with traffic).</p></td></tr>
<tr><td><p>Instrument cluster</p></td><td><p>Black empty window instead of a digital display.</p></td><td><p>A digital speedometer tab appeared. In the Safety trim recognised road signs are displayed.</p></td></tr>
<tr><td><p>Parking sensors</p></td><td><p>Not fitted from the factory.</p></td><td><p>Rear parking sensors added.</p></td></tr>
<tr><td><p>Turn signals</p></td><td><p>“Soft” turn signal function (light press = 3 flashes).</p></td><td><p>Function removed.</p></td></tr>
<tr><td><p>Safety</p></td><td><p>Basic set.</p></td><td><p>Increased number of airbags + Pre-Collision radar.</p></td></tr>
</tbody></table>
<p>💡 Expert tip: instrument cluster Russification is possible on both pre-facelift and facelift cars. Do not be afraid of Japanese characters when buying — this is solvable.</p>

<p><strong>Typical issues (“sores”) of the ZC33S</strong></p>
<p>Knowing the weak points will save you tens of thousands of rubles on unscheduled repairs.</p>
<p>🛠 Engine and transmission mounts</p>
<ul>
<li>Symptom: strong vibration at start-up or at idle.</li>
<li>Diagnostics: visual inspection. Oil stains or a sagging/cracked rubber = urgent replacement.</li>
<li>Solution: genuine ZC33S mounts are unreasonably expensive. In Russia the problem is successfully solved by fitting a mount from a Suzuki Swift ZC83S with minimal bracket modification. There are also quality solutions from ComfortCustoms (they make a full set of 3 mounts) or tuning options from Cusco and TM-SQUARE.</li>
</ul>
<p>🔦 Headlights and paintwork</p>
<ul>
<li>Headlights: the factory clear coat on the optics is very thin. Over time it yellows and peels, especially if the car was kept outdoors. <em>Important:</em> check the headlights not only for yellowing. Deep scratches that cannot be removed by polishing may hide under the layer of haze.</li>
<li>Paint thickness: only 80–90 µm. The paint is extremely delicate. Chips on the bonnet appear almost immediately after leaving the dealership.</li>
<li>Problem areas: rear arches, lower doors and sills. Sand and stones from under the wheels strip the factory paint down to metal within 2–3 seasons.</li>
<li>Wing edges: paint between the bonnet and the front wing peels very often. On all colours there are factory unpainted areas on the inside of the wings (under the bonnet), which over time leads to chips on visible edges, down to metal.</li>
<li>Solution: apply polyurethane paint protection film to the wing edges and chip-prone areas right after purchase.</li>
</ul>
<p>🌪 Turbo seizure (extremely rare but critical)</p>
<ul>
<li>Cause: poor service maintenance in Japan, missed oil change intervals. When the oil is changed in Russia, detergent additives lift dirt that travels through the oil galleries to the turbo. There is a fine mesh in the oil feed banjo bolt. It clogs → the turbo suffers oil starvation → the shaft seizes → the bolt spins off on the cold compressor wheel and destroys it.</li>
<li>Solution: remove the mesh in the banjo bolt (modification). Or thoroughly flush the engine before operation, strictly follow short oil change intervals and use only quality materials.</li>
<li>🔗 <em>More about the turbo seizure problem and the fix</em></li>
</ul>

<p><strong>Radar diagnostics (for the Safety trim)</strong></p>
<p>If the car has a radar, be sure to check it works before the deal. A system error is often fixed without expensive repairs.</p>
<ol>
<li>Contamination (the most common cause). The sensor is located low down, on the right side of the intercooler in the direction of travel. Wipe it with a damp cloth. In 80% of cases this clears the error.</li>
<li>Displacement from the mounts. Happens if the car “jumped” hard over a pothole and landed abruptly. After the radar is returned to its mounts and you drive 1–2 km, the system recalibrates itself.</li>
<li>Electronics glitch (“the radar went crazy”). Sometimes simply driving a few dozen kilometres on the highway helps — the electronics recalibrate themselves.</li>
<li>Bench calibration required. If the error does not go away after cleaning and driving, professional calibration is needed (not every workshop can do it). This is a serious signal: the previous owner may have hidden a minor accident or removed/refitted the bumper carelessly, knocking the settings off.</li>
</ol>

<p><strong>Pre-purchase checklist in Russia</strong></p>
<p>If the car is already in Russia, do not believe the seller's words, even if he shows a perfectly clean auction sheet. Legal and technical verification is mandatory.</p>
<p>Legal cleanliness</p>
<ul>
<li>Traffic police website: check registration history, accident involvement, wanted status and restrictions.</li>
<li>Federal Notary Chamber: check the pledge register by body number (VIN). A car may be pledged to a bank while looking immaculate.</li>
<li>FSSP (bailiffs' website): check the seller himself. If he has many enforcement proceedings, the car may be seized right after the deal is completed.</li>
<li>ALEADO.RU: check a car already imported into Russia (cost ~500 RUB). The service will find any previously imported car from Japan. This is critically important if the seller has no auction sheet or it looks doubtful. The statistics are relentless: many damaged cars with “drawn” grades enter the country.</li>
</ul>
<p>How to read an auction sheet</p>
<ul>
<li>Grade: 4 or 4.5 is normal for good condition. 3.5 and below — prepare to look for hidden defects and invest money.</li>
<li>Mileage: do not look only at the numbers. Assess the condition of the steering wheel, pedals and driver's seat. An interior can be ruined in 10,000 km. For the K14C engine, mileage up to 120,000 km is considered a comfortable service life with proper care.</li>
<li>Radar grade: in the auction sheet there should be no asterisk (*) next to the safety systems. An asterisk means the equipment does not work, needs repair, or the auction inspector has doubts about its functionality.</li>
</ul>
<p>Programming automatic mirror folding</p>
<p>Many owners want to disable (or restore) the automatic folding of the side mirrors when locking the car. This is done without a dealer visit, using a simple sequence inside the cabin.</p>
<p>Reprogramming procedure:</p>
<ol>
<li>Sit in the car and close all doors.</li>
<li>WITHOUT turning on the ignition, press the central locking button on the window switch panel 4 (four) times in a row (close-open).</li>
<li>Immediately after that, press 3 (three) times any button on the ignition key (fob).</li>
</ol>
<p>Result indication: after performing these steps you will hear a characteristic sound signal from the instrument panel dimmer:</p>
<ul>
<li>1 short beep: automatic folding is DISABLED.</li>
<li>2 short beeps: automatic folding is ENABLED.</li>
</ul>

<p><strong>Characteristic sounds and K14C engine features</strong></p>
<p>The K14C engine has a number of design features that give rise to many myths and unfounded worries among new owners. Remember: not everything that sounds unusual is a fault.</p>
<p>🔥 Vapour from the oil filler neck or dipstick hole</p>
<ul>
<li>Symptom: with the oil filler cap open or the dipstick removed, light smoking or steam is observed.</li>
<li>Diagnosis: this is absolutely normal. This crankcase ventilation behaviour is inherent to this engine at any mileage and does not indicate piston ring wear or stuck rings.</li>
</ul>
<p>⚠️ Important: if a workshop has “sentenced” your engine to a major overhaul solely on the basis of this visual sign, leave that service station without wasting time. It is a sign of low qualification of mechanics unfamiliar with the specifics of Suzuki engines.</p>
<p>🦗 Chirping or clicking under the bonnet at idle</p>
<ul>
<li>Symptom: a rhythmic, frequent chirping sound resembling cicadas.</li>
<li>Diagnosis: this is absolutely normal. This is how the stock high-pressure fuel pump (HPFP) works. The sound is its standard operating characteristic in all modes and at all mileages. For a deeper understanding of the physics of the process, refer to the fuel system section of the official repair manual.</li>
</ul>
<p>🔧 Metallic ringing or rattling while the engine runs</p>
<ul>
<li>Symptom: an unpleasant rattling sound that intensifies at certain RPM.</li>
<li>Solution: check the position of the oil dipstick. Due to vibrations it can sit at a certain angle and resonate. Simply pull it out and turn it to another position until the retaining click. The problem disappears instantly.</li>
</ul>
<p>💧 Sloshing sound when pressing the accelerator pedal</p>
<ul>
<li>Symptom: the sound of liquid or air overflowing when accelerating.</li>
<li>Diagnosis: most often this is a consequence of careless reassembly after scheduled maintenance. When replacing or checking the air filter, mechanics sometimes forget to refit a small rubber drain/vent tube located on the right side of the air filter housing.</li>
<li>Solution: open the bonnet, find this loosely hanging tube and firmly push it onto the corresponding plastic spigot (pipe) on the filter box.</li>
</ul>`;
