<script setup lang="ts">
import enamad from "~/assets/img/enamad.png";
import samandehi from "~/assets/img/samandehi.png";
import FooterIcon from "./FooterIcon.vue";

interface FooterLink {
  label: string;
  accent?: boolean;
}

const quickLinks: FooterLink[] = [
  { label: "درباره ما", accent: true },
  { label: "بلاگ" },
  { label: "تماس با ما" },
  { label: "خدمات پس از فروش" },
];

const guideLinks: FooterLink[] = [
  { label: "قوانین و مقررات" },
  { label: "دریافت مشاوره" },
  { label: "انتقادات و پیشنهادات" },
];

const socialLinks = [
  { label: "تلگرام", icon: "telegram" as const },
  { label: "اینستاگرام", icon: "instagram" as const },
  { label: "لینکدین", icon: "linkedin" as const },
];

const socialRow = [
  { label: "تلگرام", icon: "telegram" as const },
  { label: "اینستاگرام", icon: "instagram" as const },
  { label: "توییتر", icon: "twitter" as const },
  { label: "یوتیوب", icon: "youtube" as const },
  { label: "لینکدین", icon: "linkedin" as const },
];

const badges = [
  { src: enamad, alt: "نماد اعتماد الکترونیکی" },
  { src: samandehi, alt: "ساماندهی" },
];

function stay(event: Event) {
  event.preventDefault();
}
</script>

<template>
  <footer class="footer">
    <div class="footer__panel">
      <div class="shell footer__layout">
        <p class="footer__hours">هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم</p>

        <div class="footer__columns">
          <section class="footer__col" aria-labelledby="footer-quick">
            <h2 id="footer-quick">دسترسی سریع</h2>
            <ul>
              <li v-for="link in quickLinks" :key="link.label">
                <a href="#" :class="{ 'is-accent': link.accent }" @click="stay">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>

          <section class="footer__col" aria-labelledby="footer-guide">
            <h2 id="footer-guide">راهنمای سایت</h2>
            <ul>
              <li v-for="link in guideLinks" :key="link.label">
                <a href="#" @click="stay">{{ link.label }}</a>
              </li>
            </ul>
          </section>

          <section
            class="footer__col footer__col--social"
            aria-labelledby="footer-social"
          >
            <h2 id="footer-social">شبکه‌های اجتماعی</h2>
            <ul>
              <li v-for="link in socialLinks" :key="link.label">
                <a class="social-link" href="#" @click="stay">
                  <FooterIcon :name="link.icon" />
                  <span class="social-link__label">{{ link.label }}</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <div class="shell">
      <div class="footer__legal">
        <div class="footer__badges">
          <img
            v-for="badge in badges"
            :key="badge.alt"
            class="footer__badge"
            :src="badge.src"
            :alt="badge.alt"
          />
        </div>

        <div class="footer__meta">
          <p>
            تمامی حقوق مادی و معنوی این وبسایت متعلق به می‌باشد و هر گونه کپی
            برداری پیگرد قانونی دارد.
          </p>
          <ul class="footer__row" aria-label="شبکه‌های اجتماعی">
            <li v-for="item in socialRow" :key="item.label">
              <a href="#" :aria-label="item.label" @click="stay">
                <FooterIcon :name="item.icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 8px 0 36px;
  color: var(--color-navy);
}

.footer__panel {
  width: 100%;
  padding: 28px 0 32px;
  border-radius: 1rem 1rem 0 0;
  background: var(--color-surface);
}

.footer__layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.footer__columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px 20px;
}

.footer__col h2 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}

.footer__col ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__col a {
  color: #7d879c;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  text-decoration: none;
}

.footer__col a.is-accent {
  color: var(--color-pink);
  font-weight: 500;
}

.footer__col a:hover {
  color: var(--color-pink);
}

.footer__col a:focus-visible,
.footer__row a:focus-visible {
  outline: 2px solid var(--color-pink);
  outline-offset: 3px;
}

.footer__col--social {
  flex: 1 0 100%;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #7d879c;
}

.social-link :deep(.icon) {
  background: #6783a0;
  color: #fff;
  width: 32px;
  height: 32px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.footer__hours {
  display: none;
  margin: 0;
  max-width: 18rem;
  color: #8b93a7;
  font-size: 14px;
  line-height: 1.9;
}

.footer__legal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding-top: 28px;
}

.footer__badges {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  order: 2;
  direction: ltr;
}

.footer__badge {
  width: 78px;
  height: 78px;
  object-fit: contain;
  border: 1px solid #e7ecf6;
  border-radius: 8px;
  background: #fff;
}

.footer__meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  order: 1;
  text-align: center;
}

.footer__meta p {
  margin: 0;
  max-width: 26rem;
  color: #8b93a7;
  font-size: 13px;
  line-height: 1.9;
}

.footer__row {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__row a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-pink);
  color: #fff;
}

.footer__row a:hover {
  background: var(--color-pink-dark);
}

.footer__row :deep(.icon) {
  width: 16px;
  height: 16px;
}

@media (min-width: 768px) {
  .footer__panel {
    padding: 36px 0 40px;
  }

  .footer__hours {
    display: block;
    max-width: none;
  }

  .footer__layout {
    align-items: stretch;
    gap: 28px;
  }

  .footer__columns {
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 20px;
  }

  .footer__col {
    flex: 1 1 0;
    min-width: 0;
  }

  .footer__col--social {
    flex: 1 1 0;
  }
}

@media (min-width: 1100px) {
  .footer__layout {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  .footer__columns {
    width: auto;
    flex: 1 1 auto;
    justify-content: flex-end;
    gap: 56px;
  }

  .footer__col,
  .footer__col--social {
    flex: 0 0 auto;
  }

  .footer__hours {
    display: block;
    flex: 0 0 auto;
    max-width: 18rem;
  }

  .footer__legal {
    position: relative;
    justify-content: center;
    min-height: 108px;
    padding-top: 32px;
  }

  .footer__badges {
    position: absolute;
    top: 50%;
    left: 0;
    order: 0;
    transform: translateY(-40%);
  }
}
</style>
