import { Slot, component$, useSignal } from "@builder.io/qwik";
import { marked } from "marked";

interface TabLink {
  name: string;
  children: string;
}

function parseTabs(raw: string): TabLink[] {
  return Array.from(
    raw.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>((?:.|\n)*?)<\/div>/g,
    ),
    (match) => ({ name: match[1], children: match[0] }),
  );
}

export const Tabs = component$(({ children }: { children?: unknown }) => {
  const active = useSignal(0);
  const raw = typeof children === "string" ? children : null;
  const tabLinks = raw ? parseTabs(raw) : [];

  if (!raw) {
    return (
      <div class="tab">
        <Slot />
      </div>
    );
  }

  return (
    <div class="tab">
      <ul class="tab-nav" role="tablist">
        {tabLinks.map((item, index) => (
          <li
            key={index}
            role="tab"
            tabIndex={index === active.value ? 0 : -1}
            class={`tab-nav-item${index === active.value ? " active" : ""}`}
            onClick$={() => (active.value = index)}
            onKeyDown$={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                active.value = index;
              } else if (event.key === "ArrowRight") {
                active.value = (active.value + 1) % tabLinks.length;
              } else if (event.key === "ArrowLeft") {
                active.value =
                  (active.value - 1 + tabLinks.length) % tabLinks.length;
              }
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      {tabLinks.map((item, i) => (
        <div
          key={i}
          class={
            active.value === i ? "tab-content block px-5" : "hidden"
          }
          dangerouslySetInnerHTML={marked.parse(item.children) as string}
        />
      ))}
    </div>
  );
});

export default Tabs;
