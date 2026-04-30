// ── Developer config ──────────────────────────────────────────
// Set lang to "en" | "zh_CN" | null (auto) to force display language.
const DEV_CONFIG = {
  lang: "null",
};
// ───────────────────────────────────────────────────────────────

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

const TRIGGER_OPTIONS = [
  { code: "AltRight", labelKey: "trigger_alt_right" },
  { code: "AltLeft", labelKey: "trigger_alt_left" },
  { code: "ShiftRight", labelKey: "trigger_shift_right" },
  { code: "ShiftLeft", labelKey: "trigger_shift_left" },
  { code: "ControlRight", labelKey: "trigger_ctrl_right" },
];

const PLATFORM_OPTIONS = [
  { value: "auto", labelKey: "options_platform_auto" },
  { value: "mac", labelKey: "options_platform_mac" },
  { value: "win", labelKey: "options_platform_win" },
];

function fillSelect(select, options, getValue, getLabel) {
  select.innerHTML = "";
  for (const opt of options) {
    const o = document.createElement("option");
    o.value = getValue(opt);
    o.textContent = getLabel(opt);
    select.appendChild(o);
  }
}

function setStaticText() {
  document.title = t("options_title");
  document.getElementById("page-title").textContent = t("options_title");
  document.getElementById("heading").textContent = t("options_heading");
  document.getElementById("trigger-label").textContent = t("options_trigger_label");
  document.getElementById("trigger-hint").textContent = t("options_trigger_hint");
  document.getElementById("hold-label").textContent = t("options_hold_label");
  document.getElementById("hold-hint").textContent = t("options_hold_hint");
  document.getElementById("platform-label").textContent = t("options_platform_label");
}

function load() {
  setStaticText();

  const trigger = document.getElementById("trigger");
  const holdMs = document.getElementById("holdMs");
  const sheetPlatform = document.getElementById("sheetPlatform");

  fillSelect(
    trigger,
    TRIGGER_OPTIONS,
    (o) => o.code,
    (o) => t(o.labelKey)
  );
  fillSelect(
    sheetPlatform,
    PLATFORM_OPTIONS,
    (o) => o.value,
    (o) => t(o.labelKey)
  );

  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    trigger.value = items.triggerCode;
    holdMs.value = String(items.holdMs);
    sheetPlatform.value = items.sheetPlatform;
  });
}

function save() {
  const trigger = document.getElementById("trigger");
  const holdMs = document.getElementById("holdMs");
  const sheetPlatform = document.getElementById("sheetPlatform");
  const status = document.getElementById("status");

  let ms = parseInt(holdMs.value, 10);
  if (Number.isNaN(ms)) ms = DEFAULT_SETTINGS.holdMs;
  ms = Math.min(5000, Math.max(200, ms));

  const payload = {
    triggerCode: trigger.value,
    holdMs: ms,
    sheetPlatform: sheetPlatform.value,
  };

  chrome.storage.sync.set(payload, () => {
    status.textContent = t("options_saved");
    window.setTimeout(() => {
      status.textContent = "";
    }, 2000);
  });
}

function init() {
  if (DEV_CONFIG.lang) {
    fetch(chrome.runtime.getURL("_locales/" + DEV_CONFIG.lang + "/messages.json"))
      .then(function (r) { return r.json(); })
      .then(function (messages) {
        _messages = messages;
        load();
      });
  } else {
    load();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

document.getElementById("trigger").addEventListener("change", save);
document.getElementById("holdMs").addEventListener("change", save);
document.getElementById("sheetPlatform").addEventListener("change", save);
