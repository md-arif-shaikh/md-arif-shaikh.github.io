// Category filter, live search and recent/most-cited sort for the publications page.
(function () {
  var root = document.querySelector("[data-pubs]");
  if (!root) return;

  var toolbar = root.querySelector(".pub-toolbar");
  var tabs = Array.prototype.slice.call(root.querySelectorAll(".pub-tab"));
  var input = root.querySelector(".pub-search input");
  var status = root.querySelector(".pub-status");
  var empty = root.querySelector(".pub-empty");
  var sortBox = root.querySelector(".pub-sort");
  var sortButtons = Array.prototype.slice.call(root.querySelectorAll(".pub-sort-btn"));
  var sections = Array.prototype.slice.call(root.querySelectorAll(".pub-section"));
  var cards = Array.prototype.slice.call(root.querySelectorAll(".pub-card"));

  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  // Precompute what each card can be searched by (title, authors, venue, year, arXiv ID),
  // and remember where it lives so the "Recent" order can be restored after sorting.
  var entries = cards.map(function (card, i) {
    var group = card.closest(".pub-year-group");
    var year = group ? group.querySelector(".pub-year").textContent.trim() : "";
    return {
      card: card,
      order: i,
      year: year,
      home: card.parentNode,
      section: card.closest(".pub-section"),
      eprint: card.getAttribute("data-eprint") || "",
      doi: card.getAttribute("data-doi") || "",
      citations: null,
      text: normalize(card.textContent + " " + year),
    };
  });

  var filter = "all";
  var sort = "recent";

  function hasVisibleCard(el) {
    return el.querySelector(".pub-card:not([hidden])") !== null;
  }

  function apply() {
    var terms = normalize(input.value).trim().split(" ").filter(Boolean);
    var inScope = 0;
    var shown = 0;

    entries.forEach(function (entry) {
      var scoped = filter === "all" || entry.section.id === filter;
      var match = terms.every(function (t) { return entry.text.indexOf(t) !== -1; });
      if (scoped) inScope++;
      entry.card.hidden = !(scoped && match);
      if (!entry.card.hidden) shown++;
    });

    // Year groups include the per-paper groups built for the "Most cited" order.
    root.querySelectorAll(".pub-year-group").forEach(function (g) { g.hidden = !hasVisibleCard(g); });
    sections.forEach(function (s) { s.hidden = !hasVisibleCard(s); });

    empty.hidden = shown > 0;
    status.textContent = terms.length || filter !== "all"
      ? "Showing " + shown + " of " + inScope + (inScope === 1 ? " paper" : " papers")
      : "";
  }

  function updateUrl() {
    if (!window.history.replaceState) return;
    var params = new URLSearchParams(location.search);
    if (sort === "cited") params.set("sort", "cited"); else params.delete("sort");
    var qs = params.toString();
    var hash = filter === "all" ? "" : "#" + filter;
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + hash);
  }

  function setFilter(value, update) {
    filter = value;
    tabs.forEach(function (tab) {
      var active = tab.getAttribute("data-filter") === value;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (update) updateUrl();
    apply();
  }

  /* ---------- Sorting ---------- */

  // "Most cited": each section gets a ranked list where every paper sits in its own
  // year group (so the year column still says when it was published).
  var ranked = sections.map(function (section) {
    var box = document.createElement("div");
    box.className = "pub-ranked";
    box.hidden = true;
    section.appendChild(box);
    return { section: section, box: box };
  });

  function rankedGroup(entry) {
    if (!entry.rankedGroup) {
      var group = document.createElement("div");
      group.className = "pub-year-group";
      var year = document.createElement("h3");
      year.className = "pub-year";
      year.textContent = entry.year;
      var list = document.createElement("ol");
      list.className = "pub-list";
      group.append(year, list);
      entry.rankedGroup = group;
      entry.rankedList = list;
    }
    return entry.rankedGroup;
  }

  function byCitations(a, b) {
    var ca = a.citations === null ? -1 : a.citations;
    var cb = b.citations === null ? -1 : b.citations;
    return cb - ca || a.order - b.order;
  }

  function setSort(value, update) {
    sort = value;
    sortButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-sort") === value;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    ranked.forEach(function (r) {
      var mine = entries.filter(function (e) { return e.section === r.section; });
      if (value === "cited") {
        mine.slice().sort(byCitations).forEach(function (e) {
          r.box.appendChild(rankedGroup(e));
          e.rankedList.appendChild(e.card);
        });
      } else {
        mine.forEach(function (e) { e.home.appendChild(e.card); });   // original order
      }
      r.box.hidden = value !== "cited";   // emptied year groups are hidden by apply()
    });

    if (update) updateUrl();
    apply();
  }

  sortButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { setSort(btn.getAttribute("data-sort"), true); });
  });

  /* ---------- Per-paper citation counts from INSPIRE-HEP ---------- */

  function addCitationBadge(entry, recid) {
    if (!entry.citations) return;   // no badge for 0 or unknown
    var links = entry.card.querySelector(".pub-links");
    if (!links) return;
    var a = document.createElement("a");
    a.className = "pub-link pub-cites";
    a.href = "https://inspirehep.net/literature?q=refersto%3Arecid%3A" + recid;
    a.title = "Papers citing this one on INSPIRE-HEP";
    var icon = document.createElement("i");
    icon.className = "fas fa-quote-right";
    icon.setAttribute("aria-hidden", "true");
    a.append(icon, "Cited by " + entry.citations.toLocaleString("en-US"));
    links.insertBefore(a, links.firstChild);
  }

  function loadCitations() {
    var query = root.getAttribute("data-inspire-query");
    if (!query || !window.fetch) return;
    var url = "https://inspirehep.net/api/literature?" + new URLSearchParams({
      q: query,
      size: "500",
      fields: "control_number,citation_count,arxiv_eprints.value,dois.value",
    }).toString();

    fetch(url, { headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("INSPIRE-HEP returned " + res.status);
        return res.json();
      })
      .then(function (data) {
        var byEprint = {};
        var byDoi = {};
        data.hits.hits.forEach(function (hit) {
          var m = hit.metadata;
          (m.arxiv_eprints || []).forEach(function (e) { byEprint[e.value] = m; });
          (m.dois || []).forEach(function (d) { byDoi[d.value.toLowerCase()] = m; });
        });
        var matched = 0;
        entries.forEach(function (entry) {
          var m = (entry.eprint && byEprint[entry.eprint]) || (entry.doi && byDoi[entry.doi]);
          if (!m) return;
          entry.citations = m.citation_count || 0;
          addCitationBadge(entry, m.control_number);
          matched++;
        });
        if (!matched) return;
        sortBox.hidden = false;
        if (sort === "cited") setSort("cited", false);   // re-rank now that counts exist
      })
      .catch(function () { /* keep the plain "Recent" list */ });
  }

  /* ---------- Wiring ---------- */

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

  // A link to a section (e.g. /publications/#lvk-collaboration-papers) opens that filter;
  // ?sort=cited opens the most-cited order (once the counts arrive).
  function filterFromHash() {
    var id = location.hash.slice(1);
    var known = sections.some(function (s) { return s.id === id; });
    setFilter(known ? id : "all", false);
  }
  window.addEventListener("hashchange", filterFromHash);
  filterFromHash();
  if (new URLSearchParams(location.search).get("sort") === "cited") sort = "cited";
  loadCitations();
})();
