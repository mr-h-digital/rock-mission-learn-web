const BACKDROPS = {
  catalog: {
    imageUrl: '/images/courses-bg-designer-60.png',
    gradientClass: 'bg-gradient-to-b from-[#0a1220]/26 via-[#111a2d]/46 to-[#0e1524]/68',
  },
  detail: {
    imageUrl: 'https://images.pexels.com/photos/84613/pexels-photo-84613.jpeg?auto=compress&cs=tinysrgb&w=2200',
    gradientClass: 'bg-gradient-to-b from-[#0b1320]/24 via-[#132039]/44 to-[#0f1728]/68',
  },
  player: {
    imageUrl: 'https://images.pexels.com/photos/2106037/pexels-photo-2106037.jpeg?auto=compress&cs=tinysrgb&w=2200',
    gradientClass: 'bg-gradient-to-b from-[#091121]/26 via-[#101f34]/48 to-[#0a1220]/74',
  },
  dashboard: {
    imageUrl: '/images/dashboard-bg-designer-62.png',
    gradientClass: 'bg-gradient-to-b from-[#0b1321]/24 via-[#10223a]/42 to-[#0f1627]/70',
  },
  teach: {
    imageUrl: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg?auto=compress&cs=tinysrgb&w=2200',
    gradientClass: 'bg-gradient-to-b from-[#0b1320]/22 via-[#15253e]/44 to-[#0e1628]/68',
  },
  builder: {
    imageUrl: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=2200',
    gradientClass: 'bg-gradient-to-b from-[#0a1220]/24 via-[#14253f]/44 to-[#101827]/70',
  },
  admin: {
    imageUrl: 'https://images.pexels.com/photos/2088170/pexels-photo-2088170.jpeg?auto=compress&cs=tinysrgb&w=2200',
    gradientClass: 'bg-gradient-to-b from-[#0a1220]/28 via-[#162640]/50 to-[#0c1525]/72',
  },
  settings: {
    imageUrl: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=2200',
    gradientClass: 'bg-gradient-to-b from-[#0a1220]/24 via-[#12233a]/44 to-[#0d1626]/68',
  },
}

export default function ThemedPage({ variant = 'catalog', children }) {
  const backdrop = BACKDROPS[variant] || BACKDROPS.catalog

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={backdrop.imageUrl}
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/images/home-bg-designer-58.png'
          }}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(38,232,215,0.15),rgba(9,16,28,0.52)_58%)]" />
        <div className={`absolute inset-0 ${backdrop.gradientClass}`} />
      </div>

      {children}
    </div>
  )
}
