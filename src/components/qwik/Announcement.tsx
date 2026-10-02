import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";

const { enable, content, expire_days } = config.announcement;

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  for (const cookie of document.cookie.split("; ")) {
    const [key, value] = cookie.split("=");
    if (decodeURIComponent(key) === name) return decodeURIComponent(value);
  }
  return null;
}

export const Announcement = component$(() => {
  const visible = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (enable && content && !getCookie("announcement-close")) {
      visible.value = true;
    }
  });

  if (!enable || !content || !visible.value) return null;

  return (
    <div class="announcement-bar">
      <p dangerouslySetInnerHTML={markdownify(content)} />
      <button
        aria-label="Close announcement"
        class="announcement-close"
        onClick$={() => {
          setCookie("announcement-close", "true", expire_days);
          visible.value = false;
        }}
      >
        &times;
      </button>
    </div>
  );
});

export default Announcement;
