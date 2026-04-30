(function () {
  if (window.__chromeKeysBound) return;
  window.__chromeKeysBound = true;

  // ── Developer config ──────────────────────────────────────────
  // Set lang to "en" | "zh_CN" | null (auto) to force display language.
  // Set showPanelByDefault to true so the hotkey panel appears on every page load.
  const DEV_CONFIG = {
    lang: "null",
    showPanelByDefault: false,
  };
  // ───────────────────────────────────────────────────────────────

  const PANEL_ID = "__chrome-keys-hotkey-panel-root";

  const DEFAULT_SETTINGS = {
    triggerCode: "AltRight",
    holdMs: 800,
    sheetPlatform: "auto",
  };

  // Custom i18n helper – reads from DEV_CONFIG.lang when set
  let _messages = null;

  function t(key, subs) {
    if (_messages && _messages[key]) {
      let msg = _messages[key].message;
      if (subs !== undefined) {
        const arr = Array.isArray(subs) ? subs : [subs];
        for (let i = 0; i < arr.length; i++) {
          msg = msg.replace("$" + (i + 1), arr[i]);
        }
      }
      return msg;
    }
    return chrome.i18n.getMessage(key, subs);
  }

  const TRIGGER_CODE_KEYS = {
    AltRight: "trigger_alt_right",
    AltLeft: "trigger_alt_left",
    ShiftRight: "trigger_shift_right",
    ShiftLeft: "trigger_shift_left",
    ControlRight: "trigger_ctrl_right",
  };

  function getTriggerLabel(code) {
    const key = TRIGGER_CODE_KEYS[code];
    return key ? t(key) : code;
  }

  /** @type {typeof DEFAULT_SETTINGS} */
  const config = { ...DEFAULT_SETTINGS };

  /** 按分类列出；略去约 20% 较少用项 */
  const MAC_SECTIONS = [
    {
      titleKey: "section_tabs_windows",
      rows: [
        ["action_new_window", "\u2318 + N"],
        ["action_new_incognito_window", "\u2318 + Shift + N"],
        ["action_quit_chrome", "\u2318 + Q"],
        ["action_fullscreen", "hotkey_fn_esc_mac"],
        ["action_new_tab", "\u2318 + T"],
        ["action_reopen_closed_tab", "\u2318 + Shift + T"],
        ["action_close_tab", "\u2318 + W"],
        ["action_next_prev_tab", "\u2318 + Option + \u2192 / \u2190"],
        ["action_tab_1_to_8", "\u2318 + 1 \u2026 8"],
        ["action_last_tab", "\u2318 + 9"],
        ["action_back_forward", "hotkey_back_forward_mac"],
      ],
    },
    {
      titleKey: "section_addressbar_search",
      rows: [
        ["action_focus_address_bar", "\u2318 + L"],
        ["action_search_default_engine", "hotkey_type_return_mac"],
        ["action_switch_search_engine", "hotkey_engine_tab"],
        ["action_autocomplete_www", "Ctrl + Return"],
        ["action_open_url_bg_tab", "hotkey_url_bg_mac"],
      ],
    },
    {
      titleKey: "section_mouse_drag",
      rows: [
        ["action_open_link_bg_tab", "hotkey_click_link_bg_mac"],
        ["action_open_link_fg_tab", "hotkey_click_link_fg_mac"],
        ["action_open_link_new_window", "hotkey_click_link_win_new"],
        ["action_download_link", "hotkey_click_link_dl_mac"],
        ["action_drag_tab_new_window", "hotkey_drag_out"],
        ["action_drag_tab_into_window", "hotkey_drag_in"],
      ],
    },
    {
      titleKey: "section_page_view",
      rows: [
        ["action_print", "\u2318 + P"],
        ["action_save_page", "\u2318 + S"],
        ["action_hard_reload", "\u2318 + Shift + R"],
        ["action_stop_loading", "Esc"],
        ["action_next_prev_focusable", "Tab / Shift + Tab"],
        ["action_scroll_page", "hotkey_space_scroll"],
        ["action_zoom", "\u2318 + + / \u2212 / 0"],
        ["action_bookmark", "\u2318 + D"],
        ["action_bookmark_all_tabs", "\u2318 + Shift + D"],
        ["action_view_source", "\u2318 + Option + U"],
        ["action_open_console", "\u2318 + Option + J"],
      ],
    },
    {
      titleKey: "section_find_features",
      rows: [
        ["action_toggle_bookmark_bar", "\u2318 + Shift + B"],
        ["action_bookmark_manager", "\u2318 + Option + B"],
        ["action_settings", "\u2318 + ,"],
        ["action_history", "\u2318 + Y"],
        ["action_downloads", "\u2318 + Shift + J"],
        ["action_find_in_page", "\u2318 + F"],
        ["action_find_next_prev", "\u2318 + G / \u2318 + Shift + G"],
        ["action_devtools", "\u2318 + Option + I"],
        ["action_clear_browsing_data", "\u2318 + Shift + Delete"],
        ["action_switch_user", "\u2318 + Shift + M"],
      ],
    },
  ];

  const WIN_SECTIONS = [
    {
      titleKey: "section_tabs_windows",
      rows: [
        ["action_new_window", "Ctrl + N"],
        ["action_new_incognito_window", "Ctrl + Shift + N"],
        ["action_close_window", "Alt + F4"],
        ["action_fullscreen", "F11"],
        ["action_new_tab", "Ctrl + T"],
        ["action_reopen_closed_tab", "Ctrl + Shift + T"],
        ["action_close_tab", "Ctrl + W"],
        ["action_next_prev_tab", "hotkey_next_prev_tab_win"],
        ["action_tab_1_to_8", "Ctrl + 1 \u2026 8"],
        ["action_last_tab", "Ctrl + 9"],
        ["action_back_forward", "Alt + \u2190 / \u2192"],
      ],
    },
    {
      titleKey: "section_addressbar_search",
      rows: [
        ["action_focus_address_bar", "Ctrl + L"],
        ["action_search_default_engine", "hotkey_type_return_win"],
        ["action_switch_search_engine", "hotkey_engine_tab"],
        ["action_autocomplete_www", "Ctrl + Enter"],
        ["action_open_url_bg_tab", "hotkey_url_bg_win"],
      ],
    },
    {
      titleKey: "section_mouse_drag",
      rows: [
        ["action_open_link_bg_tab", "hotkey_click_link_bg_win"],
        ["action_open_link_fg_tab", "hotkey_click_link_fg_win"],
        ["action_open_link_new_window", "hotkey_click_link_win_new"],
        ["action_download_link", "hotkey_click_link_dl_win"],
        ["action_drag_tab_new_window", "hotkey_drag_out"],
        ["action_drag_tab_into_window", "hotkey_drag_in"],
      ],
    },
    {
      titleKey: "section_page_view",
      rows: [
        ["action_print", "Ctrl + P"],
        ["action_save_page", "Ctrl + S"],
        ["action_hard_reload", "Ctrl + Shift + R"],
        ["action_stop_loading", "Esc"],
        ["action_next_prev_focusable", "Tab / Shift + Tab"],
        ["action_scroll_page", "hotkey_space_scroll"],
        ["action_zoom", "Ctrl + + / \u2212 / 0"],
        ["action_bookmark", "Ctrl + D"],
        ["action_bookmark_all_tabs", "Ctrl + Shift + D"],
        ["action_view_source", "Ctrl + U"],
        ["action_open_console", "Ctrl + Shift + J"],
      ],
    },
    {
      titleKey: "section_find_features",
      rows: [
        ["action_toggle_bookmark_bar", "Ctrl + Shift + B"],
        ["action_bookmark_manager", "Ctrl + Shift + O"],
        ["action_settings", "Ctrl + ,"],
        ["action_history", "Ctrl + H"],
        ["action_downloads", "Ctrl + J"],
        ["action_find_in_page", "Ctrl + F"],
        ["action_find_next_prev", "Ctrl + G / Ctrl + Shift + G"],
        ["action_devtools", "hotkey_devtools_win"],
        ["action_clear_browsing_data", "Ctrl + Shift + Delete"],
        ["action_switch_user", "Ctrl + Shift + M"],
      ],
    },
  ];

  function detectMacLike() {
    try {
      const p = navigator.userAgentData?.platform;
      if (p) return /mac|iphone|ipad/i.test(p);
    } catch (_) {}
    return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || "");
  }

  /** @returns {"mac"|"win"} */
  function resolveSheetKind() {
    if (config.sheetPlatform === "mac") return "mac";
    if (config.sheetPlatform === "win") return "win";
    return detectMacLike() ? "mac" : "win";
  }

  function formatHoldSeconds(ms) {
    const s = ms / 1000;
    if (s >= 1 && ms % 1000 === 0) return String(s);
    return s.toFixed(1).replace(/\.0$/, "");
  }

  function buildHint(kind) {
    const name = getTriggerLabel(config.triggerCode);
    const sec = formatHoldSeconds(config.holdMs);
    const os = kind === "mac" ? "Mac" : "Windows";
    return t("panel_hint", [os, name, sec]);
  }

  function buildSectionBlock(section) {
    const block = document.createElement("section");
    block.className = "chrome-keys-block";

    const title = document.createElement("h3");
    title.className = "block-title";
    title.textContent = t(section.titleKey);

    const table = document.createElement("table");
    for (const [actionKey, combo] of section.rows) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = t(actionKey);
      const td2 = document.createElement("td");
      td2.textContent = t(combo) || combo;
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }

    block.appendChild(title);
    block.appendChild(table);
    return block;
  }

  function injectPanelStyles(root) {
    const style = document.createElement("style");
    style.textContent = `
#${PANEL_ID} {
  all: initial;
  position: fixed;
  z-index: 2147483647;
  top: 10px;
  right: 10px;
  width: min(1100px, calc(100vw - 20px));
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 12px;
  line-height: 1.32;
  color: #e8eaed;
  background: rgba(32, 33, 36, 0.95);
  border: none;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  padding: 12px 14px 10px 14px;
  display: none;
  box-sizing: border-box;
}
#${PANEL_ID} .chrome-keys-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: 10px 14px;
  align-items: stretch;
}
#${PANEL_ID} .chrome-keys-block {
  margin: 0;
  min-width: 0;
  padding: 8px 10px 10px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
}
#${PANEL_ID} .chrome-keys-block .block-title {
  margin: 0 0 6px 0;
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  color: #bdc1c6;
  letter-spacing: 0.02em;
  line-height: 1.25;
}
@media (max-width: 900px) {
  #${PANEL_ID} {
    width: calc(100vw - 20px);
  }
  #${PANEL_ID} .chrome-keys-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
  }
}
@media (max-width: 560px) {
  #${PANEL_ID} .chrome-keys-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-height: 700px) {
  #${PANEL_ID} {
    font-size: 11px;
    top: 6px;
  }
  #${PANEL_ID} td {
    padding: 3px 5px;
  }
  #${PANEL_ID} h2 {
    margin-bottom: 6px;
  }
}
#${PANEL_ID}.visible { display: block; }
#${PANEL_ID} h2 {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
#${PANEL_ID} table { width: 100%; border-collapse: collapse; }
#${PANEL_ID} td {
  padding: 4px 6px;
  vertical-align: top;
  border-bottom: none;
}
#${PANEL_ID} td:last-child {
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: #9aa0a6;
}
#${PANEL_ID} .hint {
  margin-top: 8px;
  font-size: 10px;
  line-height: 1.35;
  color: #9aa0a6;
}
`;
    root.appendChild(style);
  }

  function populatePanelBody(root) {
    const kind = resolveSheetKind();
    const sections = kind === "mac" ? MAC_SECTIONS : WIN_SECTIONS;
    const titleKey = kind === "mac" ? "panel_title_mac" : "panel_title_win";

    const h2 = root.querySelector("h2.chrome-keys-title");
    const grid = root.querySelector(".chrome-keys-grid");
    const hint = root.querySelector(".hint");
    if (!h2 || !grid || !hint) return;

    h2.textContent = t(titleKey);
    grid.replaceChildren();
    for (const section of sections) {
      grid.appendChild(buildSectionBlock(section));
    }
    hint.textContent = buildHint(kind);
  }

  function ensurePanel() {
    let root = document.getElementById(PANEL_ID);
    if (root) {
      populatePanelBody(root);
      return root;
    }

    root = document.createElement("div");
    root.id = PANEL_ID;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", t("panel_aria_label"));

    injectPanelStyles(root);

    const h2 = document.createElement("h2");
    h2.className = "chrome-keys-title";

    const grid = document.createElement("div");
    grid.className = "chrome-keys-grid";

    const hint = document.createElement("div");
    hint.className = "hint";

    root.appendChild(h2);
    root.appendChild(grid);
    root.appendChild(hint);

    document.documentElement.appendChild(root);
    populatePanelBody(root);
    return root;
  }

  function showPanel() {
    ensurePanel().classList.add("visible");
  }

  function hidePanel() {
    const el = document.getElementById(PANEL_ID);
    if (el) el.classList.remove("visible");
  }

  let triggerHeld = false;
  let holdTimer = null;

  function clearHoldTimer() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  function onKeyDown(e) {
    if (e.code !== config.triggerCode || e.repeat) return;
    triggerHeld = true;
    clearHoldTimer();
    holdTimer = window.setTimeout(() => {
      holdTimer = null;
      if (triggerHeld) showPanel();
    }, config.holdMs);
  }

  function onKeyUp(e) {
    if (e.code !== config.triggerCode) return;
    triggerHeld = false;
    clearHoldTimer();
    hidePanel();
  }

  function resetOnBlur() {
    triggerHeld = false;
    clearHoldTimer();
    hidePanel();
  }

  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);
  window.addEventListener("blur", resetOnBlur, true);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetOnBlur();
  });

  function refreshPanelIfOpen() {
    const root = document.getElementById(PANEL_ID);
    if (root) populatePanelBody(root);
  }

  // Load dev language override
  function loadDevLang() {
    if (!DEV_CONFIG.lang) return;
    var url = chrome.runtime.getURL("_locales/" + DEV_CONFIG.lang + "/messages.json");
    return fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (messages) {
        _messages = messages;
        console.log("[chrome-keys] dev lang loaded: " + DEV_CONFIG.lang);
      })
      .catch(function (err) {
        console.error("[chrome-keys] failed to load dev lang, falling back to browser locale", err);
      });
  }

  function init() {
    if (DEV_CONFIG.showPanelByDefault) {
      showPanel();
    }
  }

  var ready = DEV_CONFIG.lang ? loadDevLang() : Promise.resolve();
  ready.then(init);

  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    Object.assign(config, items);
    try {
      ensurePanel();
    } catch (_) {}
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const k of Object.keys(DEFAULT_SETTINGS)) {
      if (changes[k]) config[k] = changes[k].newValue;
    }
    refreshPanelIfOpen();
  });
})();
