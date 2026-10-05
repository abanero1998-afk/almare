-- Almarè Boutique schema
create table if not exists products (
  id text primary key,
  name text not null,
  price numeric not null default 0,
  category text,
  collection text,
  image text,
  sizes text[] default '{}',
  colors text[] default '{}',
  model text,
  age text,
  gender text,
  description text,
  created_at timestamptz default now()
);
create table if not exists collections (
  id text primary key,
  name text not null,
  description text,
  image text,
  created_at timestamptz default now()
);
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text,
  city text,
  address text,
  notes text,
  items jsonb not null default '[]',
  total numeric not null default 0,
  status text default 'pending',
  created_at timestamptz default now()
);
alter table products enable row level security;
alter table collections enable row level security;
alter table orders enable row level security;
drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);
drop policy if exists "public write products" on products;
create policy "public write products" on products for all using (true) with check (true);
drop policy if exists "public read collections" on collections;
create policy "public read collections" on collections for select using (true);
drop policy if exists "public write collections" on collections;
create policy "public write collections" on collections for all using (true) with check (true);
drop policy if exists "public insert orders" on orders;
create policy "public insert orders" on orders for insert with check (true);
drop policy if exists "public read orders" on orders;
create policy "public read orders" on orders for select using (true);
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do nothing;
drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects for select using (bucket_id = 'product-images');
drop policy if exists "public upload product images" on storage.objects;
create policy "public upload product images" on storage.objects for insert with check (bucket_id = 'product-images');
drop policy if exists "public update product images" on storage.objects;
create policy "public update product images" on storage.objects for update using (bucket_id = 'product-images');
drop policy if exists "public delete product images" on storage.objects;
create policy "public delete product images" on storage.objects for delete using (bucket_id = 'product-images');
