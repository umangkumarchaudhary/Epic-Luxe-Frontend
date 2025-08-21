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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Clean phone number (remove any non-digits)
      const cleanPhone = values.phone.replace(/\D/g, '');
      
      // Prepare lead data for reassured backend
      const leadData = {
        lead_type: 'vehicle_request',
        name: values.name.trim(),
        phone: cleanPhone,
        email: '',
        preferred_model: values.desired.trim(),
        location: '',
        message: `Vehicle availability request for: ${values.desired.trim()}`
      };

      const response = await fetch('https://raam-group-all-websites.onrender.com/admin/reassured-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vehicle request');
      }

      setIsLoading(false);
      setSent(true);
    } catch (error) {
      console.error('Error submitting vehicle request:', error);
      setIsLoading(false);
      // You could add user-facing error handling here
      alert('Failed to submit request. Please try again.');
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{background: isLoading ? C.platinum : C.gold, color:C.black}}
      >
        {isLoading ? 'Submitting...' : 'Notify me'}
      </button>
    </form>
  );
}
