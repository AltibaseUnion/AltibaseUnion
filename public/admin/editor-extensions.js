(function () {
  const h = window.h;
  const CMS = window.CMS;
  if (!CMS || !h) return;

  const escapeHtml = (text) => String(text ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const decodeHtml = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text || "";
    return textarea.value;
  };
  const asArray = (value) => value?.toJS ? value.toJS() : Array.isArray(value) ? value : [];
  const textWithBreaks = (text) => String(text ?? "").split(/\r?\n/).flatMap((line, index) => index ? [h("br", { key: `br-${index}` }), line] : [line]);
  const htmlWithBreaks = (text) => escapeHtml(text).replace(/\r?\n/g, "<br>");
  const parseHtml = (markup) => new DOMParser().parseFromString(markup, "text/html").body.firstElementChild;
  const safeUrl = (url) => {
    const value = String(url ?? "").trim();
    return /^(https?:\/\/|mailto:|\/|#)/i.test(value) ? value : "#";
  };

  const textColors = [
    ["navy", "네이비"], ["blue", "조합 블루"], ["teal", "청록"], ["green", "녹색"],
    ["amber", "황갈색"], ["red", "빨간색"], ["burgundy", "버건디"], ["muted", "연한 회색"]
  ];
  const highlights = [["yellow", "노란색"], ["blue", "파란색"], ["green", "녹색"]];

  function showInlineDialog({ title, selectedText = "", choices = [], initialStyle = "" }) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "cms-extension-dialog";
      overlay.setAttribute("role", "presentation");
      const panel = document.createElement("form");
      panel.className = "cms-extension-dialog__panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("aria-labelledby", "cms-extension-dialog-title");
      const heading = document.createElement("h2");
      heading.id = "cms-extension-dialog-title";
      heading.textContent = title;
      panel.appendChild(heading);

      let select;
      if (choices.length) {
        const selectLabel = document.createElement("label");
        selectLabel.textContent = "스타일";
        select = document.createElement("select");
        choices.forEach(([value, label]) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = label;
          select.appendChild(option);
        });
        if (initialStyle) select.value = initialStyle;
        selectLabel.appendChild(select);
        panel.appendChild(selectLabel);
      }

      const textLabel = document.createElement("label");
      textLabel.textContent = "적용할 문구";
      const textarea = document.createElement("textarea");
      textarea.required = true;
      textarea.value = selectedText;
      textLabel.appendChild(textarea);
      panel.appendChild(textLabel);

      const actions = document.createElement("div");
      actions.className = "cms-extension-dialog__actions";
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "cms-extension-dialog__cancel";
      cancel.textContent = "취소";
      const submit = document.createElement("button");
      submit.type = "submit";
      submit.className = "cms-extension-dialog__submit";
      submit.textContent = "적용";
      actions.append(cancel, submit);
      panel.appendChild(actions);
      overlay.appendChild(panel);
      document.body.appendChild(overlay);

      const close = (result) => { overlay.remove(); resolve(result); };
      cancel.addEventListener("click", () => close(null));
      overlay.addEventListener("click", (event) => { if (event.target === overlay) close(null); });
      panel.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = textarea.value.trim();
        if (text) close({ text, style: select?.value || "" });
      });
      panel.addEventListener("keydown", (event) => { if (event.key === "Escape") close(null); });
      setTimeout(() => textarea.focus(), 0);
    });
  }

  CMS.registerEditorComponent({
    id: "text-color", label: "글자색", type: "inline", trigger: '<span class="article-text-',
    pattern: /<span class="article-text-(navy|blue|teal|green|amber|red|burgundy|muted)">(.*?)<\/span>/,
    fromInline: (match) => ({ tone: match[1], text: decodeHtml(match[2]) }),
    toInline: ({ tone, text }) => `<span class="article-text-${tone}">${escapeHtml(text)}</span>`,
    toPreview: ({ tone, text }) => h("span", { className: `article-text-${tone}` }, text),
    onInsert: ({ selectedText }) => showInlineDialog({ title: "글자색 적용", selectedText, choices: textColors }).then((data) => data && ({ tone: data.style, text: data.text })),
    onEdit: ({ data }) => showInlineDialog({ title: "글자색 수정", selectedText: data.text, choices: textColors, initialStyle: data.tone }).then((next) => next && ({ tone: next.style, text: next.text }))
  });
  CMS.registerEditorComponent({
    id: "text-highlight", label: "형광펜", type: "inline", trigger: '<mark class="article-highlight-',
    pattern: /<mark class="article-highlight-(yellow|blue|green)">(.*?)<\/mark>/,
    fromInline: (match) => ({ tone: match[1], text: decodeHtml(match[2]) }),
    toInline: ({ tone, text }) => `<mark class="article-highlight-${tone}">${escapeHtml(text)}</mark>`,
    toPreview: ({ tone, text }) => h("mark", { className: `article-highlight-${tone}` }, text),
    onInsert: ({ selectedText }) => showInlineDialog({ title: "형광펜 적용", selectedText, choices: highlights }).then((data) => data && ({ tone: data.style, text: data.text })),
    onEdit: ({ data }) => showInlineDialog({ title: "형광펜 수정", selectedText: data.text, choices: highlights, initialStyle: data.tone }).then((next) => next && ({ tone: next.style, text: next.text }))
  });
  CMS.registerEditorComponent({
    id: "text-underline", label: "밑줄", type: "inline", trigger: '<span class="article-underline">',
    pattern: /<span class="article-underline">(.*?)<\/span>/,
    fromInline: (match) => ({ text: decodeHtml(match[1]) }),
    toInline: ({ text }) => `<span class="article-underline">${escapeHtml(text)}</span>`,
    toPreview: ({ text }) => h("span", { className: "article-underline" }, text),
    onInsert: ({ selectedText }) => showInlineDialog({ title: "밑줄 적용", selectedText }).then((data) => data && ({ text: data.text })),
    onEdit: ({ data }) => showInlineDialog({ title: "밑줄 수정", selectedText: data.text }).then((next) => next && ({ text: next.text }))
  });
  CMS.registerEditorComponent({
    id: "centered-text", label: "가운데 정렬", fields: [{ name: "text", label: "문구", widget: "string" }],
    pattern: /^<p class="article-align-center">([\s\S]*?)<\/p>$/m,
    fromBlock: (match) => ({ text: decodeHtml(match[1]) }),
    toBlock: ({ text }) => `<p class="article-align-center">${escapeHtml(text)}</p>`,
    toPreview: ({ text }) => h("p", { className: "article-align-center" }, text)
  });
  CMS.registerEditorComponent({
    id: "callout-box", label: "안내 박스", fields: [
      { name: "type", label: "종류", widget: "select", options: [{ label: "안내", value: "info" }, { label: "중요", value: "important" }, { label: "주의", value: "warning" }, { label: "참고", value: "note" }], default: "info" },
      { name: "title", label: "제목", widget: "string", required: false },
      { name: "text", label: "내용", widget: "text" }
    ],
    pattern: /^<aside class="article-callout article-callout-(info|important|warning|note)">([\s\S]*?)<\/aside>$/m,
    fromBlock: (match) => { const el = parseHtml(match[0]); return { type: match[1], title: el.querySelector("strong")?.textContent || "", text: el.querySelector("p")?.innerText || "" }; },
    toBlock: ({ type, title, text }) => `<aside class="article-callout article-callout-${type}">${title ? `<strong>${escapeHtml(title)}</strong>` : ""}<p>${htmlWithBreaks(text)}</p></aside>`,
    toPreview: ({ type, title, text }) => h("aside", { className: `article-callout article-callout-${type}` }, title && h("strong", null, title), h("p", null, ...textWithBreaks(text)))
  });
  CMS.registerEditorComponent({
    id: "formatted-table", label: "표", fields: [
      { name: "headers", label: "열 제목", widget: "list", field: { name: "value", label: "제목", widget: "string" }, min: 1 },
      { name: "rows", label: "행", widget: "list", fields: [{ name: "cells", label: "셀", widget: "list", field: { name: "value", label: "내용", widget: "string" } }] }
    ],
    pattern: /^<div class="article-table-wrap">([\s\S]*?)<\/div>$/m,
    fromBlock: (match) => { const el = parseHtml(match[0]); return { headers: Array.from(el.querySelectorAll("thead th"), (cell) => cell.textContent), rows: Array.from(el.querySelectorAll("tbody tr"), (row) => ({ cells: Array.from(row.querySelectorAll("td"), (cell) => cell.textContent) })) }; },
    toBlock: ({ headers, rows }) => { const head = asArray(headers); const body = asArray(rows); return `<div class="article-table-wrap"><table><thead><tr>${head.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${asArray(row.cells).map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`; },
    toPreview: ({ headers, rows }) => h("div", { className: "article-table-wrap" }, h("table", null, h("thead", null, h("tr", null, ...asArray(headers).map((cell, i) => h("th", { key: i }, cell)))), h("tbody", null, ...asArray(rows).map((row, i) => h("tr", { key: i }, ...asArray(row.cells).map((cell, j) => h("td", { key: j }, cell)))))))
  });
  CMS.registerEditorComponent({
    id: "action-button", label: "버튼 링크", fields: [
      { name: "text", label: "버튼 문구", widget: "string" }, { name: "url", label: "URL", widget: "string" },
      { name: "style", label: "스타일", widget: "select", options: [{ label: "기본", value: "primary" }, { label: "테두리", value: "outline" }, { label: "보조", value: "subtle" }], default: "primary" },
      { name: "newTab", label: "새 창에서 열기", widget: "boolean", default: false }
    ],
    pattern: /^<p class="article-action"><a class="article-button article-button-(primary|outline|subtle)" href="([^"]*)"( target="_blank" rel="noopener noreferrer")?>([\s\S]*?)<\/a><\/p>$/m,
    fromBlock: (match) => ({ style: match[1], url: decodeHtml(match[2]), newTab: Boolean(match[3]), text: decodeHtml(match[4]) }),
    toBlock: ({ text, url, style, newTab }) => `<p class="article-action"><a class="article-button article-button-${style}" href="${escapeHtml(safeUrl(url))}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(text)}</a></p>`,
    toPreview: ({ text, url, style, newTab }) => h("p", { className: "article-action" }, h("a", { className: `article-button article-button-${style}`, href: safeUrl(url), target: newTab ? "_blank" : undefined, rel: newTab ? "noopener noreferrer" : undefined }, text))
  });
  CMS.registerEditorComponent({
    id: "article-divider", label: "구분선", fields: [{ name: "value", widget: "hidden", default: "divider" }], pattern: /^<hr class="article-divider"\s*\/?>$/m,
    fromBlock: () => ({}), toBlock: () => '<hr class="article-divider">', toPreview: () => h("hr", { className: "article-divider" })
  });
  CMS.registerEditorComponent({
    id: "collapsible-details", label: "접기/펼치기", fields: [{ name: "summary", label: "제목", widget: "string" }, { name: "text", label: "내용", widget: "text" }],
    pattern: /^<details class="article-details"><summary>([\s\S]*?)<\/summary><div class="article-details-content">([\s\S]*?)<\/div><\/details>$/m,
    fromBlock: (match) => ({ summary: decodeHtml(match[1]), text: parseHtml(`<div>${match[2]}</div>`)?.innerText || "" }),
    toBlock: ({ summary, text }) => `<details class="article-details"><summary>${escapeHtml(summary)}</summary><div class="article-details-content">${htmlWithBreaks(text)}</div></details>`,
    toPreview: ({ summary, text }) => h("details", { className: "article-details" }, h("summary", null, summary), h("div", { className: "article-details-content" }, ...textWithBreaks(text)))
  });
  CMS.registerEditorComponent({
    id: "body-image", label: "본문 이미지", fields: [
      { name: "src", label: "이미지", widget: "image", media_folder: "/public/images/uploads/body", public_folder: "/AltibaseUnion/images/uploads/body" },
      { name: "alt", label: "대체 문구", widget: "string" }, { name: "caption", label: "설명", widget: "string", required: false }
    ],
    pattern: /^<figure class="article-figure"><img src="([^"]*)" alt="([^"]*)"\s*\/?>((?:<figcaption>[\s\S]*?<\/figcaption>)?)<\/figure>$/m,
    fromBlock: (match) => ({ src: decodeHtml(match[1]), alt: decodeHtml(match[2]), caption: match[3] ? parseHtml(match[3])?.textContent || "" : "" }),
    toBlock: ({ src, alt, caption }) => `<figure class="article-figure"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}</figure>`,
    toPreview: ({ src, alt, caption, getAsset }) => h("figure", { className: "article-figure" }, h("img", { src: getAsset ? getAsset(src).toString() : src, alt }), caption && h("figcaption", null, caption))
  });
  CMS.registerEditorComponent({
    id: "fenced-code", label: "코드 블록", fields: [{ name: "language", label: "언어", widget: "string", required: false }, { name: "code", label: "코드", widget: "code", output_code_only: true }],
    pattern: /^```([^\n]*)\n([\s\S]*?)\n```$/m,
    fromBlock: (match) => ({ language: match[1], code: match[2] }),
    toBlock: ({ language, code }) => `\`\`\`${language || ""}\n${code || ""}\n\`\`\``,
    toPreview: ({ language, code }) => h("pre", null, h("code", { className: language ? `language-${language}` : undefined }, code))
  });

  const shortcuts = [
    ["글자색", "A"], ["형광펜", "▰"], ["밑줄", "U"], ["가운데 정렬", "≡"], ["안내 박스", "!"],
    ["표", "▦"], ["버튼 링크", "↗"], ["구분선", "—"], ["접기/펼치기", "⌄"], ["본문 이미지", "▧"], ["코드 블록", "</>"]
  ];
  const normalize = (text) => String(text || "").replace(/\s+/g, " ").trim();
  const isVisible = (element) => Boolean(element && (element.offsetWidth || element.offsetHeight || element.getClientRects().length));
  const findAddButton = () => Array.from(document.querySelectorAll("button[title],button[aria-label]")).find((button) => {
    const label = `${button.title || ""} ${button.getAttribute("aria-label") || ""}`.toLowerCase();
    return label.includes("component") || label.includes("컴포넌트") || label.includes("구성 요소");
  });
  const findToolbar = (button) => {
    let node = button?.parentElement;
    while (node && node !== document.body) {
      if (node.querySelectorAll("button").length >= 5 && node.getBoundingClientRect().height < 150) return node;
      node = node.parentElement;
    }
    return null;
  };
  function activateComponent(label, status) {
    const addButton = findAddButton();
    if (!addButton) { status.textContent = "본문 편집기를 먼저 선택해 주세요."; return; }
    addButton.click();
    const selectItem = (attempt = 0) => {
      const item = Array.from(document.querySelectorAll('button,[role="menuitem"]')).find((element) => !element.closest(".cms-formatting-shortcuts") && isVisible(element) && normalize(element.textContent) === label);
      if (item) { status.textContent = `${label} 도구를 열었습니다.`; item.click(); return; }
      if (attempt < 5) setTimeout(() => selectItem(attempt + 1), 80);
      else status.textContent = `${label} 도구를 열지 못했습니다. + 메뉴에서 선택해 주세요.`;
    };
    setTimeout(() => selectItem(), 40);
  }
  function mountShortcutToolbar() {
    const addButton = findAddButton();
    const toolbar = findToolbar(addButton);
    if (!toolbar || toolbar.parentElement?.querySelector(":scope > .cms-formatting-shortcuts")) return;
    const bar = document.createElement("div");
    bar.className = "cms-formatting-shortcuts";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "확장 서식 도구");
    const label = document.createElement("span");
    label.className = "cms-formatting-shortcuts__label";
    label.textContent = "확장 서식";
    bar.appendChild(label);
    const status = document.createElement("span");
    status.className = "cms-formatting-shortcuts__status";
    status.setAttribute("aria-live", "polite");
    shortcuts.forEach(([name, icon]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.title = name;
      button.setAttribute("aria-label", name);
      const iconNode = document.createElement("span");
      iconNode.className = "cms-formatting-shortcuts__icon";
      iconNode.setAttribute("aria-hidden", "true");
      iconNode.textContent = icon;
      const textNode = document.createElement("span");
      textNode.textContent = name;
      button.append(iconNode, textNode);
      button.addEventListener("click", () => activateComponent(name, status));
      bar.appendChild(button);
    });
    bar.appendChild(status);
    toolbar.parentElement.insertBefore(bar, toolbar);
  }
  let scheduled = false;
  const scheduleMount = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; mountShortcutToolbar(); });
  };
  new MutationObserver(scheduleMount).observe(document.body, { childList: true, subtree: true });
  window.addEventListener("hashchange", scheduleMount);
  scheduleMount();
})();
