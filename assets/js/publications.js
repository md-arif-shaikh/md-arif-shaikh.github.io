// Category filter + live search for the publications page.
(function () {
  var root = document.querySelector("[data-pubs]");
  if (!root) return;

  var toolbar = root.querySelector(".pub-toolbar");
  var tabs = Array.prototype.slice.call(root.querySelectorAll(".pub-tab"));
  var input = root.querySelector(".pub-search input");
  var status = root.querySelector(".pub-status");
  var empty = root.querySelector(".pub-empty");
  var sections = Array.prototype.slice.call(root.querySelectorAll(".pub-section"));
  var groups = Array.prototype.slice.call(root.querySelectorAll(".pub-year-group"));
  var cards = Array.prototype.slice.call(root.querySelectorAll(".pub-card"));

  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  // Precompute what each card can be searched by (title, authors, venue, year, arXiv ID).
  var entries = cards.map(function (card) {
    var group = card.closest(".pub-year-group");
    var year = group ? group.querySelector(".pub-year").textContent : "";
    return {
      card: card,
      section: card.closest(".pub-section").id,
      text: normalize(card.textContent + " " + year),
    };
  });

  var filter = "all";

  function hasVisibleCard(el) {
    return el.querySelector(".pub-card:not([hidden])") !== null;
  }

  function apply() {
    var terms = normalize(input.value).trim().split(" ").filter(Boolean);
    var inScope = 0;
    var shown = 0;

    entries.forEach(function (entry) {
      var scoped = filter === "all" || entry.section === filter;
      var match = terms.every(function (t) { return entry.text.indexOf(t) !== -1; });
      if (scoped) inScope++;
      entry.card.hidden = !(scoped && match);
      if (!entry.card.hidden) shown++;
    });

    groups.forEach(function (g) { g.hidden = !hasVisibleCard(g); });
    sections.forEach(function (s) { s.hidden = !hasVisibleCard(s); });

    empty.hidden = shown > 0;
    status.textContent = terms.length || filter !== "all"
      ? "Showing " + shown + " of " + inScope + (inScope === 1 ? " paper" : " papers")
      : "";
  }

  function setFilter(value, updateUrl) {
    filter = value;
    tabs.forEach(function (tab) {
      var active = tab.getAttribute("data-filter") === value;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (updateUrl && window.history.replaceState) {
      var url = value === "all" ? location.pathname + location.search : "#" + value;
      history.replaceState(null, "", url);
    }
    apply();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setFilter(tab.getAttribute("data-filter"), true);
    });
  });

  input.addEventListener("input", apply);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      input.value = "";
      apply();
      input.blur();
    }
  });

  // Press "/" anywhere to jump to the search box.
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (e.key === "/" && tag !== "input" && tag !== "textarea" && !e.target.isContentEditable) {
      e.preventDefault();
      input.focus();
    }
  });

  // Keep the sticky year labels clear of the sticky toolbar, and mark it once it sticks.
  function syncToolbar() {
    root.style.setProperty("--pub-toolbar-h", toolbar.offsetHeight + "px");
    toolbar.classList.toggle("is-stuck", toolbar.getBoundingClientRect().top <= 0 && window.scrollY > 0);
  }
  window.addEventListener("resize", syncToolbar);
  window.addEventListener("scroll", syncToolbar, { passive: true });

  toolbar.hidden = false;
  syncToolbar();

  // A link to a section (e.g. /publications/#lvk-collaboration-papers) opens that filter.
  function filterFromHash() {
    var id = location.hash.slice(1);
    var known = sections.some(function (s) { return s.id === id; });
    setFilter(known ? id : "all", false);
  }
  window.addEventListener("hashchange", filterFromHash);
  filterFromHash();
})();
