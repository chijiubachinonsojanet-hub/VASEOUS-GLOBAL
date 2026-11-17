create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  enquiry_type text not null default 'General enquiry',
  message text not null
);

create table if not exists email_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text,
  email text not null unique,
  category_interest text,
  consent_given boolean not null default false,
  consent_timestamp timestamptz,
  unsubscribed boolean not null default false
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  interest text,
  source text,
  follow_up text,
  status text not null default 'new'
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  status text not null,
  segment text,
  purchases integer not null default 0,
  note text
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  customer text not null,
  total text not null,
  status text not null default 'Pending'
);

create index if not exists idx_enquiries_email on enquiries(email);
create index if not exists idx_email_subscribers_email on email_subscribers(email);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_orders_status on orders(status);
