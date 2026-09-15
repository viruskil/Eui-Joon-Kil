const translated = [...document.querySelectorAll('[data-en]')];
translated.forEach(el => { el.dataset.ko = el.innerHTML; });
const imageDescriptions = [...document.querySelectorAll('[data-alt-en]')];
imageDescriptions.forEach(el => { el.dataset.altKo = el.alt; });
const nav = document.getElementById('navigation');
const menu = document.getElementById('menu');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); updateMenuLabel(); }
function updateMenuLabel() { const en = document.documentElement.lang === 'en'; const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-label', en ? (open ? 'Close menu' : 'Open menu') : (open ? '메뉴 닫기' : '메뉴 열기')); }
function setLanguage(lang) {
  document.documentElement.lang = lang;
  translated.forEach(el => { el.innerHTML = el.dataset[lang]; });
  imageDescriptions.forEach(el => { el.alt = lang === 'en' ? el.dataset.altEn : el.dataset.altKo; });
  ['ko', 'en'].forEach(key => { const b = document.getElementById(key); b.classList.toggle('active', key === lang); b.setAttribute('aria-pressed', String(key === lang)); });
  nav.setAttribute('aria-label', lang === 'en' ? 'Main navigation' : '주요 메뉴');
  document.title = lang === 'en' ? 'Virology Lab | Eui-Joon Kil · GKNU' : '바이러스학연구실 | 길의준 교수 · 국립경국대학교';
  document.querySelector('meta[name="description"]').content = lang === 'en' ? 'Virology Lab at Gyeongkuk National University. Research on plant viruses, viromes, viral evolution, and pollinator health, led by Professor Eui-Joon Kil.' : '국립경국대학교 길의준 교수 바이러스학연구실. 식물바이러스, 바이롬, 바이러스 진화와 화분매개자 건강을 연구합니다.';
  try { localStorage.setItem('kil-lab-language', lang); } catch {}
  updateMenuLabel();
}
document.getElementById('ko').addEventListener('click', () => setLanguage('ko'));
document.getElementById('en').addEventListener('click', () => setLanguage('en'));
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); updateMenuLabel(); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
try { if (localStorage.getItem('kil-lab-language') === 'en') setLanguage('en'); } catch {}

