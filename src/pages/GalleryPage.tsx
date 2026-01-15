export function GalleryPage() {
  return (
    <div className="pageSplit">
      <aside className="leftPanel">
        <div className="panelHeader">
          <div className="panelTitle">Галерея</div>
        </div>
        <div className="panelBody">
          <div className="cardBox">
            Оглавление рендеров и фильтрация по категориям.
          </div>
        </div>
      </aside>
      <section className="viewer">
        <div className="viewerCanvas">
          <div className="viewerPlaceholder">Галерея (masonry) будет здесь.</div>
        </div>
      </section>
    </div>
  )
}

