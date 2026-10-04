import { supabase } from "./supabase";

export type Fragrance = {
  id: string;
  name: string;
  house: string;
  year: number | null;
  concentration: string | null;
  gender: string | null;
  notesTop: string[];
  notesMid: string[];
  notesBase: string[];
  imageUrl: string | null;
};

type Row = {
  id: string;
  name: string;
  house: string;
  year: number | null;
  concentration: string | null;
  gender: string | null;
  notes_top: string[] | null;
  notes_mid: string[] | null;
  notes_base: string[] | null;
  image_url: string | null;
};

export async function loadFragrances(): Promise<Fragrance[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("fragrances")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToFragrance);
}

export async function loadFragrance(id: string): Promise<Fragrance | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("fragrances")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return rowToFragrance(data);
}

function rowToFragrance(r: Row): Fragrance {
  return {
    id: r.id,
    name: r.name,
    house: r.house,
    year: r.year,
    concentration: r.concentration,
    gender: r.gender,
    notesTop: r.notes_top ?? [],
    notesMid: r.notes_mid ?? [],
    notesBase: r.notes_base ?? [],
    imageUrl: r.image_url,
  };
}