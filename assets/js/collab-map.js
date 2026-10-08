// World map of collaborators per country, drawn from the ranked list on the collaborators page.
(function () {
  var root = document.querySelector("[data-collab-map]");
  if (!root || !window.fetch || !window.d3 || !window.topojson) return;

  var ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
  var SVG_NS = "http://www.w3.org/2000/svg";
  // Display names on the page -> Natural Earth names in the atlas.
  var ATLAS_NAMES = { USA: "United States of America", UK: "United Kingdom", Korea: "South Korea" };
  // One-hue ramp, dim -> bright (more collaborators); validated against the card surface.
  var RAMP = ["#3b5699", "#5274c4", "#6890e6", "#8fb1ff"];

  var plot = root.querySelector(".map-plot");
  var svgHost = root.querySelector(".map-svg");
  var tooltip = root.querySelector(".map-tooltip");
  var rows = Array.prototype.slice.call(root.querySelectorAll(".map-row"));

  var entries = {};   // atlas name -> { label, count, people, row, shape }
  var max = 1;
  rows.forEach(function (row) {
    var label = row.getAttribute("data-country");
    var entry = {
      label: label,
      count: parseInt(row.getAttribute("data-count"), 10),
      people: row.getAttribute("data-people").split(";").filter(Boolean),
      row: row,
      shape: null,
    };
    entries[ATLAS_NAMES[label] || label] = entry;
    max = Math.max(max, entry.count);
  });

  function hex(c) { return [1, 3, 5].map(function (i) { return parseInt(c.slice(i, i + 2), 16); }); }

  function colorFor(count) {
    var t = max > 1 ? (count - 1) / (max - 1) : 1;
    var pos = t * (RAMP.length - 1);
    var i = Math.min(RAMP.length - 2, Math.floor(pos));
    var a = hex(RAMP[i]), b = hex(RAMP[i + 1]), f = pos - i;
    return "rgb(" + a.map(function (v, k) { return Math.round(v + (b[k] - v) * f); }).join(",") + ")";
  }

  Object.keys(entries).forEach(function (name) {
    var e = entries[name];
    e.color = colorFor(e.count);
    e.row.querySelector(".map-swatch").style.backgroundColor = e.color;
  });

  var features = null;
  var path = null;
  var active = null;

  function render() {
    var width = svgHost.clientWidth;
    if (!features || width <= 0) return;
    var collection = { type: "FeatureCollection", features: features };
    var projection = d3.geoNaturalEarth1().fitWidth(width, collection);
    path = d3.geoPath(projection);
    var height = Math.ceil(path.bounds(collection)[1][1]);

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("role", "group");
    svg.setAttribute("aria-label", "World map shading countries by number of collaborators");

    var highlighted = [];
    features.forEach(function (f) {
      var shape = document.createElementNS(SVG_NS, "path");
      shape.setAttribute("d", path(f));
      var e = entries[f.properties.name];
      if (!e) {
        shape.setAttribute("class", "map-land");
        svg.appendChild(shape);
        return;
      }
      shape.setAttribute("class", "map-land map-land--on");
      shape.style.fill = e.color;   // inline, so it beats the stylesheet's grey land fill
      shape.setAttribute("tabindex", "0");
      shape.setAttribute("aria-label", e.label + ": " + e.count + (e.count === 1 ? " collaborator" : " collaborators"));
      e.shape = shape;
      e.centroid = path.centroid(f);
      shape.addEventListener("pointerenter", function () { show(e); });
      shape.addEventListener("focus", function () { show(e); });
      shape.addEventListener("pointerleave", hide);
      shape.addEventListener("blur", hide);
      highlighted.push(shape);
    });
    // Paint shaded countries last so their outlines sit above their neighbours.
    highlighted.forEach(function (shape) { svg.appendChild(shape); });

    svgHost.replaceChildren(svg);
  }

  function show(e) {
    hide();
    active = e;
    e.row.classList.add("is-active");
    if (!e.shape) return;
    e.shape.classList.add("is-active");
    e.shape.parentNode.appendChild(e.shape);   // bring to front so the outline isn't hidden

    var value = document.createElement("strong");
    value.textContent = e.count + (e.count === 1 ? " collaborator" : " collaborators");
    var where = document.createElement("span");
    where.textContent = e.label;
    var who = document.createElement("span");
    who.className = "map-tooltip-people";
    who.textContent = e.people.join(", ");
    tooltip.replaceChildren(value, where, who);
    tooltip.hidden = false;

    var x = e.centroid[0], y = e.centroid[1];
    var maxLeft = svgHost.clientWidth - tooltip.offsetWidth;
    tooltip.style.left = Math.max(0, Math.min(maxLeft, x - tooltip.offsetWidth / 2)) + "px";
    var top = y - tooltip.offsetHeight - 10;
    tooltip.style.top = (top < 0 ? y + 14 : top) + "px";
  }

  function hide() {
    if (!active) return;
    active.row.classList.remove("is-active");
    if (active.shape) active.shape.classList.remove("is-active");
    active = null;
    tooltip.hidden = true;
  }

  rows.forEach(function (row) {
    var label = row.getAttribute("data-country");
    var e = entries[ATLAS_NAMES[label] || label];
    row.addEventListener("pointerenter", function () { show(e); });
    row.addEventListener("focus", function () { show(e); });
    row.addEventListener("pointerleave", hide);
    row.addEventListener("blur", hide);
  });

  fetch(ATLAS)
    .then(function (res) {
      if (!res.ok) throw new Error("atlas " + res.status);
      return res.json();
    })
    .then(function (world) {
      features = topojson.feature(world, world.objects.countries).features
        .filter(function (f) { return f.properties.name !== "Antarctica"; });
      plot.hidden = false;
      root.classList.add("has-map");
      render();
      if (window.ResizeObserver) {
        var lastWidth = svgHost.clientWidth;
        new ResizeObserver(function () {
          if (svgHost.clientWidth !== lastWidth) {
            lastWidth = svgHost.clientWidth;
            hide();
            render();
          }
        }).observe(svgHost);
      }
    })
    .catch(function () { /* the ranked list still shows every country */ });
})();
