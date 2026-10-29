<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:key name="kDistinctCondActions" match="action"
use="generate-id(preceding-sibling::condition[1])"/>

<xsl:output method="html" encoding="utf-8" indent="yes" doctype-public="-//W3C//DTD HTML 4.0//EN" doctype-system="http://www.w3.org/TR/REC-html40/strict.dtd"/>

<xsl:param name="UI_lang"/>

<xsl:variable name="newline">
<xsl:text>&#13;</xsl:text>
</xsl:variable>

<xsl:include href="ui.xslt"/>

<xsl:template match="/">
<html>
	<xsl:value-of select="$newline"/>
<head>
<title><xsl:value-of select="//servinfo/@servinfosgmlid"/></title>
	<xsl:value-of select="$newline"/>
	<xsl:choose>
		<xsl:when test="$UI_lang = 'jp'">
			<link rel="stylesheet" href="../config8/suzukimain_j.css?v=20131107" type="text/css"/>
		</xsl:when>
		<xsl:otherwise>
			<link rel="stylesheet" href="../config8/suzukimain_e.css?v=20131107" type="text/css"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:value-of select="$newline"/>
<script type="text/javascript">
var UI_lang = "<xsl:value-of select="$UI_lang"/>";
</script>
<script type="text/javascript" src="../config8/stdio.js?v=20140416"></script>
	<xsl:value-of select="$newline"/>
</head>
<body onload="fixImgWidth()" onresize="dragEnd()">
	<xsl:apply-templates select="//servinfo"/>
</body>
</html>
</xsl:template>

<!-- servinfo -->

<xsl:template match="servinfo">
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">servinfo</xsl:attribute>
		<xsl:attribute name="id">
			<xsl:value-of select="@servinfosgmlid"/>
		</xsl:attribute>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">scnbr</xsl:attribute>
		<xsl:call-template name="getSectionNbr">
			<xsl:with-param name="id" select="substring(@servinfosgmlid,9,2)"/>
		</xsl:call-template>
	</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:apply-templates />
</xsl:element>
</xsl:template>

<xsl:template name="getSectionNbr">
	<xsl:param name="id"/>
	<xsl:variable name="c1">
			<xsl:choose>
				<xsl:when test="substring($id,1,1)='A'">10</xsl:when>
				<xsl:when test="substring($id,1,1)='B'">11</xsl:when>
				<xsl:when test="substring($id,1,1)='C'">12</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="substring($id,1,1)"/>
				</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
	<xsl:variable name="c2">
			<xsl:choose>
				<xsl:when test="$id='00'">0</xsl:when>
				<xsl:when test="substring($id,2,1)='0'"></xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="translate(substring($id,2,1), '123456789ABCDEFGHIJKLMNOPQ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
				</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>
	<xsl:value-of select="concat($c1,$c2)"/>
</xsl:template>

<!-- servinfosub -->

<xsl:template match="servinfosub">
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">servinfosub</xsl:attribute>
	<xsl:attribute name="id">
		<xsl:value-of select="@id"/>
	</xsl:attribute>
		<xsl:apply-templates />
</xsl:element>
</xsl:template>

<!-- topic -->

<xsl:template match="topic">
	<xsl:value-of select="$newline"/>

	<xsl:element name="div">
		<xsl:attribute name="class">topic</xsl:attribute>
	<xsl:attribute name="id">
		<xsl:value-of select="@id"/>
	</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- subtopic -->

<xsl:template match="subtopic">
	<xsl:value-of select="$newline"/>

	<xsl:element name="div">
		<xsl:attribute name="class">subtopic</xsl:attribute>
	<xsl:attribute name="id">
		<xsl:value-of select="@id"/>
	</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- title -->

<xsl:template match="title">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">title</xsl:attribute>
		<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|intxreftitleoff1|symbol"/>
	</xsl:element>
</xsl:template>

<!-- subtitle -->

<xsl:template match="subtitle">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">subtitle</xsl:attribute>
		<xsl:text>(</xsl:text>
		<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|intxreftitleoff1|symbol"/>
		<xsl:text>)</xsl:text>
	</xsl:element>
</xsl:template>

<!-- ptxt -->

<xsl:template match="ptxt">
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">ptxt</xsl:attribute>
		<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|intxreftitleoff1|symbol|link"/>
</xsl:element>
</xsl:template>

<!-- servicetool -->


<xsl:template match="servicetool">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">sst</xsl:attribute>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:call-template name="getUI_strSpecialTool">
				<xsl:with-param name="lang" select="$UI_lang"/>
			</xsl:call-template>
		</xsl:element>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- servicetoolitem -->

<xsl:template match="servicetoolitem">
<xsl:if test="@id">
	<xsl:element name="a">
		<xsl:attribute name="name">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
		<xsl:attribute name="id">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
	</xsl:element>
</xsl:if>
	<xsl:apply-templates />
	<xsl:if test="following-sibling::servicetoolitem">
		<br/>
	</xsl:if>
</xsl:template>

<!-- s-part -->

<xsl:template match="s-part">
<xsl:element name="span">
	<xsl:apply-templates />
	<xsl:text>: </xsl:text>
</xsl:element>
</xsl:template> 

<!-- s-number -->

<xsl:template match="s-number">
<xsl:element name="span">
		<xsl:apply-templates />
	<xsl:text> </xsl:text>
</xsl:element>
</xsl:template>

<!-- s-name -->

<xsl:template match="s-name">
<xsl:element name="span">
	<xsl:text>(</xsl:text>
	<xsl:apply-templates />
	<xsl:text>) </xsl:text>
</xsl:element>
</xsl:template> 

<xsl:template match="servicetoolitem/ptxt">
		<xsl:apply-templates />
</xsl:template>


<!-- torque -->

<xsl:template match="torque">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">torque</xsl:attribute>
		<xsl:element name="div">
			<xsl:attribute name="class">title</xsl:attribute>
			<xsl:call-template name="getUI_strTighteningTorque">
				<xsl:with-param name="lang" select="$UI_lang"/>
			</xsl:call-template>
		</xsl:element>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- torqueitem -->

<xsl:template match="torqueitem">
<xsl:if test="@id">
	<xsl:element name="a">
		<xsl:attribute name="name">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
		<xsl:attribute name="id">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
	</xsl:element>
</xsl:if>
	<xsl:apply-templates />
	<xsl:if test="following-sibling::torqueitem">
		<br/>
	</xsl:if>
</xsl:template>

<!-- t-part -->

<xsl:template match="t-part">
		<xsl:apply-templates />
		<xsl:choose>
			<xsl:when test="name(following-sibling::*[1])='t-part1'">
				<xsl:text>  </xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>: </xsl:text>
			</xsl:otherwise>
		</xsl:choose>
</xsl:template>

<xsl:template match="t-part1">
			<xsl:text>(</xsl:text>
			<xsl:apply-templates />
			<xsl:text>): </xsl:text>
</xsl:template>

<!-- t-value -->

