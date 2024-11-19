import { html, fixture, expect } from '@open-wc/testing';
import "../rpg-new.js";

describe("RpgNew test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <rpg-new
        title="title"
      ></rpg-new>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
