import{r as e,t}from"./index-B88UAVlk.js";import{n,r,t as i}from"./icosahedron-CwaEMU68.js";function a(){let e=[],t=[0,0,0],a=[[-1,-1],[1,-1],[-1,1],[-1,1],[1,-1],[1,1]],o=(t,n,r,i,a,o,s=[0,0])=>e.push(...t,...n,...r,i,a,o,...s),s=(e,t,n,r,i,s)=>a.forEach(a=>o(e,t,n,r,i,s,a));for(let e of[.39,.62,.98])for(let[a,c]of n.entries()){let n=i[a];for(let i of c)o(r[i],t,n,e,a,0);for(let t=0;t<3;t++)s(r[c[t]],r[c[(t+1)%3]],n,e,a,1),e>.9&&s(r[c[t]],r[c[(t+1)%3]],n,e,a,2);e>.9&&s(t,t,n,e,a,3)}for(let e=0;e<12;e++)s([0,0,0],[1,0,0],t,0,e,4),s([1,0,0],[2,0,0],t,0,e,4),s(t,t,t,0,e,5);for(let e of[6,7,8,10])s(t,t,t,0,0,e);for(let e=0;e<6;e++){s(t,t,t,0,e,9);for(let n of[-1,e,(e+1)%6])o([n,0,0],t,t,0,0,11)}return new Float32Array(e)}var o=`
attribute vec3 a;attribute vec3 b;attribute vec3 center;attribute vec3 info;attribute vec2 corner;
uniform vec2 viewport;uniform vec4 scene;uniform vec4 pose;uniform float time;uniform float formation;
varying vec2 uv;varying vec4 color;varying vec4 shape;
float size;float heat;
vec3 rotate(vec3 p,float layer){
 float yaw=time*(layer>.9?.00018:-.00024),pitch=-.2+sin(time*.00033)*.07;
 vec3 v=vec3(p.x*cos(yaw)-p.z*sin(yaw),p.y,p.x*sin(yaw)+p.z*cos(yaw));
 v=vec3(v.x,v.y*cos(pitch)-v.z*sin(pitch),v.y*sin(pitch)+v.z*cos(pitch));
 vec3 t=2.*cross(pose.xyz,v);return v+pose.w*t+cross(pose.xyz,t);
}
vec2 project(vec3 p){return vec2(size*.5)+p.xy*size*.39*3.1/(3.8-p.z);}
vec2 mesh(vec3 p,float layer,vec3 c){
 if(layer<.9)p*=1.+sin(time*.014+dot(p,vec3(1.7,2.1,3.7)))*heat*.009;
 float spread=(1.-formation)*.42;vec2 q=project(rotate(p*layer,layer)+c*spread);
 vec2 mid=project(c*layer+c*spread);float seed=info.y+floor(layer*100.+.5);
 vec2 origin=scene.xy+(scene.zw-vec2(size))*.5;
 vec2 start=vec2(24.)+vec2(fract(seed*.61803398875),fract(seed*.75487766625))*(viewport-vec2(48.))-origin;
 float angle=(fract(seed*.41421356237)*2.-1.)*3.14159265*(1.-formation);
 vec2 d=q-mid;q=mid+vec2(d.x*cos(angle)-d.y*sin(angle),d.x*sin(angle)+d.y*cos(angle))+(start-mid)*(1.-formation);
 if(info.z==2.)q=mix(mid,q,.58);return q;
}
vec2 circuit(float segment,float index){
 float angle=index*3.14159265/6.+sin(time*.00023+index)*.025;
 float radius=segment<.5?.095+mod(index,3.)*.014:segment<1.5?.18+mod(index,2.)*.025+heat*.04:.255+mod(index,4.)*.012+heat*.08;
 if(segment>1.5)angle+=mod(index,2.)>.5?.16:-.16;
 return vec2(size*.5)+vec2(cos(angle),sin(angle))*size*radius;
}
void main(){
 size=min(scene.z,scene.w)*.9;heat=.10+sin(time*.0009)*.035;
 float layer=info.x,kind=info.z;vec2 p=vec2(0.);color=vec4(.4,.92,1.,formation);shape=vec4(0.);uv=vec2(0.);
 vec2 A;vec2 B;float line=.8;float glow=5.;bool stroke=false;float radius=0.;
 if(layer>0.){
  vec3 c=rotate(center,layer);float depth=.4+(c.z+1.)*.27;
  float strength=formation*(layer>.9?.9:layer>.5?.62:.48)*(.65+.35*formation)*depth;
  if(kind==0.){p=mesh(a,layer,c);color=vec4(mod(info.y,3.)==0.?vec3(.463,.639,1.):layer>.9?vec3(.149,.804,1.):vec3(.44,.55,1.),strength*(layer>.9?.13:.075));}
  else if(kind<3.){A=mesh(a,layer,c);B=mesh(b,layer,c);color=vec4(layer>.9?vec3(.4,.92,1.):vec3(.63,.72,1.),strength*(layer>.9?.78:.54+heat*.3));line=layer>.9?1.15:.8+heat*.5;stroke=true;if(kind==2.){color=vec4(.66,.97,1.,strength*.27*step(-.3,c.z));line=.55;glow=2.;}}
  else{p=mesh(center,layer,c);radius=max(.8,size*.0024);color=vec4(.87,.99,1.,strength*.55*step(-.3,c.z));}
 }else if(kind==4.){A=circuit(a.x,info.y);B=circuit(b.x,info.y);color=vec4(.36,.91,1.,formation*.48*(.18+mod(info.y,4.)*.045));line=.7;glow=3.;stroke=true;}
 else if(kind==5.){float t=fract(time*.00035+info.y*.083);p=mix(circuit(0.,info.y),circuit(2.,info.y),t);radius=max(1.,size*.0022);color=vec4(.81,.99,1.,formation*.35);}
 else if(kind==6.){p=vec2(size*.5,size*(.29+fract(time/1250.)*.42))+corner*vec2(size*.3,.7);uv=corner;shape.w=3.;color=vec4(.77,.98,1.,formation*.0792);}
 else if(kind==7.){p=vec2(size*.5);radius=size*(.018+(.38+heat)*.003)*3.4;color=vec4(.7,.97,1.,formation*.92);}
 else if(kind==8.){p=vec2(size*.5);radius=size*(.08+heat*.24);color=vec4(.41,.92,1.,formation*heat*.2);}
 else if(kind==9.){float angle=time*.00055+info.y*3.14159265/3.,r=size*(.018+(.38+heat)*.003);A=vec2(size*.5)+vec2(cos(angle),sin(angle))*r;angle+=3.14159265/3.;B=vec2(size*.5)+vec2(cos(angle),sin(angle))*r;color=vec4(.94,.99,1.,formation*.85);line=1.4;glow=5.;stroke=true;}
 else if(kind==11.){float angle=time*.00055+a.x*3.14159265/3.;p=vec2(size*.5);if(a.x>=0.)p+=vec2(cos(angle),sin(angle))*size*(.018+(.38+heat)*.003);color=vec4(.86,.98,1.,formation*.36);}
 else{p=vec2(size*.5);radius=size*(.08+heat*.24)*.38;uv=corner;shape.w=4.;color=vec4(.72,.98,1.,formation*heat*.16);}
 if(stroke){vec2 d=B-A;float len=max(.001,length(d));vec2 dir=d/len;float pad=line*.5+glow;uv=corner*vec2(len*.5+pad,pad);p=(A+B)*.5+dir*uv.x+vec2(-dir.y,dir.x)*uv.y;shape=vec4(len*.5,line*.5,glow,1.);}
 else if(radius>0.){p+=corner*radius;uv=corner;if(shape.w!=4.)shape.w=2.;}
 float breath=1.+sin(time*.0009)*.009;p=(p-vec2(size*.5))*breath+vec2(size*.5)+vec2(0.,sin(time*.00065)*size*.009);
 p+=scene.xy+(scene.zw-vec2(size))*.5;gl_Position=vec4(p/viewport*vec2(2.,-2.)+vec2(-1.,1.),0.,1.);
}`,s=`
precision highp float;uniform float pixel;varying vec2 uv;varying vec4 color;varying vec4 shape;
void main(){float alpha=1.;if(shape.w==1.){float d=length(vec2(max(abs(uv.x)-shape.x,0.),uv.y))-shape.y;float core=1.-smoothstep(-pixel*.65,pixel*.65,d);alpha=core+(1.-core)*exp(-max(d,0.)*max(d,0.)/max(shape.z*shape.z*.22,.01))*.16;}
else if(shape.w==2.)alpha=pow(max(0.,1.-length(uv)),2.)*1.7;
else if(shape.w==3.)alpha=max(0.,1.-abs(uv.x));
else if(shape.w==4.)alpha=1.-smoothstep(.01,.01+pixel*.08,abs(length(uv)-.96));
alpha=clamp(color.a*alpha,0.,1.);gl_FragColor=vec4(color.rgb*alpha,alpha);}`;function c(n){let r=n.getContext(`webgl`,{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0});if(!r)return null;let i=r.createProgram(),c=[];try{for(let[e,t]of[[r.VERTEX_SHADER,o],[r.FRAGMENT_SHADER,s]]){let n=r.createShader(e);if(c.push(n),r.shaderSource(n,t),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Unavailable shader`);r.attachShader(i,n)}if(r.linkProgram(i),!r.getProgramParameter(i,r.LINK_STATUS))throw Error(`Unavailable program`)}catch{return c.forEach(e=>r.deleteShader(e)),r.deleteProgram(i),r.getExtension(`WEBGL_lose_context`)?.loseContext(),null}c.forEach(e=>r.deleteShader(e)),r.useProgram(i);let l=r.createBuffer(),u=a(),d=Object.fromEntries([`viewport`,`scene`,`pose`,`time`,`formation`,`pixel`].map(e=>[e,r.getUniformLocation(i,e)]));r.bindBuffer(r.ARRAY_BUFFER,l),r.bufferData(r.ARRAY_BUFFER,u,r.STATIC_DRAW);let f=0;for(let[e,t]of[[`a`,3],[`b`,3],[`center`,3],[`info`,3],[`corner`,2]]){let n=r.getAttribLocation(i,e);r.enableVertexAttribArray(n),r.vertexAttribPointer(n,t,r.FLOAT,!1,56,f),f+=t*4}r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE);let p=!1;return{gpu:!0,resize(e,t,i,a,o,s){let c=Math.round(e*i),l=Math.round(t*i);n.width!==c&&(n.width=c),n.height!==l&&(n.height=l),r.viewport(0,0,c,l),r.uniform2f(d.viewport,e,t),r.uniform1f(d.pixel,1/i),r.uniform4f(d.scene,o.x,o.y,o.width,o.height),s&&this.paint(...s)},paint(n,i=1/0,a=e){p||(r.uniform1f(d.time,n),r.uniform1f(d.formation,t(i).outer),r.uniform4f(d.pose,...a),r.clear(r.COLOR_BUFFER_BIT),r.drawArrays(r.TRIANGLES,0,u.length/14))},dispose(){p||(p=!0,r.deleteBuffer(l),r.deleteProgram(i),r.getExtension(`WEBGL_lose_context`)?.loseContext())}}}export{c as createGpuHologram};