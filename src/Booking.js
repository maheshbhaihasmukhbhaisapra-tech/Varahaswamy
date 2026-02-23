import { useState } from "react";

// Define an improved color palette for a more inviting, modern look
const COLORS = {
  primary: "#24569e",       // Deep blue
  primaryDark: "#174073",   // More saturated for hover
  accent: "#ff234d",        // Vibrant accent (matches WhatsApp CTA theme from context)
  bgField: "#f3f6fa",       // Light bluish/gray
  border: "#cbd4e1",        // Soft, gentle border
  h2: "#234073",            // Heading deep blue
  placeholder: "#65748b",   // Subtle but readable
  button: "#24569e",        // Action button
  buttonHover: "#174073", 
};

export default function BookingEnquiry({ phoneNo }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    checkin: "",
    guests: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Combine fields to form a message like a real person asking
  const makeWhatsappMessage = () => {
    let message = "Hello,\n";
    if (form.fullName) message += `My name is ${form.fullName}.\n`;
    if (form.phone) message += `You can reach me at ${form.phone}.\n`;
    if (form.checkin) message += `I am looking to book a room for check-in on ${form.checkin}.\n`;
    if (form.guests) message += `We will be ${form.guests} guest${form.guests === "1" ? "" : "s"}.\n`;
    if (form.requirements) message += `Here are my additional requirements: ${form.requirements}\n`;
    message += "\nCan you please share availability and details? Thank you!";
    return message.trim();
  };

  const handleEnquireWhatsapp = (e) => {
    e.preventDefault();
    if (!phoneNo || !form.fullName || !form.phone) {
      // Optionally: add client-side validation/alerts.
      window.alert('Please fill your Name, Phone, and ensure hotel contact is active.');
      return;
    }
    // Remove '+' from phoneNo for wa.me links
    const cleanedPhone = phoneNo.replace(/^\+/, "");
    const msg = makeWhatsappMessage();
    const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section className="bg-white shadow-md rounded-xl p-5 max-w-md mx-auto my-10">
      <h2
        className="text-2xl font-bold mb-3 text-center tracking-wide"
        style={{ color: COLORS.h2 }}
      >
        Room Booking Enquiry
      </h2>
      <form className="space-y-3" onSubmit={handleEnquireWhatsapp}>
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 text-base outline-none transition"
            style={{
              background: COLORS.bgField,
              border: `1.5px solid ${COLORS.border}`,
              color: COLORS.h2,
            }}
            onFocus={e =>
              (e.target.style.borderColor = COLORS.primary)
            }
            onBlur={e =>
              (e.target.style.borderColor = COLORS.border)
            }
            autoComplete="off"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 text-base outline-none transition"
            style={{
              background: COLORS.bgField,
              border: `1.5px solid ${COLORS.border}`,
              color: COLORS.h2,
            }}
            onFocus={e =>
              (e.target.style.borderColor = COLORS.primary)
            }
            onBlur={e =>
              (e.target.style.borderColor = COLORS.border)
            }
            autoComplete="off"
            required
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            name="checkin"
            placeholder="Check-in"
            value={form.checkin}
            onChange={handleChange}
            className="flex-1 rounded px-3 py-2 text-base outline-none transition"
            style={{
              background: COLORS.bgField,
              border: `1.5px solid ${COLORS.border}`,
              color: COLORS.h2,
            }}
            onFocus={e =>
              (e.target.style.borderColor = COLORS.primary)
            }
            onBlur={e =>
              (e.target.style.borderColor = COLORS.border)
            }
            autoComplete="off"
          />
          <input
            type="number"
            name="guests"
            placeholder="Guests"
            value={form.guests}
            min="1"
            onChange={handleChange}
            className="w-24 rounded px-3 py-2 text-base outline-none transition"
            style={{
              background: COLORS.bgField,
              border: `1.5px solid ${COLORS.border}`,
              color: COLORS.h2,
            }}
            onFocus={e =>
              (e.target.style.borderColor = COLORS.primary)
            }
            onBlur={e =>
              (e.target.style.borderColor = COLORS.border)
            }
          />
        </div>
        <div>
          <textarea
            name="requirements"
            placeholder="Additional requirements"
            value={form.requirements}
            onChange={handleChange}
            rows={2}
            className="w-full rounded px-3 py-2 text-base outline-none transition resize-none"
            style={{
              background: COLORS.bgField,
              border: `1.5px solid ${COLORS.border}`,
              color: COLORS.h2,
            }}
            onFocus={e =>
              (e.target.style.borderColor = COLORS.primary)
            }
            onBlur={e =>
              (e.target.style.borderColor = COLORS.border)
            }
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full font-semibold py-2 rounded transition"
          style={{
            background: COLORS.button,
            color: "#fff",
            letterSpacing: ".02em",
          }}
          onMouseOver={e => {
            e.target.style.background = COLORS.buttonHover;
          }}
          onMouseOut={e => {
            e.target.style.background = COLORS.button;
          }}
        >
          Enquire via WhatsApp
        </button>
      </form>
      <style>{`
        input, textarea {
          color: ${COLORS.h2};
        }
        input::placeholder, textarea::placeholder {
          color: ${COLORS.placeholder};
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
