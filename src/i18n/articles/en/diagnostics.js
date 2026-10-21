// English version of the article «diagnostics».
// HTML и оглавление живут отдельно от словаря: они грузятся только при открытии статьи.
export const toc = [
  'AFR (Air-Fuel Ratio)',
  'Knock (Detonation & Ignition Retard)',
  'Boost — Charge Pressure',
  'IAT (Intake Air Temperature)',
  'EGT (Exhaust Gas Temperature)',
];

export const html = `
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

export default { toc, html };
