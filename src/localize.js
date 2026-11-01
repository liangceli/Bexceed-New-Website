import dictionary from './traditional.json' with {type:'json'};
const traditional=text=>dictionary[text]||text;
export function localize(value,locale){
  if(value===null||typeof value!=='object')return value;
  if(Object.hasOwn(value,'en')&&Object.hasOwn(value,'zh'))return locale==='en'?value.en:locale==='zh-TW'?traditional(value.zh):value.zh;
  if(Array.isArray(value))return value.map(x=>localize(x,locale));
  return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,localize(v,locale)]));
}
export function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
