/* Reflection drafts only. No scores, TP, awards, certificate records, network or audio. */
'use strict';
const ImbasLokaState=Object.freeze({
 key:(mode,id)=>`simpulloka_v9_imbas_${encodeURIComponent(mode)}_${encodeURIComponent(id)}`,
 normalize(value){const v=value&&typeof value==='object'?value:{};const pick=n=>Number.isInteger(n)&&n>=0&&n<6?n:null;const remembered=pick(v.remembered),favourite=pick(v.favourite),understanding=['faham','belajar','bantuan'].includes(v.understanding)?v.understanding:null;let step=Math.max(0,Math.min(4,Math.floor(Number(v.step)||0)));if(step>1&&remembered===null)step=1;if(step>2&&!understanding)step=2;if(step===4&&favourite===null)step=3;return{feeling:['gembira','tenang','teruja','perlukan-bantuan'].includes(v.feeling)?v.feeling:null,rating:Number.isInteger(v.rating)&&v.rating>=1&&v.rating<=5?v.rating:null,step,remembered,understanding,favourite,reason:typeof v.reason==='string'?v.reason.slice(0,240):'',completed:!!v.completed&&remembered!==null&&understanding!==null&&favourite!==null};},
 complete:s=>Number.isInteger(s.remembered)&&s.remembered>=0&&s.remembered<6&&['faham','belajar','bantuan'].includes(s.understanding)&&Number.isInteger(s.favourite)&&s.favourite>=0&&s.favourite<6
});
