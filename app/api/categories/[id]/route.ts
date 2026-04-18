import { createServerClient } from '@/lib/supabase/server';
import { isAuthenticated } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Category } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data as Category);
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

    const fields = [
      'slug', 'name_fr', 'name_en', 'subtitle_fr', 'subtitle_en',
      'card_desc_fr', 'card_desc_en', 'desc_fr', 'desc_en',
    ];

    for (const field of fields) {
      const value = formData.get(field);
      if (value !== null) {
        updateData[field] = value as string;
      }
    }

    const sortOrder = formData.get('sort_order');
    if (sortOrder !== null) {
      updateData.sort_order = parseInt(sortOrder as string, 10);
    }

    const imageFile = formData.get('image') as File | null;
    const imageUrlStr = formData.get('image_url') as string | null;

    if (imageUrlStr !== null) {
      updateData.image_url = imageUrlStr || null;
    }

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
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Category);
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
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete category' },
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
