import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    console.log('[DEBUG] Image upload request received:', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    });
    
    const formData = await request.formData();
    const file = formData.get('image') as File;
    console.log('[DEBUG] Image upload file info:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      hasFile: !!file
    });

    if (!file) {
      console.log('[DEBUG] Image upload failed - no file provided');
      return NextResponse.json({
        success: false,
        error: 'No image file provided'
      }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('[DEBUG] Image upload failed - invalid file type:', file.type);
      return NextResponse.json({
        success: false,
        error: 'Only image files are allowed'
      }, { status: 400 });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.log('[DEBUG] Image upload failed - file too large:', {
        fileSize: file.size,
        maxSize,
        fileName: file.name
      });
      return NextResponse.json({
        success: false,
        error: 'File size must be less than 5MB'
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    
    const uniqueFileName = `${timestamp}-${originalName}`;

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'blog-images');
    console.log('[DEBUG] Upload directory check:', {
      uploadsDir,
      exists: existsSync(uploadsDir)
    });
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
      console.log('[DEBUG] Created uploads directory:', uploadsDir);
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(uploadsDir, uniqueFileName);
    
    console.log('[DEBUG] Saving file:', {
      filePath,
      bufferSize: buffer.length,
      uniqueFileName
    });
    
    await writeFile(filePath, buffer);
    console.log('[DEBUG] File saved successfully:', uniqueFileName);

    // Return public URL
    const publicUrl = `/uploads/blog-images/${uniqueFileName}`;
    console.log('[DEBUG] Image upload successful:', {
      uniqueFileName,
      publicUrl,
      originalName: file.name
    });

    return NextResponse.json({
      success: true,
      data: {
        path: uniqueFileName,
        url: publicUrl
      }
    });

  } catch (error) {
    console.error('[ERROR] Image upload error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({
      success: false,
      error: 'Failed to upload image'
    }, { status: 500 });
  }
}