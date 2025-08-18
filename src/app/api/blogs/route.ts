import { NextRequest, NextResponse } from 'next/server';

interface Blog {
  title: string;
  subtitle?: string;
  content: string;
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  image?: string;
  slug?: string;
}

// Mock blog storage (in production, this would be a database)
let blogs: Array<Blog & { id: number; slug: string; createdAt: string; updatedAt: string; publishedAt?: string }> = [];
let nextId = 1;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    console.log('[DEBUG] Blog POST request received:', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    });
    
    const body: Blog = await request.json();
    console.log('[DEBUG] Blog POST request body:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      console.log('[DEBUG] Blog POST validation failed:', {
        hasTitle: !!body.title,
        hasContent: !!body.content,
        hasCategory: !!body.category,
        receivedFields: Object.keys(body)
      });
      return NextResponse.json({
        success: false,
        error: 'Title, content, and category are required'
      }, { status: 400 });
    }

    // Generate slug
    const slug = body.slug || generateSlug(body.title);
    
    // Check if slug already exists
    const existingBlog = blogs.find(blog => blog.slug === slug);
    console.log('[DEBUG] Blog slug check:', {
      generatedSlug: slug,
      existingBlog: !!existingBlog,
      totalBlogs: blogs.length
    });
    if (existingBlog) {
      console.log('[DEBUG] Blog POST failed - duplicate slug:', slug);
      return NextResponse.json({
        success: false,
        error: 'A blog with this slug already exists'
      }, { status: 400 });
    }

    // Create new blog
    const newBlog = {
      id: nextId++,
      ...body,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: body.status === 'published' ? new Date().toISOString() : undefined
    };

    blogs.push(newBlog);
    console.log('[DEBUG] Blog created successfully:', {
      id: newBlog.id,
      slug: newBlog.slug,
      status: newBlog.status,
      totalBlogs: blogs.length
    });

    return NextResponse.json({
      success: true,
      data: newBlog
    });

  } catch (error) {
    console.error('[ERROR] Blog creation error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('[DEBUG] Blog GET request received:', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    });
    
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    console.log('[DEBUG] Blog GET search params:', Object.fromEntries(searchParams.entries()));
    
    // Get query parameters
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredBlogs = [...blogs];

    // Apply filters
    if (category && category !== 'all') {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === category);
    }

    if (status && status !== 'all') {
      if (status === 'featured') {
        filteredBlogs = filteredBlogs.filter(blog => blog.featured);
      } else {
        filteredBlogs = filteredBlogs.filter(blog => blog.status === status);
      }
    }

    if (featured !== null && featured !== undefined) {
      filteredBlogs = filteredBlogs.filter(blog => blog.featured === (featured === 'true'));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.subtitle?.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const paginatedBlogs = filteredBlogs.slice(offset, offset + limit);
    console.log('[DEBUG] Blog GET results:', {
      totalBlogs: blogs.length,
      filteredCount: filteredBlogs.length,
      returnedCount: paginatedBlogs.length,
      offset,
      limit,
      hasMore: filteredBlogs.length > offset + limit
    });

    return NextResponse.json({
      success: true,
      data: paginatedBlogs,
      count: paginatedBlogs.length,
      hasMore: filteredBlogs.length > offset + limit
    });

  } catch (error) {
    console.error('[ERROR] Blog fetch error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}