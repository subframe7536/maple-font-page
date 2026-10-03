"""Create the small original font used by the browser worker integration test."""
from io import BytesIO
from pathlib import Path
from zipfile import ZipFile
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString

builder = FontBuilder(1000, isTTF=True)
builder.setupGlyphOrder(['.notdef', 'a', 'a.alt'])
builder.setupCharacterMap({97: 'a'})
glyphs = {}
for name in ['.notdef', 'a', 'a.alt']:
    pen = TTGlyphPen(None)
    if name != '.notdef':
        pen.moveTo((100, 0))
        pen.lineTo((400 if name == 'a' else 500, 0))
        pen.lineTo((400, 700))
        pen.closePath()
    glyphs[name] = pen.glyph()
builder.setupGlyf(glyphs)
builder.setupHorizontalMetrics({name: (600, 0) for name in glyphs})
builder.setupHorizontalHeader(ascent=800, descent=-200)
builder.setupNameTable({'familyName': 'Migration Test', 'styleName': 'Regular',
                       'uniqueFontIdentifier': 'MigrationTest-Regular',
                       'fullName': 'Migration Test Regular', 'psName': 'MigrationTest-Regular'})
builder.setupOS2(sTypoAscender=800, sTypoDescender=-200, usWinAscent=800, usWinDescent=200)
builder.setupPost()
addOpenTypeFeaturesFromString(builder.font, 'feature calt { sub a by a.alt; } calt; feature cv02 { sub a by a.alt; } cv02;')
font = BytesIO()
builder.font.save(font)
with ZipFile(Path(__file__).with_name('font.zip'), 'w') as archive:
    archive.writestr('MigrationTest.ttf', font.getvalue())
