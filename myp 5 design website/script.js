document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  document.querySelectorAll('.nav-links a').forEach((link) => {
    const target = link.getAttribute('href');
    const isHome = page === 'home' && target === 'index.html';
    if (target === `${page}.html` || isHome) {
      link.classList.add('active');
    }
  });

  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = 'index.html';
    });
  }

  const homeTimelineItems = document.querySelectorAll('.home-timeline-item');
  const homePreviewImage = document.getElementById('home-preview-image');
  const homePreviewPeriod = document.getElementById('home-preview-period');
  const homePreviewTitle = document.getElementById('home-preview-title');
  const homePreviewText = document.getElementById('home-preview-text');

  if (homeTimelineItems.length && homePreviewImage && homePreviewPeriod && homePreviewTitle && homePreviewText) {
    const updateHomePreview = (item) => {
      const period = item.dataset.period || '';
      const title = item.dataset.title || '';
      const text = item.dataset.text || '';
      const image = item.dataset.image || homePreviewImage.src;

      homePreviewPeriod.textContent = period;
      homePreviewTitle.textContent = title;
      homePreviewText.textContent = text;
      homePreviewImage.src = image;
      homePreviewImage.alt = title;

      homeTimelineItems.forEach((button) => button.classList.toggle('active', button === item));
    };

    homeTimelineItems.forEach((item) => {
      item.addEventListener('click', () => updateHomePreview(item));
    });

    updateHomePreview(homeTimelineItems[0]);
  }

  const timelineStages = document.querySelectorAll('.timeline-item');
  const detailPeriod = document.getElementById('detail-period');
  const detailTitle = document.getElementById('detail-title');
  const detailCopy = document.getElementById('detail-copy');
  const detailImage = document.getElementById('detail-image');

  if (timelineStages.length && detailPeriod && detailTitle && detailCopy && detailImage) {
    const updateDetail = (stage) => {
      const period = stage.dataset.period || stage.querySelector('span')?.textContent || '';
      const title = stage.dataset.title || stage.querySelector('strong')?.textContent || '';
      const text = stage.dataset.text || '';
      const image = stage.dataset.image || detailImage.src;

      detailPeriod.textContent = period;
      detailTitle.textContent = title;
      detailCopy.textContent = text;
      detailImage.src = image;
      detailImage.alt = title;

      timelineStages.forEach((item) => item.classList.toggle('active', item === stage));
    };

    timelineStages.forEach((stage) => {
      stage.addEventListener('click', () => updateDetail(stage));
    });

    updateDetail(timelineStages[0]);
  }

  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    const scoreDisplay = document.getElementById('quiz-result');
    const answerKey = {
      q1: 'b',
      q2: 'd',
      q3: 'a',
      q4: 'c',
      q5: 'b'
    };

    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let score = 0;

      Object.keys(answerKey).forEach((question) => {
        const selected = quizForm.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === answerKey[question]) {
          score += 1;
        }
      });

      if (scoreDisplay) {
        scoreDisplay.textContent = `Your Score: ${score}/5`;
        scoreDisplay.classList.add('show');
      }
    });
  }
});