/* Clickable international collaboration directory */
const countryProfiles = {
  kr: { name: { ko: '대한민국', en: 'South Korea' }, flag: '🇰🇷', collaborators: [
    { name: '길의준 (Eui-Joon Kil)', affiliation: { ko: '국립경국대학교 식물의학과', en: 'Department of Plant Medicals, Gyeongkuk National University' } },
    { name: '정철의 (Chuleui Jung)', affiliation: { ko: '국립경국대학교 농업과학기술연구소', en: 'Agriculture Science and Technology Research Institute, Gyeongkuk National University' } }
  ], source: { ko: '연구실 공식 프로필 및 논문 저자 소속', en: 'Laboratory profile and publication affiliations' } },
  it: { name: { ko: '이탈리아', en: 'Italy' }, flag: '🇮🇹', collaborators: [
    { name: 'Giuseppe Parrella', affiliation: { ko: '이탈리아 국가연구위원회(CNR) 지속가능 식물보호연구소(IPSP-CNR)', en: 'Institute for Sustainable Plant Protection (IPSP-CNR), Italy' } }
  ], source: { ko: '남부 이탈리아 식물바이러스 공동연구', en: 'Southern Italy plant-virus collaboration' } },
  jp: { name: { ko: '일본', en: 'Japan' }, flag: '🇯🇵', collaborators: [
    { name: '일본 공동연구자 정보', affiliation: { ko: '개별 연구자·소속을 입력해 주세요', en: 'Add individual collaborator and affiliation' } }
  ], source: { ko: '연구실 네트워크에 국가가 등록됨 · 개인 정보 입력 필요', en: 'Country is in the lab network · individual details needed' } },
  th: { name: { ko: '태국', en: 'Thailand' }, flag: '🇹🇭', collaborators: [
    { name: 'Terd Disayathanoowat', affiliation: { ko: '치앙마이대학교', en: 'Chiang Mai University' } }
  ], source: { ko: '치앙마이대학교 연구 교류', en: 'Chiang Mai University research exchange' } },
  bd: { name: { ko: '방글라데시', en: 'Bangladesh' }, flag: '🇧🇩', collaborators: [
    { name: 'Mst. Fatema Khatun', affiliation: { ko: '방가반두 셰이크 무지부르 라흐만 농업대학교(BSMRAU) 곤충학과', en: 'Department of Entomology, Bangabandhu Sheikh Mujibur Rahman Agricultural University (BSMRAU)' } },
    { name: 'Md. Motaher Hossain', affiliation: { ko: '방글라데시 협력 연구자 · 소속 확인 중', en: 'Bangladesh collaborator · affiliation to be confirmed' } }
  ], source: { ko: '콩 바이롬 및 화분매개자 연구 논문', en: 'Soybean virome and pollinator-health publications' } },
  pk: { name: { ko: '파키스탄', en: 'Pakistan' }, flag: '🇵🇰', collaborators: [
    { name: 'Aamir Lal', affiliation: { ko: '국립경국대학교 연구교수·박사후연구원', en: 'Research professor/postdoc, Gyeongkuk National University' } },
    { name: 'Muhammad Amir Qureshi', affiliation: { ko: '국립경국대학교 연구교수·박사후연구원', en: 'Research professor/postdoc, Gyeongkuk National University' } }
  ], source: { ko: '파키스탄 연계 식물바이러스 연구', en: 'Pakistan-linked plant-virus studies' } },
  id: { name: { ko: '인도네시아', en: 'Indonesia' }, flag: '🇮🇩', collaborators: [
    { name: '인도네시아 공동연구자 정보', affiliation: { ko: '개별 연구자·소속을 입력해 주세요', en: 'Add individual collaborator and affiliation' } }
  ], source: { ko: '연구실 네트워크에 국가가 등록됨 · 개인 정보 입력 필요', en: 'Country is in the lab network · individual details needed' } },
  vn: { name: { ko: '베트남', en: 'Vietnam' }, flag: '🇻🇳', collaborators: [
    { name: 'Dao Thi Hang', affiliation: { ko: '베트남 식물보호연구소(PPRI)', en: 'Plant Protection Research Institute (PPRI), Vietnam' } }
  ], source: { ko: '베트남 식물보호연구소 협력', en: 'Plant Protection Research Institute collaboration' } },
  tw: { name: { ko: '대만', en: 'Taiwan' }, flag: '🇹🇼', collaborators: [
    { name: 'Yi-Hsuan Li', affiliation: { ko: '국립중흥대학교', en: 'National Chung Hsing University' } },
    { name: 'Kai-Di Chen', affiliation: { ko: '국립대만대학교', en: 'National Taiwan University' } },
    { name: 'Chong-Yu Ko', affiliation: { ko: '아카데미아 시니카(Academia Sinica)', en: 'Academia Sinica' } }
  ], source: { ko: '대만 바이러스 연구 논문 저자 소속', en: 'Author affiliations in Taiwan virus research' } },
  np: { name: { ko: '네팔', en: 'Nepal' }, flag: '🇳🇵', collaborators: [
    { name: 'IMHSI Team', affiliation: { ko: '농업·산림대학교(AFU), Rampur, Chitwan · 네팔', en: 'Agriculture and Forestry University (AFU), Rampur, Chitwan, Nepal' } }
  ], source: { ko: '꿀벌 건강·바이롬 공동연구 네트워크', en: 'Honey-bee health and virome collaboration network' } },
  ir: { name: { ko: '이란', en: 'Iran' }, flag: '🇮🇷', collaborators: [
    { name: 'Prof. Akbar', affiliation: { ko: '테헤란대학교(카라지) 식물보호학과 식물바이러스학 부교수', en: 'Associate Professor of Plant Virology, Department of Plant Protection, University of Tehran (Karaj)' } },
    { name: 'Sajedeh Khalili', affiliation: { ko: '테헤란대학교 방문연구자', en: 'Visiting researcher, University of Tehran' } }
  ], source: { ko: '사프란 바이러스·감염성 클론 공동연구', en: 'Saffron-virus and infectious-clone collaboration' } }
};

