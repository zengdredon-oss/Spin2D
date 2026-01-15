const apartments = [
  {
    id: "F.5.1",
    building: "F",
    area: 91.8,
    rooms: 3,
    floor: 4,
    price: 993056.97,
    status: "available",
    attributes: { garden: false, terrace: true, balcony: true, loggia: false },
    options: { air: true, smart: true },
    frame: 6,
    mask: { x: 62, y: 34, w: 14, h: 10 },
    planLabel: "Plan A",
  },
  {
    id: "F.7.1",
    building: "F",
    area: 91.8,
    rooms: 3,
    floor: 6,
    price: 1169904.16,
    status: "available",
    attributes: { garden: false, terrace: false, balcony: true, loggia: true },
    options: { air: true, smart: false },
    frame: 9,
    mask: { x: 58, y: 18, w: 16, h: 11 },
    planLabel: "Plan B",
  },
  {
    id: "F.7.2",
    building: "F",
    area: 69.7,
    rooms: 3,
    floor: 6,
    price: 1270507.22,
    status: "reserved",
    attributes: { garden: false, terrace: true, balcony: false, loggia: false },
    options: { air: false, smart: true },
    frame: 11,
    mask: { x: 44, y: 18, w: 14, h: 11 },
    planLabel: "Plan C",
  },
  {
    id: "F.2.2",
    building: "F",
    area: 83.5,
    rooms: 3,
    floor: 1,
    price: 1273770.56,
    status: "available",
    attributes: { garden: true, terrace: false, balcony: true, loggia: false },
    options: { air: true, smart: false },
    frame: 2,
    mask: { x: 38, y: 52, w: 16, h: 12 },
    planLabel: "Plan D",
  },
  {
    id: "F.3.1",
    building: "F",
    area: 91.8,
    rooms: 3,
    floor: 2,
    price: 1759427.16,
    status: "sold",
    attributes: { garden: false, terrace: false, balcony: true, loggia: false },
    options: { air: true, smart: true },
    frame: 4,
    mask: { x: 46, y: 40, w: 14, h: 10 },
    planLabel: "Plan E",
  },
  {
    id: "F.6.3",
    building: "F",
    area: 48.8,
    rooms: 2,
    floor: 5,
    price: 583943.04,
    status: "available",
    attributes: { garden: false, terrace: false, balcony: false, loggia: true },
    options: { air: false, smart: true },
    frame: 8,
    mask: { x: 30, y: 26, w: 12, h: 10 },
    planLabel: "Plan F",
  },
  {
    id: "F.5.5",
    building: "F",
    area: 58.7,
    rooms: 2,
    floor: 4,
    price: 655845.46,
    status: "reserved",
    attributes: { garden: false, terrace: true, balcony: false, loggia: false },
    options: { air: false, smart: false },
    frame: 7,
    mask: { x: 26, y: 34, w: 12, h: 10 },
    planLabel: "Plan G",
  },
  {
    id: "F.4.5",
    building: "F",
    area: 58.7,
    rooms: 2,
    floor: 3,
    price: 773078.65,
    status: "available",
    attributes: { garden: false, terrace: false, balcony: true, loggia: false },
    options: { air: true, smart: false },
    frame: 5,
    mask: { x: 24, y: 42, w: 12, h: 10 },
    planLabel: "Plan H",
  },
  {
    id: "F.6.5",
    building: "F",
    area: 58.7,
    rooms: 2,
    floor: 5,
    price: 826081.73,
    status: "sold",
    attributes: { garden: false, terrace: false, balcony: false, loggia: true },
    options: { air: true, smart: true },
    frame: 10,
    mask: { x: 18, y: 26, w: 12, h: 10 },
    planLabel: "Plan I",
  },
];

const pointsOfInterest = [
  { id: "school", label: "School", x: 20, y: 30, color: "#5b7cfa" },
  { id: "hospital", label: "Hospital", x: 72, y: 26, color: "#f07f6a" },
  { id: "metro", label: "Metro", x: 52, y: 68, color: "#6ac17a" },
  { id: "park", label: "Park", x: 30, y: 70, color: "#74b581" },
];

const maskPalette = generatePalette(45);
const poiPalette = generatePalette(15);

