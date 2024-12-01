/**
 * Copyright 2024 eglicky
 * @license Apache-2.0, see LICENSE for full text.
 */

//import libraries and stuff
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

//rpg class is the character builder element
export class RpgNew extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-new";
  }

  //properties of the character and the default character settings when a user logs on
  constructor() {
    super();
    this.title = "Design Your Character";
    //this builds the character seed which can be used to share character settings
    this.characterSettings = {
      seed: "1234567890",
      accessories: 0,
      base: 1,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 300, // Default character size
      name: "",
      fire: false,
      walking: false,
      circle: false,
      sunglasses: false,
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
        }
        .character-preview rpg-character {
          height: var(--character-size, 300px);
          width: var(--character-size, 300px);
          transition: height 0.3s ease, width 0.3s ease;
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
          color: white;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          cursor: pointer;
          background-color: #007bff; /* Blue background */
          color: white; /* White text */
          border: 1px solid #0056b3;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3; /* Darker blue on hover */
          border-color: #004085;
        }
        .character-name {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #fff;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <div class="character-name">${this.characterSettings.name}</div>
          <!-- This is the prevew of the character -->
          <rpg-character
            seed="${this.characterSettings.seed}"
            accessories="${this.characterSettings.accessories}"
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.sunglasses ? 1 : 0}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            ?fire="${this.characterSettings.fire}"
            ?walking="${this.characterSettings.walking}"
            ?circle="${this.characterSettings.circle}"
            style="height: ${this.characterSettings.size}px; width: ${this.characterSettings.size}px;"
          ></rpg-character>
          <p>Seed: ${this.characterSettings.seed}</p>
        </div>
        <!-- Character control settings and user buttons -->
        <div class="controls">
          <label for="characterStyle">Character Style:</label>
          <wired-input
            id="characterStyle"
            type="number"
            placeholder="Enter character style number"
            @input="${(e) =>
        this._updateSetting('accessories', parseInt(e.target.value) || 0)}"
          ></wired-input>

          <label for="characterNameInput">Character Name:</label>
          <wired-input
            id="characterNameInput"
            type="text"
            placeholder="Enter character name"
          ></wired-input>
          <button @click="${this._saveCharacterName}">Save Name</button>

          <label>Character Size:</label>
          <wired-slider
            value="${this.characterSettings.size}"
            min="100"
            max="600"
            @change="${(e) =>
        this._updateSetting('size', parseInt(e.detail.value))}"
          >
            Character Size: ${this.characterSettings.size}px
          </wired-slider>

          <wired-checkbox
            ?checked="${this.characterSettings.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
            >On Fire</wired-checkbox
          >
          <wired-checkbox
            ?checked="${this.characterSettings.sunglasses}"
            @change="${(e) =>
        this._updateSetting('sunglasses', e.target.checked)}"
            >Sunglasses</wired-checkbox
          >
          <wired-checkbox
            ?checked="${this.characterSettings.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
            >Walking</wired-checkbox
          >
          <button @click="${this._generateShareLink}">Generate Share Link</button>
        </div>
      </div>
    `;
  }

  _updateSetting(key, value) {
    if (key === "accessories" && isNaN(value)) {
      value = 0;
    }
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._updateSeed();
  }

  _updateSeed() {
    const {
      accessories,
      base,
      face,
      faceitem,
      hair,
      pants,
      shirt,
      skin,
    } = this.characterSettings;
    this.characterSettings.seed = `${accessories}${base}${face}${faceitem}${hair}${pants}${shirt}${skin}`;
  }

  _saveCharacterName() {
    const nameInput = this.shadowRoot.getElementById("characterNameInput");
    if (nameInput && nameInput.value.trim()) {
      this.characterSettings = { ...this.characterSettings, name: nameInput.value.trim() };
    }
  }

  _generateShareLink() {
    const baseUrl = window.location.href.split("?")[0];
    const query = new URLSearchParams(this.characterSettings).toString();
    const shareLink = `${baseUrl}?${query}`;
    navigator.clipboard.writeText(shareLink);
    alert(`Shareable link copied to clipboard: ${shareLink}`);
  }
}

customElements.define(RpgNew.tag, RpgNew);
