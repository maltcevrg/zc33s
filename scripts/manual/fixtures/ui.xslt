<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!--4r-->
<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>


<xsl:template name="getSname">
	<xsl:param name="sct"/>
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:choose>
				<xsl:when test="$sct='az'">VOORWOORD</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Voorzorgsmaatregelen</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Algemene informatie</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Ophanging</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Aandrijflijn/As</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Remmen</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Versnellingsbak / Transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Stuurinrichting</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Inzittendenbeveiliging</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Carrosserie, Cabine en Toebehoren</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Regelsystemen</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektrische aandrijflijn</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Voorzorgsmaatregelen</xsl:when>
				<xsl:otherwise>FOUT! Onbekende SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:choose>
				<xsl:when test="$sct='az'">AVANT-PROPOS</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Précautions</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informations générales</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Moteur</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspension</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Transmission / Essieu</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Freins</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Boîte de vitesses / Boîte-pont</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Direction</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Système de retenue</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Carrosserie, Cabine et Accessoires</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Systèmes de commande</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Groupe motopropulseur électrique</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Précautions</xsl:when>
				<xsl:otherwise>ERREUR! SCT inconnu</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:choose>
				<xsl:when test="$sct='az'">VORWORT</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Vorsichtsmaßnahmen</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Allgemeines</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Radaufhängung</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Kraftübertragung / Achse</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Bremsen</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Getriebe / Schaltgetriebe</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Lenkung</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Rückhaltesystem</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karosserie, Innenraumelektrik und Zubehör</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Steuersysteme</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektrischer Antriebsstrang</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Vorsichtsmaßnahmen</xsl:when>
				<xsl:otherwise>FEHLER! Unbekannter SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:choose>
				<xsl:when test="$sct='az'">ΠΡΟΛΟΓΟΣ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; ΠΡΟΦΥΛΑΞΕΙΣ</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Γενικές Πληροφορίες</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Κινητήρας</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Σύστημα Ανάρτησης</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Μετάδοση Κίνησης / Άξονας</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Σύστημα Πέδησης</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Κιβώτιο ταχυτήτων / Μετάδοση κίνησης</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Σύστημα Διεύθυνσης</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Σύστημα Θέρμανσης Εξαερισμού Κλιματισμού (HVAC)</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Σύστημα Συγκράτησης</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Αμάξωμα, Καμπίνα και Αξεσουάρ</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Συστήματα Ελέγχου</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Ηλεκτρικό σύστημα μετάδοσης κίνησης</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; ΠΡΟΦΥΛΑΞΕΙΣ</xsl:when>
				<xsl:otherwise>ΣΦΑΛΜΑ! ΑΓΝΩΣΤΟ SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREDGOVOR</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Mjere opreza</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Opće informacije</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Ovjes</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Pogonsko vratilo / osovina</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Kočnice</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Mjenjač / mjenjač smješten na stražnjoj osovini (eng. &#8220;transaxle&#8221;)</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Upravljanje</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Zaštita</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karoserija, kabina i dodaci</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Kontrolni sustavi</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Pogonski sklop električnog vozila</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; MJERE OPREZA</xsl:when>
				<xsl:otherwise>GREŠKA! Nepoznat SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:choose>
				<xsl:when test="$sct='az'">ELŐSZÓ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Óvintézkedések</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Általános információk</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Felfüggesztés</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Erőátvitel / tengely</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Fékek</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Váltómű / sebességváltó</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Kormányzás</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Visszatartó rendszer</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karosszéria, utastér és kiegészítők</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Vezérlőrendszer</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektromos hajtáslánc</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Óvintézkedések</xsl:when>
				<xsl:otherwise>HIBA! Ismeretlen SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:choose>
				<xsl:when test="$sct='az'">KATA PENGANTAR</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; PENCEGAHAN</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informasi Umum</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Mesin</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspensi</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Driveline / Axle</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Rem</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Transmisi / Transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Kemudi</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Pengaman</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Bodi, Kabin dan Aksesoris</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Sistim Kontrol</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Pemindah Daya Elektronik</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; PENCEGAHAN</xsl:when>
				<xsl:otherwise>ERROR! SCT tidak dikenal</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREMESSA</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Norme di sicurezza</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informazioni generali</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motore</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Sospensioni</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Organi di trasmissione / assali</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Freni</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Cambio / transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Sterzo</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Gruppo HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Sistemi di ritenuta</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Scocca, abitacolo e accessori</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Sistemi di comando</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Motopropulsore elettrico</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Precauzioni</xsl:when>
				<xsl:otherwise>ERRORE! SCT sconosciuto</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:choose>
				<xsl:when test="$sct='az'">はじめに</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; 注意事項</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; 概要</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; エンジン</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; サスペンション</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; ドライブライン/アクスル</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; ブレーキ</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; トランスミッション/トランスアクスル</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; ステアリング</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; ヒータ＆エアコン／ベンチレーション</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; ＳＲＳエアバッグ＆シートベルト</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; ボデー＆エレクトリカル</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; コントロールシステム</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; 電動パワートレイン</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='F'">0 &#8211; 車両解説</xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; 注意</xsl:when>
				<xsl:otherwise>ERROR! Unknown SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:choose>
				<xsl:when test="$sct='az'">WPROWADZENIE</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; UWAGI I OSTRZEŻENIA</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informacje ogólne</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Silnik</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Zawieszenie</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Układ przeniesienia napędu</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Hamulce</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Skrzynia biegów</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Układ kierowniczy</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Ogrzewanie, wentylacja i klimatyzacja</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Elementy bezpieczeństwa biernego</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Nadwozie, kabina i elementy wyposażenia</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Elektroniczne układy sterujące</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektryczny zespół napędowy</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; UWAGI I OSTRZEŻENIA</xsl:when>
				<xsl:otherwise>BŁĄD! Nieznany rodzaj kategorii serwisowej.</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:choose>
				<xsl:when test="$sct='az'">ВВЕДЕНИЕ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; МЕРЫ ПРЕДОСТОРОЖНОСТИ</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Общие сведения</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Двигатель</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Подвеска</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Трансмиссия / оси</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Тормозная система</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Трансмиссия / КПП</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Рулевое управление</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Системой отопления, вентиляции и кондиционирования воздуха (HVAC)</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Система пассивной безопасности</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Кузов, кабина и дополнительное оборудование</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Системы управления</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Электричесая силовая установка</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; МЕРЫ ПРЕДОСТОРОЖНОСТИ</xsl:when>
				<xsl:otherwise>ОШИБКА! Неизвестный SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREDHOVOR</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Bezpečnostné opatrenia</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Všeobecné informácie</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Zavesenie</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Hnacia sústava / Náprava</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Brzdy</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Prevodovka / Prevodovka s rozvodovkou</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Riadenie</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Kúrenie, Ventilácia, Klimatizácia</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Zábrana</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karoséria, Kabína a Príslušenstvo</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Riadiace systémy</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektrický náhon</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Upozornenia</xsl:when>
				<xsl:otherwise>CHYBA! Neznáme SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREFACIO</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Medidas de precaución</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Información general</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspensión</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Línea de conducción / Eje</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Frenos</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Transmisión / Transeje</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Dirección</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Sujeción</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Carrocería, Cabina y Accesorios</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Sistemas de control</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Tren de potencia eléctrica</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Medidas de precaución</xsl:when>
				<xsl:otherwise>ERROR! SCT desconocido</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:choose>
				<xsl:when test="$sct='az'">คำนำ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; ข้อควรระวัง</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; ข้อมูลทั่วไป</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; เครื่องยนต์</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; ระบบรองรับน้ำหนัก</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; การส่งกำลัง / เพลา</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; เบรก</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; เกียร์ / เกียร์ขับล้อหน้า</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; พวงมาลัย</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; ความปลอดภัยเสริม</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; ตัวถัง, แค๊ป และอุปกรณ์เสริม</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; ระบบควบคุม</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; ระบบไฟฟ้าขับเคลื่อน</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; ข้อควรระวัง</xsl:when>
				<xsl:otherwise>ความผิดพลาด! SCT ไม่รู้จัก</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="$sct='az'">FOREWORD</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Precautions</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; General Information</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Engine</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspension</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Driveline / Axle</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Brakes</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Transmission / Transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Steering</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Restraint</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Body, Cab and Accessories</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Control Systems</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Electric Power Train</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='F'">0 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; PRECAUTIONS</xsl:when>
				<xsl:otherwise>ERROR! Unknown SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getSnameTooltip">
	<xsl:param name="sct"/>
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:choose>
				<xsl:when test="$sct='az'">VOORWOORD</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Voorzorgsmaatregelen</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Algemene informatie</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Ophanging</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Aandrijflijn/As</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Remmen</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Versnellingsbak / Transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Stuurinrichting</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Inzittendenbeveiliging</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Carrosserie, Cabine en Toebehoren</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Regelsystemen</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektrische aandrijflijn</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Voorzorgsmaatregelen</xsl:when>
				<xsl:otherwise>FOUT! Onbekende SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:choose>
				<xsl:when test="$sct='az'">AVANT-PROPOS</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Précautions</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informations générales</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Moteur</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspension</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Transmission / Essieu</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Freins</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Boîte de vitesses / Boîte-pont</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Direction</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Système de retenue</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Carrosserie, Cabine et Accessoires</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Systèmes de commande</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Groupe motopropulseur électrique</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Précautions</xsl:when>
				<xsl:otherwise>ERREUR! SCT inconnu</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:choose>
				<xsl:when test="$sct='az'">VORWORT</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Vorsichtsmaßnahmen</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Allgemeines</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Radaufhängung</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Kraftübertragung / Achse</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Bremsen</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Getriebe / Schaltgetriebe</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Lenkung</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Rückhaltesystem</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karosserie, Innenraumelektrik und Zubehör</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Steuersysteme</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektrischer Antriebsstrang</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Vorsichtsmaßnahmen</xsl:when>
				<xsl:otherwise>FEHLER! Unbekannter SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:choose>
				<xsl:when test="$sct='az'">ΠΡΟΛΟΓΟΣ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; ΠΡΟΦΥΛΑΞΕΙΣ</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Γενικές Πληροφορίες</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Κινητήρας</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Σύστημα Ανάρτησης</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Μετάδοση Κίνησης / Άξονας</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Σύστημα Πέδησης</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Κιβώτιο ταχυτήτων / Μετάδοση κίνησης</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Σύστημα Διεύθυνσης</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Σύστημα Θέρμανσης Εξαερισμού Κλιματισμού (HVAC)</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Σύστημα Συγκράτησης</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Αμάξωμα, Καμπίνα και Αξεσουάρ</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Συστήματα Ελέγχου</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Ηλεκτρικό σύστημα μετάδοσης κίνησης</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; ΠΡΟΦΥΛΑΞΕΙΣ</xsl:when>
				<xsl:otherwise>ΣΦΑΛΜΑ! ΑΓΝΩΣΤΟ SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREDGOVOR</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Mjere opreza</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Opće informacije</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Ovjes</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Pogonsko vratilo / osovina</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Kočnice</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Mjenjač / mjenjač smješten na stražnjoj osovini (eng. &#8220;transaxle&#8221;)</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Upravljanje</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Zaštita</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karoserija, kabina i dodaci</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Kontrolni sustavi</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Pogonski sklop električnog vozila</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; MJERE OPREZA</xsl:when>
				<xsl:otherwise>GREŠKA! Nepoznat SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:choose>
				<xsl:when test="$sct='az'">ELŐSZÓ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Óvintézkedések</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Általános információk</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Felfüggesztés</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Erőátvitel / tengely</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Fékek</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Váltómű / sebességváltó</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Kormányzás</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Visszatartó rendszer</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karosszéria, utastér és kiegészítők</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Vezérlőrendszer</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektromos hajtáslánc</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Óvintézkedések</xsl:when>
				<xsl:otherwise>HIBA! Ismeretlen SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:choose>
				<xsl:when test="$sct='az'">KATA PENGANTAR</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; PENCEGAHAN</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informasi Umum</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Mesin</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspensi</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Driveline / Axle</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Rem</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Transmisi / Transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Kemudi</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Pengaman</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Bodi, Kabin dan Aksesoris</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Sistim Kontrol</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Pemindah Daya Elektronik</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; PENCEGAHAN</xsl:when>
				<xsl:otherwise>ERROR! SCT tidak dikenal</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREMESSA</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Norme di sicurezza</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informazioni generali</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motore</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Sospensioni</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Organi di trasmissione / assali</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Freni</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Cambio / transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Sterzo</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Gruppo HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Sistemi di ritenuta</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Scocca, abitacolo e accessori</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Sistemi di comando</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Motopropulsore elettrico</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Precauzioni</xsl:when>
				<xsl:otherwise>ERRORE! SCT sconosciuto</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:choose>
				<xsl:when test="$sct='az'">はじめに</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; 注意事項</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; 概要</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; エンジン</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; サスペンション</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; ドライブライン/アクスル</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; ブレーキ</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; トランスミッション/トランスアクスル</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; ステアリング</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; ヒータ＆エアコン／ベンチレーション</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; ＳＲＳエアバッグ＆シートベルト</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; ボデー＆エレクトリカル</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; コントロールシステム</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; 電動パワートレイン</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='F'">0 &#8211; 車両解説</xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; 注意</xsl:when>
				<xsl:otherwise>ERROR! Unknown SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:choose>
				<xsl:when test="$sct='az'">WPROWADZENIE</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; UWAGI I OSTRZEŻENIA</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Informacje ogólne</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Silnik</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Zawieszenie</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Układ przeniesienia napędu</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Hamulce</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Skrzynia biegów</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Układ kierowniczy</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Ogrzewanie, wentylacja i klimatyzacja</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Elementy bezpieczeństwa biernego</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Nadwozie, kabina i elementy wyposażenia</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Elektroniczne układy sterujące</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektryczny zespół napędowy</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; UWAGI I OSTRZEŻENIA</xsl:when>
				<xsl:otherwise>BŁĄD! Nieznany rodzaj kategorii serwisowej.</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:choose>
				<xsl:when test="$sct='az'">ВВЕДЕНИЕ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; МЕРЫ ПРЕДОСТОРОЖНОСТИ</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Общие сведения</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Двигатель</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Подвеска</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Трансмиссия / оси</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Тормозная система</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Трансмиссия / КПП</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Рулевое управление</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Системой отопления, вентиляции и кондиционирования воздуха (HVAC)</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Система пассивной безопасности</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Кузов, кабина и дополнительное оборудование</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Системы управления</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Электричесая силовая установка</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; МЕРЫ ПРЕДОСТОРОЖНОСТИ</xsl:when>
				<xsl:otherwise>ОШИБКА! Неизвестный SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREDHOVOR</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Bezpečnostné opatrenia</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Všeobecné informácie</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Zavesenie</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Hnacia sústava / Náprava</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Brzdy</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Prevodovka / Prevodovka s rozvodovkou</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Riadenie</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; Kúrenie, Ventilácia, Klimatizácia</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Zábrana</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Karoséria, Kabína a Príslušenstvo</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Riadiace systémy</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Elektrický náhon</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Upozornenia</xsl:when>
				<xsl:otherwise>CHYBA! Neznáme SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:choose>
				<xsl:when test="$sct='az'">PREFACIO</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Medidas de precaución</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; Información general</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Motor</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspensión</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Línea de conducción / Eje</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Frenos</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Transmisión / Transeje</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Dirección</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Sujeción</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Carrocería, Cabina y Accesorios</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Sistemas de control</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Tren de potencia eléctrica</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; Medidas de precaución</xsl:when>
				<xsl:otherwise>ERROR! SCT desconocido</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:choose>
				<xsl:when test="$sct='az'">คำนำ</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; ข้อควรระวัง</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; ข้อมูลทั่วไป</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; เครื่องยนต์</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; ระบบรองรับน้ำหนัก</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; การส่งกำลัง / เพลา</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; เบรก</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; เกียร์ / เกียร์ขับล้อหน้า</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; พวงมาลัย</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; ความปลอดภัยเสริม</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; ตัวถัง, แค๊ป และอุปกรณ์เสริม</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; ระบบควบคุม</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; ระบบไฟฟ้าขับเคลื่อน</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; ข้อควรระวัง</xsl:when>
				<xsl:otherwise>ความผิดพลาด! SCT ไม่รู้จัก</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="$sct='az'">FOREWORD</xsl:when>
				<xsl:when test="$sct='z'">00 &#8211; Precautions</xsl:when>
				<xsl:when test="$sct='0'">0 &#8211; General Information</xsl:when>
				<xsl:when test="$sct='1'">1 &#8211; Engine</xsl:when>
				<xsl:when test="$sct='2'">2 &#8211; Suspension</xsl:when>
				<xsl:when test="$sct='3'">3 &#8211; Driveline / Axle</xsl:when>
				<xsl:when test="$sct='4'">4 &#8211; Brakes</xsl:when>
				<xsl:when test="$sct='5'">5 &#8211; Transmission / Transaxle</xsl:when>
				<xsl:when test="$sct='6'">6 &#8211; Steering</xsl:when>
				<xsl:when test="$sct='7'">7 &#8211; HVAC</xsl:when>
				<xsl:when test="$sct='8'">8 &#8211; Restraint</xsl:when>
				<xsl:when test="$sct='9'">9 &#8211; Body, Cab and Accessories</xsl:when>
				<xsl:when test="$sct='A'">10 &#8211; Control Systems</xsl:when>
				<xsl:when test="$sct='B'">11 &#8211; Electric Power Train</xsl:when>
				<xsl:when test="$sct='C'">12 &#8211; </xsl:when>
				<xsl:when test="$sct='F'">0 &#8211; </xsl:when>
				<xsl:when test="$sct='y'">99 &#8211; PRECAUTIONS</xsl:when>
				<xsl:otherwise>ERROR! Unknown SCT</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getContentsIndexTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Bladwijzers</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>SOMMAIRE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>INHALT</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Σελιδοδείκτες</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Sadržaj</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Könyvjelzők</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Penanda halaman</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>INDICE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>目次</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Zakładki</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Закладки</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>OBSAH</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>CONTENIDO</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>คั่นหน้าหนังสือ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Bookmarks</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getContentsSearchTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Zoeken in inhoud</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche de contenu</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Inhaltssuche</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση Περιεχομένων</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Pretraživanje sadržaja</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Tartalom keresése</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian Isi</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca dei contenuti</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>目次検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Wyszukiwanie frazy</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск содержимого</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadať v obsahu</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda de contenidos</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ค้นหาสารบัญ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Contents Search</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getDtcIndexTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>DTC-index</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Index des DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>DTC-Index</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ένδειξη DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Kazalo DTC-a</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>DTC-lista</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Index DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Indice DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>DTC目次</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Indeks kodów DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Перечень диагностических кодов неисправностей</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Register DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>índice de los DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ดัชนีรหัส DTC</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>DTC Index</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getDtcSearchTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>DTC zoeken</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche de DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>DTC-Suche</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Pretraživanje DTC-a</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>DTC-keresés</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>DTC検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Wyszukiwanie kodów DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск диагностических кодов неисправностей</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadať DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda de los DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>คันหารหัส DTC</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>DTC Search</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getSymIndexTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Symptomenindex</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Index des symptômes</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Symptom-Index</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ένδειξη Συμπτώματος</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Kazalo simptoma</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Hibajelenség-lista</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Index Gejala</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Indice dei sintomi</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>症状別故障診断目次</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Indeks objawów</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Перечень признаков</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Register symptómov</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Índice de síntomas</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ดัชนีอาการปัญหา</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Symptom Index</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getSymSearchTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Symptoom zoeken</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche de symptômes</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Symptom-Suche</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση Συμπτώματος</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Pretraživanje simptoma</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Hibajelenség-keresés</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian Gejala</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca dei sintomi</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>症状別故障診断検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Wyszukiwanie objawów</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск признака</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadať symptóm</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda de síntomas</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ค้นหาอาการปัญหา</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Symptom Search</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strSearch">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Zoeken naar inhoudtitel</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche des titres du sommaire</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Suche nach Inhaltstitel</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση για Τίτλο Περιεχομένου:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Traženje naslova sadržaja:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Tartalom keresése</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian Judul Isi:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca nell'indice</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>目次検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Szukaj w tytułach rozdziałów:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск названия содержимого:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadávanie titulu obsahu</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda del título del contenido</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>การค้นหาหัวข้อสำหรับสารบัญ:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Search for Content Title:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strSearchDtc">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Zoeken naar DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche du DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Suche nach DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση για DTC:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Traženje DTC-a:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>DTC (Diagnosztikai Hibakód) keresése</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca del DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>ＤＴＣ検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Szukaj kodu DTC:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск диагностического кода неисправности:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadávanie DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda del DTC</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>การค้นหารหัส DTC:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Search for DTC:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strSearchSym">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Zoeken naar titel van symptoominhoud</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche des titres du sommaire des symptômes</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Suche nach Symptominhaltstitel</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση για Τίτλο Περιεχομένου Συμπτώματος:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Traženje naslova sadržaja simptoma:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Hibaszimptóma tartalom keresése</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian Judul Isi Gejala</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca del sintomo accusato</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>症状目次検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Szukaj w tytułach opisów objawów:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск названия описания признака:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadávanie titulu obsahu symptómu</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda del título del contenido del síntoma</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>การค้นหาสำหรับหัวข้อของอาการปัญหา:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Search for Title of Symptom Content:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_btnSearch">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Zoeken</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Recherche</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Suche</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναζήτηση</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Pretraživanje</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Keresés</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencarian</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ricerca</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>検索</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Szukaj</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Поиск</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Vyhľadať</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Búsqueda</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>การค้นหา</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Search</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_btnMod">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Gewijzigd pictogram &amp; Gewijzigde SIE-lijst</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Icône modifiée &amp; liste des SIE modifiée</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Modifiziertes Symbol und modifizierte SIE-Liste</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Τροποποιημένο Εικονίδιο &amp; Τροποποιημένη Λίστα SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Izmijenjena ikona i izmijenjena SIE lista</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Módosított Icon &amp; Módosított SIE Listája</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Modifikasi Ikon &amp; Modifikasi daftar SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Icona modificata e lista SIE modificata</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>変更情報表示</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Zmienione ilustracje i moduły informacji serwisowej</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Список измененных значков и кодов SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Upravená ikona a upravený zoznam SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Icono modificado y lista de SIE modificada</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>โมดิฟายไอคอน และโมดิฟายรายการ SIE</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Modified Icon &amp; Modified SIE List</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strMod">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Gewijzigde SIE-lijst</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Ldes SIE modifiée</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Modifizierte SIE-Liste</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Τροποποιημένη Λίστα SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Izmijenjena SIE lista</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Módosított SIE Listája</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Modifikasi daftar SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Lista SIE modificata</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>変更SIEリスト</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Zmienione moduły informacji serwisowej</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Список измененных кодов SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Upravený zoznam SIE</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Lista de SIE modificada</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>โมดิฟายรายการ SIE</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Modified SIE List</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_iconMod">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Gewijzigd</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Modifié</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Modifiziert</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Τροποποιημένο</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Izmijenjeno</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Módosított</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Modifikasi</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Modificata</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>変更</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Zmienione</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Измененный</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Upravené</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Modificado</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>โมดิฟาย</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Modified</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strExpandImage_text">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Afbeelding vergroten</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Agrandir l'image</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Bild vergrößern</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Επέκταση εικόνας</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Proširi sliku</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Kép nagyítása</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Perbesar gambar</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Ingrandire l'immagine</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>拡大</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Rozwiń obraz</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Развернуть изображение</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Roztiahnuť obraz</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Ampliar imagen</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ขยายรูปภาพ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Expand image</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strExpandImage">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Afbeelding vergroten" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Agrandir l'image" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Bild vergrößern" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Επέκταση εικόνας" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Proširi sliku" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Kép nagyítása" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Perbesar gambar" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Ingrandire l'immagine" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="拡大" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Rozwiń obraz" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Развернуть изображение" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Roztiahnuť obraz" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Ampliar imagen" border="0"/>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="ขยายรูปภาพ" border="0"/>
		</xsl:when>
		<xsl:otherwise>
			<img class="expandicon" src="../../icon/zoom.gif" width="30px" title="Expand image" border="0"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strSpecialTool">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Speciaal gereedschap</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Outil spécial</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Spezialwerkzeug</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ειδικό Εργαλείο</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Specijalni alat</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Célszerszám</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Special Tool</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Attrezzo specifico</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>特殊工具</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Narzędzia specjalne</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Специальный инструмент</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Špeciálny nástroj</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Herramienta especial</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>เครื่องมือพิเศษ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Special Tool</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strTighteningTorque">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Aantrekkoppel</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Couple de serrage</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Anzugsmoment</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ροπή σύσφιξης</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Moment pritezanja</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Meghúzási nyomaték</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Momen pengencangan</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Coppia di Serraggio</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>締付トルク</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Moment dokręcenia</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Момент затяжки</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Moment dotiahnutia</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Par de apriete</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>แรงขัน</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Tightening torque</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strMaterial">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'jp'">
			<xsl:element name="div">
				<xsl:attribute name="class">title</xsl:attribute>
				<xsl:text>指定材料</xsl:text>
			</xsl:element>
		</xsl:when>
		<xsl:otherwise></xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strWarning">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>WAARSCHUWING:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>AVERTISSEMENT:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>WARNUNG:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>ΠΡΟΕΙΔΟΠΟΙΗΣΗ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>UPOZORENJE:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>VIGYÁZAT:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>PERINGATAN:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>ATTENZIONE:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>警告:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>OSTRZEŻENIE:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>ПРЕДУПРЕЖДЕНИЕ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>VÝSTRAHA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>ADVERTENCIA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>คำเตือน:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>WARNING:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strCaution">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>VOORZICHTIG:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>ATTENTION:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>VORSICHT:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>ΠΡΟΣΟΧΗ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>OPREZ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>FIGYELMEZTETÉS:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>PERHATIAN:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>AVVERTENZA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>注意:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>PRZESTROGA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>ВНИМАНИЕ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>UPOZORNENIE:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>ATENCIÓN:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ข้อควรระวัง:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>CAUTION:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strNote">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>OPMERKING:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>NOTE:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>ZUR BEACHTUNG:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>ΣΗΜΕΙΩΣΗ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>NAPOMENA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>MEGJEGYZÉS:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>CATATAN:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>NOTA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>アドバイス:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>INFORMACJA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>ПРИМЕЧАНИЕ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>POZNÁMKA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>NOTA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>หมายเหตุ:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>NOTE:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strNotice">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>LET OP:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>AVIS:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>HINWEIS:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>ΕΙΔΟΠΟΙΗΣΗ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>POZOR:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>ÉRTESÍTÉS:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>HIMBAUAN:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>AVVISO:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>注記:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>UWAGA:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>УВЕДОМЛЕНИЕ:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>VAROVANIE:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>AVISO:</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>แจ้งล่วงหน้า:</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>NOTICE:</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strCondition">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Toestand</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Symptôme</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Symptom</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Κατάσταση</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Stanje</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Állapot</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Kondisi</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Condizione</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>症状</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Objaw</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Условие</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Stav</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Condición</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>สภาวะ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Condition</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strPosCause">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Mogelijke oorzaak</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Cause Possible</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Mögliche Ursache</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Πιθανή Αιτία</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Mogući uzrok</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Lehetséges ok</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Kemungkinan Penyebab</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Possibile causa</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>推定原因</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Możliwa przyczyna</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Возможная причина</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Možná prěčina</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Causa possible</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>สาเหตุที่เป็นไปได้</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Possible Cause</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strCondAction">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Actie</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Action</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Maßnahme</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ενέργεια</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Akcija</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Művelet</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Tindakan</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Intervento</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>処置方法（参照先）</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Działanie</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Действие</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Činnost'</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Operación</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>การปฏิบัติ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Action</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strStep">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Stap</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Etape</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Schritt</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Βήμα</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Korak</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Lépés</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Langkah</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Fase</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>Step</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Krok</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Шаг</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Krok</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Paso</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ขั้นตอน</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Step</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strTestAction">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Actie</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Action</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Maßnahme</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ενέργεια</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Akcija</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Művelet</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Tindakan</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Intervento</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>Action</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Działanie</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Действие</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Činnost'</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Operación</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>การปฏิบัติ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Action</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strYes">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Ja</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Oui</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Ja</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ναι</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Da</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Igen</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Ya</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Sì</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>Yes</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Tak</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Да</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Áno</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Sí</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ใช่</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Yes</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strNo">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Nee</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Non</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Nein</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Όχι</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Ne</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Nem</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Tidak</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>No</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>No</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Nie</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Нет</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Nie</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>No</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ไม่ใช่</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>No</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strReference">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Referentie: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Référence: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Bezugswert: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Αναφορά: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Referenca: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>További tájékoztatás: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Referensi: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Riferimento: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>参照: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Odniesienia: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Ссылка: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Referencia: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Referencia: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>อ้างอิง: </xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Reference: </xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_btnTB">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Tool Board du</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Tool Board fr</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Tool Board ge</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Tool Board gk</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Ploča za alat</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Tool Board hu</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Papan Tool</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Tool Board it</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>Tool Board jp</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Wykaz narzędzi</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Инструментальная панель</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Tool Board sl</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Tool Board sp</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>บอร์ดเครื่องมือ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Tool Board</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template name="getUI_strMaterialsTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Materials (du)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Materials (fr)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Materials (ge)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Materials (gk)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Materijali</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Materials (hu)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Material</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Materials (it)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>指定材料</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Materiały</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Компоненты</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Materials (sl)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Materials (sp)</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>วัสดุ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Materials</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strPreReqSitTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Speciaal gereedschap en speciale uitrusting</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Outils spéciaux et matériel</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Spezialwerkzeuge und Wartungsgeräte</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ειδικά Εργαλεία και Εξοπλισμός</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Specijalni alati i oprema</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Célszerszámok és segédeszközök</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Special Tool dan Perlengkapan</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Strumentazione e Attrezzatura Specifica</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>指定材料/特殊工具</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Narzędzia specjalne i przyrządy</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Специальные инструменты и оборудование</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Špeciálne nástroje a výbava</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Herramientas y equipos especiales</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>เครื่องมือพิเศษและอุปกรณ์</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Special Tools and Equipment</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strPreReqSstTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Speciaal gereedschap</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Outils spéciaux</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Spezialwerkzeug</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ειδικό Εργαλείο</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Specijalni alat</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Célszerszám</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Special Tool</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Attrezzo speciale</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>特殊工具</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Narzędzia specjalne</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Специальный инструмент</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Špeciálne nástroje</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Herramienta especial</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>เครื่องมือพิเศษ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Special Tool</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strPreReqMaterialsTitle">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Aanbevolen onderhoudsmateriaal</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Produits d'entretien recommandés</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Empfohlene Wartungsmaterialien</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Προτεινόμενα Υλικά Συντήρησηò</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Preporučeni servisni materijal</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Ajánlott segédanyagok</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Material Servis yang Dianjurkan</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Materiali di manutenzione e assistenza raccomandati</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>指定材料</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Zalecane materiały serwisowe</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Рекомендуемое руководство по техническому обслуживанию</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Odporúčaný servisný materiál</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Material de servicio recomendado</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>วัสดุบริการที่แนะนำ</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Recommended Service Material</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_btnPrecautions">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Voorzorgsmaatregelen</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Précautions</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Vorsichtsmaßnahmen</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Μέτρα Προøύλαξης</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Mjere opreza</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Óvintézkedések</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Pencegahan</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Precauzioni</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>注意事項</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Uwagi i ostrzeżenia</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Меры предосторожности</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Bezpečnostné</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Precauciones</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ข้อควรระวัง</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Precautions</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template name="getUI_strReferTo">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>Zie </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Se reporter à </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Siehe </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Ανατρέξτε στο </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Pogledajte </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>További tájékoztatásért lásd: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Lihat ke </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Fare riferimento a </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>参照 </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Więcej informacji znajduje się w </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>См. раздел </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Pozrite </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>Consulte </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>โปรดดูที่ </xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>Refer to </xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getUI_strReferToSec00">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>De algemene veiligheidsinformatie wordt in hoofdstuk 00 [voorzorgsmaatregelen] beschreven.</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>Les informations générales de sécurité sont décrites à la section 00 [Précautions].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>Allgemeine Sicherheitsinformationen werden in Abschnitt 00 [Vorsichtsmaßnahmen] beschrieben.</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>Οι γενικές πληροφορίες ασφαλείας περιγράφονται στην Ενότητα 00 [Προφυλάξεις].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>Opće sigurnosne informacije naći ćete u odjeljku 00 [Mjere opreza].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>Az általános biztonsági információk leírása a(z) 00  [Óvintézkedések] fejezetben olvasható.</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>Informasi keselamatan diterangkan di Bab 00 (Pencegahan).</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>Le informazioni generali sulla sicurezza sono riportate alla sezione 00 [Norme di sicurezza].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>一般的な安全に関する情報は、セクション００「注意事項」に記載されています。</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>Ogólne informacje dotyczące bezpieczeństwa podane są w rozdziale 00 [Uwagi i ostrzeżenia].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>Общие сведения о безопасности представлены в разделе 00 [Меры предосторожности].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>Všeobecné bezpečnostné pokyny sú popísané v Časti 00 [Bezpečnostné opatrenia].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>La información general sobre seguridad se describe en la Sección 00 [Precauciones].</xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>ข้อมูลความปลอดภัยทั่วไปอธิบายไว้ในหมวด 00 [ข้อควรระวัง]</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>General safety information is described in Section 00 [Precautions].</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getStr_Sd2Standard">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>［標準値］： </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>[Nominal]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>[Standard]: </xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>[Standard]: </xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="getStr_Sd2Limit">
	<xsl:param name="lang"/>
	<xsl:choose>
		<xsl:when test="$lang = 'du'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'fr'">
			<xsl:text>[Limite]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ge'">
			<xsl:text>[Verschleißgrenze]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'gk'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hr'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'hu'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'id'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'it'">
			<xsl:text>[Limite]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'jp'">
			<xsl:text>［使用限度］： </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'pl'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'ru'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sl'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'sp'">
			<xsl:text>[Límite]: </xsl:text>
		</xsl:when>
		<xsl:when test="$lang = 'th'">
			<xsl:text>[Limit]: </xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text>[Limit]: </xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>




