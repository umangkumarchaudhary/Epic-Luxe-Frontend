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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* TODO: send to backend / Airtable / email */
    console.table(values);
    setSent(true);
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
        className="w-full py-3 rounded text-sm font-semibold"
        style={{background:C.gold,color:C.black}}
      >
        Notify me
      </button>
    </form>
  );
}
