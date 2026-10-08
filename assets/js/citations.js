// Citations-per-year chart for the publications page, fetched live from INSPIRE-HEP.
(function () {
  var root = document.querySelector("[data-cite]");
  if (!root || !window.fetch) return;

  var API = "https://inspirehep.net/api/literature/facets";
  var SVG_NS = "http://www.w3.org/2000/svg";
  var BAR_MAX = 24;     // px, column thickness cap
  var PAD = { top: 22, right: 4, bottom: 40, left: 44 };

  var chartEl = root.querySelector(".cite-chart");
  var tooltip = root.querySelector(".cite-tooltip");
  var errorEl = root.querySelector(".cite-error");
  var tableBody = root.querySelector(".cite-table tbody");
  var buttons = Array.prototype.slice.call(root.querySelectorAll("[data-mode]"));
  var thisYear = new Date().getFullYear();
  var cache = {};
  var current = null;   // { mode, data }

  var fmt = function (n) { return Number(n).toLocaleString("en-US"); };

  function getJSON(params) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = controller && setTimeout(function () { controller.abort(); }, 10000);
    var url = API + "?" + new URLSearchParams(params).toString();
    return fetch(url, { headers: { Accept: "application/json" }, signal: controller && controller.signal })
      .then(function (res) {
        if (!res.ok) throw new Error("INSPIRE-HEP returned " + res.status);
        return res.json();
      })
      .finally(function () { clearTimeout(timer); });
  }

  function load(mode) {
    if (!cache[mode]) {
      var q = root.getAttribute("data-query-" + mode);
      cache[mode] = Promise.all([
        getJSON({ facet_name: "citations-by-year", q: q }),
        getJSON({ facet_name: "citation-summary", q: q }),
      ]).then(function (res) {
        var byYear = res[0].aggregations.citations_by_year.value || {};
        var summary = res[1].aggregations.citation_summary;
        var years = Object.keys(byYear).map(Number);
        var first = years.length ? Math.min.apply(null, years) : thisYear;
        var last = Math.max(thisYear, years.length ? Math.max.apply(null, years) : thisYear);
        var series = [];
        for (var y = first; y <= last; y++) series.push({ year: y, value: byYear[y] || 0 });
        return {
          series: series,
          citations: summary.citations.buckets.all.citations_count.value,
          h: summary["h-index"].value.all,
          papers: summary.doc_count,
        };
      });
      cache[mode].catch(function () { delete cache[mode]; });
    }
    return cache[mode];
  }

  // Round the axis up to a clean step (1, 2, 2.5, 5 x 10^k) with about four gridlines.
  function niceTicks(max) {
    if (max <= 0) return [0, 1];
    var raw = max / 4;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var step = [1, 2, 2.5, 5, 10].map(function (m) { return m * mag; })
      .filter(function (s) { return s >= raw && (s >= 1 || Number.isInteger(s)); })[0] || mag * 10;
    step = Math.max(1, step);
    var ticks = [];
    for (var t = 0; t < max + step; t += step) ticks.push(t);
    return ticks;
  }

  function el(name, attrs, parent) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  // Column with a 4px rounded data-end and a square baseline.
  function columnPath(x, y, w, h) {
    var r = Math.min(4, w / 2, h);
    return "M" + x + "," + (y + h) +
      "V" + (y + r) + "Q" + x + "," + y + " " + (x + r) + "," + y +
      "H" + (x + w - r) + "Q" + (x + w) + "," + y + " " + (x + w) + "," + (y + r) +
      "V" + (y + h) + "Z";
  }

  function render() {
    if (!current) return;
    var series = current.data.series;
    var PLOT_H = parseFloat(getComputedStyle(root).getPropertyValue("--cite-plot-h")) || 200;  // bar area, set in CSS
    var width = chartEl.clientWidth;
    var height = PAD.top + PLOT_H + PAD.bottom;
    var plotW = width - PAD.left - PAD.right;
    if (plotW <= 0) return;   // not laid out yet (e.g. mid-resize); the ResizeObserver re-renders
    var band = plotW / series.length;
    var barW = Math.max(4, Math.min(BAR_MAX, band - 6));
    var max = Math.max.apply(null, series.map(function (d) { return d.value; }));
    var ticks = niceTicks(max);
    var top = ticks[ticks.length - 1];
    var yScale = function (v) { return PAD.top + PLOT_H - (v / top) * PLOT_H; };
    var labelEvery = Math.ceil(34 / band);   // skip year labels when columns are narrow

    var svg = el("svg", {
      width: width, height: height, viewBox: "0 0 " + width + " " + height,
      role: "group", "aria-label": "Citations per year, " + series[0].year + " to " + series[series.length - 1].year,
    });

    ticks.forEach(function (t) {
      var y = Math.round(yScale(t)) + 0.5;
      el("line", { x1: PAD.left, x2: width - PAD.right, y1: y, y2: y, class: t === 0 ? "cite-baseline" : "cite-grid" }, svg);
      el("text", { x: PAD.left - 8, y: y, class: "cite-axis", "text-anchor": "end", "dominant-baseline": "middle" }, svg)
        .textContent = fmt(t);
    });

    var peak = series.reduce(function (a, d) { return d.value > a.value ? d : a; }, series[0]);

    series.forEach(function (d, i) {
      var cx = PAD.left + band * i + band / 2;
      var partial = d.year === thisYear;
      var h = yScale(0) - yScale(d.value);
      var bar = null;
      if (d.value > 0) {
        bar = el("path", {
          d: columnPath(cx - barW / 2, yScale(d.value), barW, h),
          class: "cite-bar" + (partial ? " cite-bar--partial" : ""),
        }, svg);
      }

      var isLast = i === series.length - 1;
      if (i % labelEvery === (series.length - 1) % labelEvery || isLast) {
        el("text", { x: cx, y: PAD.top + PLOT_H + 18, class: "cite-axis", "text-anchor": "middle" }, svg)
          .textContent = d.year;
        if (partial) {
          el("text", { x: cx, y: PAD.top + PLOT_H + 32, class: "cite-axis cite-axis--note", "text-anchor": "middle" }, svg)
            .textContent = "so far";
        }
      }

      if (d === peak && d.value > 0) {
        el("text", { x: cx, y: yScale(d.value) - 7, class: "cite-peak", "text-anchor": "middle" }, svg)
          .textContent = fmt(d.value);
      }

      // Hit target: the whole column slot, not just the painted bar.
      var label = fmt(d.value) + (d.value === 1 ? " citation" : " citations") + " in " + d.year + (partial ? " so far" : "");
      var hit = el("rect", {
        x: PAD.left + band * i, y: PAD.top, width: band, height: PLOT_H,
        class: "cite-hit", tabindex: 0, role: "img", "aria-label": label,
      }, svg);
      var show = function () { showTooltip(d, partial, cx, yScale(d.value), bar); };
      hit.addEventListener("pointerenter", show);
      hit.addEventListener("focus", show);
      hit.addEventListener("pointerleave", hideTooltip);
      hit.addEventListener("blur", hideTooltip);
    });

    chartEl.replaceChildren(svg);
  }

  var activeBar = null;

  function showTooltip(d, partial, x, y, bar) {
    if (activeBar) activeBar.classList.remove("is-hover");
    activeBar = bar;
    if (bar) bar.classList.add("is-hover");

    var value = document.createElement("strong");
    value.textContent = fmt(d.value);
    var label = document.createElement("span");
    label.textContent = (d.value === 1 ? "citation" : "citations") + " in " + d.year + (partial ? " so far" : "");
    tooltip.replaceChildren(value, label);
    tooltip.hidden = false;

    var maxLeft = chartEl.clientWidth - tooltip.offsetWidth;
    tooltip.style.left = Math.max(0, Math.min(maxLeft, x - tooltip.offsetWidth / 2)) + "px";
    tooltip.style.top = Math.max(0, y - tooltip.offsetHeight - 12) + "px";
  }

  function hideTooltip() {
    if (activeBar) activeBar.classList.remove("is-hover");
    activeBar = null;
    tooltip.hidden = true;
  }

  function fillStats(data) {
    root.querySelector('[data-stat="citations"]').textContent = fmt(data.citations);
    root.querySelector('[data-stat="h"]').textContent = fmt(data.h);
    root.querySelector('[data-stat="papers"]').textContent = fmt(data.papers);

    var rows = data.series.slice().reverse().map(function (d) {
      var tr = document.createElement("tr");
      var year = document.createElement("td");
      var value = document.createElement("td");
      year.textContent = d.year + (d.year === thisYear ? " (so far)" : "");
      value.textContent = fmt(d.value);
      tr.append(year, value);
      return tr;
    });
    tableBody.replaceChildren.apply(tableBody, rows);
  }

  function select(mode) {
    buttons.forEach(function (b) {
      var active = b.getAttribute("data-mode") === mode;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    root.classList.add("is-loading");   // keep the previous render, dimmed, while refetching
    load(mode).then(function (data) {
      current = { mode: mode, data: data };
      root.classList.remove("is-loading", "has-error");
      errorEl.hidden = true;
      fillStats(data);
      render();
    }, function () {
      root.classList.remove("is-loading");
      root.classList.add("has-error");
      errorEl.hidden = false;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { select(b.getAttribute("data-mode")); });
  });

  if (window.ResizeObserver) {
    var lastWidth = 0;
    new ResizeObserver(function () {
      if (chartEl.clientWidth !== lastWidth) {
        lastWidth = chartEl.clientWidth;
        hideTooltip();
        render();
      }
    }).observe(chartEl);
  }

  root.hidden = false;
  select("short");
})();
