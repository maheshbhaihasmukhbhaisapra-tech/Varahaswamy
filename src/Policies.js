export default function Policies() {
  const policies = [
    "Booking Policy",
    "Privacy Policy",
    "Terms & Conditions",
    "Cancellation Policy",
  ];

  return (
    <section className="bg-black px-4 py-6 rounded-t-xl shadow-md ">
      <h2 className="text-white text-xl font-semibold mb-4 text-center tracking-wide">
        Our Policies
      </h2>
      <ul className="flex  gap-3 justify-center">
        {policies.map((policy, idx) => (
          <li
            key={policy}
            className={`text-white text-base font-normal px-3 py-2 rounded flex items-center transition-all
              hover:bg-slate-600/80 hover:scale-[1.1]
            `}
            tabIndex={0}
            role="button"
            aria-label={policy}
          >
            {policy}
          </li>
        ))}
      </ul>
    </section>
  );
}