const countryDetails = document.createElement('div');
countryDetails.id = 'country-details';
countryDetails.className = 'country-details';
countryDetails.hidden = true;
countryDetails.setAttribute('aria-live', 'polite');
countryDetails.innerHTML = '<div class="country-details-head"><div class="country-details-title-wrap"><span class="country-details-flag" aria-hidden="true"></span><div><p class="eyebrow country-details-eyebrow"></p><h3 id="country-details-title"></h3></div></div><button class="country-details-close" id="country-details-close" type="button"></button></div><p class="country-details-note" id="country-details-note"></p><ul class="country-details-list" id="country-details-list"></ul><p class="source-note" id="country-details-source"></p>';
const countryGrid = document.querySelector('.country-grid');
if (countryGrid) {
  const countryHint = document.createElement('p');
  countryHint.className = 'country-hint';
  countryHint.id = 'country-hint';
  countryGrid.before(countryHint);
  countryGrid.after(countryDetails);
  countryGrid.querySelectorAll('.country-chip').forEach((chip, index) => {
    const keys = ['kr', 'it', 'jp', 'th', 'bd', 'pk', 'id', 'vn', 'tw', 'np', 'ir'];
    const key = keys[index];
    if (!key || !countryProfiles[key]) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'country-chip';
    button.dataset.country = key;
    button.innerHTML = chip.innerHTML;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'country-details');
    chip.replaceWith(button);
  });
}

let activeCountry = null;
function countryText(value) { return typeof value === 'string' ? value : (document.documentElement.lang === 'en' ? value.en : value.ko); }
function updateCountryHint() {
  const hint = document.getElementById('country-hint');
  if (hint) hint.textContent = document.documentElement.lang === 'en' ? 'Select a country to view its collaborators and affiliations.' : '국가명을 클릭하면 공동연구자와 소속을 확인할 수 있습니다.';
}
function updateCountryChipLabels() {
  document.querySelectorAll('.country-chip').forEach(chip => {
    const profile = countryProfiles[chip.dataset.country];
    if (profile) chip.innerHTML = '<b aria-hidden="true">' + profile.flag + '</b> ' + countryText(profile.name);
  });
}
function renderCountry(key) {
  const profile = countryProfiles[key];
  if (!profile) return;
  activeCountry = key;
  const en = document.documentElement.lang === 'en';
  document.querySelectorAll('.country-chip').forEach(chip => chip.setAttribute('aria-expanded', String(chip.dataset.country === key)));
  countryDetails.querySelector('.country-details-flag').textContent = profile.flag;
  document.getElementById('country-details-title').textContent = countryText(profile.name);
  countryDetails.querySelector('.country-details-eyebrow').textContent = en ? 'Collaboration profile' : '공동연구 프로필';
  document.getElementById('country-details-note').textContent = en ? 'Collaborators and affiliations currently recorded for this country.' : '현재 등록된 공동연구자와 소속입니다.';
  document.getElementById('country-details-list').innerHTML = profile.collaborators.map(person => '<li><strong>' + person.name + '</strong><span>' + countryText(person.affiliation) + '</span></li>').join('');
  document.getElementById('country-details-source').textContent = countryText(profile.source);
  document.getElementById('country-details-close').textContent = en ? 'Close' : '닫기';
  document.getElementById('country-details-close').setAttribute('aria-label', en ? 'Close collaboration profile' : '공동연구 프로필 닫기');
  countryDetails.hidden = false;
}
document.querySelectorAll('.country-chip').forEach(chip => chip.addEventListener('click', () => renderCountry(chip.dataset.country)));
document.getElementById('country-details-close')?.addEventListener('click', () => {
  countryDetails.hidden = true;
  document.querySelectorAll('.country-chip').forEach(chip => chip.setAttribute('aria-expanded', 'false'));
});
updateCountryChipLabels();
updateCountryHint();
document.getElementById('ko')?.addEventListener('click', () => { updateCountryChipLabels(); updateCountryHint(); if (activeCountry) renderCountry(activeCountry); });
document.getElementById('en')?.addEventListener('click', () => { updateCountryChipLabels(); updateCountryHint(); if (activeCountry) renderCountry(activeCountry); });

