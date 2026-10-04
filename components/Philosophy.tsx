import LogoMark from "./LogoMark";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="border-y border-[#283c32] bg-forest px-6 py-[90px] text-[#edece6]"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 text-center lg:grid-cols-[360px_1fr] lg:gap-[60px] lg:text-left">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2d4337] bg-forest-deep px-[30px] py-[50px] text-center shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
          <LogoMark leaves className="mb-5 h-[100px] w-[70px] stroke-[1.8] text-gold-light" />
          <h3 className="mb-1.5 font-serif text-2xl font-medium uppercase tracking-[4px] text-[#ede8de]">
            LUMIÈRE EAST
          </h3>
          <p className="font-serif text-[15px] italic tracking-[1px] text-gold-light">
            Ontario, Canada
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[3px] text-gold-light">
            Our Philosophy
          </p>
          <h2 className="mb-[26px] font-serif text-[30px] font-normal uppercase leading-[1.2] tracking-[2px] text-white sm:text-[42px]">
            The Convergence of Light & Heritage
          </h2>
          <p className="mb-5 text-base font-light leading-[1.8] text-[#d6ddd8]">
            <strong className="font-medium text-gold-light">LUMIÈRE EAST</strong> was born from a
            desire to unite the transcendent radiance of Western refinement with the thousands of
            years of sericulture history preserved in the East.
          </p>
          <p className="mb-5 text-base font-light leading-[1.8] text-[#d6ddd8]">
            Conceived and designed in Ontario, Canada, every scarf starts with authentic Grade 6A
            long-fiber mulberry silk. Rather than mass manufacturing, we celebrate patient
            hand-rolling, delicate colors inspired by Eastern landscapes, and tactile luxury meant
            to be treasured for generations.
          </p>
        </div>
      </div>
    </section>
  );
}
