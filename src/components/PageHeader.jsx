export default function PageHeader({ title, intro, children, image }) {
  return (
    <header className="on-ink relative isolate overflow-hidden bg-ink text-white">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </>
      )}
      <div className="mx-auto max-w-[90rem] px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44">
        <h1 className="font-display t-1 max-w-4xl">{title}</h1>
        {intro && <p className="t-lede mt-6 max-w-2xl text-white/80">{intro}</p>}
        {children}
      </div>
    </header>
  )
}
