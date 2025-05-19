_A='calt'
import io,json
from zipfile import ZipFile
from fontTools.ttLib import TTFont
MOVING_RULES=['ss10','ss03','ss08','ss09','ss07','ss11']
def get_freeze_config_str(config):
	A=''
	for(B,C)in config.items():
		if C=='1':A+=f"+{B};"
		if C=='0'and B==_A:A+='-calt;'
	return A
def freeze_feature(font,moving_rules,config):
	N='GSUB';J=config;A=font;K=J.get(_A)=='1';G=A[N].table.FeatureList.FeatureRecord;O={A.FeatureTag:A.Feature for A in G if A.FeatureTag!=_A};L=[]
	if K:L=[A.Feature for A in G if A.FeatureTag==_A]
	else:
		for B in G:
			if B.FeatureTag==_A:B.Feature.LookupListIndex.clear();B.Feature.LookupCount=0;B.FeatureTag='DELT'
	for(M,P)in J.items():
		H=O.get(M)
		if not H or P=='0':continue
		if M in moving_rules and K:
			for Q in L:Q.LookupListIndex.extend(H.LookupListIndex)
		else:
			C=A['glyf'].glyphs;D=A['hmtx'].metrics
			for R in H.LookupListIndex:
				I=A[N].table.LookupList.Lookup[R].SubTable[0]
				if not I or'mapping'not in I.__dict__:continue
				for(E,F)in I.mapping.items():
					if E in C and E in D and F in C and F in D:C[E]=C[F];D[E]=D[F]
def set_font_name(font,name,id):font['name'].setName(name,nameID=id,platformID=3,platEncID=1,langID=1033)
def get_font_name(font,id):return font['name'].getName(nameID=id,platformID=3,platEncID=1,langID=1033).__str__()
def main(zip_path,target_path,config):
	D=config
	with ZipFile(zip_path,'r')as E,ZipFile(target_path,'w')as F:
		for A in E.infolist():
			C=A.filename
			if C.lower().endswith('.ttf')or C.lower().endswith('.otf'):
				print(f"Patch: {C}")
				with E.open(A)as H:I=H.read();J=io.BytesIO(I);B=TTFont(J);K=get_freeze_config_str(D);freeze_feature(B,MOVING_RULES,D);set_font_name(B,get_font_name(B,3)+K,3);G=io.BytesIO();B.save(G);F.writestr(A,G.getvalue());B.close()
			else:print(f"Skip:  {C}");F.writestr(A,E.read(A))
		F.writestr('patch-in-browser.json',json.dumps({A:'freeze'if B=='1'else'ignore'for(A,B)in D.items()},indent=4));print('Write: patch-in-browser.json')
	print('Repack zip')