"use client";

export default function SummaryCards({ balance, expenses, savings }) {
  const formatAmount = (value) => `\u20b9${value.toLocaleString()}`;

  const cards = [
    {
      title: "Total Balance",
      amount: formatAmount(balance),
      image: "/images/wallet-bg.png",
      border: "border-violet-500/45",
    },
    {
      title: "Expenses",
      amount: formatAmount(expenses),
      image: "/images/down-bg.png",
      border: "border-red-500/45",
    },
    {
      title: "Savings",
      amount: formatAmount(savings),
      image: "/images/up-bg.png",
      border: "border-emerald-500/45",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`relative h-[210px] overflow-hidden rounded-[22px] border p-6 shadow-[0_18px_45px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.3)] ${card.border}`}
        >
          <img
            src={card.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-[100%_100%]"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-black/5" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-lg font-bold text-white drop-shadow">
                {card.title}
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight text-white drop-shadow md:text-5xl">
                {card.amount}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
