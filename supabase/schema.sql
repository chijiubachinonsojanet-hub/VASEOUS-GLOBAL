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

alter table public.enquiries enable row level security;
alter table public.email_subscribers enable row level security;
alter table public.leads enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;

create policy if not exists "Allow anon insert on enquiries"
on public.enquiries
for insert
with check (true);

create policy if not exists "Allow anon select on enquiries"
on public.enquiries
for select
using (true);

create policy if not exists "Allow anon insert on email_subscribers"
on public.email_subscribers
for insert
with check (true);

create policy if not exists "Allow anon select on email_subscribers"
on public.email_subscribers
for select
using (true);

create policy if not exists "Allow anon insert on leads"
on public.leads
for insert
with check (true);

create policy if not exists "Allow anon select on leads"
on public.leads
for select
using (true);

create policy if not exists "Allow anon insert on customers"
on public.customers
for insert
with check (true);

create policy if not exists "Allow anon select on customers"
on public.customers
for select
using (true);

create policy if not exists "Allow anon insert on orders"
on public.orders
for insert
with check (true);

create policy if not exists "Allow anon select on orders"
on public.orders
for select
using (true);
