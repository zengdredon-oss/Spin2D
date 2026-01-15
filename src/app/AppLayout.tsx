import { NavLink, Outlet } from 'react-router-dom'

function TabLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `tab ${isActive ? 'tabActive' : ''}`.trim()
      }
    >
      {label}
    </NavLink>
  )
}

export function AppLayout() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbarLeft">
          <div className="brand">Spin2D</div>
          <nav className="tabs" aria-label="Main sections">
            <TabLink to="/" label="Квартиры" />
            <TabLink to="/location" label="Локация" />
            <TabLink to="/gallery" label="Галерея" />
            <TabLink to="/compare" label="Сравнение" />
          </nav>
        </div>
        <div className="topbarRight">
          <div className="hint">MVP прототип</div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

