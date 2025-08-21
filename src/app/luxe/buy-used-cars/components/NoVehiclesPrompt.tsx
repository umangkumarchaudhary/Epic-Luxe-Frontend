/* NoVehiclesPrompt.tsx
   Dark-theme, gold-accent form that appears when the filtered
   vehicle array is empty.  Collects: desired brand & model, name,
   phone.  After submit -> thank-you message.
*/
import React, { useState } from 'react';

const C = {
  gold: '#D4AF37',
  black: '#000',
  white: '#FFF',
  platinum: '#C0C0C0'
};

export default function NoVehiclesPrompt() {
  const [values, setValues] = useState({
    desired: '',
    name: '',
    phone: ''
  });
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cleanedPhone = values.phone.replace(/\s+/g, '');
      
      const submitData = {
        lead_type: 'vehicle_request',
        lead_title: 'Vehicle Not Found Request',
        name: values.name.trim(),
        phone: cleanedPhone,
        email: null,
        preferred_model: values.desired.trim(),
        vehicle_id: null,
        appointment_date: null,
        appointment_time: null,
        message: `Customer is looking for: ${values.desired}`,
        budget: null,
        insurance_type: null,
        loan_details: null,
        status: 'new',
        source_page: 'Vehicle Search - No Results',
        brand: null,
        fuel: null,
        variant: null,
        city: null,
        year: null,
        owner: null,
        kms: null,
        whatsapp_updates: null,
        monthly_income: null,
        employment_type: null,
        interested_car: values.desired.trim(),
        loan_amount: null,
        emi_tenure: null,
        interest: null,
        your_emi: null,
        total_payable: null,
        pan_card: null,
        car_interest: null
      };

      const response = await fetch('https://raam-group-all-websites.onrender.com/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vehicle request');
      }

      const result = await response.json();
      console.log('Vehicle request submitted successfully:', result);
      
      setSent(true);
    } catch (err) {
      console.error('Error submitting vehicle request:', err);
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent)
    return (
      <div className="w-full max-w-md mx-auto text-center p-8 rounded-lg"
           style={{background:'#111',border:`1px solid ${C.platinum}`}}>
        <h3 className="text-xl font-semibold mb-3" style={{color:C.gold}}>
          Thank you!
        </h3>
        <p className="text-sm text-gray-300">
          We’ve received your request. As soon as the car you’re looking
          for is back in stock, our team will reach out.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-8 rounded-lg space-y-5"
      style={{background:'#111',border:`1px solid ${C.platinum}`}}
    >
      <h3 className="text-xl font-semibold text-center" style={{color:C.gold}}>
        Couldn’t find your car?
      </h3>
      <p className="text-sm text-gray-400 text-center">
        Tell us what you want and we’ll notify you the moment it arrives.
      </p>

      <input
        required
        name="desired"
        value={values.desired}
        onChange={handleChange}
        placeholder="Brand & Model (e.g. BMW X7)"
        className="w-full px-4 py-3 rounded border text-sm bg-black"
        style={{borderColor:C.platinum,color:C.white}}
      />

      <input
        required
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full px-4 py-3 rounded border text-sm bg-black"
        style={{borderColor:C.platinum,color:C.white}}
      />

      <input
        required
        name="phone"
        pattern="^[0-9]{7,15}$"
        value={values.phone}
        onChange={handleChange}
        placeholder="Phone number"
        className="w-full px-4 py-3 rounded border text-sm bg-black"
        style={{borderColor:C.platinum,color:C.white}}
      />

      {error && (
        <div className="text-red-400 text-sm text-center p-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{background: isLoading ? '#999' : C.gold, color: C.black}}
      >
        {isLoading ? 'Submitting...' : 'Notify me'}
      </button>
    </form>
  );
}
