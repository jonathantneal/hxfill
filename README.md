# hxfill [<img src="https://resources.whatwg.org/logo-dom.svg" alt="DOM Logo" width="90" height="90" align="right">][hxfill]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]

[hxfill] lets you give contextual levels to headings in HTML.

Try it in your browser right now at [CodePen].

```html
<!-- before -->
<body>
<h3>This is a top level heading</h3>
<p>...</p>
<section>
  <p>...</p>
  <h1>This is a second-level heading</h1>
  <p>...</p>
  <h2>This is another second-level heading</h2>
  <p>...</p>
</section>
<section>
  <p>...</p>
  <h3>This is another second-level heading</h3>
  <p>...</p>
  <section>
    <h2>This is a third-level heading</h2>
    <p>...</p>
  </section>
</section>
</body>

<!-- after -->
<body>
<h3 aria-level="1">This is a top level heading</h3>
<p>...</p>
<section>
  <p>...</p>
  <h1 aria-level="2">This is a second-level heading</h1>
  <p>...</p>
  <h2 aria-level="2">This is another second-level heading</h2>
  <p>...</p>
</section>
<section>
  <p>...</p>
  <h3 aria-level="2">This is another second-level heading</h3>
  <p>...</p>
  <section>
    <h2 aria-level="3">This is a third-level heading</h2>
    <p>...</p>
  </section>
</section>
</body>
```

## Usage

Install [hxfill] to your project.

```sh
npm install jonathantneal/hxfill
```

Import [hxfill] as a resource.

```js
import hxfill from 'hxfill';
```

Use the `hxfill` method to watch the document for contextual headings and assign them the appropriate `role` and `aria-level`.

```js
hxfill(document);
```

## API

```js
hxfill(document)
```

Watches the document for contextual headings and assigns them the appropriate
`aria-level`.

- `document`: document being observed (default is `window.document`).

---

## FAQ

#### Why are different-leveled headings in the same section getting the same level?

[hxfill] only assigns contextual levels according by sectioning container. This
means an `<h2>` and an `<h3>` in same `<section>` receive the same level. This
means the implicit sectioning of headings is lost. This is because it’s unclear
how implicit sectioning works in relationship with explicit sectioning.

Consider the following markup following the document outline:

```html
<h1>This is a top-level H1 heading</h1>
  <p>This is some content elaborating on the H1</p>
  <h2>And this is a slightly lesser H2 heading</h2>
    <p>And this is some content elaborating on the H2</p>
    <aside>
      <h3>And this is an H3 heading probably the same level as the H2</h3>
      <p>Because the aside element ended the implicit section of the H2</p>
    </aside>
    <p>This content either elaborates on the H2, begins a new implicit section, or means nothing</p>
```

---

[npm-url]: https://www.npmjs.com/package/hxfill
[npm-img]: https://img.shields.io/npm/v/hxfill.svg
[cli-url]: https://travis-ci.org/jonathantneal/hxfill
[cli-img]: https://img.shields.io/travis/jonathantneal/hxfill.svg
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/npm/l/hxfill.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg

[CodePen]: http://codepen.io/pen?template=RpoBJN
[h element specification]: https://jonathantneal.github.io/h-element-spec/
[hxfill]: https://github.com/jonathantneal/hxfill
[posthtml-hxfill]: https://github.com/jonathantneal/posthtml-hxfill