<xsl:template match="t-value1">
		<xsl:apply-templates />
	<xsl:choose>
		<xsl:when test="$UI_lang = 'hu' or $UI_lang = 'it' or $UI_lang = 'hr' or $UI_lang = 'pl'">
			<xsl:text> Nm</xsl:text>
		</xsl:when>
		<xsl:when test="$UI_lang = 'ru'">
			<xsl:text> Нм</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text> N&#183;m</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="t-value2">
	<xsl:choose>
		<xsl:when test="$UI_lang = 'jp'">
			<xsl:text> {</xsl:text>
			<xsl:apply-templates />
			<xsl:text> kgf&#183;cm}</xsl:text>
		</xsl:when>
		<xsl:when test="$UI_lang = 'ru'">
			<xsl:text> (</xsl:text>
			<xsl:apply-templates />
			<xsl:choose>
				<xsl:when test="following-sibling::t-value3">
					<xsl:text> кгс-м, </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> кгс-м)</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$UI_lang = 'hu'">
			<xsl:text> (</xsl:text>
			<xsl:apply-templates />
			<xsl:choose>
				<xsl:when test="following-sibling::t-value3">
					<xsl:text> kgm, </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> kgm)</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$UI_lang = 'it'">
			<xsl:text> (</xsl:text>
			<xsl:apply-templates />
			<xsl:choose>
				<xsl:when test="following-sibling::t-value3">
					<xsl:text> kgfm, </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> kgfm)</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="$UI_lang = 'pl'">
			<xsl:text> (</xsl:text>
			<xsl:apply-templates />
			<xsl:choose>
				<xsl:when test="following-sibling::t-value3">
					<xsl:text> kGm, </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> kGm)</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:otherwise>
			<xsl:text> (</xsl:text>
			<xsl:apply-templates />
			<xsl:choose>
				<xsl:when test="following-sibling::t-value3">
					<xsl:text> kgf-m, </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> kgf-m)</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="t-value3">
	<xsl:choose>
		<xsl:when test="$UI_lang = 'jp'">
		</xsl:when>
		<xsl:when test="$UI_lang = 'en'">
			<xsl:apply-templates />
			<xsl:text> lbf-ft)</xsl:text>
		</xsl:when>
		<xsl:when test="$UI_lang = 'ru'">
			<xsl:apply-templates />
			<xsl:text> фунт-сила-фута)</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates />
			<xsl:text> lbf-ft)</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="torqueitem/ptxt">
	<xsl:choose>
		<xsl:when test="$UI_lang = 'jp'">
			<xsl:text> (</xsl:text>
			<xsl:apply-templates />
			<xsl:text>)</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates />
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- materials -->

<xsl:template match="materials">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">material</xsl:attribute>
		<xsl:call-template name="getUI_strMaterial">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- materialitem -->

<xsl:template match="materialitem">
<xsl:if test="@id">
	<xsl:element name="a">
		<xsl:attribute name="name">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
		<xsl:attribute name="id">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
	</xsl:element>
</xsl:if>
	<xsl:apply-templates />
	<xsl:if test="following-sibling::materialitem">
		<br/>
	</xsl:if>
</xsl:template>

<!-- m-part -->

<xsl:template match="m-part">
	<xsl:element name="span">
		<xsl:attribute name="class">m-part</xsl:attribute>
		<xsl:apply-templates />
		<xsl:text>: </xsl:text>
	</xsl:element>
</xsl:template>

<!-- m-type -->

<xsl:template match="m-type">
	<xsl:element name="span">
		<xsl:attribute name="class">m-type</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- m-desc -->

<xsl:template match="m-desc">
	<xsl:element name="span">
		<xsl:attribute name="class">m-desc</xsl:attribute>
		<xsl:apply-templates />
		<xsl:text> </xsl:text>
	</xsl:element>
</xsl:template>

<!-- m-number -->

<xsl:template match="m-number">
	<xsl:element name="span">
		<xsl:attribute name="class">m-number</xsl:attribute>
		<xsl:text> </xsl:text>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- m-name -->

<xsl:template match="m-name">
	<xsl:element name="span">
		<xsl:attribute name="class">m-name</xsl:attribute>
		<xsl:text> (</xsl:text>
		<xsl:apply-templates />
		<xsl:text>)</xsl:text>
	</xsl:element>
</xsl:template>

<xsl:template match="materialitem/ptxt">
	<xsl:text> </xsl:text>
	<xsl:apply-templates />
</xsl:template>


<!-- paragroup -->

<xsl:template match="paragroup">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">paragroup</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- figure -->

<xsl:template match="figure|testfigure">
<xsl:variable name="indentLeft">
 	<xsl:call-template name="getIndent">
		<xsl:with-param name="current" select="0" />
	</xsl:call-template>
</xsl:variable>

	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">fig</xsl:attribute>
		<xsl:if test="$indentLeft!=0">
			<xsl:attribute name="style">
				<xsl:text>margin-left:-</xsl:text>
				<xsl:value-of select="$indentLeft"/>
				<xsl:text>px;</xsl:text>
			</xsl:attribute>
		</xsl:if>
			<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<xsl:template name="getIndent">
	<xsl:param name="current" />
	<xsl:param name="thisNode" />
	
	<xsl:variable name="offset">
		<xsl:choose>
			<xsl:when test="parent::s1|parent::s2|parent::s3">25</xsl:when>
			<xsl:when test="parent::list1|parent::list2|parent::list3">24</xsl:when>
			<xsl:when test="parent::test1|parent::test2|parent::test3">24</xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
		<xsl:choose>
			<xsl:when test="parent::servinfo|parent::servinfosub|parent::topic|parent::attention|parent::entry|parent::def|parent::condition|parent::ps|parent::action|parent::testgroup">
				<xsl:value-of select="$current+$offset"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="parent::*">
				 	<xsl:call-template name="getIndent">
						<xsl:with-param name="current" select="$current+$offset" />
					</xsl:call-template>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
</xsl:template>

<!-- graphic -->

<xsl:template match="graphic">
<xsl:variable name="gname">
	<xsl:choose>
		<xsl:when test="contains(@graphicname, '.')">
			<xsl:value-of select="substring-before(@graphicname, '.')"/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="@graphicname"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:variable name="gpath">
	<xsl:text>../image/</xsl:text>
	<xsl:choose>
		<xsl:when test="starts-with($gname,'I')">
			<xsl:value-of select="substring($gname, 1, 6)"/>
		</xsl:when>
		<xsl:when test="starts-with($gname,'T')">
			<xsl:text>TOOL</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="substring($gname, 1, 4)"/>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:text>/</xsl:text>
</xsl:variable>

<xsl:variable name="gtype">
	<xsl:choose>
		<xsl:when test="contains(@graphicname, '.')">
			<xsl:value-of select="substring-after(@graphicname, '.')"/>
		</xsl:when>
		<xsl:otherwise>jpg</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:variable name="gwidth">
<xsl:value-of select="substring-before(@width,'mm')"/>
</xsl:variable>

<xsl:variable name="gheight">
<xsl:value-of select="substring-before(@height,'mm')"/>
</xsl:variable>


