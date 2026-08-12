(function () {
  const h = window.h;
  const value = (entry, name, fallback = "") => entry.getIn(["data", name], fallback);
  const assetUrl = (getAsset, path) => path ? getAsset(path).toString() : "";

  function Preview({ entry, widgetFor, getAsset }) {
    const thumbnail = value(entry, "thumbnail");
    const description = value(entry, "description");
    const body = value(entry, "body");
    const attachments = value(entry, "attachments")?.toJS?.() || [];
    return h("article", { className: "cms-article" },
      h("header", { className: "cms-header" },
        h("span", { className: "cms-badge" }, value(entry, "category")),
        h("h1", null, value(entry, "title", "제목")),
        h("div", { className: "cms-meta" }, value(entry, "date"), value(entry, "updatedDate") ? ` · 수정 ${value(entry, "updatedDate")}` : ""),
        description && h("p", { className: "cms-description" }, description)
      ),
      thumbnail && h("img", { className: "cms-hero", src: assetUrl(getAsset, thumbnail), alt: value(entry, "thumbnailAlt") || value(entry, "title") }),
      body && h("div", { className: "cms-body" }, widgetFor("body")),
      attachments.length > 0 && h("section", { className: "cms-attachments" },
        h("h2", null, "첨부파일"),
        h("ul", null, attachments.map((item, index) => h("li", { key: index }, h("a", { href: assetUrl(getAsset, item.url) }, item.name))))
      )
    );
  }

  CMS.registerPreviewStyle("./preview.css");
  CMS.registerPreviewTemplate("notices", Preview);
  CMS.registerPreviewTemplate("activities", Preview);
  CMS.registerEventListener({
    name: "prePublish",
    handler: ({ entry }) => entry.get("data").set("draft", false)
  });
})();
