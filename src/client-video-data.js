const L=(en,zh)=>({en,zh});

// Client selections from 10 November 2026; upload dates verified on each publisher's YouTube page.
// The two requested TED talks are deliberately deferred.
export const clientVideoData=[
 {id:'aDvwXeFR5qo',topic:'cloud-accounting',title:L('Freedom 30" | Xero Small Business Accounting Software','Xero 小企业会计软件：让经营更从容'),publisher:'Xero Accounting Software',date:'2025-01-14',
  note:L('A short introduction to managing cash flow, invoicing, payroll and everyday accounts with Xero.','简要了解如何使用 Xero 管理现金流、发票、工资和日常账务。'),
  description:L('See your cash flow in real time and bring invoicing, bills and banking together online. Bexceed can help you explore a Xero trial and plan a move from your existing accounting software.','实时了解现金流，并在线整合发票、账单和银行记录。Bexceed 可协助了解 Xero 试用安排，并规划从现有会计软件迁移。'),
  cta:{label:L('Ask about Xero setup & migration','咨询 Xero 设置与迁移'),service:1}},
 {id:'Z9r-tY1qSX0',topic:'cloud-accounting',title:L('Get paid up to two times faster with online payments','通过在线付款加快收款'),publisher:'Xero Accounting Software',date:'2026-04-24',
  note:L('Explore how Xero online payments give customers more ways to pay and help simplify invoicing.','了解 Xero 在线付款如何为客户提供更多付款方式，并简化发票处理。'),
  description:L('Xero demonstrates its online payment features and how they connect with invoicing and cash-flow visibility. Ask Bexceed about a Xero trial and configuring online payments for your business. Payment results depend on your customers and setup.','Xero 演示在线付款功能，以及它与发票和现金流管理的衔接。欢迎向 Bexceed 咨询 Xero 试用和企业在线收款设置。实际收款情况取决于客户及具体设置。'),
  cta:{label:L('Ask about online payments','咨询在线收款设置'),service:1}},
 {id:'D7NbL-DfnW8',topic:'cloud-accounting',title:L('Starting out with Xero Expenses','Xero Expenses 使用入门'),publisher:'Xero Accounting Software',date:'2025-09-26',
  note:L('Capture receipts, track business spending and manage employee reimbursements with Xero Expenses.','使用 Xero Expenses 保存收据、跟踪企业支出并管理员工报销。'),
  description:L('This introduction shows how the mobile app supports everyday expense management. Contact Bexceed to discuss a Xero trial and practical training for your internal team.','这段入门视频介绍手机应用如何协助日常费用管理。欢迎联系 Bexceed，讨论 Xero 试用及内部团队的实用培训。'),
  cta:{label:L('Ask about Xero training','咨询 Xero 团队培训'),service:1}},
 {id:'uKxBtPWywCw',topic:'economy',title:L("Australia’s migration economics","澳大利亚移民经济观察"),publisher:'ABC News (Australia)',date:'2026-09-27',externalOnly:true,
  presenters:L('Mark Cully with Alan Kohler','Mark Cully 与 Alan Kohler'),
  note:L('Alan Kohler speaks with former immigration chief economist Mark Cully about the economics and history of Australian migration.','Alan Kohler 与移民部门前首席经济学家 Mark Cully 探讨澳大利亚移民的经济影响与历史。'),
  description:L('An episode of That’s Business exploring how economic and social policy have shaped migration, and what earlier policies can teach us. This is a third-party interview; the views expressed belong to the speakers.','《That’s Business》探讨经济与社会政策如何影响移民，以及历史政策带来的启示。这是第三方访谈，所表达的观点属于节目嘉宾。')},
 {id:'XgDeroNQqG8',topic:'economy',title:L('Cost of living, housing & retirement: Noel Whittaker','生活成本、住房与退休：Noel Whittaker 访谈'),publisher:'4BC Brisbane',date:'2026-11-04',
  presenters:L('Noel Whittaker with Gary Hardgrave','Noel Whittaker 与 Gary Hardgrave'),
  note:L('A 4BC discussion about pressure on household budgets, housing costs and retirement finances.','4BC 访谈讨论家庭预算压力、住房成本和退休财务问题。'),
  description:L('Gary Hardgrave and author Noel Whittaker discuss interest rates, living costs, public spending and proposals concerning mortgages, pensioners and superannuation. The programme contains opinion and commentary; it is not a statement of Bexceed’s views or personal advice.','Gary Hardgrave 与作家 Noel Whittaker 讨论利率、生活成本、公共支出，以及房贷、退休人士和养老金相关建议。节目包含观点与评论，不代表 Bexceed 的立场或针对个人的建议。')},
 {id:'pz3XvxgcC4k',topic:'superannuation',title:L('How much super do you need to retire?','退休需要多少养老金？'),publisher:'Moneysmart',date:'2026-04-09',language:'en',
  official:'https://moneysmart.gov.au/plan-for-your-retirement/work-out-how-much-you-need-to-retire',
  note:L('Understand how your lifestyle, living costs, savings and other income shape your retirement needs.','了解生活方式、生活成本、储蓄及其他收入如何影响退休资金需求。'),
  description:L('There is no single savings target that suits everyone. Moneysmart explains how spending benchmarks, housing costs and possible income sources can help you plan, with tools to explore your own circumstances.','没有适合所有人的统一储蓄目标。Moneysmart 介绍如何结合支出参考、住房成本和可能的收入来源进行规划，并提供工具帮助了解自身情况。')},
 {id:'z_u-fx6dMuc',topic:'superannuation',title:L('How downsizer contributions work','了解售房养老缴款'),publisher:'Moneysmart',date:'2026-07-06',
  note:L('An introduction to contributing eligible home-sale proceeds to superannuation through downsizer contributions.','了解符合条件的售房所得如何通过 downsizer contributions 缴入养老金。'),
  description:L('Moneysmart explains how these contributions work and why buying a smaller home is not a requirement. Eligibility rules, contribution limits and timing apply; check the current official guidance before making a decision.','Moneysmart 解释这类缴款的运作方式，以及为什么不必购买较小的住房。相关资格、缴款限额和时间要求均需满足；作决定前请核对官方现行指引。')}
].map(video=>({...video,collection:'client-2026-11'}));
