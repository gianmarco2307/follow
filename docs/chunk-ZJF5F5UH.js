import{a as k}from"./chunk-XJK4OGP4.js";import"./chunk-5G567QLT.js";var x=9,E=256,b=257,B=12;function C(c,o,r){let i=o%8,n=Math.floor(o/8),h=8-i,g=o+r-(n+1)*8,l=8*(n+2)-(o+r),w=(n+2)*8-o;if(l=Math.max(0,l),n>=c.length)return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"),b;let u=c[n]&2**(8-i)-1;u<<=r-h;let s=u;if(n+1<c.length){let f=c[n+1]>>>l;f<<=Math.max(0,r-w),s+=f}if(g>8&&n+2<c.length){let f=(n+3)*8-(o+r),t=c[n+2]>>>f;s+=t}return s}function p(c,o){for(let r=o.length-1;r>=0;r--)c.push(o[r]);return c}function D(c){let o=new Uint16Array(4093),r=new Uint8Array(4093);for(let e=0;e<=257;e++)o[e]=4096,r[e]=e;let i=258,n=x,h=0;function g(){i=258,n=x}function l(e){let a=C(e,h,n);return h+=n,a}function w(e,a){return r[i]=a,o[i]=e,i++,i-1}function u(e){let a=[];for(let y=e;y!==4096;y=o[y])a.push(r[y]);return a}let s=[];g();let f=new Uint8Array(c),t=l(f),d;for(;t!==b;){if(t===E){for(g(),t=l(f);t===E;)t=l(f);if(t===b)break;if(t>E)throw new Error(`corrupted code at scanline ${t}`);{let e=u(t);p(s,e),d=t}}else if(t<i){let e=u(t);p(s,e),w(d,e[e.length-1]),d=t}else{let e=u(d);if(!e)throw new Error(`Bogus entry. Not in dictionary, ${d} / ${i}, position: ${h}`);p(s,e),s.push(e[e.length-1]),w(d,e[e.length-1]),d=t}i+1>=2**n&&(n===B?d=void 0:n++),t=l(f)}return new Uint8Array(s)}var A=class extends k{decodeBlock(o){return D(o,!1).buffer}};export{A as default};
