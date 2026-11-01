import { resolveLocale } from './content.js';

export const serviceIds=['individuals','businesses','smsf','compliance','business-solutions','advisory'];
export const articleIds=['single-touch-payroll-phase-2','xero-sign','why-consider-an-smsf','sharing-economy-tax'];
export const videoCategories=['economy','tax-legal','cloud-accounting','china'];
export const allRoutes=['/','/about','/services',...serviceIds.map(x=>'/services/'+x),'/pricing',...['individuals','businesses','smsf'].map(x=>'/pricing/'+x),'/insights',...articleIds.map(x=>'/insights/'+x),'/insights/videos',...videoCategories.map(x=>'/insights/videos/'+x),'/contact','/privacy'];
const aliases={'/about-us-2':'/about','/our-services':'/services','/thoughts':'/insights','/single-touch-payroll-phase-2':'/insights/single-touch-payroll-phase-2','/how-to-digitally-sign-and-return-your-documents-through-xero-sign':'/insights/xero-sign','/why-considering-self-managed-super-fund-smsf':'/insights/why-consider-an-smsf','/the-sharing-economy-tax':'/insights/sharing-economy-tax','/cache':'/insights/single-touch-payroll-phase-2','/adelaide-chinese-accountant-and-tax-agent-smsf-companyregistration':'/'};
export function resolveRoute(pathname){
  let path=pathname.replace(/\/+$/,'')||'/';path=aliases[path]||path;
  const [,section,id,topic]=path.split('/');
  if(!allRoutes.includes(path))return {path,type:'not-found',section:'',id:'not-found'};
  if(section==='services'&&id)return{path,type:'service-detail',section:'services',id};
  if(section==='pricing')return{path,type:'pricing',section:'pricing',id:id||'pricing',category:Math.max(0,['individuals','businesses','smsf'].indexOf(id))};
  if(section==='insights'&&id==='videos')return{path,type:'videos',section:'insights',id:topic||'all'};
  if(section==='insights'&&id)return{path,type:'article',section:'insights',id};
  return {path,type:section||'home',section:section||'home',id:section||'home',...(pathname.includes('adelaide-chinese-accountant-and-tax-agent-smsf-companyregistration')?{defaultLocale:'zh-CN'}:{})};
}
export function routeHref(path,locale='en'){
  const [pathname,hash]=path.split('#');
  return `${pathname||'/'}?lang=${resolveLocale(locale)}${hash?'#'+hash:''}`;
}
export function filterArticles(articles,category='all',query=''){
  const term=query.trim().toLocaleLowerCase();
  return articles.filter(a=>(category==='all'||a.category===category)&&`${a.title} ${a.description}`.toLocaleLowerCase().includes(term));
}
