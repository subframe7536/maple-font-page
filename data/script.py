# Source: https://github.com/subframe7536/maple-font/blob/variable/source/py/in_browser.py
_A='calt'
import io,json
from zipfile import ZipFile
from fontTools.ttLib import TTFont
MOVING_RULES=['ss03','ss07','ss08','ss09','ss10','ss11']
def get_freeze_config_str(config):
	A=''
	for(B,C)in sorted(config.items()):
		if C=='1':A+=f"+{B};"
		if C=='0'and B==_A or C=='-1':A+=f"-{B};"
	return A
def freeze_feature(font,moving_rules,config):
	R='GSUB';I=config;A=font;J=A[R].table.FeatureList;K=J.FeatureRecord;L={A.FeatureTag:(B,A.Feature)for(B,A)in enumerate(K)if A.FeatureTag!=_A};M=[A.Feature for A in K if A.FeatureTag==_A]
	if I.get(_A)!='1':
		for B in M:B.LookupListIndex.clear();B.LookupCount=0
	N=[]
	for(G,O)in I.items():
		if G not in L or O=='0':continue
		H,P=L[G]
		if O=='-1':N.append(H);continue
		if G in moving_rules:
			for B in M:B.LookupListIndex.extend(P.LookupListIndex)
		else:
			C=A['glyf'].glyphs;D=A['hmtx'].metrics
			for S in P.LookupListIndex:
				Q=getattr(A[R].table.LookupList.Lookup[S].SubTable[0],'mapping',None)
				if not Q:continue
				for(E,F)in Q.items():
					if E in C and E in D and F in C and F in D:C[E]=C[F];D[E]=D[F]
	for H in sorted(N,reverse=True):del J.FeatureRecord[H]
def set_font_name(font,name,id):font['name'].setName(name,nameID=id,platformID=3,platEncID=1,langID=1033)
def get_font_name(font,id):return font['name'].getName(nameID=id,platformID=3,platEncID=1,langID=1033).__str__()
def main(zip_path,target_path,config):
	C=config
	with ZipFile(zip_path,'r')as D,ZipFile(target_path,'w')as E:
		for A in D.infolist():
			F=A.filename
			if F.lower().endswith(('.ttf','.otf')):
				print(f"Patch: {F}")
				with D.open(A)as H:B=TTFont(H);I=get_freeze_config_str(C);freeze_feature(B,MOVING_RULES,C);set_font_name(B,get_font_name(B,3)+I,3);G=io.BytesIO();B.save(G);G.seek(0);E.writestr(A,G.read());B.close()
			else:print(f"Skip:  {F}");E.writestr(A,D.read(A))
		E.writestr('patch-in-browser.json',json.dumps({A:'freeze'if B=='1'else'ignore'for(A,B)in C.items()},indent=4));print('Write: patch-in-browser.json')
	print('Repack zip')