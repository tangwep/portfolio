import cicada from "../assets/cicada.png";

/** Centered intro — no absolute positioning so it sits in the flex column cleanly. */
function CicadaCenter() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="grid h-40 w-40 place-items-center rounded-full bg-zinc-900/35 ring-1 ring-zinc-600/40 backdrop-blur-sm">
        <img
          src={cicada}
          alt="Cicada center symbol"
          className="h-28 w-28 rounded-full object-cover opacity-90"
        />
      </div>
      <p className="text-center text-sm italic tracking-wide text-zinc-400">
        Rabin Kattel
      </p>
    </div>
  );
}

export default CicadaCenter;
