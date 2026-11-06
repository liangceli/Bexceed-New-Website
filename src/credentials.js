const labels = {
  en: { title:'Credentials, partners & memberships', credentials:'Professional credential', partners:'Partner / membership', tax:'Registered Tax Agent', cpa:'CPA Practice', company:'ASIC Registered Agent', xero:'Xero Certified Advisor', hint:'Swipe to explore', previous:'Previous logos', next:'Next logos', pause:'Pause automatic scrolling', play:'Start automatic scrolling' },
  'zh-CN': { title:'专业资质、合作伙伴与会员资格', credentials:'专业资质', partners:'合作伙伴 / 会员资格', tax:'注册税务代理', cpa:'CPA 执业机构', company:'ASIC 注册代理', xero:'Xero 认证顾问', hint:'左右滑动查看更多', previous:'查看前面的标识', next:'查看后面的标识', pause:'暂停自动滚动', play:'开始自动滚动' },
  'zh-TW': { title:'專業資質、合作夥伴與會員資格', credentials:'專業資質', partners:'合作夥伴 / 會員資格', tax:'註冊稅務代理', cpa:'CPA 執業機構', company:'ASIC 註冊代理', xero:'Xero 認證顧問', hint:'左右滑動查看更多', previous:'查看前面的標誌', next:'查看後面的標誌', pause:'暫停自動捲動', play:'開始自動捲動' }
};
// Keep supplied marks intact; the company diagram is not an ASIC-issued logo.
export function renderCredentials(locale) {
  const t=labels[locale]||labels.en;
  const items=[
    ['tax','credential-tpb-seal.jpg','Tax Practitioners Board',361,351,t.tax,'25691635'],
    ['cpa','credential-cpa.png','CPA Australia',1584,693,t.cpa],
    ['company','credential-company-agent.png','Company Formation Services',150,150,t.company],
    ['afsl','credential-afsl.webp','',600,431,'AFSL (SMSF)'],
    ['xero','credential-xero.png','Xero Certified Advisor',370,180,t.xero],
    ['ntaa','credential-ntaa.png','National Tax and Accountants’ Association',300,156,'NTAA']
  ];
  return `<section class="credential-gallery" id="credentials" aria-labelledby="credentials-title"><div class="container">
    <h2 id="credentials-title">${t.title}</h2>
    <div class="credential-viewport" tabindex="0" role="region" aria-labelledby="credentials-title" aria-describedby="credentials-hint">
      <ul class="credential-track">${items.map(([name,file,alt,w,h,title,number],i)=>`<li class="credential-item"><div class="credential-image"><img class="credential-${name}" src="/assets/${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" draggable="false"></div><h3>${title}</h3>${number?`<p class="credential-number">${number}</p>`:''}<p class="credential-kind">${i<4?t.credentials:t.partners}</p></li>`).join('')}</ul>
    </div>
    <div class="credential-controls" hidden><p id="credentials-hint">${t.hint}</p><div>
      <button type="button" data-credentials-step="-1" aria-label="${t.previous}"><span aria-hidden="true">‹</span></button>
      <button type="button" data-credentials-toggle data-pause-label="${t.pause}" data-play-label="${t.play}" aria-label="${t.pause}"><span aria-hidden="true">Ⅱ</span></button>
      <button type="button" data-credentials-step="1" aria-label="${t.next}"><span aria-hidden="true">›</span></button>
    </div></div>
  </div></section>`;
}