const state = {
  frameCount: 24,
  frameIndex: 0,
  overlayVisible: true,
  dragging: false,
  dragX: 0,
  viewerMode: "building",
  planVariant: "2d",
  selectedApartmentId: null,
  compare: new Set(),
  filters: {
    area: { min: 0, max: 0 },
    price: { min: 0, max: 0 },
    rooms: { min: 0, max: 0 },
    floor: { min: 0, max: 0 },
    attributes: {
      garden: false,
      terrace: false,
      balcony: false,
      loggia: false,
    },
    options: { air: false, smart: false },
  },
  statusFilters: new Set(["available", "reserved", "sold"]),
  sort: { key: "id", dir: "asc" },
  resultsView: "table",
  activeTab: "filters",
};

const elements = {
  sidebar: document.getElementById("sidebar"),
  tabs: document.querySelectorAll(".tab"),
  panels: document.querySelectorAll(".panel"),
  mainPanels: document.querySelectorAll(".main-panel"),
  copyFilters: document.getElementById("copy-filters"),
  toggleAdvanced: document.getElementById("toggle-advanced"),
  advancedBody: document.getElementById("advanced-body"),
  resetFilters: document.getElementById("reset-filters"),
  resultCount: document.getElementById("result-count"),
  tableView: document.getElementById("table-view"),
  tableBody: document.getElementById("table-body"),
  cardsView: document.getElementById("cards-view"),
  comparePill: document.getElementById("compare-pill"),
  viewToggles: document.querySelectorAll(".view-toggle .toggle"),
  sortButtons: document.querySelectorAll(".sort-button"),
  selectedPanel: document.getElementById("selected-apartment"),
  selectedStatus: document.getElementById("selected-status"),
  selectedId: document.getElementById("selected-id"),
  selectedArea: document.getElementById("selected-area"),
  selectedPrice: document.getElementById("selected-price"),
  selectedRooms: document.getElementById("selected-rooms"),
  selectedFloor: document.getElementById("selected-floor"),
  collapseSidebar: document.getElementById("collapse-sidebar"),
  viewer: document.getElementById("viewer"),
  frameStage: document.getElementById("frame-stage"),
  frameImage: document.getElementById("frame-image"),
  maskLayer: document.getElementById("mask-layer"),
  poiLayer: document.getElementById("poi-layer"),
  frameLabel: document.getElementById("frame-label"),
  toggleOverlays: document.getElementById("toggle-overlays"),
  rotateLeft: document.getElementById("rotate-left"),
  rotateRight: document.getElementById("rotate-right"),
  viewerModes: document.getElementById("viewer-modes"),
  modeStage: document.getElementById("mode-stage"),
  modeTitle: document.getElementById("mode-title"),
  modePlaceholder: document.getElementById("mode-placeholder"),
  planToggle: document.getElementById("plan-toggle"),
  compareBar: document.getElementById("compare-bar"),
  compareBarCount: document.getElementById("compare-bar-count"),
  compareBarOpen: document.getElementById("compare-bar-open"),
  compareSummary: document.getElementById("compare-summary"),
  compareGrid: document.getElementById("compare-grid"),
  galleryList: document.getElementById("gallery-list"),
  galleryGrid: document.getElementById("gallery-grid"),
  mapRoute: document.getElementById("map-route"),
  routeInput: document.getElementById("route-input"),
  routeBuild: document.getElementById("route-build"),
};

document.addEventListener("DOMContentLoaded", () => {
  initializeRanges();
  applyFiltersFromUrl();
  renderAll();
  bindEvents();
});

function generatePalette(count) {
  return Array.from({ length: count }, (_, index) => {
    const hue = Math.round((index / count) * 360);
    return `hsl(${hue}deg 55% 62%)`;
  });
}

function initializeRanges() {
  const ranges = getRanges(apartments);
  Object.keys(ranges).forEach((key) => {
    state.filters[key].min = ranges[key].min;
    state.filters[key].max = ranges[key].max;
  });

  document.querySelectorAll(".slider-group").forEach((group) => {
    const key = group.dataset.filter;
    const minInput = group.querySelector('input[data-role="min"]');
    const maxInput = group.querySelector('input[data-role="max"]');
    const min = ranges[key].min;
    const max = ranges[key].max;
    const step = key === "price" ? 1000 : 1;
    minInput.min = min;
    minInput.max = max;
    minInput.step = step;
    minInput.value = min;
    maxInput.min = min;
    maxInput.max = max;
    maxInput.step = step;
    maxInput.value = max;
  });
}

