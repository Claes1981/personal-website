import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readPage, readJson } from "./helpers.js";

const site = readJson("_data/site.json");
const home = readPage("index.html");
const resume = readPage("resume/index.html");

describe("content — index", () => {
  it("displays site title in h1", () => {
    assert.match(home, new RegExp(`<h1>${site.title}</h1>`));
  });

  it("displays site description as tagline", () => {
    assert.match(home, new RegExp(`class="tagline">${site.description}`));
  });

  it("has Professional section with Resume link", () => {
    assert.match(home, /<h2>Professional<\/h2>/);
    assert.match(home, /<a href="\/resume\/">Resume<\/a>/);
  });

  it("has Personal section", () => {
    assert.match(home, /<h2>Personal<\/h2>/);
  });

  it("includes social links partial output", () => {
    assert.ok(home.includes(site.social.github));
    assert.ok(home.includes(site.social.linkedin));
    assert.ok(home.includes(`mailto:${site.social.email}`));
  });

  it("page title in <title> tag", () => {
    assert.match(home, new RegExp(`<title>Home - ${site.title}</title>`));
  });
});

describe("content — resume", () => {
  it("displays site title in h1", () => {
    assert.match(resume, new RegExp(`<h1>${site.title}</h1>`));
  });

  it("has all major sections", () => {
    assert.match(resume, /<h2>Professional Summary<\/h2>/);
    assert.match(resume, /<h2>Education<\/h2>/);
    assert.match(resume, /<h2>Work Experience<\/h2>/);
    assert.match(resume, /<h2>Technical Skills<\/h2>/);
    assert.match(resume, /<h2>Personal Projects<\/h2>/);
    assert.match(resume, /<h2>Languages<\/h2>/);
  });

  it("has internship notice", () => {
    assert.match(resume, /internship-notice/);
    assert.match(resume, /January 2027.*June 2027/);
  });

  it("links to education program page", () => {
    assert.match(
      resume,
      /<a\s+href="https:\/\/www\.molndal\.se\/campus-molndal\/utbildningar\/yrkeshogskola\/it-utbildningar\/cloud-developer\.html"/,
    );
  });

  it("has Selected Work section with broadcast links", () => {
    assert.match(resume, /<h4>Selected Work:<\/h4>/);
    assert.match(resume, /Rilton Cup/);
    assert.match(resume, /Jönköping Chess Festival/);
    assert.match(resume, /Tepe Sigeman & Co/);
    assert.match(resume, /West Coast Chess Open/);
    assert.match(resume, /Damallsvenskan/);
  });

  it("includes social links partial output", () => {
    assert.ok(resume.includes(site.social.github));
    assert.ok(resume.includes(site.social.linkedin));
    assert.ok(resume.includes(`mailto:${site.social.email}`));
  });

  it("has link back to home page", () => {
    assert.match(resume, /<a href="\/">Home<\/a>/);
  });

  it("page title in <title> tag", () => {
    assert.match(resume, new RegExp(`<title>Resume - ${site.title}</title>`));
  });
});

describe("content — social links consistency", () => {
  it("GitHub URL matches site.json", () => {
    assert.ok(home.includes(site.social.github));
    assert.ok(resume.includes(site.social.github));
  });

  it("LinkedIn URL matches site.json", () => {
    assert.ok(home.includes(site.social.linkedin));
    assert.ok(resume.includes(site.social.linkedin));
  });

  it("Email matches site.json", () => {
    assert.ok(home.includes(`mailto:${site.social.email}`));
    assert.ok(resume.includes(`mailto:${site.social.email}`));
  });
});