/* Present the complete 16-member roster in one shared location. */
const combinedRosterGrid = document.querySelector('.members .member-profile-grid');
const featuredRoster = document.querySelector('.people .member-team');
if (combinedRosterGrid && featuredRoster) {
  const suppliedRoles = { '김다소': '연구원', '박지오': '연구원', '장소윤': '석사과정', '오기준': '석사과정' };
  featuredRoster.querySelectorAll('.member-profile').forEach(card => {
    const heading = card.querySelector('h3');
    const name = Object.keys(suppliedRoles).find(memberName => heading?.textContent.includes(memberName));
    const role = card.querySelector('.member-role');
    if (name && role) role.textContent = suppliedRoles[name];
    combinedRosterGrid.appendChild(card);
  });
  featuredRoster.remove();
  const rosterHeading = document.querySelector('.members .section-heading h2');
  const rosterIntro = document.querySelector('.members .section-heading > p');
  if (rosterHeading) {
    rosterHeading.dataset.ko = '함께 연구하는 사람들';
    rosterHeading.dataset.en = 'Our research team';
    rosterHeading.innerHTML = document.documentElement.lang === 'en' ? rosterHeading.dataset.en : rosterHeading.dataset.ko;
  }
  if (rosterIntro) {
    rosterIntro.dataset.ko = '연구교수·박사후연구원부터 대학원생·학부연구생까지 모든 구성원을 한 곳에서 소개합니다.';
    rosterIntro.dataset.en = 'Meet every member in one place, from research professors and doctoral researchers to master’s and undergraduate students.';
    rosterIntro.innerHTML = document.documentElement.lang === 'en' ? rosterIntro.dataset.en : rosterIntro.dataset.ko;
  }
}

/* Keep the complete lab roster visible and attach reference-based portraits. */
const referenceMemberImages = {
  '곽명환': { src: 'member-myeonghwan-kwak.jpg', alt: '곽명환의 참고 이미지 기반 프로필 사진' },
  '강정훈': { src: 'member-jeonghun-kang.jpg', alt: '강정훈의 참고 이미지 기반 프로필 사진' },
  '전지호': { src: 'member-jiho-jeon.jpg', alt: '전지호의 참고 이미지 기반 프로필 사진' },
  '권민혁': { src: 'member-minhyeok-kwon.jpg', alt: '권민혁의 참고 이미지 기반 프로필 사진' },
  '손만철': { src: 'member-mancheol-son.jpg', alt: '손만철의 참고 이미지 기반 프로필 사진' }
};
document.querySelectorAll('.members .member-profile').forEach(card => {
  const heading = card.querySelector('h3');
  const key = Object.keys(referenceMemberImages).find(name => heading?.textContent.includes(name));
  const slot = card.querySelector('.member-photo-slot');
  if (!key || !slot) return;
  const image = referenceMemberImages[key];
  slot.className = 'member-photo-frame';
  slot.removeAttribute('role');
  slot.removeAttribute('aria-label');
  slot.innerHTML = '<img src="' + image.src + '" width="320" height="320" alt="' + image.alt + '" loading="lazy"><span class="avatar-note">참고 이미지 기반</span>';
});

const completeRoster = [
  { name: 'Paradha Nonthijun', role: '박사과정', focus: '식물바이러스·바이롬 연구' },
  { name: '진석호', role: '학부연구생', focus: '식물의학 연구' },
  { name: '권순겸', role: '학부연구생', focus: '식물바이러스 연구' }
];
const rosterGrid = document.querySelector('.members .member-profile-grid');
if (rosterGrid) {
  completeRoster.forEach(member => {
    if ([...rosterGrid.querySelectorAll('h3')].some(h => h.textContent.trim() === member.name)) return;
    const card = document.createElement('article');
    card.className = 'member-profile';
    card.innerHTML = '<div class="member-photo-slot" role="img" aria-label="' + member.name + ' 사진 추가 공간"><span>사진 추가</span><small>Portrait</small></div><div class="member-info"><span class="member-role">' + member.role + '</span><h3>' + member.name + '</h3><dl><dt>이력</dt><dd>이력 입력 예정</dd><dt>연구 분야</dt><dd>' + member.focus + '</dd></dl></div>';
    rosterGrid.appendChild(card);
  });
}
