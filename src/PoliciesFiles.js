// Policies.jsx

import { Link } from "react-router-dom";

const Container = ({ title, children }) => {
  return (
    <div className="bg-[#d9d5cc] min-h-screen px-6 py-12 text-[#5a3206]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold mb-8">
          {title}
        </h1>

        <div className="space-y-6 text-lg leading-relaxed">
          {children}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-[#5a3206] text-white rounded shadow hover:bg-[#452501] transition"
            aria-label="Back to Home"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// BOOKING POLICY
export function BookingPolicy() {
  return (
    <Container title="Booking Policy">

      <p>
        Varahaswamy Guest House provides comfortable and reliable accommodation
        for pilgrims and families visiting Tirupati.
      </p>

      <h2 className="text-2xl font-semibold">Reservation Confirmation</h2>
      <p>
        Bookings are confirmed only after confirmation via phone, WhatsApp,
        or authorized booking channels.
      </p>

      <h2 className="text-2xl font-semibold">Check-in and Check-out</h2>
      <ul className="list-disc pl-6">
        <li>Check-in: 12:00 PM</li>
        <li>Check-out: 11:00 AM</li>
        <li>Early check-in subject to availability</li>
      </ul>

      <h2 className="text-2xl font-semibold">Identification</h2>
      <p>
        Guests must provide valid government-issued ID proof at check-in.
      </p>

      <h2 className="text-2xl font-semibold">Payment</h2>
      <p>
        Payment may be required at booking or check-in depending on availability.
      </p>

    </Container>
  );
}

// PRIVACY POLICY
export function PrivacyPolicy() {
  return (
    <Container title="Privacy Policy">

      <p>
        Varahaswamy Guest House respects and protects your privacy.
      </p>

      <h2 className="text-2xl font-semibold">Information Collected</h2>
      <ul className="list-disc pl-6">
        <li>Name</li>
        <li>Phone number</li>
        <li>Booking information</li>
      </ul>

      <h2 className="text-2xl font-semibold">Usage</h2>
      <ul className="list-disc pl-6">
        <li>Booking confirmation</li>
        <li>Guest support</li>
        <li>Improving services</li>
      </ul>

      <h2 className="text-2xl font-semibold">Security</h2>
      <p>
        We do not sell or share guest information with third parties.
      </p>

    </Container>
  );
}

// TERMS & CONDITIONS
export function TermsConditions() {
  return (
    <Container title="Terms & Conditions">

      <p>
        By booking or staying at Varahaswamy Guest House, guests agree to the following:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Valid ID proof required</li>
        <li>No illegal activities allowed</li>
        <li>Guests responsible for damages</li>
        <li>Management reserves right to refuse service</li>
        <li>Guests must follow property rules</li>
      </ul>

    </Container>
  );
}

// CANCELLATION POLICY
export function CancellationPolicy() {
  return (
    <Container title="Cancellation Policy">

      <p>
        Guests may cancel bookings by contacting us via phone or WhatsApp.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Cancel at least 24 hours before check-in</li>
        <li>Late cancellations may not be refundable</li>
        <li>Refund timing depends on payment method</li>
      </ul>

    </Container>
  );
}
