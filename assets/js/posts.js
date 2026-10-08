// Topic filter + live search for the posts page. A tag can be linked as /posts/?tag=emacs.
(function () {
  var root = document.querySelector("[data-posts]");
  if (!root) return;

  var toolbar = root.querySelector(".posts-toolbar");
  var input = root.querySelector(".posts-search input");
  var chips = Array.prototype.slice.call(root.querySelectorAll(".posts-chip"));
  var status = root.querySelector(".posts-status");
  var empty = root.querySelector(".posts-empty");
  var groups = Array.prototype.slice.call(root.querySelectorAll(".entry-year-group"));
  var cards = Array.prototype.slice.call(root.querySelectorAll(".post-card"));

  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  var entries = cards.map(function (card) {
    var group = card.closest(".entry-year-group");
    var year = group ? group.querySelector(".entry-year").textContent : "";
    return {
      card: card,
      tags: (card.getAttribute("data-tags") || "").split("|").filter(Boolean),
      text: normalize(card.textContent + " " + year),
    };
  });

  var tag = "";

  function apply() {
    var terms = normalize(input.value).trim().split(" ").filter(Boolean);
    var shown = 0;

    entries.forEach(function (e) {
      var tagged = !tag || e.tags.indexOf(tag) !== -1;
      var match = terms.every(function (t) { return e.text.indexOf(t) !== -1; });
      e.card.hidden = !(tagged && match);
      if (!e.card.hidden) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector(".post-card:not([hidden])"); });
    empty.hidden = shown > 0;

    status.replaceChildren();
    if (tag || terms.length) {
      var text = "Showing " + shown + " of " + entries.length + " posts" + (tag ? " tagged “" + tag + "”" : "");
      var clear = document.createElement("button");
      clear.type = "button";
      clear.className = "posts-clear";
      clear.textContent = "Clear";
      clear.addEventListener("click", function () {
        input.value = "";
        setTag("", true);
      });
      status.append(text + " · ", clear);
    }
  }

  function setTag(value, updateUrl) {
    tag = value;
    chips.forEach(function (chip) {
      var active = chip.getAttribute("data-tag") === value;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (updateUrl && window.history.replaceState) {
      var params = new URLSearchParams(location.search);
      if (value) params.set("tag", value); else params.delete("tag");
      var qs = params.toString();
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
    }
    apply();
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { setTag(chip.getAttribute("data-tag"), true); });
  });

  // Tags on the cards filter too; bring the toolbar back into view so the change is visible.
  root.addEventListener("click", function (e) {
    var btn = e.target.closest(".post-tag");
    if (!btn) return;
    setTag(btn.getAttribute("data-tag"), true);
    if (toolbar.getBoundingClientRect().top < 0) toolbar.scrollIntoView({ behavior: "smooth", block: "start" });
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
    var t = (e.target.tagName || "").toLowerCase();
    if (e.key === "/" && t !== "input" && t !== "textarea" && !e.target.isContentEditable) {
      e.preventDefault();
      input.focus();
    }
  });

  toolbar.hidden = false;
  root.classList.add("is-interactive");
  var initial = new URLSearchParams(location.search).get("tag") || "";
  setTag(initial.toLowerCase(), false);
})();
