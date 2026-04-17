import { createServerClient } from '@/lib/supabase/server';
import { isAuthenticated } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('categorySlug');

    let query = supabase
      .from('products')
      .select('*, categories!inner(slug)')
      .order('sort_order', { ascending: true });

    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Product[]);
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
    const category_id = formData.get('category_id') as string;
    const slug = formData.get('slug') as string;
    const name_fr = formData.get('name_fr') as string;
    const name_en = formData.get('name_en') as string;
    const price = parseFloat(formData.get('price') as string);
    const badge = (formData.get('badge') as string) || null;
    const sort_order = parseInt(formData.get('sort_order') as string, 10) || 0;
    const sizesRaw = formData.get('sizes') as string | null;
    const sizes = sizesRaw ? JSON.parse(sizesRaw) : null;
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
      .from('products')
      .insert({
        category_id,
        slug,
        name_fr,
        name_en,
        price,
        badge,
        image_url,
        sizes,
        sort_order,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