function bindEvents() {
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
  });

  document.querySelectorAll(".slider-group input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const group = event.target.closest(".slider-group");
      const key = group.dataset.filter;
      const minInput = group.querySelector('input[data-role="min"]');
      const maxInput = group.querySelector('input[data-role="max"]');
      const minValue = Number(minInput.value);
      const maxValue = Number(maxInput.value);
      if (minValue > maxValue) {
        if (event.target.dataset.role === "min") {
          minInput.value = maxValue;
        } else {
          maxInput.value = minValue;
        }
      }
      state.filters[key].min = Number(minInput.value);
      state.filters[key].max = Number(maxInput.value);
      renderResults();
      updateRangeLabels();
    });
  });

  document.querySelectorAll(".status-pill").forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.dataset.status;
      if (status === "all") {
        state.statusFilters = new Set(["available", "reserved", "sold"]);
      } else {
        if (state.statusFilters.has(status)) {
          state.statusFilters.delete(status);
        } else {
          state.statusFilters.add(status);
        }
        if (state.statusFilters.size === 0) {
          state.statusFilters = new Set(["available", "reserved", "sold"]);
        }
      }
      updateStatusButtons();
      renderResults();
    });
  });

  document.querySelectorAll('[data-attr]').forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      state.filters.attributes[event.target.dataset.attr] = event.target.checked;
      renderResults();
    });
  });

  document.querySelectorAll('[data-opt]').forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      state.filters.options[event.target.dataset.opt] = event.target.checked;
      renderResults();
    });
  });

  elements.toggleAdvanced.addEventListener("click", () => {
    elements.advancedBody.hidden = !elements.advancedBody.hidden;
  });

  elements.resetFilters.addEventListener("click", resetFilters);
  elements.copyFilters.addEventListener("click", copyFilters);

  elements.viewToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      state.resultsView = toggle.dataset.view;
      elements.viewToggles.forEach((btn) =>
        btn.classList.toggle("is-active", btn.dataset.view === state.resultsView)
      );
      renderResults();
    });
  });

  elements.sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sort;
      if (state.sort.key === key) {
        state.sort.dir = state.sort.dir === "asc" ? "desc" : "asc";
      } else {
        state.sort.key = key;
        state.sort.dir = "asc";
      }
      renderResults();
    });
  });

  elements.tableBody.addEventListener("click", (event) => {
    const compareButton = event.target.closest("[data-action='compare']");
    if (compareButton) {
      event.stopPropagation();
      toggleCompare(compareButton.dataset.id);
      return;
    }
    const row = event.target.closest("tr[data-id]");
    if (row) {
      selectApartment(row.dataset.id);
    }
  });

  elements.cardsView.addEventListener("click", (event) => {
    const compareButton = event.target.closest("[data-action='compare']");
    if (compareButton) {
      event.stopPropagation();
      toggleCompare(compareButton.dataset.id);
      return;
    }
    const card = event.target.closest("[data-id]");
    if (card) {
      selectApartment(card.dataset.id);
    }
  });

  elements.maskLayer.addEventListener("click", (event) => {
    const mask = event.target.closest("[data-id]");
    if (mask) {
      selectApartment(mask.dataset.id);
    }
  });

  elements.rotateLeft.addEventListener("click", () => rotateFrames(-1));
  elements.rotateRight.addEventListener("click", () => rotateFrames(1));

  elements.frameStage.addEventListener("mousedown", (event) => {
    state.dragging = true;
    state.dragX = event.clientX;
    elements.viewer.classList.add("is-rotating");
  });

  window.addEventListener("mouseup", () => {
    if (state.dragging) {
      state.dragging = false;
      elements.viewer.classList.remove("is-rotating");
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (!state.dragging) return;
    const delta = event.clientX - state.dragX;
    if (Math.abs(delta) > 12) {
      const steps = Math.floor(delta / 12);
      state.frameIndex = wrapFrame(state.frameIndex + steps);
      state.dragX = event.clientX;
      updateFrame();
    }
  });

  elements.toggleOverlays.addEventListener("click", () => {
    state.overlayVisible = !state.overlayVisible;
    elements.viewer.classList.toggle("is-overlays-hidden", !state.overlayVisible);
    elements.toggleOverlays.textContent = state.overlayVisible
      ? "Hide overlays"
      : "Show overlays";
  });

  elements.viewerModes.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mode]");
    if (!button) return;
    setViewerMode(button.dataset.mode);
  });

  elements.planToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-plan]");
    if (!button) return;
    state.planVariant = button.dataset.plan;
    elements.planToggle
      .querySelectorAll(".toggle")
      .forEach((toggle) =>
        toggle.classList.toggle("is-active", toggle === button)
      );
    renderModePlaceholder();
  });

  elements.compareBarOpen.addEventListener("click", () => {
    setActiveTab("compare");
  });

  elements.comparePill.addEventListener("click", () => {
    setActiveTab("compare");
  });

  elements.collapseSidebar.addEventListener("click", () => {
    elements.sidebar.classList.toggle("collapsed");
    elements.collapseSidebar.textContent = elements.sidebar.classList.contains(
      "collapsed"
    )
      ? "Expand menu"
      : "Collapse menu";
  });

  elements.routeBuild.addEventListener("click", () => {
    const value = elements.routeInput.value.trim();
    if (!value) return;
    elements.mapRoute.hidden = false;
    elements.mapRoute.textContent = `Route from "${value}" to Building F`;
  });

  document.querySelectorAll("[data-poi]").forEach((checkbox) => {
    checkbox.addEventListener("change", renderPois);
  });
}

