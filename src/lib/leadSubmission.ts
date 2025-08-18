export interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  carBrand?: string;
  carModel?: string;
  review?: string;
  consent?: boolean;
  [key: string]: string | boolean | undefined; // Allow additional fields
}

export interface LeadSubmissionOptions {
  type: string;
  data: LeadData;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export async function submitLead({ type, data, onSuccess, onError }: LeadSubmissionOptions) {
  console.log('[DEBUG] Lead submission started:', {
    type,
    data: { ...data, phone: data.phone ? '[REDACTED]' : undefined },
    timestamp: new Date().toISOString()
  });
  
  try {
    const payload = {
      type,
      ...data,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    console.log('[DEBUG] Lead submission payload:', {
      type: payload.type,
      timestamp: payload.timestamp,
      url: payload.url,
      dataFields: Object.keys(data),
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      hasName: !!data.name
    });

    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('[DEBUG] Lead submission response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      timestamp: new Date().toISOString()
    });

    if (!response.ok) {
      console.error('[ERROR] Lead submission HTTP error:', {
        status: response.status,
        statusText: response.statusText,
        type,
        timestamp: new Date().toISOString()
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[DEBUG] Lead submission result:', {
      success: result.success,
      message: result.message,
      type,
      timestamp: new Date().toISOString()
    });
    
    if (result.success) {
      console.log('[DEBUG] Lead submission successful, calling onSuccess callback');
      onSuccess?.();
      return result;
    } else {
      console.error('[ERROR] Lead submission failed:', {
        message: result.message,
        result,
        type,
        timestamp: new Date().toISOString()
      });
      throw new Error(result.message || 'Failed to submit lead');
    }
  } catch (error) {
    console.error('[ERROR] Lead submission error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type,
      timestamp: new Date().toISOString()
    });
    onError?.(error instanceof Error ? error.message : 'Failed to submit lead');
    throw error;
  }
}