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
	S='GSUB';J=config;A=font;H=A[S].table.FeatureList;K=H.FeatureRecord;L={A.FeatureTag:(B,A.Feature)for(B,A)in enumerate(K)if A.FeatureTag!=_A};M=[A.Feature for A in K if A.FeatureTag==_A];N=J.get(_A)=='1'
	if not N:
		for B in M:B.LookupListIndex.clear();B.LookupCount=0
	O=[]
	for(I,P)in J.items():
		if I not in L or P=='0':continue
		C,Q=L[I]
		if P=='-1':O.append(C);continue
		if I in moving_rules and N:
			for B in M:B.LookupListIndex.extend(Q.LookupListIndex)
		else:
			D=A['glyf'].glyphs;E=A['hmtx'].metrics
			for T in Q.LookupListIndex:
				R=getattr(A[S].table.LookupList.Lookup[T].SubTable[0],'mapping',None)
				if not R:continue
				for(F,G)in R.items():
					if F in D and F in E and G in D and G in E:D[F]=D[G];E[F]=E[G]
	for C in sorted(O,reverse=True):H.FeatureRecord[C].Feature.LookupCount=0;H.FeatureRecord[C].Feature.LookupListIndex=[]
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