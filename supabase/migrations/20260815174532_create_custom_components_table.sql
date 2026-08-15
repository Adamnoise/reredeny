/*
# Create custom_components table (single-tenant, no auth)

1. Purpose
   Stores user-created custom components for the Premium Component Studio.
   Built-in components live in code; user-created ones live here so they
   survive page reloads.

2. New Tables
   - `custom_components`
     - `id` (uuid, primary key)
     - `slug` (text, unique, not null) — URL-safe identifier
     - `title` (text, not null) — display name
     - `category` (text, not null) — e.g. "Controls", "Cards & Containers"
     - `description` (text, not null) — short summary
     - `tags` (text[], default '{}') — searchable tags
     - `version` (text, default '1.0.0')
     - `status` (text, default 'Stable') — lifecycle status
     - `tsx_code` (text, not null) — raw TSX source for live execution
     - `prop_schema` (jsonb, default '[]') — inspector control definitions
     - `default_props` (jsonb, default '{}') — default prop values
     - `files` (jsonb, default '[]') — source code file array
     - `documentation` (jsonb, default '{}') — overview, usage, a11y notes, tokens
     - `metadata` (jsonb, default '{}') — a11y score, responsive, keyboard, etc.
     - `created_at` (timestamptz, default now())
     - `updated_at` (timestamptz, default now())

3. Security
   - RLS enabled.
   - Single-tenant (no sign-in): anon + authenticated have full CRUD.
     Data is intentionally public/shared within the studio.
*/

CREATE TABLE IF NOT EXISTS custom_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  tags text[] DEFAULT '{}',
  version text DEFAULT '1.0.0',
  status text DEFAULT 'Stable',
  tsx_code text NOT NULL,
  prop_schema jsonb DEFAULT '[]'::jsonb,
  default_props jsonb DEFAULT '{}'::jsonb,
  files jsonb DEFAULT '[]'::jsonb,
  documentation jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE custom_components ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_custom_components" ON custom_components;
CREATE POLICY "anon_select_custom_components" ON custom_components FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_custom_components" ON custom_components;
CREATE POLICY "anon_insert_custom_components" ON custom_components FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_custom_components" ON custom_components;
CREATE POLICY "anon_update_custom_components" ON custom_components FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_custom_components" ON custom_components;
CREATE POLICY "anon_delete_custom_components" ON custom_components FOR DELETE
  TO anon, authenticated USING (true);
