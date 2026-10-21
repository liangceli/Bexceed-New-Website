export const enquiryRecipient = 'admin@bexceed.com.au';
export function createEnquiryMailto(fields, category, language) {
  const clean = value => String(value ?? '').trim();
  const body = [`Name: ${clean(fields.firstName)} ${clean(fields.lastName)}`,`Email: ${clean(fields.email)}`,`Phone: ${clean(fields.phone) || '-'}`,`Service: ${category || '-'}`,`Website language: ${language}`,'',clean(fields.message)].join('\r\n');
  return `mailto:${enquiryRecipient}?subject=${encodeURIComponent('Website enquiry — Bexceed')}&body=${encodeURIComponent(body)}`;
}