function renderAll() {
  updateRangeLabels();
  updateStatusButtons();
  renderResults();
  renderViewer();
  renderCompare();
  renderGallery();
}

function getRanges(items) {
  const keys = ["area", "price", "rooms", "floor"];
  return keys.reduce((acc, key) => {
    const values = items.map((item) => item[key]);
    acc[key] = {
      min: Math.min(...values),
      max: Math.max(...values),
    };
    return acc;
  }, {});
}

function updateRangeLabels() {
  document.querySelectorAll("[data-value]").forEach((label) => {
    const key = label.dataset.value;
    label.textContent = formatRange(
      key,
      state.filters[key].min,
      state.filters[key].max
    );
  });
}

function formatRange(key, min, max) {
  if (key === "price") {
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  }
  return `${min} - ${max}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPricePerM2(apt) {
  return formatNumber(apt.price / apt.area);
}

function updateStatusButtons() {
  const allSelected = ["available", "reserved", "sold"].every((status) =>
    state.statusFilters.has(status)
  );
  document.querySelectorAll(".status-pill").forEach((button) => {
    const status = button.dataset.status;
    if (status === "all") {
      button.classList.toggle("is-active", allSelected);
    } else {
      button.classList.toggle("is-active", state.statusFilters.has(status));
    }
  });
}

function applyFilters() {
  return apartments.filter((apt) => {
    const { area, price, rooms, floor, attributes, options } = state.filters;
    if (apt.area < area.min || apt.area > area.max) return false;
    if (apt.price < price.min || apt.price > price.max) return false;
    if (apt.rooms < rooms.min || apt.rooms > rooms.max) return false;
    if (apt.floor < floor.min || apt.floor > floor.max) return false;
    if (!state.statusFilters.has(apt.status)) return false;
    if (
      Object.entries(attributes).some(
        ([key, value]) => value && !apt.attributes[key]
      )
    )
      return false;
    if (
      Object.entries(options).some(
        ([key, value]) => value && !apt.options[key]
      )
    )
      return false;
    return true;
  });
}

function renderResults() {
  const filtered = applyFilters();
  const sorted = sortApartments(filtered);
  elements.resultCount.textContent = sorted.length;
  renderTable(sorted);
  renderCards(sorted);
  updateCompareUI();
  updateSortLabels();
}

function sortApartments(list) {
  const sorted = [...list];
  const { key, dir } = state.sort;
  sorted.sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];
    if (key === "id") {
      valueA = a.id;
      valueB = b.id;
    }
    if (typeof valueA === "string") {
      return dir === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return dir === "asc" ? valueA - valueB : valueB - valueA;
  });
  return sorted;
}

function updateSortLabels() {
  const labels = {
    id: "Nr.",
    area: "Area",
    rooms: "Rooms",
    floor: "Floor",
    price: "Price",
  };
  elements.sortButtons.forEach((button) => {
    const key = button.dataset.sort;
    let text = labels[key];
    if (key === state.sort.key) {
      text += state.sort.dir === "asc" ? " ^" : " v";
    }
    button.textContent = text;
  });
}

function renderTable(items) {
  if (state.resultsView === "cards") {
    elements.tableView.hidden = true;
    elements.tableBody.innerHTML = "";
    return;
  }
  elements.tableView.hidden = false;
  elements.tableBody.innerHTML = items
    .map((apt) => {
      return `
        <tr data-id="${apt.id}">
          <td>
            <span class="status-dot">
              <span class="dot status-${apt.status}"></span>
              <span class="apt-id">${apt.id}</span>
            </span>
          </td>
          <td>${apt.area.toFixed(1)} m2</td>
          <td>${apt.rooms}</td>
          <td>${apt.floor}</td>
          <td>${formatNumber(apt.price)}</td>
          <td class="compare-col">
            <button
              class="favorite-button ${state.compare.has(apt.id) ? "is-active" : ""}"
              data-action="compare"
              data-id="${apt.id}"
            >
              +
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderCards(items) {
  if (state.resultsView === "table") {
    elements.cardsView.hidden = true;
    elements.tableView.hidden = false;
    return;
  }
  elements.cardsView.hidden = false;
  elements.cardsView.innerHTML = items
    .map((apt) => {
      return `
        <div class="card" data-id="${apt.id}">
          <div class="card-info">
            <h4>${apt.id}</h4>
            <span class="badge status-${apt.status}">${capitalize(
        apt.status
      )}</span>
            <div class="card-meta">
              <span>Area: ${apt.area.toFixed(1)} m2</span>
              <span>Rooms: ${apt.rooms}</span>
              <span>Floor: ${apt.floor}</span>
              <span>Price: ${formatNumber(apt.price)}</span>
            </div>
          </div>
          <div class="plan-preview">
            ${apt.planLabel}
            <button
              class="favorite-button ${state.compare.has(apt.id) ? "is-active" : ""}"
              data-action="compare"
              data-id="${apt.id}"
              aria-label="Add to compare"
            >
              +
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderViewer() {
  renderMasks();
  renderPois();
  updateFrame();
  updateSelectedPanel();
  updateViewerModes();
}

function renderMasks() {
  elements.maskLayer.innerHTML = apartments
    .map((apt, index) => {
      const selected = apt.id === state.selectedApartmentId;
      const maskColor = maskPalette[index % maskPalette.length];
      const styles = `left:${apt.mask.x}%;top:${apt.mask.y}%;width:${apt.mask.w}%;height:${apt.mask.h}%;--mask-color:${maskColor};`;
      return `
        <button
          class="mask-item status-${apt.status} ${selected ? "is-selected" : ""}"
          style="${styles}"
          data-id="${apt.id}"
          aria-label="${apt.id}"
        ></button>
      `;
    })
    .join("");
}

function renderPois() {
  const activePoiTypes = new Set(
    Array.from(document.querySelectorAll("[data-poi]"))
      .filter((input) => input.checked)
      .map((input) => input.dataset.poi)
  );
  elements.poiLayer.innerHTML = pointsOfInterest
    .filter((poi) => activePoiTypes.has(poi.id) || activePoiTypes.size === 0)
    .map((poi, index) => {
      const color = poi.color || poiPalette[index % poiPalette.length];
      return `
        <div
          class="poi-marker"
          style="left:${poi.x}%;top:${poi.y}%;--poi-color:${color}"
        >
          <div class="poi-line"></div>
          <div class="poi-label">${poi.label}</div>
        </div>
      `;
    })
    .join("");
}

function updateFrame() {
  const frameNumber = state.frameIndex + 1;
  elements.frameLabel.textContent = `Frame ${frameNumber} / ${state.frameCount}`;
  const shift = (state.frameIndex / state.frameCount) * 100;
  elements.frameImage.style.backgroundPosition = `${shift}% 50%`;
}

function wrapFrame(value) {
  if (value >= state.frameCount) {
    return value % state.frameCount;
  }
  if (value < 0) {
    return (state.frameCount + (value % state.frameCount)) % state.frameCount;
  }
  return value;
}

function rotateFrames(direction) {
  const step = Math.round(state.frameCount / 4);
  state.frameIndex = wrapFrame(state.frameIndex + step * direction);
  updateFrame();
}

function selectApartment(id) {
  state.selectedApartmentId = id;
  state.frameIndex = getApartment(id).frame - 1;
  setViewerMode("building");
  updateSelectedPanel();
  renderMasks();
  updateViewerModes();
  updateFrame();
  if (elements.sidebar.classList.contains("collapsed")) {
    elements.sidebar.classList.remove("collapsed");
    elements.collapseSidebar.textContent = "Collapse menu";
  }
}

function updateSelectedPanel() {
  const selected = getApartment(state.selectedApartmentId);
  if (!selected) {
    elements.selectedPanel.hidden = true;
    return;
  }
  elements.selectedPanel.hidden = false;
  elements.selectedStatus.textContent = capitalize(selected.status);
  elements.selectedStatus.className = `badge status-${selected.status}`;
  elements.selectedId.textContent = selected.id;
  elements.selectedArea.textContent = `${selected.area.toFixed(1)} m2`;
  elements.selectedPrice.textContent = formatNumber(selected.price);
  elements.selectedRooms.textContent = selected.rooms;
  elements.selectedFloor.textContent = selected.floor;
}

function updateViewerModes() {
  const hasSelection = Boolean(state.selectedApartmentId);
  elements.viewerModes.hidden = !hasSelection;
  elements.viewerModes
    .querySelectorAll("[data-mode]")
    .forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === state.viewerMode);
    });
}

function setViewerMode(mode) {
  state.viewerMode = mode;
  const buildingMode = mode === "building";
  elements.frameStage.hidden = !buildingMode;
  elements.modeStage.hidden = buildingMode;
  elements.viewer.classList.toggle("viewer-mode", !buildingMode);
  elements.rotateLeft.hidden = !buildingMode;
  elements.rotateRight.hidden = !buildingMode;

  if (buildingMode) {
    elements.modeTitle.textContent = "";
  } else if (mode === "plan") {
    elements.modeTitle.textContent = "Plan view";
  } else if (mode === "tour") {
    elements.modeTitle.textContent = "360 tour";
  } else {
    elements.modeTitle.textContent = "Balcony view";
  }

  elements.planToggle.hidden = mode !== "plan";
  renderModePlaceholder();
  updateViewerModes();
}

function renderModePlaceholder() {
  const selected = getApartment(state.selectedApartmentId);
  if (!selected) {
    elements.modePlaceholder.textContent = "Select an apartment";
    return;
  }
  if (state.viewerMode === "plan") {
    elements.modePlaceholder.textContent = `${
      state.planVariant === "2d" ? "Plan 2D" : "Plan 3D"
    } - ${selected.id}`;
    return;
  }
  if (state.viewerMode === "tour") {
    elements.modePlaceholder.textContent = `360 tour - ${selected.id}`;
    return;
  }
  if (state.viewerMode === "balcony") {
    elements.modePlaceholder.textContent = `Balcony panorama - ${selected.id}`;
    return;
  }
  elements.modePlaceholder.textContent = "";
}

function toggleCompare(id) {
  if (state.compare.has(id)) {
    state.compare.delete(id);
  } else {
    state.compare.add(id);
  }
  updateCompareUI();
  renderCompare();
  renderResults();
}

function updateCompareUI() {
  const count = state.compare.size;
  elements.compareBar.hidden = count === 0;
  elements.compareBarCount.textContent = `Compare (${count})`;
  elements.comparePill.hidden = count === 0;
  elements.comparePill.textContent = `Compare (${count})`;
}

function renderCompare() {
  const selectedItems = apartments.filter((apt) => state.compare.has(apt.id));
  elements.compareSummary.innerHTML = `
    <div><strong>${selectedItems.length}</strong> apartments selected</div>
    <button class="primary-button" id="contact-seller">Contact seller</button>
    <button class="ghost-button" id="clear-compare">Clear</button>
  `;

  const clearButton = elements.compareSummary.querySelector("#clear-compare");
  clearButton.addEventListener("click", () => {
    if (state.compare.size === 0) return;
    if (window.confirm("Clear all apartments from compare?")) {
      state.compare.clear();
      renderCompare();
      renderResults();
    }
  });

  elements.compareGrid.innerHTML = selectedItems
    .map((apt) => {
      return `
        <div class="compare-card">
          <h4>${apt.id}</h4>
          <div class="plan-preview">${apt.planLabel}</div>
          <div class="compare-actions">
            <button class="primary-button" data-action="go" data-id="${apt.id}">
              Go to
            </button>
            <button class="ghost-button" data-action="remove" data-id="${apt.id}">
              Remove
            </button>
          </div>
          <div class="card-meta">
            <span>Area: ${apt.area.toFixed(1)} m2</span>
            <span>Price: ${formatNumber(apt.price)}</span>
            <span>Rooms: ${apt.rooms}</span>
            <span>Floor: ${apt.floor}</span>
            <span>Price per m2: ${formatPricePerM2(apt)}</span>
            <span>Garden: ${apt.attributes.garden ? "Yes" : "No"}</span>
            <span>Terrace: ${apt.attributes.terrace ? "Yes" : "No"}</span>
            <span>Balcony: ${apt.attributes.balcony ? "Yes" : "No"}</span>
            <span>Loggia: ${apt.attributes.loggia ? "Yes" : "No"}</span>
          </div>
        </div>
      `;
    })
    .join("");

  if (selectedItems.length === 0) {
    elements.compareGrid.innerHTML =
      "<div class=\"compare-card\">No apartments selected.</div>";
    return;
  }

  elements.compareGrid
    .querySelectorAll("[data-action='go']")
    .forEach((button) => {
      button.addEventListener("click", () => {
        setActiveTab("filters");
        selectApartment(button.dataset.id);
      });
    });

  elements.compareGrid
    .querySelectorAll("[data-action='remove']")
    .forEach((button) => {
      button.addEventListener("click", () => {
        toggleCompare(button.dataset.id);
      });
    });
}

function renderGallery() {
  const renders = [
    "Main facade",
    "Courtyard view",
    "Lobby interior",
    "Penthouse terrace",
    "Night render",
    "Roof garden",
  ];
  elements.galleryList.innerHTML = renders
    .map((item) => `<div class="gallery-item">${item}</div>`)
    .join("");
  elements.galleryGrid.innerHTML = renders
    .map((item) => `<div class="gallery-card">${item}</div>`)
    .join("");
}

function resetFilters() {
  initializeRanges();
  state.statusFilters = new Set(["available", "reserved", "sold"]);
  state.filters.attributes = {
    garden: false,
    terrace: false,
    balcony: false,
    loggia: false,
  };
  state.filters.options = { air: false, smart: false };
  document.querySelectorAll('[data-attr],[data-opt]').forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateStatusButtons();
  updateRangeLabels();
  renderResults();
}

function copyFilters() {
  const payload = {
    range: state.filters,
    statuses: Array.from(state.statusFilters),
  };
  const encoded = encodeURIComponent(JSON.stringify(payload));
  const base =
    window.location.origin === "null"
      ? window.location.href.split("?")[0]
      : `${window.location.origin}${window.location.pathname}`;
  const url = `${base}?filters=${encoded}`;
  window.history.replaceState({}, "", url);
  navigator.clipboard
    .writeText(url)
    .then(() => {
      elements.copyFilters.textContent = "Copied";
      setTimeout(() => {
        elements.copyFilters.textContent = "Copy filters";
      }, 1500);
    })
    .catch(() => {
      elements.copyFilters.textContent = "Copy failed";
    });
}

function applyFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const serialized = params.get("filters");
  if (!serialized) return;
  try {
    const parsed = JSON.parse(decodeURIComponent(serialized));
    if (parsed.range) {
      state.filters = {
        ...state.filters,
        ...parsed.range,
        attributes: {
          ...state.filters.attributes,
          ...parsed.range.attributes,
        },
        options: {
          ...state.filters.options,
          ...parsed.range.options,
        },
      };
    }
    if (parsed.statuses) {
      state.statusFilters = new Set(parsed.statuses);
    }
    document.querySelectorAll(".slider-group").forEach((group) => {
      const key = group.dataset.filter;
      const minInput = group.querySelector('input[data-role="min"]');
      const maxInput = group.querySelector('input[data-role="max"]');
      minInput.value = state.filters[key].min;
      maxInput.value = state.filters[key].max;
    });
    document.querySelectorAll('[data-attr]').forEach((checkbox) => {
      checkbox.checked = Boolean(
        state.filters.attributes[checkbox.dataset.attr]
      );
    });
    document.querySelectorAll('[data-opt]').forEach((checkbox) => {
      checkbox.checked = Boolean(state.filters.options[checkbox.dataset.opt]);
    });
  } catch (error) {
    console.warn("Failed to apply filters from url", error);
  }
}

function setActiveTab(tab) {
  state.activeTab = tab;
  elements.tabs.forEach((button) =>
    button.classList.toggle("is-active", button.dataset.tab === tab)
  );
  elements.panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tab;
  });
  elements.mainPanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tab;
  });
}

function getApartment(id) {
  return apartments.find((apt) => apt.id === id);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
