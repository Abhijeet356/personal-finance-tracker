"use client";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        z-[9999]

        bottom-6
        right-6
        md:bottom-8
        md:right-8

        w-[74px]
        h-[74px]

        rounded-full

        bg-gradient-to-br
        from-violet-600
        via-purple-600
        to-indigo-700

        flex
        items-center
        justify-center

        text-white
        text-[44px]
        font-normal

        shadow-[0_18px_45px_rgba(124,58,237,0.45)]

        transition-all
        duration-300
        ease-out

        hover:scale-[1.08]
        hover:shadow-[0_22px_60px_rgba(124,58,237,0.55)]

        active:scale-[0.96]
      "
    >
      {/* Inner Shine */}
      <div
        className="
          absolute
          inset-[2px]

          rounded-full

          bg-gradient-to-br
          from-white/15
          to-transparent

          pointer-events-none
        "
      ></div>

      {/* Plus */}
      <span className="relative -mt-[4px]">+</span>
    </button>
  );
}
