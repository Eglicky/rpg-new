/**
 * Copyright 2024 eglicky
 * @license Apache-2.0, see LICENSE for full text.
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RpgNew extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-new";
  }

  constructor() {
    super();
    this.title = "Design Your Character";
    this.characterSettings = {
      seed: "00000000",
      base: 0, // 0 for no hair, 1 for hair
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      eyeColor: 0,
      glasses: false,
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
    };
  }

  static get properties() {
    return {
      ...super.properties,
      characterSettings: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
        }
        .character-preview {
          flex: 1;
          min-width: 300px;
          text-align: center;
          position: relative;
        }
        .character-preview rpg-character {
          height: var(--character-size, 200px);
          width: var(--character-size, 200px);
          transition: height 0.3s ease, width 0.3s ease;
        }
        .seed-display {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.9rem;
          font-weight: bold;
          pointer-events: none;
        }
        .controls {
          flex: 1;
          min-width: 300px;
          text-align: left;
        }
        wired-input,
        wired-checkbox,
        wired-slider {
          display: block;
          margin-bottom: 15px;
          max-width: 300px;
        }
        label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: 1px solid #0056b3;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
          border-color: #004085;
        }
        .character-name {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #28a745;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          z-index: 1000;
        }
        .notification.show {
          opacity: 1;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <div class="seed-display">Seed: ${this.characterSettings.seed}</div>
          <div class="character-name">${this.characterSettings.name}</div>
          <rpg-character
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.faceitem}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            .fire="${this.characterSettings.fire}"
            .walking="${this.characterSettings.walking}"
            style="
              --character-size: ${this.characterSettings.size}px;
              --eye-color: hsl(${this.characterSettings.eyeColor}, 100%, 50%);
              --hat-color: hsl(${this.characterSettings.hatColor}, 100%, 50%);
            "
          ></rpg-character>
        </div>
        <div class="controls">
          <label for="characterNameInput">Character Name:</label>
          <wired-input
            id="characterNameInput"
            type="text"
            placeholder="Enter character name"
            @input="${(e) => this._updateSetting('name', e.target.value)}"
          ></wired-input>

          <label for="hairToggle">Hair:</label>
          <wired-checkbox
            id="hairToggle"
            ?checked="${this.characterSettings.base === 1}"
            @change="${(e) =>
              this._updateSetting('base', e.target.checked ? 1 : 0)}"
            >Has Hair</wired-checkbox
          >

          <label for="size">Character Size:</label>
          <wired-slider
            id="size"
            value="${this.characterSettings.size}"
            min="100"
            max="600"
            @change="${(e) => this._updateSetting('size', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="face">Face:</label>
          <wired-slider
            id="face"
            value="${this.characterSettings.face}"
            min="0"
            max="5"
            @change="${(e) => this._updateSetting('face', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="faceitem">Face Item:</label>
          <wired-slider
            id="faceitem"
            value="${this.characterSettings.faceitem}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('faceitem', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hair">Hair Style:</label>
          <wired-slider
            id="hair"
            value="${this.characterSettings.hair}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('hair', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="pants">Pants Style:</label>
          <wired-slider
            id="pants"
            value="${this.characterSettings.pants}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('pants', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="shirt">Shirt Style:</label>
          <wired-slider
            id="shirt"
            value="${this.characterSettings.shirt}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('shirt', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="skin">Skin Tone:</label>
          <wired-slider
            id="skin"
            value="${this.characterSettings.skin}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('skin', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="eyeColor">Eye Color:</label>
          <wired-slider
            id="eyeColor"
            value="${this.characterSettings.eyeColor}"
            min="0"
            max="360"
            @change="${(e) => this._updateSetting('eyeColor', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hatColor">Hat Color:</label>
          <wired-slider
            id="hatColor"
            value="${this.characterSettings.hatColor}"
            min="0"
            max="360"
            @change="${(e) => this._updateSetting('hatColor', parseInt(e.detail.value))}"
          ></wired-slider>

          <wired-checkbox
            ?checked="${this.characterSettings.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          >On Fire</wired-checkbox>

          <wired-checkbox
            ?checked="${this.characterSettings.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          >Walking</wired-checkbox>

          <button @click="${this._generateShareLink}">
            Generate Share Link
          </button>
        </div>
      </div>
      <div id="notification" class="notification"></div>
    `;
  }

  _generateSeed() {
    const { base, face, faceitem, hair, pants, shirt, skin } = this.characterSettings;
    this.characterSettings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}`;
  }

  _updateSetting(key, value) {
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._generateSeed();
  }

  _generateShareLink() {
    const baseUrl = window.location.href.split("?")[0];

    const params = new URLSearchParams(
      Object.entries(this.characterSettings).reduce((acc, [key, value]) => {
        acc[key] = typeof value === "boolean" ? (value ? "1" : "0") : value;
        return acc;
      }, {})
    ).toString();

    const shareLink = `${baseUrl}?${params}`;

    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

  _showNotification(message) {
    const notification = this.shadowRoot.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    params.forEach((value, key) => {
      if (key in this.characterSettings) {
        this.characterSettings = {
          ...this.characterSettings,
          [key]: isNaN(value)
            ? value === "1"
              ? true
              : value === "0"
              ? false
              : value
            : parseInt(value),
        };
      }
    });
    this._generateSeed();
    this.requestUpdate();
  }
}

customElements.define(RpgNew.tag, RpgNew);