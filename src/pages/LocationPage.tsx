export function LocationPage() {
  return (
    <div className="pageSplit">
      <aside className="leftPanel">
        <div className="panelHeader">
          <div className="panelTitle">Локация</div>
        </div>
        <div className="panelBody">
          <div className="cardBox">
            Список точек интереса (школы/садики/больницы и т.д.) + маршрут от
            адреса пользователя.
          </div>
        </div>
      </aside>
      <section className="viewer">
        <div className="viewerCanvas">
          <div className="viewerPlaceholder">Карта будет здесь.</div>
        </div>
      </section>
    </div>
  )
}

