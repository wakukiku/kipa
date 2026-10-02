import { useState } from "react";
import {
  useShop,
  useCatalog,
  Loading,
  CartButton,
  ShopOverlays,
  Footer,
  Filters,
  EmptyResults,
  Image,
  money,
} from "./core";
import { paletteFor } from "./domain.mjs";
export default function App() {
  const shop = useShop("kipa");
  const filter = useCatalog(shop.catalog?.products || []);
  const [color, setColor] = useState("#dc7b94");
  if (!shop.catalog) return <Loading shop={shop} />;
  const products = shop.catalog.products;
  const paints = paletteFor(color, products);
  return (
    <div id="top">
      <a href="#catalog" className="skip">
        К материалам
      </a>
      <header>
        <a className="wordmark" href="#top">
          кипа<span>для тех, кто создаёт</span>
        </a>
        <nav>
          <a href="#catalog">Материалы</a>
          <a href="#palette">Палитра</a>
        </nav>
        <CartButton shop={shop}>Мои находки</CartButton>
      </header>
      <main>
        <section className="creative-board">
          <div className="intro">
            <span className="small-label">
              МАГАЗИН ХУДОЖЕСТВЕННЫХ МАТЕРИАЛОВ
            </span>
            <h1>
              Какого цвета
              <br />
              ваша <em>идея?</em>
            </h1>
            <p>
              Не ждите вдохновения.
              <br />
              Начните с любимого цвета.
            </p>
            <a href="#catalog" className="primary">
              Давайте творить <span>✳</span>
            </a>
          </div>
          <div className="studio-photo">
            <img
              src="assets/hero.jpg"
              alt="Кисти и инструменты в мастерской художника"
            />
            <span className="photo-caption">
              У хороших идей бывают
              <br />
              испачканные руки.
            </span>
            <div className="color-tabs" aria-label="Три цвета сезона">
              <i style={{ background: "#e76952" }} />
              <i style={{ background: "#ebce63" }} />
              <i style={{ background: "#293cbb" }} />
            </div>
          </div>
        </section>
        <section className="palette-lab" id="palette">
          <div className="palette-heading">
            <span className="small-label">ЦВЕТОВАЯ МАСТЕРСКАЯ</span>
            <h2>
              Один цвет.
              <br />
              Ваша палитра.
            </h2>
            <p>Выберите оттенок — найдём три близкие краски из каталога.</p>
          </div>
          <div className="color-picker">
            <label htmlFor="color">Ваш отправной цвет</label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <output>{color.toUpperCase()}</output>
            <div className="color-presets">
              {["#dc7b94", "#465dc6", "#eab935", "#79a5a0"].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={`Выбрать цвет ${c}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
          <div className="palette-result">
            <div className="swatches">
              {paints.map((p) => (
                <div key={p.id}>
                  <span style={{ background: p.hex }} />
                  <b>{p.name}</b>
                </div>
              ))}
            </div>
            <button className="primary" onClick={() => shop.addSet(paints)}>
              Всю палитру · {money(paints.reduce((s, p) => s + p.price, 0))}{" "}
              <span>+</span>
            </button>
            <small>Подбор по цвету. Не рецепт смешивания.</small>
          </div>
        </section>
        <section className="catalog" id="catalog">
          <div className="section-heading">
            <h2>Хочется попробовать всё.</h2>
            <span>Выбирайте руками. И сердцем.</span>
          </div>
          <Filters state={filter} />
          <div className="products">
            {filter.filtered.map((p, i) => (
              <article
                key={p.id}
                className={p.hex ? "paint-card" : "tool-card"}
              >
                <button
                  className="product-visual"
                  onClick={() => shop.setDetail(p)}
                  aria-label={`Подробнее: ${p.name}`}
                >
                  {p.hex ? (
                    <div className="pigment" style={{ background: p.hex }}>
                      <span>КИПА / АКРИЛ</span>
                      <strong>{p.name}</strong>
                      <small>60 мл · профессиональная серия</small>
                    </div>
                  ) : (
                    <Image p={p} />
                  )}
                </button>
                <div className="product-info">
                  <span className="product-code">
                    № {String(i + 1).padStart(2, "0")}
                  </span>
                  <button
                    className="product-name"
                    onClick={() => shop.setDetail(p)}
                  >
                    {p.name}
                  </button>
                  <p>{p.subtitle}</p>
                  <div className="buy-row">
                    <strong>{money(p.price)}</strong>
                    <button
                      aria-label={`Добавить ${p.name}`}
                      onClick={() => shop.add(p)}
                    >
                      Беру! +
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {!filter.filtered.length && <EmptyResults />}
          </div>
        </section>
        <div className="closing-note">
          <span>✳</span>
          <p>
            Не идеально.
            <br />
            Зато <em>по-вашему.</em>
          </p>
          <a href="#palette">Найти свой цвет ↗</a>
        </div>
      </main>
      <Footer shop={shop} />
      <ShopOverlays shop={shop} />
    </div>
  );
}
