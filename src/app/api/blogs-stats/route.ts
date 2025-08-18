import { NextRequest, NextResponse } from 'next/server';

// Mock blog storage (in production, this would be a database)
// This should reference the same blogs array as in the main blogs route
// For now, we'll create a simple mock that returns reasonable stats

export async function GET(request: NextRequest) {
  try {
    console.log('[DEBUG] Blog stats request received:', {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    });
    
    // In a real application, you would query your database here
    // For now, we'll return mock data
    const stats = {
      total: 0,
      published: 0,
      featured: 0,
      draft: 0
    };
    
    console.log('[DEBUG] Blog stats generated:', stats);

    console.log('[DEBUG] Blog stats response sent successfully');
    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('[ERROR] Blog stats error:', {
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