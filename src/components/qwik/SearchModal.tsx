import {
  $,
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import searchData from ".json/search.json";
import { plainify, titleify } from "@/lib/utils/textConverter";

interface SearchItem {
  group: string;
  slug: string;
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    categories?: string[];
    tags?: string[];
  };
  content: string;
}

const items = searchData as SearchItem[];

function highlight(text: string, query: string, tag: "mark" | "u"): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    `<${tag}>$1</${tag}>`,
  );
}

function snippet(content: string, query: string): string {
  const plain = plainify(content);
  const pos = plain.toLowerCase().indexOf(query.toLowerCase());
  if (pos === -1) return plain.slice(0, 80);
  let start = pos;
  while (start > 0 && plain[start - 1] !== " ") start--;
  const match = plain.substring(start, pos + query.length);
  const after = plain.substring(pos + query.length, pos + query.length + 80);
  return `${highlight(match, query, "mark")}${after}`;
}

export const SearchModal = component$(() => {
  const query = useSignal("");
  const open = useSignal(false);
  const time = useSignal("0.000");

  const results = useComputed$(() => {
    const q = query.value.replace("\\", "").toLowerCase();
    if (!q) return [];
    const start = performance.now();
    const out = (items as SearchItem[]).filter((item) => {
      const hay = [
        item.frontmatter.title,
        item.frontmatter.description ?? "",
        (item.frontmatter.categories ?? []).join(" "),
        (item.frontmatter.tags ?? []).join(" "),
        item.content,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    time.value = ((performance.now() - start) / 1000).toFixed(3);
    return out;
  });

  const grouped = useComputed$(() => {
    const groups = new Map<string, SearchItem[]>();
    for (const item of results.value) {
      if (!groups.has(item.group)) groups.set(item.group, []);
      groups.get(item.group)!.push(item);
    }
    return [...groups.entries()];
  });

  const close = $(() => {
    open.value = false;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const onTrigger = () => {
      open.value = true;
      document.getElementById("searchInput")?.focus();
    };
    const triggers = document.querySelectorAll("[data-search-trigger]");
    triggers.forEach((b) => b.addEventListener("click", onTrigger));

    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        open.value = true;
        document.getElementById("searchInput")?.focus();
      }
      if (event.key === "Escape") open.value = false;
    };
    document.addEventListener("keydown", onKey);
    cleanup(() => {
      triggers.forEach((b) => b.removeEventListener("click", onTrigger));
      document.removeEventListener("keydown", onKey);
    });
  });

  return (
    <div id="searchModal" class={`search-modal${open.value ? " show" : ""}`}>
      <div
        id="searchModalOverlay"
        class="search-modal-overlay"
        onClick$={close}
      />
      <div class="search-wrapper">
        <div class="search-wrapper-header">
          <label for="searchInput" class="search-icon">
            <span class="sr-only">search icon</span>
            <svg
              viewBox="0 0 512 512"
              height="18"
              width="18"
              onClick$={() => (query.value = "")}
            >
              <title>search icon</title>
              <path
                fill="currentcolor"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8.0 45.3s-32.8 12.5-45.3.0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9.0 208S93.1.0 208 0 416 93.1 416 208zM208 352a144 144 0 100-288 144 144 0 100 288z"
              />
            </svg>
          </label>
          <input
            id="searchInput"
            placeholder="Search..."
            class="search-wrapper-header-input"
            type="input"
            name="search"
            autoComplete="off"
            value={query.value}
            onInput$={(e) =>
              (query.value = (e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div class="search-wrapper-body">
          {query.value ? (
            <div class="search-result">
              {grouped.value.length > 0 ? (
                grouped.value.map(([group, groupItems]) => (
                  <div class="search-result-group" key={group}>
                    <p class="search-result-group-title">
                      {titleify(group)}
                    </p>
                    {groupItems.map((item) => (
                      <div
                        key={item.slug}
                        id="searchItem"
                        class="search-result-item"
                      >
                        {item.frontmatter.image && (
                          <div class="search-result-item-image">
                            <img
                              src={item.frontmatter.image}
                              alt={item.frontmatter.title}
                            />
                          </div>
                        )}
                        <div class="search-result-item-body">
                          <a
                            href={`/${item.slug}`}
                            class="search-result-item-title search-result-item-link"
                            dangerouslySetInnerHTML={highlight(
                              item.frontmatter.title,
                              query.value,
                              "u",
                            )}
                          />
                          {item.frontmatter.description && (
                            <p
                              class="search-result-item-description"
                              dangerouslySetInnerHTML={highlight(
                                item.frontmatter.description,
                                query.value,
                                "u",
                              )}
                            />
                          )}
                          {item.content && (
                            <p
                              class="search-result-item-content"
                              dangerouslySetInnerHTML={snippet(
                                item.content,
                                query.value,
                              )}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div class="search-result-empty">
                  <p class="mt-4">
                    No results for &quot;<strong>{query.value}</strong>&quot;
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div class="py-8 text-center">Type something to search...</div>
          )}
        </div>
        <div class="search-wrapper-footer">
          {query.value && (
            <span>
              <strong>{results.value.length} </strong> results - in{" "}
              <strong>{time.value} </strong> seconds
            </span>
          )}
          <span>
            <kbd>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
});

export default SearchModal;
