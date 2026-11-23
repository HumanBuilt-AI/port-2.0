/* Gold robot logo: a native WebGL minifigure (no libraries). Every 30 seconds it spins,
   on hover or keyboard focus its arms and legs swing, and it sleeps while off screen.
   Call initRobots() after mount; it upgrades every <a class="robot"> holding a <canvas>. */
export function initRobots() {
'use strict';
const PI=Math.PI;
const I=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
const mul=(a,b)=>Array.from({length:16},(_,i)=>{let v=0;for(let k=0;k<4;k++)v+=a[k*4+i%4]*b[Math.floor(i/4)*4+k];return v});
const tr=(x,y,z)=>{let m=I();m[12]=x;m[13]=y;m[14]=z;return m};
const rx=a=>[1,0,0,0,0,Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1];
const ry=a=>[Math.cos(a),0,-Math.sin(a),0,0,1,0,0,Math.sin(a),0,Math.cos(a),0,0,0,0,1];
const rz=a=>[Math.cos(a),Math.sin(a),0,0,-Math.sin(a),Math.cos(a),0,0,0,0,1,0,0,0,0,1];
const compose=(...m)=>m.reduce(mul,I());
const norm=a=>{let l=Math.hypot(...a)||1;return a.map(v=>v/l)};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function mesh(){const data=[];return {data,tri(a,b,c,ns){const n=norm(cross(b.map((v,i)=>v-a[i]),c.map((v,i)=>v-a[i])));[a,b,c].forEach((v,i)=>data.push(...v,...(ns?ns[i]:n)));},quad(a,b,c,d){this.tri(a,b,c);this.tri(a,c,d)}}}
function lathe(profile,steps=80){const m=mesh();for(let j=0;j<profile.length-1;j++){const [r,y]=profile[j],[r2,y2]=profile[j+1];for(let i=0;i<steps;i++){const a=i*2*PI/steps,b=(i+1)*2*PI/steps;const p=(r,y,t)=>[r*Math.cos(t),y,r*Math.sin(t)];const n=t=>norm([(y2-y)*Math.cos(t),r-r2,(y2-y)*Math.sin(t)]);m.tri(p(r,y,a),p(r2,y2,a),p(r2,y2,b),[n(a),n(a),n(b)]);m.tri(p(r,y,a),p(r2,y2,b),p(r,y,b),[n(a),n(b),n(b)]);}}return m.data}
function block(w,h,d,bevel=.035,topW=w){const m=mesh();const ring=(width,depth,y,b)=>[[-width/2+b,y,-depth/2],[width/2-b,y,-depth/2],[width/2,y,-depth/2+b],[width/2,y,depth/2-b],[width/2-b,y,depth/2],[-width/2+b,y,depth/2],[-width/2,y,depth/2-b],[-width/2,y,-depth/2+b]];
 const rings=[ring(w-2*bevel,d-2*bevel,-h/2,bevel/2),ring(w,d,-h/2+bevel,bevel),ring(topW,d,h/2-bevel,bevel),ring(topW-2*bevel,d-2*bevel,h/2,bevel/2)];
 for(let j=0;j<3;j++)for(let i=0;i<8;i++){let k=(i+1)%8;m.quad(rings[j][i],rings[j+1][i],rings[j+1][k],rings[j][k]);}
 for(let i=0;i<8;i++){let k=(i+1)%8;m.tri([0,-h/2,0],rings[0][i],rings[0][k]);m.tri([0,h/2,0],rings[3][k],rings[3][i]);}return m.data;}
function claw(){const m=mesh(),n=56,R=.19,r=.108,depth=.125;for(let i=0;i<n;i++){const a=(-35+i*250/n)*PI/180,b=(-35+(i+1)*250/n)*PI/180;const p=(radius,t,z)=>[radius*Math.cos(t),radius*Math.sin(t),z];const f=depth/2; m.quad(p(R,a,f),p(R,b,f),p(r,b,f),p(r,a,f));m.quad(p(r,a,-f),p(r,b,-f),p(R,b,-f),p(R,a,-f));const na=t=>[Math.cos(t),Math.sin(t),0];m.tri(p(R,a,-f),p(R,b,-f),p(R,b,f),[na(a),na(b),na(b)]);m.tri(p(R,a,-f),p(R,b,f),p(R,a,f),[na(a),na(b),na(a)]);m.quad(p(r,a,f),p(r,b,f),p(r,b,-f),p(r,a,-f));if(i===0)m.quad(p(r,a,-f),p(R,a,-f),p(R,a,f),p(r,a,f));if(i===n-1)m.quad(p(R,b,-f),p(r,b,-f),p(r,b,f),p(R,b,f));}return m.data;}
const vertex=`attribute vec3 position; attribute vec3 normal; uniform mat4 model; uniform mat4 view; uniform mat4 projection; varying vec3 N; varying vec3 P; void main(){vec4 p=view*model*vec4(position,1.);P=p.xyz;N=mat3(view*model)*normal;gl_Position=projection*p;}`;
const fragment=`precision highp float; varying vec3 N; varying vec3 P; uniform float dark;
// High-contrast studio reflections: crisp softboxes and narrow light strips.
vec3 studio(vec3 r){
 float up=smoothstep(-.45,.8,r.y);
 vec3 c=mix(vec3(.025,.022,.018),vec3(.48,.51,.57),up);
 float a=pow(max(0.,dot(r,normalize(vec3(-.8,.45,1.)))),65.);
 float b=pow(max(0.,dot(r,normalize(vec3(.9,.65,.4)))),110.);
 float strip=(1.-smoothstep(.035,.075,abs(r.x+.34)))*smoothstep(-.55,-.3,r.y);
 float edge=(1.-smoothstep(.016,.04,abs(r.x-.64)))*smoothstep(-.4,.1,r.y);
 float low=pow(max(0.,dot(r,normalize(vec3(.1,-.6,1.)))),36.);
 return c+a*6.5+b*9.+strip*3.5+edge*4.5+low*1.1;
}
void main(){
 vec3 n=normalize(N),v=normalize(-P);if(!gl_FrontFacing)n=-n;
 vec3 r=reflect(-v,n);vec3 gold=vec3(1.,.72,.28);
 float fres=pow(1.-max(dot(n,v),0.),5.);
 vec3 f=mix(gold,vec3(1.),fres);
 float diffuse=.065+.045*max(dot(n,normalize(vec3(-.5,1.,1.))),0.);
 vec3 c=studio(r)*f*1.12+gold*diffuse;
 c*=mix(1.,.13,dark);
 c=c/(c+vec3(.6));c=pow(c,vec3(.9));
 gl_FragColor=vec4(c,1.);
}`;
document.querySelectorAll('.robot:not([data-ready])').forEach(root=>{
 root.dataset.ready='true';const canvas=root.querySelector('canvas');
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
 if(!gl){root.classList.add('no-gl');return;}
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
 const prog=gl.createProgram();gl.attachShader(prog,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(prog,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(prog);gl.useProgram(prog);
 const locations={};['model','view','projection','dark'].forEach(k=>locations[k]=gl.getUniformLocation(prog,k));const pos=gl.getAttribLocation(prog,'position'),nor=gl.getAttribLocation(prog,'normal');gl.enableVertexAttribArray(pos);gl.enableVertexAttribArray(nor);gl.enable(gl.DEPTH_TEST);
 const buffers={};function geometry(name,data){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);buffers[name]={b,n:data.length/6};}
 geometry('torso',block(1.20,1.03,.60,.055,.88));geometry('hip',block(1.13,.23,.56,.035));
 geometry('head',lathe([[0,-.37],[.34,-.37],[.405,-.33],[.425,-.26],[.425,.25],[.405,.31],[.34,.35],[0,.35]]));
 geometry('neck',lathe([[0,-.10],[.23,-.10],[.23,.10],[0,.10]]));
 geometry('stud',lathe([[0,-.09],[.205,-.09],[.205,.08],[.19,.105],[.146,.105],[.136,.08],[.136,-.04],[0,-.04]]));
 geometry('studHole',lathe([[0,0],[.134,0],[0,.002]]));
 geometry('upper',lathe([[0,-.40],[.125,-.40],[.151,-.35],[.17,-.05],[.16,.03],[.12,.10],[0,.12]],48));
 geometry('lower',lathe([[0,-.30],[.12,-.30],[.14,-.26],[.15,.02],[.12,.07],[0,.07]],48));
 geometry('wrist',lathe([[0,-.10],[.085,-.10],[.085,.10],[0,.10]],40));geometry('claw',claw());
 geometry('leg',block(.49,.78,.49,.035));geometry('foot',block(.49,.24,.69,.025));
 geometry('shoulder',lathe([[0,-.10],[.14,-.10],[.18,-.04],[.18,.04],[.14,.10],[0,.10]],48));
 // Spins on its own every 30 seconds; arms and legs swing on hover or keyboard focus. Clicking it goes home.
 const EVERY=30000,TURN=3400;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let hover=false,focus=false,seen=false,turnStart=-Infinity,nextTurn=performance.now()+EVERY,raf=0,last=0,phase=0,blend=0,yaw=-.32,timer=0;
 const allowed=()=>!reduced.matches&&!document.hidden&&seen;
 const smooth=t=>t*t*(3-2*t);
 function draw(name,m,dark=0){const o=buffers[name];gl.bindBuffer(gl.ARRAY_BUFFER,o.b);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(nor,3,gl.FLOAT,false,24,12);gl.uniformMatrix4fv(locations.model,false,new Float32Array(m));gl.uniform1f(locations.dark,dark);gl.drawArrays(gl.TRIANGLES,0,o.n);}
 function render(now){raf=0;const dt=Math.min((now-(last||now))/1000,.05);last=now;const animate=allowed();const active=animate&&(hover||focus);blend+=(Number(active)-blend)*Math.min(1,dt*9);if(animate)phase+=dt*6;
 if(animate&&now>=nextTurn){turnStart=now;nextTurn=now+EVERY;}
 let spin=0;if(animate&&now-turnStart<TURN)spin=2*PI*smooth(Math.max(0,(now-turnStart)/TURN));
 const size=Math.max(1,Math.round(canvas.getBoundingClientRect().width*Math.min(devicePixelRatio||1,2)));if(canvas.width!==size||canvas.height!==size){canvas.width=canvas.height=size;}gl.viewport(0,0,size,size);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 const projection=[1/1.85,0,0,0,0,1/1.85,0,0,0,0,-2/30,0,0,0,-1,1];
 gl.uniformMatrix4fv(locations.projection,false,new Float32Array(projection));gl.uniformMatrix4fv(locations.view,false,new Float32Array(compose(tr(0,-.12,-7),rx(.12))));
 const base=compose(tr(0,Math.sin(phase*2)*.018*blend,0),ry(yaw+spin));
 draw('torso',compose(base,tr(0,.13,0)));draw('hip',compose(base,tr(0,-.49,0)));
 draw('neck',compose(base,tr(0,.73,0)));draw('head',compose(base,tr(0,1.16,0)));draw('stud',compose(base,tr(0,1.60,0)));draw('studHole',compose(base,tr(0,1.562,0)),1);
 for(const side of [-1,1]){
  const shoulder=compose(base,tr(side*.51,.52,0));draw('shoulder',compose(shoulder,rz(PI/2)));
  const arm=compose(shoulder,rx(Math.sin(phase)*.53*blend*side),rz(side*.22),tr(side*.105,0,0));
  draw('upper',arm);const elbow=compose(arm,tr(0,-.36,0),rx(-.20));draw('lower',elbow);draw('wrist',compose(elbow,tr(0,-.34,0)));draw('claw',compose(elbow,tr(0,-.51,.015)));
  const hip=compose(base,tr(side*.29,-.59,0),rx(-Math.sin(phase)*.30*blend*side));draw('leg',compose(hip,tr(0,-.37,0)));draw('foot',compose(hip,tr(0,-.82,.10)));
 }
 // draw only while something moves; otherwise sleep until the next 30-second turn
 clearTimeout(timer);
 if(animate&&(blend>.002||active||now-turnStart<TURN))raf=requestAnimationFrame(render);
 else{last=0;if(animate)timer=setTimeout(invalidate,Math.max(16,nextTurn-performance.now()));}
 }
 function invalidate(){if(!raf)raf=requestAnimationFrame(render);}
 root.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){hover=true;invalidate();}});root.addEventListener('pointerleave',()=>{hover=false;invalidate();});
 root.addEventListener('focus',()=>{focus=root.matches(':focus-visible');invalidate();});root.addEventListener('blur',()=>{focus=false;invalidate();});
 root.addEventListener('click',()=>{if(allowed()){turnStart=performance.now();nextTurn=turnStart+EVERY;invalidate();}});
 new IntersectionObserver(es=>{seen=es[es.length-1].isIntersecting;invalidate();}).observe(root);
 reduced.addEventListener('change',invalidate);document.addEventListener('visibilitychange',invalidate);
 new ResizeObserver(invalidate).observe(canvas);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);});invalidate();
});
}