<xsl:variable name="displaywidth">
	<xsl:choose>
		<xsl:when test="$gwidth &gt;= 130.000">
			<xsl:choose>
				<xsl:when test="@gh and @gw">
					<xsl:choose>
						<xsl:when test="@gw = 0">
							<xsl:text>100%</xsl:text>
						</xsl:when>
						<xsl:when test="@gw &gt;= 460">
							<xsl:text>600px</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="@gw &lt;= 374">
									<xsl:value-of select="round(@gw * 1.6)" />
									<xsl:text>px</xsl:text>
								</xsl:when>
								<xsl:otherwise>
									<xsl:text>599px</xsl:text>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>100%</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>

		<xsl:when test="$gwidth=85.000 or $gwidth=88.000">
			<xsl:choose>
				<xsl:when test="@gh and @gw">
					<xsl:choose>
						<xsl:when test="@gw = 0">
							<xsl:text>400px</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="round(@gw * 1.6)" />
							<xsl:text>px</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>400px</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>

		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="$gheight &lt;= 35.000">
					<xsl:value-of select="round($gwidth*3.0)" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="round($gwidth*4.0)" />
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

<xsl:variable name="displayheight">
	<!-- Set height proportionally for swf graphics. -->
	<!-- Setting unproportional heights causes blank space above and below graphic -->
	
	<xsl:choose>
		<xsl:when test="$gwidth &gt;= 130.000">
			<xsl:choose>
				<xsl:when test="@gh and @gw">
					<xsl:choose>
						<xsl:when test="@gw = 0">
							<xsl:value-of select="round($gheight*3.7)" />
							<xsl:text>px</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="$displaywidth = '100%'">
									<xsl:value-of select="round($gheight*3.7)" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="round(@gh * substring-before($displaywidth,'px') div @gw)" />
								</xsl:otherwise>
							</xsl:choose>
							<xsl:text>px</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="round($gheight*3.7)" />
					<xsl:text>px</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>

		<xsl:when test="$gwidth=85.000 or $gwidth=88.000">
			<xsl:choose>
				<xsl:when test="@gh and @gw">
					<xsl:choose>
						<xsl:when test="@gw = 0">
							<xsl:value-of select="round($gheight*4.7)" />
							<xsl:text>px</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="$displaywidth = '100%'">
									<xsl:value-of select="round($gheight*4.7)" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="round(@gh * substring-before($displaywidth,'px') div @gw)" />
								</xsl:otherwise>
							</xsl:choose>
							<xsl:text>px</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="round($gheight*4.7)" />
					<xsl:text>px</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>

		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="$gheight &lt;= 35.000">
					<xsl:value-of select="round($gheight*3.0)" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="round($gheight * 4.0)" />
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:variable>

	<!--2003.06.27 NOMURA add draw border related to att:colsep, att:rowsep-->
	<xsl:element name="div">
	
	
		<xsl:attribute name="style"><xsl:if test="../@rowsep=1 or ../@colsep=1">padding:6px; border: solid 1px #000000;</xsl:if></xsl:attribute>
	
	<!--end add-->

		<xsl:choose>
			<xsl:when test="$gtype = 'swf'">
			<xsl:element name="object">

				<xsl:attribute name="classid">clsid:D27CDB6E-AE6D-11cf-96B8-444553540000</xsl:attribute>
				<xsl:attribute name="height">
					<xsl:value-of select="$displayheight" />
				</xsl:attribute>
				
				<xsl:attribute name="width">
						<xsl:value-of select="$displaywidth" />
				</xsl:attribute>

				<param name="movie" value="{$gpath}{$gname}.swf" />
				<param name="quality" value="high" />

				<xsl:element name="embed">
					<xsl:attribute name="src">
						<xsl:value-of select="$gpath" />
						<xsl:value-of select="$gname" />
						<xsl:text>.swf</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="quality">high</xsl:attribute>
					<xsl:attribute name="type">application/x-shockwave-flash</xsl:attribute>
					<xsl:attribute name="height">
						<xsl:value-of select="$displayheight" />
					</xsl:attribute>
					<xsl:attribute name="width">
							<xsl:value-of select="$displaywidth" />
					</xsl:attribute>
				</xsl:element>
				
			</xsl:element>
		
			</xsl:when>
			<xsl:when test="$gtype = 'jpg'">
				<xsl:element name="img">
					<xsl:attribute name="src">
						<xsl:value-of select="$gpath" />
						<xsl:value-of select="$gname" />
						<xsl:text>.jpg</xsl:text>
					</xsl:attribute>
					<xsl:if test="number(translate($displaywidth,'px','')) &lt;= number(translate($displayheight,'px',''))">
					  <xsl:attribute name="width">
						<xsl:value-of select="$displaywidth" />
					  </xsl:attribute>
					</xsl:if>
					<xsl:if test="number(translate($displaywidth,'px','')) &gt; number(translate($displayheight,'px',''))">
					  <xsl:attribute name="height">
						<xsl:value-of select="$displayheight" />
					  </xsl:attribute>
					</xsl:if>
					<xsl:attribute name="alt">img</xsl:attribute>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>Error!: Graphic type unknown.</xsl:otherwise>
		</xsl:choose>

	<!--2003.06.27 NOMURA add-->
	</xsl:element>
	<!--end add-->

		<div style="text-align: center;">
		<xsl:element name="a">
			<xsl:attribute name="href">
				<xsl:text>javascript: expandImage('</xsl:text>
				<xsl:choose>
					<xsl:when test="$gtype = 'swf'">
						<xsl:value-of select="$gpath" />
						<xsl:value-of select="$gname" />
						<xsl:text>.swf</xsl:text>
					</xsl:when>
					<xsl:when test="$gtype = 'jpg'">
						<xsl:value-of select="$gpath" />
						<xsl:value-of select="$gname" />
						<xsl:text>.jpg</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$gpath" />
						<xsl:value-of select="$gname" />
						<xsl:text>.jpg</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:text>','</xsl:text>
				<xsl:value-of select="$gtype" />
				<xsl:text>')</xsl:text>
			</xsl:attribute>
			<img class="expandicon" src="../icon/zoom.gif" width="30px" title="Expand image" border="0"/>
		</xsl:element>
		</div>
</xsl:template>

<!-- callout -->

<xsl:template match="callout">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">callout</xsl:attribute>
	<xsl:apply-templates />
	</xsl:element>
</xsl:template>


<!-- symbol -->

<xsl:template match="symbol">
<xsl:choose>
	<xsl:when test="@type='chara'">
		<xsl:element name="img">
			<xsl:attribute name="class">symbol</xsl:attribute>
			<xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="src">../icon/<xsl:value-of select="@name"/>.png</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
	</xsl:when>
	<xsl:otherwise>
		<xsl:element name="img">
			<xsl:attribute name="class">symbol</xsl:attribute>
			<xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="src">../symbol/<xsl:value-of select="@name"/>.png</xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
			<xsl:attribute name="alt">icon</xsl:attribute>
		</xsl:element>
	</xsl:otherwise>
</xsl:choose>
</xsl:template>

<!-- spec -->

<xsl:template match="spec">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">spec</xsl:attribute>
	<xsl:apply-templates />
	</xsl:element>
</xsl:template>


<!-- TABLE -->
<!-- table -->

<xsl:template match="table">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">table</xsl:attribute>
	<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- tgroup -->

<xsl:template match="tgroup">
	<xsl:value-of select="$newline"/>
	<xsl:element name="table">
		<xsl:choose>
			<xsl:when test="../@frame='none'">
				<xsl:attribute name="class">noframe</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="class">frame</xsl:attribute>
			</xsl:otherwise>
		</xsl:choose>
		
		<xsl:attribute name="cellspacing">0</xsl:attribute>
		<xsl:attribute name="cellpadding">3</xsl:attribute>
		
		<xsl:variable name="totalwidth">
 			<xsl:call-template name="sumWidth">
				<xsl:with-param name="index" select="1" />
				<xsl:with-param name="columns" select="count(colspec)" />
				<xsl:with-param name="cols" select="colspec" />
				<xsl:with-param name="runningwidth" select="0" />
			</xsl:call-template>
		</xsl:variable>
		
		<xsl:attribute name="width">
			<xsl:choose>
				<xsl:when test="../@pgwide='1'">
					<xsl:text>99%</xsl:text>
				</xsl:when>
				<xsl:when test="round($totalwidth div 7.205 * 100 * 1.7)&gt;='100'">
					<xsl:text>99%</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="round($totalwidth div 7.205 * 100 * 1.7)" />
					<xsl:text>%</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>

		<xsl:if test="../parent::callout">
			<xsl:attribute name="align">center</xsl:attribute>
		</xsl:if>
		
		<xsl:for-each select="colspec">
			<xsl:element name="col">
				<xsl:variable name="colwidth">
					<xsl:value-of select="substring-before(@colwidth, 'in')" />
				</xsl:variable>
				<xsl:attribute name="width">
					<xsl:value-of select="round($colwidth div $totalwidth * 100)" />
					<xsl:text>%</xsl:text>
				</xsl:attribute>
			</xsl:element>
		</xsl:for-each>

		<xsl:apply-templates />
	</xsl:element>
</xsl:template>


<xsl:template name="sumWidth">
	<xsl:param name="index" />
	<xsl:param name="columns" />
	<xsl:param name="cols" />
	<xsl:param name="runningwidth" />
	<xsl:variable name="colwidth">
		<xsl:value-of select="substring-before($cols[$index]/@colwidth, 'in')" />
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="$index &lt;= $columns">
 			<xsl:call-template name="sumWidth">
				<xsl:with-param name="index" select="$index+1" />
				<xsl:with-param name="columns" select="$columns" />
				<xsl:with-param name="cols" select="$cols" />
				<xsl:with-param name="runningwidth" 
					select="$runningwidth+$colwidth" />
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$runningwidth" />
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<!-- thead -->

<xsl:template match="thead">
	<xsl:apply-templates />
</xsl:template>

<!-- tbody -->

<xsl:template match="tbody">
		<xsl:apply-templates />
</xsl:template>

<!-- row -->

<xsl:template match="row">
	<xsl:value-of select="$newline"/>
	<xsl:element name="tr">
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- entry -->

<xsl:template match="entry">
	<xsl:value-of select="$newline"/>

	<xsl:variable name="celltype">
		<xsl:choose>
			<xsl:when test = "ancestor::thead">th</xsl:when>
			<xsl:otherwise>td</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<xsl:element name="{$celltype}">
		<xsl:choose>
		<xsl:when test = "@valign">
			<xsl:attribute name="valign">
				<xsl:value-of select="@valign"/>
			</xsl:attribute>
		</xsl:when>
		<xsl:otherwise>
			<xsl:attribute name="valign">top</xsl:attribute>
		</xsl:otherwise>
	</xsl:choose>
		
		<xsl:choose>
			<xsl:when test = "@align">
				<xsl:attribute name="align">
					<xsl:value-of select="@align"/>
				</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test = "ancestor::thead">
						<xsl:attribute name="align">center</xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="align">left</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>

		<xsl:if test="@morerows">
			<xsl:attribute name="rowspan">
				<xsl:value-of select="@morerows + 1"/>
			</xsl:attribute>
		</xsl:if>

		<xsl:if test="@nameend">
			<xsl:attribute name="colspan">
				<xsl:value-of select="@nameend - @namest + 1"/>
			</xsl:attribute>
		</xsl:if>
		
		<xsl:attribute name="class">
			<xsl:if test="ancestor::callout">
				<xsl:text>c</xsl:text>
			</xsl:if>
			<xsl:text>t_cell</xsl:text>
		</xsl:attribute>

<xsl:variable name="styles">
<xsl:choose>
	<xsl:when test="ancestor::table/@frame='all'">
		<xsl:choose>
			<xsl:when test="not(@border-top = '0')">
				<xsl:if test="count(../../preceding-sibling::thead) = 0 and count(../preceding-sibling::row) = 0">
						<xsl:text>border-top-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-top-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="not(@border-right = '0')">
				<xsl:if test="@colname = ancestor::tgroup/@cols">
						<xsl:text>border-right-width:2px;</xsl:text>
				</xsl:if>
				<xsl:if test="@nameend = ancestor::tgroup/@cols">
						<xsl:text>border-right-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-right-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="not(@border-bottom = '0')">
				<xsl:if test="ancestor::tbody and count(../following-sibling::row) = 0 or count(../following-sibling::row) = @morerows">
						<xsl:text>border-bottom-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-bottom-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="not(@border-left = '0')">
				<xsl:if test="@colname = '1' or @namest = '1'">
						<xsl:text>border-left-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-left-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:when>
<!--	<xsl:when test="ancestor::table/@frame='none'"> -->
	<xsl:otherwise>
		<xsl:choose>
			<xsl:when test="@border-top = '1'">
				<xsl:if test="count(../../preceding-sibling::thead) = 0 and count(../preceding-sibling::row) = 0">
						<xsl:text>border-top-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-top-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@border-right = '1'">
				<xsl:if test="@colname = ancestor::tgroup/@cols">
						<xsl:text>border-right-width:2px;</xsl:text>
				</xsl:if>
				<xsl:if test="@nameend = ancestor::tgroup/@cols">
						<xsl:text>border-right-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-right-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@border-bottom = '1'">
				<xsl:if test="ancestor::tbody and count(../following-sibling::row) = 0 or count(../following-sibling::row) = @morerows">
						<xsl:text>border-bottom-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-bottom-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@border-left = '1'">
				<xsl:if test="@colname = '1' or @namest = '1'">
						<xsl:text>border-left-width:2px;</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>border-left-width:0px;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	<!-- </xsl:when> -->
	</xsl:otherwise>
</xsl:choose>
	<xsl:if test="ancestor::thead and ancestor::table/@frame = 'all'">
		<xsl:if test="@border-top = '0' or @border-left = '0' or @border-right = '0'">
			<xsl:if test="normalize-space(.) = ''">
					<xsl:text>background-color:white;</xsl:text>
			</xsl:if>
		</xsl:if>
	</xsl:if>
	<!-- Add style to stop symbol and text breaking in Firefox -->
	<xsl:if test="ancestor::callout or ancestor::callout-l">
		<xsl:if test="count(.//symbol)!=0 and string-length(.//*)&lt;16">
				<xsl:text>white-space:pre;</xsl:text>
		</xsl:if>
	</xsl:if>
</xsl:variable>


		
		<xsl:if test="$styles != ''">
			<xsl:attribute name="style">
				<xsl:value-of select="$styles"/>
			</xsl:attribute>
		</xsl:if>
		
		<xsl:choose>
			<xsl:when test="node()">
				<xsl:apply-templates />
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>&#160;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>

	</xsl:element>
</xsl:template>

<xsl:template match="entry/title">
	<xsl:element name="div">
		<xsl:attribute name="class">celltitle</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<xsl:template match="entry/ptxt">
	<xsl:variable name="sst">
		<xsl:choose>
			<xsl:when test="ancestor::servinfo[@svcinfotypenbr='11' and @svcinfoqualnbr='S']">
				<xsl:choose>
					<xsl:when test="string(number(substring(text(), 1, 5)))='NaN'">0</xsl:when>
					<xsl:otherwise>1</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="$sst='1'">
			<xsl:element name="a">
				<xsl:attribute name="class">toollink</xsl:attribute>
				<xsl:attribute name="href">
					<xsl:text>javascript: showTool('</xsl:text>
					<xsl:value-of select="translate(text(),'&#8211;','-')"/>
					<xsl:text>')</xsl:text>
				</xsl:attribute>
				<xsl:apply-templates select="text()"/>
			</xsl:element>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates />
			<xsl:choose>
				<xsl:when test="ancestor::table[@tabletype='tool']">
					<xsl:if test="name(following-sibling::*[1])='ptxt' and normalize-space(following-sibling::*[1]) = '' and count(following-sibling::*[1]/intxreftitleoff)!='0'">
						<br/>
					</xsl:if>
					<xsl:if test="normalize-space(.) = ''">
						<xsl:text>&#160;</xsl:text>
					</xsl:if>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="normalize-space(.) = ''">
						<xsl:choose>
							<xsl:when test="symbol">
								<xsl:text></xsl:text>
							</xsl:when>
							<xsl:otherwise>
								<xsl:text>&#160;</xsl:text>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if test="following-sibling::ptxt">
						<br/>
					</xsl:if>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<!-- PL -->
<!-- attention1 -->

<xsl:template match="attention1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">warning</xsl:attribute>
		<img class="attenmark" src="../../icon/attenmark.gif" width="16px" border="0"/>
		<xsl:call-template name="getUI_strWarning">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>

<!-- attention2 -->

<xsl:template match="attention2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">caution</xsl:attribute>
		<img class="attenmark" src="../../icon/attenmark.gif" width="16px" border="0"/>
		<xsl:call-template name="getUI_strCaution">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>

<!-- attention3 -->

<xsl:template match="attention3">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">note</xsl:attribute>
		<xsl:call-template name="getUI_strNote">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>

<!-- attention4 -->

<xsl:template match="attention4">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">notice</xsl:attribute>
		<xsl:element name="div">
			<xsl:attribute name="style">font-style:italic;</xsl:attribute>
			<xsl:call-template name="getUI_strNotice">
				<xsl:with-param name="lang" select="$UI_lang"/>
			</xsl:call-template>
		</xsl:element>
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="style">margin-left:16px;</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
	</xsl:element>
</xsl:template>


<!-- steps -->
<!-- s1 -->

<xsl:template match="s1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">s1</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">s1num</xsl:attribute>
				<xsl:call-template name="countS1">
					<xsl:with-param name="current" select="1"/>
					<xsl:with-param name="offset" select="0"/>
				</xsl:call-template>
				<xsl:text>)</xsl:text>
			</xsl:element>
			<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
			<xsl:apply-templates select="paragroup|ptxt|list1|torque|spec|spec-sdm|sd2|materials|servicetool|figure|deflist|table|attention1|attention2|attention3|attention4|s2"/>
	</xsl:element>
</xsl:template>

<xsl:template match="s1/ptxt">
	<xsl:apply-templates />
	<xsl:if test="following-sibling::ptxt">
		<br/>
	</xsl:if>
</xsl:template>

<xsl:template name="countS1">
	<xsl:param name="current"/>
	<xsl:param name="offset"/>
	<xsl:choose>
		<xsl:when test="count(preceding-sibling::*) = $offset">
			<xsl:value-of select="$current - $offset"/>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) = 'title'">
			<xsl:value-of select="$current - $offset"/>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) = 'attention1' or name(preceding-sibling::*[$current]) = 'attention2' or name(preceding-sibling::*[$current]) = 'attention3' or name(preceding-sibling::*[$current]) = 'attention4' or name(preceding-sibling::*[$current]) = 'figure' or name(preceding-sibling::*[$current]) = 'ptxt'">
			<xsl:value-of select="$current - $offset"/>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) = 's1'">
			<xsl:call-template name="countS1">
				<xsl:with-param name="current" select="$current + 1"/>
				<xsl:with-param name="offset" select="$offset"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) != 's1'">
			<xsl:call-template name="countS1">
				<xsl:with-param name="current" select="$current + 1"/>
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$current - $offset"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- s2 -->

