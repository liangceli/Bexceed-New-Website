import { Converter } from 'opencc-js/cn2t';
import fs from 'node:fs';
import { pageCopy,serviceData,topicData,videoData } from '../src/page-data.js';
import { articles } from '../src/article-data.js';
const convert=Converter({from:'cn',to:'tw'}),dict={};
function visit(value){if(!value||typeof value!=='object')return;if(value.en&&value.zh){dict[value.zh]=convert(value.zh);return;}Object.values(value).forEach(visit);}
visit({pageCopy,serviceData,topicData,videoData,articles});
for(const file of ['src/pages.js']){const source=fs.readFileSync(file,'utf8');for(const match of source.matchAll(/'([^'\n]*[\u3400-\u9fff][^'\n]*)'/g)){dict[match[1]]=convert(match[1]);}}
fs.writeFileSync('src/traditional.json',JSON.stringify(dict,null,2)+'\n');
console.log(`Prepared ${Object.keys(dict).length} Traditional Chinese strings; no runtime dictionary download.`);
