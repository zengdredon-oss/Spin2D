export function ComparePage() {
  return (
    <div className="pageSplit">
      <aside className="leftPanel">
        <div className="panelHeader">
          <div className="panelTitle">Сравнение</div>
        </div>
        <div className="panelBody">
          <div className="cardBox">
            Слева: количество выбранных, “связь с продавцом”, “очистить” и список
            параметров сравнения.
          </div>
        </div>
      </aside>
      <section className="viewer">
        <div className="viewerCanvas">
          <div className="viewerPlaceholder">
            Справа: карточки выбранных квартир для сравнения.
          </div>
        </div>
      </section>
    </div>
  )
}

