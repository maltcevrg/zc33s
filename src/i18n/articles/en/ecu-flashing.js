// English version of the article «ecu-flashing».
// HTML и оглавление живут отдельно от словаря: они грузятся только при открытии статьи.
export const toc = [
  'WHERE TO BUY',
  'WHAT YOU NEED',
  'CONNECTOR & POWER PREPARATION',
  'CONNECTION PROCEDURE',
  'GENERAL SOFTWARE WORKFLOW',
  'BEFORE FLASHING NEW FILE',
];

export const html = `<p><strong>WHERE TO BUY</strong></p>
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

export default { toc, html };
