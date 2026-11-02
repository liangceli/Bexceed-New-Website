const labels = {
  en: { credentials:'Professional credentials', partners:'Partners & memberships', tax:'Registered Tax Agent', cpa:'CPA Practice', company:'ASIC Registered Agent', xero:'Xero Certified Advisor' },
  'zh-CN': { credentials:'专业资质', partners:'合作伙伴与会员资格', tax:'注册税务代理', cpa:'CPA 执业机构', company:'ASIC 注册代理', xero:'Xero 认证顾问' },
  'zh-TW': { credentials:'專業資質', partners:'合作夥伴與會員資格', tax:'註冊稅務代理', cpa:'CPA 執業機構', company:'ASIC 註冊代理', xero:'Xero 認證顧問' }
};

// Supplied marks are kept intact; the company diagram is not an ASIC-issued logo.
export function renderCredentials(locale) {
  const t=labels[locale]||labels.en;
  return `<section class="credential-gallery" id="credentials" aria-labelledby="credentials-title"><div class="container">
    <h2 id="credentials-title">${t.credentials}</h2>
    <ul class="credential-grid">
      <li><div class="credential-image"><img class="credential-tax" src="/assets/credential-tpb-seal.jpg" alt="Tax Practitioners Board" width="361" height="351" loading="lazy"></div><h3>${t.tax}</h3><p class="credential-number">25691635</p></li>
      <li><div class="credential-image"><img class="credential-cpa" src="/assets/credential-cpa.png" alt="CPA Australia" width="1584" height="693" loading="lazy"></div><h3>${t.cpa}</h3></li>
      <li><div class="credential-image"><img class="credential-company" src="/assets/credential-company-agent.png" alt="Company Formation Services" width="150" height="150" loading="lazy"></div><h3>${t.company}</h3></li>
      <li><div class="credential-image"><img class="credential-afsl" src="/assets/credential-afsl.webp" alt="" width="600" height="431" loading="lazy"></div><h3>AFSL (SMSF)</h3></li>
    </ul>
    <div class="credential-partners" aria-labelledby="partners-title"><h2 id="partners-title">${t.partners}</h2>
      <ul class="partner-grid"><li><div class="partner-image"><img class="credential-xero" src="/assets/credential-xero.png" alt="Xero Certified Advisor" width="370" height="180" loading="lazy"></div><h3>${t.xero}</h3></li><li><div class="partner-image"><img class="credential-ntaa" src="/assets/credential-ntaa.png" alt="National Tax and Accountants’ Association" width="300" height="156" loading="lazy"></div><h3>NTAA</h3></li></ul>
    </div>
  </div></section>`;
}