<xsl:template match="s2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">s2</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">s2num</xsl:attribute>
				<xsl:call-template name="countS2">
					<xsl:with-param name="current" select="1"/>
					<xsl:with-param name="offset" select="0"/>
				</xsl:call-template>
				<xsl:text>)</xsl:text>
			</xsl:element>
			<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
			<xsl:apply-templates select="paragroup|ptxt|list1|torque|spec|spec-sdm|sd2|materials|servicetool|figure|deflist|table|attention1|attention2|attention3|attention4|s3"/>
	</xsl:element>
</xsl:template>

<xsl:template match="s2/ptxt">
	<xsl:apply-templates />
	<br/>
</xsl:template>

<xsl:template name="countS2">
	<xsl:param name="current"/>
	<xsl:param name="offset"/>
	<xsl:choose>
		<xsl:when test="name(preceding-sibling::*[$current]) = 'attention1' or name(preceding-sibling::*[$current]) = 'attention2' or name(preceding-sibling::*[$current]) = 'attention3' or name(preceding-sibling::*[$current]) = 'attention4' or name(preceding-sibling::*[$current]) = 'figure' or name(preceding-sibling::*[$current]) = 'ptxt'">
			<xsl:number value="$current - $offset" format="a"/>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) = 's2'">
			<xsl:call-template name="countS2">
				<xsl:with-param name="current" select="$current + 1"/>
				<xsl:with-param name="offset" select="$offset"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) != 's2'">
			<xsl:call-template name="countS2">
				<xsl:with-param name="current" select="$current + 1"/>
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:number value="$current - $offset" format="a"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- s3 -->

