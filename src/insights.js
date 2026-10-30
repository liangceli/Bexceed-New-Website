const sources = [
  { url: 'https://bexceed.com.au/single-touch-payroll-phase-2/', image: '/assets/insight-payroll.webp', datetime: '2021-04-22' },
  { url: 'https://bexceed.com.au/how-to-digitally-sign-and-return-your-documents-through-xero-sign/', image: '/assets/insight-digital-signing.webp', datetime: '2021-04-22' },
  { url: 'https://bexceed.com.au/why-considering-self-managed-super-fund-smsf/', image: '/assets/insight-smsf.webp', datetime: '2018-05-17' }
];

const copy = {
  en: {
    read: 'Read article',
    items: [
      ['Business tax', '22 Apr 2021', 'Single Touch Payroll Phase 2', 'An introduction to changes to payroll reporting for employers.'],
      ['Cloud accounting', '22 Apr 2021', 'How to digitally sign and return your documents through Xero Sign', 'A guide to signing and returning your documents electronically.'],
      ['SMSF', '17 May 2018', 'Why consider a self managed super fund?', 'Explore some of the considerations behind choosing an SMSF.']
    ]
  },
  'zh-CN': {
    read: '阅读文章',
    items: [
      ['企业税务', '2021年4月22日', 'Single Touch Payroll 第二阶段', '了解雇主薪资申报变化的介绍。'],
      ['云端会计', '2021年4月22日', '如何通过 Xero Sign 电子签署和回传文件', '了解如何以电子方式签署并回传文件。'],
      ['自管退休基金', '2018年5月17日', '为什么考虑自管理退休基金？', '了解选择自管理退休基金时的一些考虑因素。']
    ]
  },
  'zh-TW': {
    read: '閱讀文章',
    items: [
      ['企業稅務', '2021年4月22日', 'Single Touch Payroll 第二階段', '了解雇主薪資申報變化的介紹。'],
      ['雲端會計', '2021年4月22日', '如何透過 Xero Sign 電子簽署和回傳文件', '了解如何以電子方式簽署並回傳文件。'],
      ['自管退休基金', '2018年5月17日', '為什麼考慮自管理退休基金？', '了解選擇自管理退休基金時的一些考量因素。']
    ]
  },
  vi: {
    read: 'Đọc bài viết',
    items: [
      ['Thuế doanh nghiệp', '22 thg 4, 2021', 'Single Touch Payroll giai đoạn 2', 'Giới thiệu những thay đổi về báo cáo tiền lương của người sử dụng lao động.'],
      ['Kế toán đám mây', '22 thg 4, 2021', 'Cách ký và gửi lại tài liệu qua Xero Sign', 'Hướng dẫn ký và gửi lại tài liệu bằng phương thức điện tử.'],
      ['SMSF', '17 thg 5, 2018', 'Vì sao nên cân nhắc quỹ hưu trí tự quản?', 'Tìm hiểu những điều cần cân nhắc khi lựa chọn một quỹ SMSF.']
    ]
  }
};

export function getInsights(locale) {
  const translation = copy[locale] || copy.en;
  return { read: translation.read, articles: sources.map((source, index) => {
    const [category, date, title, description] = translation.items[index];
    return { ...source, category, date, title, description };
  }) };
}
