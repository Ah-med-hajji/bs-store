import { createServerClient } from '@/lib/supabase/server';
import { isAuthenticated } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data as Product);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();

    const updateData: Record<string, unknown> = {};

    const stringFields = [
      'category_id', 'slug', 'name_fr', 'name_en', 'badge',
    ];

    for (const field of stringFields) {
      const value = formData.get(field);
      if (value !== null) {
        updateData[field] = value as string;
      }
    }

    const priceValue = formData.get('price');
    if (priceValue !== null) {
      updateData.price = parseFloat(priceValue as string);
    }

    const sortOrder = formData.get('sort_order');
    if (sortOrder !== null) {
      updateData.sort_order = parseInt(sortOrder as string, 10);
    }

    const sizesRaw = formData.get('sizes');
    if (sizesRaw !== null) {
      updateData.sizes = JSON.parse(sizesRaw as string);
    }

    const imageFile = formData.get('image') as File | null;

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

      updateData.image_url = urlData.publicUrl;
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Product);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createServerClient();

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