<xsl:template match="s3">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">s3</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">s3num</xsl:attribute>
				<xsl:call-template name="countS3">
					<xsl:with-param name="current" select="1"/>
					<xsl:with-param name="offset" select="0"/>
				</xsl:call-template>
				<xsl:text>)</xsl:text>
			</xsl:element>
			<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
			<xsl:apply-templates select="paragroup|ptxt|list1|torque|spec|spec-sdm|sd2|materials|servicetool|figure|deflist|table|attention1|attention2|attention3|attention4"/>
	</xsl:element>
</xsl:template>

<xsl:template match="s3/ptxt">
	<xsl:apply-templates />
	<br/>
</xsl:template>

<xsl:template name="countS3">
	<xsl:param name="current"/>
	<xsl:param name="offset"/>
	<xsl:choose>
		<xsl:when test="name(preceding-sibling::*[$current]) = 'attention1' or name(preceding-sibling::*[$current]) = 'attention2' or name(preceding-sibling::*[$current]) = 'attention3' or name(preceding-sibling::*[$current]) = 'attention4' or name(preceding-sibling::*[$current]) = 'figure' or name(preceding-sibling::*[$current]) = 'ptxt'">
			<xsl:number value="$current - $offset" format="i"/>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) = 's3'">
			<xsl:call-template name="countS3">
				<xsl:with-param name="current" select="$current + 1"/>
				<xsl:with-param name="offset" select="$offset"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:when test="name(preceding-sibling::*[$current]) != 's3'">
			<xsl:call-template name="countS3">
				<xsl:with-param name="current" select="$current + 1"/>
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:number value="$current - $offset" format="i"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<!-- list -->
<!-- list1 -->

