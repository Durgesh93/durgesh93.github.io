(() => {
  const SQL_JS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.14.2/';
  const target = document.querySelector('[data-database-content]');
  const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  function query(db, sql) {
    const result = db.exec(sql)[0];
    if (!result) return [];
    return result.values.map((values) => Object.fromEntries(result.columns.map((column, index) => [column, values[index]])));
  }

  const highlightName = (authors) => escapeHtml(authors)
    .replaceAll('Durgesh Kumar Singh', '<strong>Durgesh Kumar Singh</strong>')
    .replaceAll('Durgesh K. Singh', '<strong>Durgesh K. Singh</strong>')
    .replaceAll('Durgesh Singh', '<strong>Durgesh Singh</strong>');

  function getSkillGroups(db) {
    const groups = query(db, 'SELECT * FROM skill_groups ORDER BY sort_order');
    const skills = query(db, 'SELECT * FROM skills ORDER BY group_id, sort_order');
    return groups.map((group) => ({ ...group, skills: skills.filter((skill) => skill.group_id === group.id) }));
  }

  function deriveCompetencies(interests, experience, publications, skillGroups) {
    const researchPapers = publications.filter((item) => !item.venue.startsWith('Doctoral thesis'));
    const interestNames = interests.slice(0, 3).map((item) => item.name.toLowerCase());
    const embedded = skillGroups.find((group) => group.name.includes('Embedded'))?.skills.map((skill) => skill.name) || [];
    const industryRole = experience.find((item) => item.organization.includes('Tata Consultancy Services'));
    return [
      `Specialized in ${interestNames.join(', ')}, with a focus on label-efficient learning for echocardiography.`,
      `Author of ${researchPapers.length} selected peer-reviewed publications across leading machine learning and computer vision venues.`,
      industryRole ? `Over four years of software and data experience across healthcare, retail, and banking domains.` : `Experience spanning academic research and applied software systems.`,
      `Practical experience in data analytics and automation, including ${embedded.slice(0, 3).join(', ')}.`
    ];
  }

  function renderHome(db) {
    const profile = query(db, 'SELECT * FROM profile WHERE id = 1')[0];
    const interests = query(db, 'SELECT * FROM interests ORDER BY sort_order');
    const experience = query(db, 'SELECT * FROM experience ORDER BY sort_order');
    return `<section class="home-grid" aria-labelledby="hero-title">
      <div><p class="eyebrow">${escapeHtml(profile.role)} · ${escapeHtml(profile.institution)}</p><h1 id="hero-title">${escapeHtml(profile.name)}</h1><p class="lede">${escapeHtml(profile.intro)}</p><div class="actions"><button class="button secondary" type="button" data-contact-open>Contact me</button></div></div>
      <div class="portrait-frame"><img class="portrait" src="${escapeHtml(profile.portrait)}" alt="Portrait of ${escapeHtml(profile.name)}" width="479" height="541"><span class="location">${escapeHtml(profile.location)}</span></div>
    </section>
    <dialog class="contact-dialog" data-contact-dialog aria-labelledby="contact-title"><div class="contact-dialog-head"><div><p class="eyebrow">Get in touch</p><h2 id="contact-title">Choose an inbox.</h2></div><button class="contact-close" type="button" data-contact-close aria-label="Close contact dialog">×</button></div><p class="contact-intro">For university and research matters, use my office address. For everything else, use my personal inbox.</p><div class="contact-options"><article><span>Office</span><h3>${escapeHtml(profile.office_email)}</h3><p>Research, collaboration, and University of Oslo.</p><div><a href="mailto:${escapeHtml(profile.office_email)}">Write email ↗</a><button type="button" data-copy-email="${escapeHtml(profile.office_email)}">Copy</button></div></article><article><span>Personal</span><h3>${escapeHtml(profile.personal_email)}</h3><p>General messages and personal correspondence.</p><div><a href="mailto:${escapeHtml(profile.personal_email)}">Write email ↗</a><button type="button" data-copy-email="${escapeHtml(profile.personal_email)}">Copy</button></div></article></div><p class="copy-status" data-copy-status aria-live="polite"></p></dialog>
    <section class="desktop-section split" aria-labelledby="about-title"><div><p class="eyebrow">About</p><h2 id="about-title">Research with real-world reach.</h2></div><div class="body-copy"><p>${escapeHtml(profile.about_one)}</p><p>${escapeHtml(profile.about_two)}</p><ul class="tag-list" aria-label="Research interests">${interests.map((item) => `<li class="tag">${escapeHtml(item.name)}</li>`).join('')}</ul></div></section>
    <section class="desktop-section split" aria-labelledby="experience-title"><div><p class="eyebrow">Experience</p><h2 id="experience-title">Research and industry.</h2></div><ol class="timeline">${experience.map((item) => `<li class="timeline-item"><p class="timeline-date">${escapeHtml(item.period)}</p><div><h3>${escapeHtml(item.title)}</h3><p class="timeline-organization">${escapeHtml(item.organization)}</p><p class="timeline-description">${escapeHtml(item.description)}</p></div></li>`).join('')}</ol></section>`;
  }

  function renderPublications(db) {
    const publications = query(db, 'SELECT * FROM publications ORDER BY sort_order');
    const stories = publications.map((item) => `<article class="research-story">
      <figure class="concept-figure"><img src="${escapeHtml(item.figure_path)}" alt="${escapeHtml(item.figure_alt)}" loading="lazy"><figcaption>${escapeHtml(item.figure_caption)}</figcaption></figure>
      <div class="story-copy"><p class="eyebrow">${escapeHtml(item.year)} · ${escapeHtml(item.venue)}</p><h2>${escapeHtml(item.title)}</h2><p class="publication-meta">${highlightName(item.authors)}</p><div class="story-section"><h3>The problem</h3><p>${escapeHtml(item.summary)}</p></div><div class="story-section"><h3>What we did</h3><p>${escapeHtml(item.contribution)}</p></div><div class="publication-links"><a class="button" href="${escapeHtml(item.paper_url)}">Read paper ↗</a>${item.code_url ? `<a class="button secondary" href="${escapeHtml(item.code_url)}">View code ↗</a>` : ''}${item.secondary_url ? `<a href="${escapeHtml(item.secondary_url)}">${escapeHtml(item.secondary_label)} ↗</a>` : ''}</div></div>
    </article>`).join('');
    return `<header class="page-heading"><p class="eyebrow">Publications</p><h1>Research, explained.</h1><p class="lede">A visual overview of the problems behind my papers, the central idea in each contribution, and where to read the full work.</p></header><section class="research-stories" aria-label="Publication stories">${stories}</section>`;
  }

  function renderProjects(db) {
    const projects = query(db, 'SELECT * FROM projects ORDER BY sort_order');
    const rows = projects.map((item, index) => {
      const tags = item.technology.split('·').map((tag) => `<span>${escapeHtml(tag.trim())}</span>`).join('');
      return `<article class="project-row"><div class="project-index">${String(index + 1).padStart(2, '0')}</div><div class="project-summary"><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p><div class="project-tags">${tags}</div></div><a class="project-action" href="${escapeHtml(item.repo_url)}"><span>View branch</span><span aria-hidden="true">↗</span></a></article>`;
    }).join('');
    return `<header class="page-heading project-heading"><p class="eyebrow">Hobby projects</p><h1>Code, curiosity, and small experiments.</h1><p class="lede">A project index for the ideas I explore outside my publication record. All of them now live in a single GitHub repository, <a href="https://github.com/Durgesh93/ml_projects">ml_projects</a>, with one branch per project.</p><div class="actions"><a class="button" href="https://github.com/Durgesh93/ml_projects">Browse ml_projects on GitHub ↗</a></div></header><section class="project-index-list">${rows}</section>`;
  }

  function renderCredentials(db) {
    const education = query(db, 'SELECT * FROM education ORDER BY sort_order');
    const interests = query(db, 'SELECT * FROM interests ORDER BY sort_order');
    const experience = query(db, 'SELECT * FROM experience ORDER BY sort_order');
    const publications = query(db, 'SELECT * FROM publications ORDER BY sort_order');
    const skillGroups = getSkillGroups(db);
    const competencies = deriveCompetencies(interests, experience, publications, skillGroups);
    return `<header class="page-heading credentials-heading"><p class="eyebrow">Education &amp; skills</p><h1>Training, tools, and practice.</h1><p class="lede">Academic foundations and the technical toolkit behind my research and engineering work.</p></header>
      <section class="credentials-section" aria-labelledby="competencies-title"><div><p class="eyebrow">Key competencies</p><h2 id="competencies-title">What I bring.</h2></div><ol class="competency-list">${competencies.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol></section>
      <section class="credentials-section" aria-labelledby="education-title"><div><p class="eyebrow">Education</p><h2 id="education-title">Academic background.</h2></div><div class="education-list">${education.map((item) => `<article class="education-item"><p class="education-date">${escapeHtml(item.period)}</p><div><h3>${escapeHtml(item.degree)}</h3><p>${escapeHtml(item.institution)}</p><span>${escapeHtml(item.location)}${item.detail ? ` · ${escapeHtml(item.detail)}` : ''}</span></div></article>`).join('')}</div></section>
      <section class="credentials-section skills-section" aria-labelledby="skills-title"><div><p class="eyebrow">Skills</p><h2 id="skills-title">Technical toolkit.</h2></div><div class="skill-groups">${skillGroups.map((group) => `<article class="skill-group"><h3>${escapeHtml(group.name)}</h3><ul>${group.skills.map((skill) => `<li>${escapeHtml(skill.name)}</li>`).join('')}</ul></article>`).join('')}</div></section>`;
  }

  function renderResume(db) {
    const profile = query(db, 'SELECT * FROM profile WHERE id = 1')[0];
    const interests = query(db, 'SELECT * FROM interests ORDER BY sort_order');
    const experience = query(db, 'SELECT * FROM experience ORDER BY sort_order');
    const education = query(db, 'SELECT * FROM education ORDER BY sort_order');
    const publications = query(db, 'SELECT * FROM publications ORDER BY sort_order');
    const links = query(db, 'SELECT * FROM links ORDER BY sort_order');
    const skillGroups = getSkillGroups(db);
    const competencies = deriveCompetencies(interests, experience, publications, skillGroups);
    document.title = `${profile.name} · Résumé`;
    return `<div class="resume-toolbar"><a href="index.html">← Back to site</a><button class="button" type="button" data-print-resume>Save as PDF</button></div><article class="resume-page">
      <header class="resume-header"><div><p class="resume-kicker">Curriculum Vitae</p><h1>${escapeHtml(profile.name)}</h1><p>${escapeHtml(profile.role)} · ${escapeHtml(profile.institution)}</p></div><address><a href="mailto:${escapeHtml(profile.office_email)}">Office: ${escapeHtml(profile.office_email)}</a><a href="mailto:${escapeHtml(profile.personal_email)}">Personal: ${escapeHtml(profile.personal_email)}</a><span>${escapeHtml(profile.location)}</span>${links.slice(0, 2).map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join('')}</address></header>
      <section class="resume-section"><h2>Profile</h2><div><p>${escapeHtml(profile.about_one)}</p><p>${escapeHtml(profile.about_two)}</p><p class="resume-tags">${interests.map((item) => escapeHtml(item.name)).join(' · ')}</p></div></section>
      <section class="resume-section"><h2>Key competencies</h2><ul class="resume-competencies">${competencies.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
      <section class="resume-section"><h2>Experience</h2><div class="resume-list">${experience.map((item) => `<article><p class="resume-date">${escapeHtml(item.period)}</p><div><h3>${escapeHtml(item.title)}</h3><p class="resume-organization">${escapeHtml(item.organization)}</p><p class="resume-description">${escapeHtml(item.description)}</p></div></article>`).join('')}</div></section>
      <section class="resume-section"><h2>Education</h2><div class="resume-list">${education.map((item) => `<article><p class="resume-date">${escapeHtml(item.period)}</p><div><h3>${escapeHtml(item.degree)}</h3><p class="resume-organization">${escapeHtml(item.institution)} · ${escapeHtml(item.location)}</p>${item.detail ? `<p class="resume-description">${escapeHtml(item.detail)}</p>` : ''}</div></article>`).join('')}</div></section>
      <section class="resume-section"><h2>Skills</h2><div class="resume-skill-groups">${skillGroups.map((group) => `<p><strong>${escapeHtml(group.name)}:</strong> ${group.skills.map((skill) => escapeHtml(skill.name)).join(' · ')}</p>`).join('')}</div></section>
      <section class="resume-section"><h2>Selected publications</h2><div class="resume-publications">${publications.map((item) => `<article><p class="resume-date">${escapeHtml(item.year)}</p><div><h3><a href="${escapeHtml(item.paper_url)}">${escapeHtml(item.title)}</a></h3><p>${highlightName(item.authors)}</p><p>${escapeHtml(item.venue)}</p></div></article>`).join('')}</div></section>
    </article>`;
  }

  function updateSharedContent(db) {
    const profile = query(db, 'SELECT * FROM profile WHERE id = 1')[0];
    const links = query(db, 'SELECT * FROM links ORDER BY sort_order LIMIT 2');
    document.querySelectorAll('[data-profile-name]').forEach((element) => { element.textContent = profile.name; });
    document.querySelectorAll('[data-profile-mark]').forEach((element) => { element.textContent = profile.short_name; });
    const copyright = document.querySelector('[data-copyright]');
    if (copyright) copyright.textContent = `© ${new Date().getFullYear()} ${profile.name}`;
    const footerLinks = document.querySelector('[data-footer-links]');
    if (footerLinks) footerLinks.innerHTML = links.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join('');
  }

  async function load() {
    if (!target) return;
    try {
      const [SQL, response] = await Promise.all([window.initSqlJs({ locateFile: (file) => `${SQL_JS_CDN}${file}` }), fetch('data/site.db', { cache: 'no-cache' })]);
      if (!response.ok) throw new Error(`Database request failed (${response.status})`);
      const db = new SQL.Database(new Uint8Array(await response.arrayBuffer()));
      updateSharedContent(db);
      const page = document.body.dataset.page;
      const renderers = { home: renderHome, publications: renderPublications, projects: renderProjects, credentials: renderCredentials, resume: renderResume };
      if (!renderers[page]) throw new Error(`Unknown page: ${page}`);
      target.innerHTML = renderers[page](db);
      target.removeAttribute('aria-busy');
      if (page === 'resume') {
        document.querySelector('[data-print-resume]')?.addEventListener('click', () => window.print());
        if (new URLSearchParams(location.search).has('print')) window.setTimeout(() => window.print(), 250);
      }
      db.close();
    } catch (error) {
      console.error('Unable to load site.db', error);
      target.innerHTML = '<section class="database-error"><p class="eyebrow">Content unavailable</p><h1>The site database could not be loaded.</h1><p>Please refresh the page or try again shortly.</p></section>';
      target.removeAttribute('aria-busy');
    }
  }

  load();
})();
