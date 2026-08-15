import { supabase } from './supabaseClient';
import { RegisteredComponent, PropSchemaItem, ComponentSourceFile } from '../types/studio';

export interface CustomComponentRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  version: string;
  status: string;
  tsx_code: string;
  prop_schema: PropSchemaItem[];
  default_props: Record<string, any>;
  files: ComponentSourceFile[];
  documentation: {
    overview: string;
    usageSnippet: string;
    accessibilityNotes: string[];
    cssTokens: string[];
  };
  metadata: {
    accessibilityScore: number;
    responsive: boolean;
    keyboardSupported: boolean;
    reducedMotionSupported: boolean;
    darkModeSupported: boolean;
    dependencies: string[];
    author: string;
    updatedAt: string;
    kbShortcuts?: string[];
  };
  created_at: string;
  updated_at: string;
}

export async function fetchCustomComponents(): Promise<CustomComponentRecord[]> {
  const { data, error } = await supabase
    .from('custom_components')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch custom components:', error.message);
    return [];
  }

  return (data || []) as unknown as CustomComponentRecord[];
}

export async function saveCustomComponent(
  record: Omit<CustomComponentRecord, 'id' | 'created_at' | 'updated_at'>
): Promise<CustomComponentRecord | null> {
  const { data, error } = await supabase
    .from('custom_components')
    .insert(record)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to save custom component:', error.message);
    return null;
  }

  return data as unknown as CustomComponentRecord;
}

export async function deleteCustomComponent(slug: string): Promise<boolean> {
  const { error } = await supabase
    .from('custom_components')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Failed to delete custom component:', error.message);
    return false;
  }

  return true;
}

export async function updateCustomComponent(
  slug: string,
  updates: Partial<Omit<CustomComponentRecord, 'id' | 'created_at' | 'updated_at'>>
): Promise<CustomComponentRecord | null> {
  const { data, error } = await supabase
    .from('custom_components')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('slug', slug)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to update custom component:', error.message);
    return null;
  }

  return data as unknown as CustomComponentRecord;
}