<xsl:template match="list1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">list</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<xsl:template match="list1/item">
	<xsl:element name="span">
		<xsl:attribute name="class">listnum</xsl:attribute>
		<xsl:choose>
			<xsl:when test = "../@type='unordered'">
				<xsl:text>&#8226;</xsl:text>
			</xsl:when>
			<xsl:when test = "../@type='ordered'">
				<xsl:number level="single" from="list1" count="item" format="1."/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>&#8226;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
	<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
	<xsl:apply-templates />
</xsl:template>

<!-- list2 -->

<xsl:template match="list2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">list</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<xsl:template match="list2/item">
	<xsl:element name="span">
		<xsl:attribute name="class">listnum</xsl:attribute>
		<xsl:choose>
			<xsl:when test = "../@type='unordered'">
				<xsl:text>&#8212;</xsl:text>
			</xsl:when>
			<xsl:when test = "../@type='ordered'">
				<xsl:number level="single" from="list1" count="item" format="a."/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>&#8212;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
	<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
	<xsl:apply-templates />
</xsl:template>


<!-- list3 -->

<xsl:template match="list3">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">list</xsl:attribute>
			<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<xsl:template match="list3/item">
	<xsl:element name="span">
		<xsl:attribute name="class">listnum</xsl:attribute>
		<xsl:choose>
			<xsl:when test = "../@type='unordered'">
				<xsl:text>&#8212;</xsl:text>
			</xsl:when>
			<xsl:when test = "../@type='ordered'">
				<xsl:number level="single" from="list1" count="item" format="i."/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>&#8212;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
	<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
	<xsl:apply-templates />
</xsl:template>


<!-- item -->

<xsl:template match="item">
	<xsl:apply-templates />
</xsl:template>


<xsl:template match="item/ptxt">
	<xsl:apply-templates />
	<br/>
</xsl:template>


<!-- diag -->

<xsl:template match="diag">
	<xsl:value-of select="$newline"/>
	<xsl:choose>
		<xsl:when test = "@type='condition'">
	<table width="100%" class="diagcond">
		<xsl:attribute name="id">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
		<tr>
			<th width="30%">
				<xsl:call-template name="getUI_strCondition">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
			<th width="35%">
				<xsl:call-template name="getUI_strPosCause">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
			<th width="35%">
				<xsl:call-template name="getUI_strCondAction">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
			</tr>
			<xsl:for-each select="action">
	<xsl:value-of select="$newline"/>
				<xsl:variable name="these-conds"
	select="key('kDistinctCondActions',generate-id(preceding-sibling::condition[1]))"/>
				<tr>
					<xsl:if test="generate-id() = generate-id($these-conds)">
						<td class="cond" align="left" valign="top" rowspan="{count($these-conds)}">
							<xsl:apply-templates select="preceding-sibling::condition[1]"/>
						</td>
					</xsl:if>
					<xsl:if test="name(preceding-sibling::*[1]) = 'ps'">
						<xsl:variable name="total_actions">
							<xsl:choose>
								<xsl:when test="name(following-sibling::*[1]) = 'action'">
									<xsl:call-template name="countPsActions">
										<xsl:with-param name="current" select="1"/>
										<xsl:with-param name="offset" select="0"/>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>1</xsl:otherwise>
							</xsl:choose>
						</xsl:variable>
						<td class="ps" align="left" valign="top">
							<xsl:if test="$total_actions != 1">
								<xsl:attribute name="rowspan">
									<xsl:value-of select="$total_actions"/>
								</xsl:attribute>
							</xsl:if>
							<xsl:apply-templates select="preceding-sibling::*[1]"/>
						</td>
					</xsl:if>
					<td class="action" align="left" valign="top">
						<xsl:apply-templates />
					</td>
				</tr>
			</xsl:for-each>
		</table>
		<br/>
		</xsl:when>
		<xsl:when test = "@type='test'">
		<table width="98%" class="diagtest" cellspacing="0px">
		<xsl:attribute name="id">
			<xsl:value-of select="@id"/>
		</xsl:attribute>
	<xsl:value-of select="$newline"/>
		<tr>
			<th width="50px">
				<xsl:call-template name="getUI_strStep">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
			<th width="45%">
				<xsl:call-template name="getUI_strTestAction">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
			<th width="25%">
				<xsl:call-template name="getUI_strYes">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
			<th width="25%">
				<xsl:call-template name="getUI_strNo">
					<xsl:with-param name="lang" select="$UI_lang"/>
				</xsl:call-template>
			</th>
		</tr>
		<xsl:apply-templates select="testgroup"/>
		</table>
		</xsl:when>
		<xsl:otherwise>
		Diag type not specified.<br/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template name="countPsActions">
	<xsl:param name="current"/>
	<xsl:choose>
		<xsl:when test="name(following-sibling::*[$current + 1]) = 'action'">
			<xsl:call-template name="countPsActions">
				<xsl:with-param name="current" select="$current + 1"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$current + 1"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<!-- testgroup -->

<xsl:template match="testgroup">
	<xsl:value-of select="$newline"/>
	<xsl:element name="tr">
	<xsl:value-of select="$newline"/>
		<xsl:element name="td">
			<xsl:attribute name="class">teststepnum</xsl:attribute>
			<xsl:attribute name="id">
				<xsl:value-of select="@id"/>
			</xsl:attribute>
			<xsl:number level="single" from="diag" count="testgroup" format="1"/>
		</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:element name="td">
			<xsl:attribute name="class">testaction</xsl:attribute>
			<xsl:apply-templates select="title|s1|paragroup|ptxt|list1|testfigure|deflist|torque|spec|spec-sdm|sd2|materials|servicetool|test1|question" />
		</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:element name="td">
			<xsl:attribute name="class">testyes</xsl:attribute>
			<xsl:apply-templates select="action[1]"/>
		</xsl:element>
	<xsl:value-of select="$newline"/>
		<xsl:element name="td">
			<xsl:attribute name="class">testno</xsl:attribute>
			<xsl:apply-templates select="action[2]"/>
		</xsl:element>
	</xsl:element>
