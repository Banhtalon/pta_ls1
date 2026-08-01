import './styles.css';
import { COURSES, PUBLIC_BASE_URL, TOTAL_LESSONS, findCourse, findLesson } from './data/courses.js';

const app = document.querySelector('#app');
const routeFor = (path) => `#${path}`;
const pythonHomeUrl = window.CODEWAVE_PYTHON_URL || '../../';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) return { type: 'home' };
  if (parts[0] === 'progress' && parts.length === 1) return { type: 'progress' };
  if (parts.length === 1 && findCourse(parts[0])) return { type: 'course', courseId: parts[0] };
  if (parts.length === 2 && findCourse(parts[0])) return { type: 'lesson', courseId: parts[0], order: parts[1] };
  return { type: 'not-found' };
}

function renderHeader(route) {
  const activeId = route.courseId || (route.type === 'home' ? 'home' : route.type === 'progress' ? 'progress' : '');
  const links = [
    { id: 'python', label: 'Học Python', href: pythonHomeUrl },
    { id: 'home', label: 'Trang chủ', href: routeFor('/') },
    ...COURSES.map((course) => ({ id: course.id, label: course.name, href: routeFor(`/${course.id}`) })),
    { id: 'progress', label: 'Tiến độ', href: routeFor('/progress') }
  ];
  return `<header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="#/" aria-label="CodeWave Web - về trang chủ">
        <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
        <span>CodeWave</span><small>Web</small>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Điều hướng chính">
        ${links.map((link) => `<a class="nav-link${activeId === link.id ? ' is-active' : ''}" href="${link.href}"${activeId === link.id ? ' aria-current="page"' : ''}>${escapeHtml(link.label)}</a>`).join('')}
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `<footer class="site-footer"><div class="shell footer-inner">
    <div><strong>CodeWave Web</strong><p>Học lập trình web theo lộ trình rõ ràng, từng bước một.</p></div>
    <div class="footer-meta"><span>42 bài đang được chuẩn bị</span><span>© 2026 CodeWave Education</span></div>
  </div></footer>`;
}

function renderHome() {
  return `<main id="main-content">
    <section class="hero shell-wide">
      <img class="hero-image" src="${PUBLIC_BASE_URL}assets/ai/hero-web-learning.png" alt="Không gian học lập trình web với hai màn hình máy tính" />
      <div class="hero-scrim"></div>
      <div class="hero-copy shell">
        <p class="kicker">LỘ TRÌNH WEB DEVELOPER</p>
        <h1>Học lập trình web<br /><span>từ nền tảng đến sản phẩm</span></h1>
        <p class="hero-lede">Ba khóa học, một hành trình rõ ràng để bạn tự tin tạo ra những website hiện đại.</p>
        <a class="button button-light" href="#courses">Khám phá lộ trình <span aria-hidden="true">↓</span></a>
      </div>
    </section>
    <section id="courses" class="shell section courses-section" aria-labelledby="courses-title">
      <div class="section-heading"><div><p class="kicker kicker-dark">CHỌN LỘ TRÌNH CỦA BẠN</p><h2 id="courses-title">Ba khóa học, ba cấp độ</h2></div><p class="section-note">Tất cả bài học đang được chuẩn bị nội dung.</p></div>
      <div class="course-grid">${COURSES.map(renderCourseCard).join('')}</div>
    </section>
    <section class="shell section pathway" aria-labelledby="pathway-title">
      <div class="pathway-copy"><p class="kicker kicker-dark">HỌC THEO NHỊP CỦA BẠN</p><h2 id="pathway-title">Mỗi bước nhỏ tạo nên sản phẩm lớn.</h2><p>Chọn một khóa học để xem đủ 14 buổi. Khi nội dung được bổ sung, từng bài sẽ mở rộng thành lý thuyết, quiz và thực hành trong Code Lab.</p></div>
      <div class="pathway-stat"><strong>3</strong><span>khóa học</span><strong>42</strong><span>bài học</span></div>
    </section>
  </main>`;
}

function renderCourseCard(course) {
  const preview = course.lessons.slice(0, 3).map((lesson) => `<li><span aria-hidden="true">✓</span>${escapeHtml(lesson.title)}</li>`).join('');
  return `<article class="course-card accent-${course.accent}">
    <div class="course-card-top"><img src="${course.iconPath}" alt="${escapeHtml(course.iconAlt)}" /><div><p class="course-code">${escapeHtml(course.code)} · 14 BUỔI</p><h3>${escapeHtml(course.name)}</h3></div></div>
    <p class="course-eyebrow">${escapeHtml(course.eyebrow)}</p><p class="course-description">${escapeHtml(course.description)}</p>
    <ul class="lesson-preview">${preview}<li class="more-lessons">+ 11 bài học khác</li></ul>
    <div class="course-card-bottom"><span class="draft-progress">0/14 bài đã mở</span><a class="button button-accent" href="${routeFor(`/${course.id}`)}">Xem lộ trình <span aria-hidden="true">→</span></a></div>
  </article>`;
}

function renderCourse(course) {
  return `<main id="main-content" class="shell section course-page">
    <a class="back-link" href="#/">← Trang chủ</a>
    <div class="course-intro accent-${course.accent}"><div><p class="kicker kicker-dark">${escapeHtml(course.code)} · 14 BUỔI</p><h1>${escapeHtml(course.fullName)}</h1><p>${escapeHtml(course.description)}</p></div><img src="${course.iconPath}" alt="${escapeHtml(course.iconAlt)}" /></div>
    <div class="list-heading"><div><p class="kicker kicker-dark">LỘ TRÌNH CHI TIẾT</p><h2>14 buổi học</h2></div><span class="status-pill">Nội dung đang cập nhật</span></div>
    <div class="lesson-list">${course.lessons.map((lesson) => renderLessonCard(course, lesson)).join('')}</div>
  </main>`;
}

function renderLessonCard(course, lesson) {
  const needsTitle = lesson.titleNeedsConfirmation;
  return `<a class="lesson-card" href="${routeFor(`/${course.id}/${lesson.order}`)}">
    <span class="lesson-number">${String(lesson.order).padStart(2, '0')}</span><span class="lesson-main"><strong>${escapeHtml(lesson.title)}</strong><small>${needsTitle ? 'Tên bài cần xác nhận thêm' : 'Nội dung sẽ được bổ sung sau'}</small></span><span class="lesson-status${needsTitle ? ' status-warning' : ''}">${needsTitle ? 'Cần xác nhận' : 'Sắp cập nhật'} <span aria-hidden="true">→</span></span>
  </a>`;
}

function renderLesson(course, lesson) {
  const needsTitle = lesson.titleNeedsConfirmation;
  return `<main id="main-content" class="shell section lesson-page">
    <a class="back-link" href="#/${course.id}">← ${escapeHtml(course.name)}</a>
    <div class="lesson-shell-card accent-${course.accent}"><span class="lesson-number large">${String(lesson.order).padStart(2, '0')}</span><p class="kicker kicker-dark">${escapeHtml(course.code)} · BUỔI ${lesson.order}</p><h1>${escapeHtml(lesson.title)}</h1>
      <div class="coming-soon"><span class="coming-icon" aria-hidden="true">✦</span><div><h2>${needsTitle ? 'Đang chờ xác nhận tên bài' : 'Nội dung đang được chuẩn bị'}</h2><p>${needsTitle ? 'Teaching Guide hiện chưa xác nhận tiêu đề độc lập cho buổi này. Vui lòng bổ sung thông tin trước khi phát hành.' : 'Bài học, mục tiêu, quiz và phần thực hành sẽ xuất hiện tại đây sau khi tài liệu chính thức được cung cấp.'}</p></div></div>
      <a class="button button-accent" href="#/${course.id}">Quay lại lộ trình</a>
    </div>
  </main>`;
}

function renderProgress() {
  return `<main id="main-content" class="shell section progress-page"><p class="kicker kicker-dark">THEO DÕI HÀNH TRÌNH</p><h1>Tiến độ học tập</h1><p class="page-lede">Tiến độ cục bộ sẽ bắt đầu tính khi bài học được phát hành. Hiện chưa có bài published.</p><div class="progress-grid">${COURSES.map((course) => `<article class="progress-card accent-${course.accent}"><div class="progress-card-head"><img src="${course.iconPath}" alt="" /><div><h2>${escapeHtml(course.name)}</h2><span>${escapeHtml(course.code)}</span></div></div><div class="progress-track"><span style="width:0%"></span></div><div class="progress-values"><strong>0/14</strong><span>chưa có bài mở</span></div><a href="#/${course.id}">Xem lộ trình →</a></article>`).join('')}</div></main>`;
}

function renderNotFound() {
  return `<main id="main-content" class="shell section not-found"><span class="not-found-code">404</span><h1>Trang này chưa có trong lộ trình.</h1><p>Kiểm tra lại đường dẫn hoặc quay về trang chủ để chọn một khóa học.</p><a class="button button-accent" href="#/">Về trang chủ</a></main>`;
}

function bindInteractions() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
}

function render() {
  const route = parseRoute();
  let page = '';
  if (route.type === 'home') page = renderHome();
  if (route.type === 'course') page = renderCourse(findCourse(route.courseId));
  if (route.type === 'lesson') {
    const course = findCourse(route.courseId);
    const lesson = findLesson(route.courseId, route.order);
    page = course && lesson ? renderLesson(course, lesson) : renderNotFound();
  }
  if (route.type === 'progress') page = renderProgress();
  if (route.type === 'not-found') page = renderNotFound();
  app.innerHTML = `${renderHeader(route)}${page}${renderFooter()}`;
  bindInteractions();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', render);
render();

if (TOTAL_LESSONS !== 42) {
  console.error(`Course data contract mismatch: expected 42 lessons, received ${TOTAL_LESSONS}.`);
}
