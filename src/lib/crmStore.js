import { hasSupabaseConfig, supabase } from './supabaseClient';
import {
  customerRecords,
  leadRecords,
  orderRecords,
  subscriberRecords,
} from '../data/adminSeed';

const DEMO_STORAGE_KEY = 'vaseous-crm-demo';

const getDemoData = () => {
  if (typeof window === 'undefined') {
    return {
      enquiries: [],
      emailSubscribers: subscriberRecords,
      leads: leadRecords,
      customers: customerRecords,
      orders: orderRecords,
    };
  }

  const saved = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!saved) {
    const baseData = {
      enquiries: [],
      emailSubscribers: subscriberRecords,
      leads: leadRecords,
      customers: customerRecords,
      orders: orderRecords,
    };
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(baseData));
    return baseData;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error('Unable to parse CRM demo store.', error);
    const fallback = {
      enquiries: [],
      emailSubscribers: subscriberRecords,
      leads: leadRecords,
      customers: customerRecords,
      orders: orderRecords,
    };
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
};

const updateDemoData = (nextData) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(nextData));
  }
};

const makeId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `vaseous-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const saveEnquiry = async (payload) => {
  const enquiry = {
    id: makeId(),
    created_at: new Date().toISOString(),
    full_name: payload.fullName,
    email: payload.email,
    enquiry_type: payload.enquiryType,
    message: payload.message,
  };

  if (hasSupabaseConfig && supabase) {
    try {
      const { error } = await supabase.from('enquiries').insert(enquiry);
      if (!error) {
        return { ok: true, source: 'supabase' };
      }
      console.warn('Supabase enquiry insert failed, falling back to local storage.', error);
    } catch (error) {
      console.warn('Supabase enquiry insert error, falling back to local storage.', error);
    }
  }

  const demoData = getDemoData();
  const nextData = {
    ...demoData,
    enquiries: [
      ...demoData.enquiries,
      {
        ...enquiry,
        submitted_via: 'website-form',
      },
    ],
  };

  updateDemoData(nextData);
  return { ok: true, source: 'local-storage' };
};

export const saveSubscriber = async (payload) => {
  const subscriber = {
    id: makeId(),
    created_at: new Date().toISOString(),
    first_name: payload.firstName,
    email: payload.email,
    category_interest: payload.categoryInterest,
    consent_given: payload.consent,
    consent_timestamp: new Date().toISOString(),
    unsubscribed: false,
  };

  if (hasSupabaseConfig && supabase) {
    try {
      const { data: existingSubscriber } = await supabase
        .from('email_subscribers')
        .select('id')
        .eq('email', subscriber.email)
        .maybeSingle();

      if (existingSubscriber) {
        return { ok: false, reason: 'duplicate' };
      }

      const { error } = await supabase.from('email_subscribers').insert(subscriber);
      if (!error) {
        return { ok: true, source: 'supabase' };
      }
      console.warn('Supabase subscriber insert failed, falling back to local storage.', error);
    } catch (error) {
      console.warn('Supabase subscriber insert error, falling back to local storage.', error);
    }
  }

  const demoData = getDemoData();
  const existingEmail = demoData.emailSubscribers.some((item) => item.email === subscriber.email);
  if (existingEmail) {
    return { ok: false, reason: 'duplicate' };
  }

  const nextData = {
    ...demoData,
    emailSubscribers: [
      ...demoData.emailSubscribers,
      {
        id: subscriber.id,
        email: subscriber.email,
        interest: subscriber.category_interest,
        date: new Date().toISOString().slice(0, 10),
        status: 'Subscribed',
      },
    ],
  };

  updateDemoData(nextData);
  return { ok: true, source: 'local-storage' };
};

export const getDashboardData = async () => {
  if (hasSupabaseConfig && supabase) {
    try {
      const [enquiryResult, subscriberResult, leadResult, customerResult, orderResult] = await Promise.all([
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('email_subscribers').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(20),
      ]);

      if (
        !enquiryResult.error &&
        !subscriberResult.error &&
        !leadResult.error &&
        !customerResult.error &&
        !orderResult.error
      ) {
        return {
          enquiries: enquiryResult.data ?? [],
          subscribers: subscriberResult.data ?? [],
          leads: leadResult.data ?? [],
          customers: customerResult.data ?? [],
          orders: orderResult.data ?? [],
        };
      }
    } catch (error) {
      console.warn('Supabase dashboard query failed, using local CRM data.', error);
    }
  }

  const demoData = getDemoData();
  return {
    enquiries: demoData.enquiries,
    subscribers: demoData.emailSubscribers,
    leads: demoData.leads,
    customers: demoData.customers,
    orders: demoData.orders,
  };
};