</xsl:template>

<!-- teststeps -->
<!-- test1 -->

<xsl:template match="test1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">test1</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">test1num</xsl:attribute>
				<xsl:number level="single" count="test1" format="1)"/>
			</xsl:element>
	<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
		<xsl:choose>
			<xsl:when test="name(*[1]) = 'paragroup'">
				<xsl:apply-templates select="paragroup[1]/ptxt[1]"/>
				<xsl:value-of select="$newline"/>
				<xsl:element name="div">
					<xsl:attribute name="class">paragroup</xsl:attribute>
					<xsl:apply-templates select="paragroup/title|paragroup/figure|paragroup/torque|paragroup/spec|paragroup/materials|paragroup/servicetool|paragroup/attention1|paragroup/attention2|paragroup/attention3|paragroup/attention4|paragroup/ptxt[count(preceding-sibling::*) &gt; 0]"/>
				</xsl:element>
				<xsl:apply-templates select="torque|spec|spec-sdm|sd2|materials|servicetool|paragroup[count(preceding-sibling::paragroup) &gt; 0]|ptxt|testfigure|list1|test2"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="torque|spec|spec-sdm|sd2|materials|servicetool|paragroup|ptxt|testfigure|list1|test2"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
</xsl:template>

<xsl:template match="test1/ptxt">
	<xsl:apply-templates />
	<xsl:if test="following-sibling::ptxt">
		<br/>
	</xsl:if>
</xsl:template>

<xsl:template match="test1/paragroup[count(preceding-sibling::*) = 0]/ptxt[count(preceding-sibling::*) = 0]">
	<xsl:apply-templates />
	<xsl:if test="following-sibling::ptxt">
		<br/>
	</xsl:if>
</xsl:template>

<!-- test2 -->

<xsl:template match="test2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">test2</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">test2num</xsl:attribute>
				<xsl:number level="single" count="test2" format="a)"/>
			</xsl:element>
			<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
			<xsl:apply-templates select="torque|spec|spec-sdm|sd2|materials|servicetool|paragroup|ptxt|testfigure|list1|test3"/>
	</xsl:element>
</xsl:template>

<xsl:template match="test2/ptxt">
	<xsl:apply-templates />
	<xsl:if test="following-sibling::ptxt">
		<br/>
	</xsl:if>
</xsl:template>

<!-- test3 -->

<xsl:template match="test3">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">test2</xsl:attribute>
			<xsl:element name="span">
				<xsl:attribute name="class">s2num</xsl:attribute>
				<xsl:number level="single" count="test3" format="i)"/>
			</xsl:element>
		<xsl:if test="$UI_lang = 'jp'"><xsl:text>&#160;</xsl:text></xsl:if>
			<xsl:apply-templates select="torque|spec|spec-sdm|sd2|materials|servicetool|paragroup|ptxt|testfigure|list1"/>
	</xsl:element>
</xsl:template>

<xsl:template match="test3/ptxt">
	<xsl:apply-templates />
	<xsl:if test="following-sibling::ptxt">
		<br/>
	</xsl:if>
</xsl:template>

<!-- question -->

<xsl:template match="question">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">question</xsl:attribute>
			<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|intxreftitleoff1|symbol|link"/>
	</xsl:element>
</xsl:template>

<!-- action -->

<xsl:template match="action">
	<xsl:apply-templates />
</xsl:template>

<!-- deflist -->

<xsl:template match="deflist">
	<xsl:value-of select="$newline"/>
	<table class="deflist">
	<tr><td colspan="2" class="deflistborder">.</td></tr>
	<xsl:for-each select="term">
		<tr>
			<td class="term" width="15%">
				<xsl:attribute name="id">
					<xsl:value-of select="@id"/>
				</xsl:attribute>
				<xsl:apply-templates select="text()|emph|sub|sup|intxref|intxrefpoff|intxreftitleoff|intxreftitleoff1|symbol"/>
			</td>
			<td class="def">
				<xsl:apply-templates select="following-sibling::def[1]"/>
			</td>
		</tr>
		<tr><td colspan="2" class="deflistborder">.</td></tr>
	</xsl:for-each>
	</table>
</xsl:template>

<xsl:template match="def/ptxt">
	<xsl:apply-templates />
	<br/>
</xsl:template>


<!-- decoration -->
<!-- sub -->

<xsl:template match="sub">
	<xsl:element name="sub">
		<xsl:attribute name="class">sub</xsl:attribute>
		<xsl:value-of select="normalize-space(.)"/>
	</xsl:element>
</xsl:template>

<!-- sup -->

<xsl:template match="sup">
	<xsl:element name="sup">
		<xsl:attribute name="class">sup</xsl:attribute>
		<xsl:value-of select="normalize-space(.)"/>
	</xsl:element>
</xsl:template>

<!-- emph -->

<xsl:template match="emph">
	<xsl:element name="span">
		<xsl:attribute name="class">
			<xsl:choose>
				<xsl:when test="@etype">
					<xsl:value-of select="@etype"/>
				</xsl:when>
				<xsl:otherwise>bold</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- links -->

