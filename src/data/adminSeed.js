export const dashboardMetrics = [
  { label: 'Total Customers', value: '1,240', tone: 'emerald' },
  { label: 'Total Leads', value: '96', tone: 'crimson' },
  { label: 'New Leads', value: '14', tone: 'peach' },
  { label: 'Total Orders', value: '388', tone: 'emerald' },
  { label: 'Pending Payments', value: '₦1,060,000', tone: 'crimson' },
  { label: 'Confirmed Payments', value: '₦2,420,000', tone: 'emerald' },
  { label: 'Orders in Transit', value: '28', tone: 'peach' },
  { label: 'Delivered Orders', value: '331', tone: 'emerald' },
  { label: 'Repeat Customers', value: '18%', tone: 'crimson' },
];

export const salesTrend = [36, 42, 54, 48, 72, 88, 69];

export const categoryBreakdown = [
  { label: 'Fashion', value: '34%' },
  { label: 'Accessories', value: '22%' },
  { label: 'Shoes', value: '18%' },
  { label: 'Beauty', value: '13%' },
  { label: 'Kitchen & Home', value: '13%' },
];

export const pipelineColumns = [
  { stage: 'New Lead', items: ['Ada', 'Nkechi', 'Mariam'] },
  { stage: 'Contacted', items: ['Grace', 'Michael', 'Ruth'] },
  { stage: 'Interested', items: ['Dora', 'Ugo'] },
  { stage: 'Awaiting Payment', items: ['Aisha', 'Kemi'] },
  { stage: 'Payment Confirmed', items: ['Tomi', 'Efe'] },
];

export const customerRecords = [
  {
    name: 'Ada Okafor',
    status: 'Active Customer',
    purchases: 3,
    segment: 'Repeat buyer',
    note: 'Follow-up on the next pre-order drop',
  },
  {
    name: 'Tosin Bello',
    status: 'Interested',
    purchases: 1,
    segment: 'Wishlist',
    note: 'Waiting on shoe inventory and price quote',
  },
  {
    name: 'Chika Nwosu',
    status: 'Repeat Customer',
    purchases: 5,
    segment: 'Wholesale',
    note: 'Prefers beauty and fashion bundles',
  },
  {
    name: 'Ifeoma Adebayo',
    status: 'VIP',
    purchases: 7,
    segment: 'High-value',
    note: 'Requests new arrivals every two weeks',
  },
];

export const leadRecords = [
  { name: 'Mary James', interest: 'Beauty', source: 'Instagram', followUp: 'Tomorrow' },
  { name: 'Grace Eze', interest: 'Fashion', source: 'Website', followUp: 'Wednesday' },
  { name: 'Daniel Ayo', interest: 'Kitchen & Home', source: 'WhatsApp', followUp: 'Friday' },
  { name: 'Musa Ibrahim', interest: 'Accessories', source: 'Referral', followUp: 'Next Monday' },
];

export const orderRecords = [
  { id: 'ORD-1024', customer: 'Ada Okafor', total: '₦46,000', status: 'Confirmed' },
  { id: 'ORD-1025', customer: 'Grace Eze', total: '₦21,500', status: 'In Transit' },
  { id: 'ORD-1026', customer: 'Daniel Ayo', total: '₦38,200', status: 'Pending' },
  { id: 'ORD-1027', customer: 'Ifeoma Adebayo', total: '₦58,750', status: 'Confirmed' },
];

export const subscriberRecords = [
  { email: 'hello@example.com', interest: 'Fashion', date: '2026-11-15', status: 'Subscribed' },
  { email: 'style@shop.com', interest: 'Beauty', date: '2026-11-13', status: 'Subscribed' },
  { email: 'homeorders@list.com', interest: 'Kitchen & Home', date: '2026-11-10', status: 'Unsubscribed' },
  { email: 'shopper@vaseous.ng', interest: 'Accessories', date: '2026-11-08', status: 'Subscribed' },
];

export const analyticsCards = [
  { label: 'Subscribers', value: '1,430' },
  { label: 'New leads', value: '14' },
  { label: 'Completed orders', value: '331' },
  { label: 'Revenue in ₦', value: '₦2,420,000' },
];
