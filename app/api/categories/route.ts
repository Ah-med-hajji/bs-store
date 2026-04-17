import { createServerClient } from '@/lib/supabase/server';
import { isAuthenticated } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Category } from '@/lib/types';

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Category[]);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const slug = formData.get('slug') as string;
    const name_fr = formData.get('name_fr') as string;
    const name_en = formData.get('name_en') as string;
    const subtitle_fr = (formData.get('subtitle_fr') as string) || null;
    const subtitle_en = (formData.get('subtitle_en') as string) || null;
    const card_desc_fr = (formData.get('card_desc_fr') as string) || null;
    const card_desc_en = (formData.get('card_desc_en') as string) || null;
    const desc_fr = (formData.get('desc_fr') as string) || null;
    const desc_en = (formData.get('desc_en') as string) || null;
    const sort_order = parseInt(formData.get('sort_order') as string, 10) || 0;
    const imageFile = formData.get('image') as File | null;

    let image_url: string | null = null;

    if (imageFile) {
      const supabase = createServerClient();
      const ext = imageFile.name.split('.').pop() || 'jpg';
      const filename = `${crypto.randomUUID()}.${ext}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filename, buffer, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filename);

      image_url = urlData.publicUrl;
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('categories')
      .insert({
        slug,
        name_fr,
        name_en,
        subtitle_fr,
        subtitle_en,
        card_desc_fr,
        card_desc_en,
        desc_fr,
        desc_en,
        image_url,
        sort_order,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