<xsl:template match="intxref">
	<xsl:variable name="target">
		<xsl:value-of select="@refid"/>
	</xsl:variable>
	<xsl:element name="a">
		<xsl:attribute name="href">
			<xsl:text>javascript: xref_simple('</xsl:text>
			<xsl:value-of select="@refid"/>
			<xsl:text>')</xsl:text>
		</xsl:attribute>
		<xsl:choose>
			<xsl:when test = "text()">
				<xsl:value-of select="normalize-space(.)"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="docPath">
					<xsl:text>webdocstructure_</xsl:text>
					<xsl:value-of select="substring(@refid,9,2)"/>
					<xsl:text>.xml</xsl:text>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test = "string-length(@refid) &gt;= 15">
						<xsl:choose>
							<xsl:when test = "document($docPath, .)">
								<xsl:value-of select="document($docPath, .)//s[@i = $target]/@t"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:text>_</xsl:text>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>_</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
</xsl:template>

<xsl:template match="intxrefpoff">
	<xsl:variable name="target">
		<xsl:value-of select="@refid"/>
	</xsl:variable>
	<xsl:element name="a">
		<xsl:attribute name="class">poff</xsl:attribute>
		<xsl:attribute name="href">
			<xsl:text>javascript: xref_simple('</xsl:text>
			<xsl:value-of select="@refid"/>
			<xsl:text>')</xsl:text>
		</xsl:attribute>

		<xsl:call-template name="getUI_strReference">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
		<xsl:choose>
			<xsl:when test = "text()">
				<xsl:value-of select="normalize-space(.)"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="docPath">
					<xsl:text>webdocstructure_</xsl:text>
					<xsl:value-of select="substring(@refid,9,2)"/>
					<xsl:text>.xml</xsl:text>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test = "string-length(@refid) &gt;= 15">
						<xsl:choose>
							<xsl:when test = "document($docPath, .)">
								<xsl:value-of select="document($docPath, .)//s[@i = $target]/@t"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:text>_</xsl:text>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>_</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
</xsl:template>

<xsl:template match="intxreftitleoff|intxreftitleoff1">
	<xsl:element name="a">
		<xsl:attribute name="class">titleoff</xsl:attribute>
		<xsl:attribute name="href">
			<xsl:text>javascript: xref('</xsl:text>
			<xsl:value-of select="@refid"/>
			<xsl:text>')</xsl:text>
		</xsl:attribute>
		<img src="../../icon/intxreftitleoff.png" alt="icon"/>
		<xsl:choose>
			<xsl:when test = "name(following-sibling::*[1])='intxreftitleoff' or name(following-sibling::*[1])='intxreftitleoff1'">
				<xsl:text> </xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>&#160;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:element>
</xsl:template>

<xsl:template match="text()">
<!-- the method used here is to remove the return characters in the text nodes of the instance data, which are treated as whitespace in the transformation and subsequently displayed as a single space in the browser. -->
	<xsl:variable name="txtstring"><xsl:value-of select="."/></xsl:variable>
<xsl:choose>
	<xsl:when test = "system-property('xsl:vendor')='Transformiix'">
<xsl:variable name="ffCR"><xsl:text>
</xsl:text></xsl:variable>
		<xsl:value-of select="translate($txtstring, $ffCR, '')"/>
	</xsl:when>
	<xsl:otherwise>
		<xsl:if test="normalize-space($txtstring)=''"><xsl:text>&#160;</xsl:text></xsl:if>
		<xsl:variable name="CR">&#x000D;&#x000A;</xsl:variable>
		<xsl:value-of select="translate($txtstring, $CR, '')"/>
	</xsl:otherwise>
</xsl:choose>
</xsl:template>


<!-- New tags added November 2006 -->

<!-- poff --><!-- not displayed -->

<xsl:template match="poff">
</xsl:template>

<!-- scantool -->

<xsl:template match="scantool">
	<xsl:value-of select="$newline"/>
<xsl:element name="div">
	<xsl:attribute name="class">servinfosub</xsl:attribute>
		<xsl:apply-templates />
</xsl:element>
</xsl:template>

<!-- scantool-title -->

<xsl:template match="scantool-title">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">scantooltitle</xsl:attribute>
		<xsl:apply-templates select="text()"/>
	</xsl:element>
</xsl:template>

<!-- spec-sdm -->

<xsl:template match="spec-sdm">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">spec-sdm</xsl:attribute>
		<xsl:if test="@sdmid">
			<xsl:attribute name="id">
				<xsl:value-of select="@sdmid"/>
			</xsl:attribute>
		</xsl:if>
		<xsl:element name="div">
			<xsl:apply-templates select="sdm-title|sdm-part|sdm-model" />
		</xsl:element>
		<xsl:apply-templates select="sdm1" />
	</xsl:element>
</xsl:template>

<!-- sdm-title -->

<xsl:template match="sdm-title">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:attribute name="class">sdm-title</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sdm-part -->

<xsl:template match="sdm-part">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:text> </xsl:text>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sdm-model -->

<xsl:template match="sdm-model">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:text> (</xsl:text>
		<xsl:apply-templates />
		<xsl:text>)</xsl:text>
	</xsl:element>
</xsl:template>

<!-- sdm1 -->

<xsl:template match="sdm1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">sdm1</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sdm2 -->

<xsl:template match="sdm2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">sdm2</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sdm-condition -->

<xsl:template match="sdm-condition">
	<xsl:value-of select="$newline"/>
	<xsl:if test="parent::sdm2">
		<xsl:element name="span">
			<xsl:attribute name="class">sdm2mark</xsl:attribute>
			<xsl:choose>
			<xsl:when test="./text()='&#10;'">
				<xsl:text></xsl:text>
			</xsl:when>
			<xsl:when test="./text()!=''">
				<xsl:text>&#8226;</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text></xsl:text>
			</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:if>
	<xsl:element name="span">
		<xsl:apply-templates />
		<xsl:text>:</xsl:text>
	</xsl:element>
</xsl:template>

<!-- sdm-value -->

<xsl:template match="sdm-value">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:text> </xsl:text>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sdm-ptxt -->

<xsl:template match="sdm-ptxt">
</xsl:template>

<!-- sdm1/ptxt|sdm2/ptxt -->

<xsl:template match="sdm1/ptxt|sdm2/ptxt">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:text> (</xsl:text>
		<xsl:apply-templates />
		<xsl:text>)</xsl:text>
	</xsl:element>
</xsl:template>

<!-- sd2 -->

<xsl:template match="sd2">
	<xsl:value-of select="$newline"/>
	<xsl:choose>
		<xsl:when test="@display='off'">
			<xsl:element name="div">
				<xsl:attribute name="class">sd2</xsl:attribute>
				<xsl:attribute name="style">display:none;</xsl:attribute>
				<xsl:apply-templates select="sd2-title" />
				<xsl:apply-templates select="sd2-1" />
			</xsl:element>
		</xsl:when>
		<xsl:otherwise>
			<xsl:element name="div">
				<xsl:attribute name="class">sd2</xsl:attribute>
				<xsl:apply-templates select="sd2-title" />
				<xsl:apply-templates select="sd2-1" />
			</xsl:element>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- sd2-title -->

<xsl:template match="sd2-title">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:attribute name="class">sd2-title</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sd2-1 -->

<xsl:template match="sd2-1">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">sd2-1</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sd2-2 -->

<xsl:template match="sd2-2">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:attribute name="class">sd2-2</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sd2-condition -->

<xsl:template match="sd2-condition">
	<xsl:value-of select="$newline"/>
		<xsl:element name="span">
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- standard-on -->

<xsl:template match="standard-on">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:call-template name="getStr_Sd2Standard">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- standard-off -->

<xsl:template match="standard-off">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:attribute name="style">display:none;</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- limit-on -->

<xsl:template match="limit-on">
	<xsl:value-of select="$newline"/>
	<xsl:element name="div">
		<xsl:call-template name="getStr_Sd2Limit">
			<xsl:with-param name="lang" select="$UI_lang"/>
		</xsl:call-template>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- limit-off -->

<xsl:template match="limit-off">
	<xsl:value-of select="$newline"/>
	<xsl:element name="span">
		<xsl:attribute name="style">display:none;</xsl:attribute>
		<xsl:apply-templates />
	</xsl:element>
</xsl:template>

<!-- sd2-break -->

<xsl:template match="sd2-break">
	<xsl:value-of select="$newline"/>
	<xsl:element name="br">
	</xsl:element>
</xsl:template>


</xsl:stylesheet>




