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
  try {
    const payload = {
      type,
      ...data,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      onSuccess?.();
      return result;
    } else {
      throw new Error(result.message || 'Failed to submit lead');
    }
  } catch (error) {
    console.error('Lead submission error:', error);
    onError?.(error instanceof Error ? error.message : 'Failed to submit lead');
    throw error;
  }
}