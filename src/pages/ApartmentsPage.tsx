export function ApartmentsPage() {
  return (
    <div className="pageSplit">
      <aside className="leftPanel">
        <div className="panelHeader">
          <div className="panelTitle">Фильтры</div>
          <div className="panelActions">
            <button className="btn btnGhost" type="button">
              Поделиться
            </button>
          </div>
        </div>
        <div className="panelBody">
          <div className="cardBox">
            Здесь будут слайдеры, статусы, доп. фильтры и результаты.
          </div>
        </div>
      </aside>

      <section className="viewer">
        <div className="viewerCanvas">
          <div className="viewerPlaceholder">
            Просмотрщик (секвенция кадров + маски + подсветка)
          </div>
        </div>
      </section>
    </div>
  )
}

