import { Link } from "react-router-dom";

export default function Policies() {
  // Links mapped to user-friendly policy names,
  // match the routes in App.js lines 16-19
  const policyLinks = [
    { name: "Booking Policy", to: "/policy/booking" },
    { name: "Privacy Policy", to: "/policy/privacy" },
    { name: "Terms & Conditions", to: "/policy/terms" },
    { name: "Cancellation Policy", to: "/policy/cancellation" },
  ];

  return (
    <section className="bg-black px-4 py-6 rounded-t-xl shadow-md ">
      <h2 className="text-white text-xl font-semibold mb-4 text-center tracking-wide">
        Our Policies
      </h2>
      <ul className="flex gap-3 justify-center">
        {policyLinks.map((policy) => (
          <li key={policy.name}>
            <Link
              to={policy.to}
              className={`text-white text-base font-normal px-3 py-2 rounded flex items-center transition-all
                hover:bg-slate-600/80 hover:scale-[1.1]
              `}
              tabIndex={0}
              aria-label={policy.name}
            >
              {policy.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
