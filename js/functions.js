var $menuOpenIcon = $('.icon-menu'),
    $menuCloseIcon = $('.icon-menu-close'),
    $menuList = $('.site-menu'),
    $menuOverlay = $('.site-menu-overlay');


$menuOverlay.on('click', function(e){
  closeMenu();
});

$menuCloseIcon.on('click', function(e){
  closeMenu();
});

$menuOpenIcon.on('click', function(e){
  openMenu();
});

function closeMenu(){
  $menuCloseIcon.addClass('hidden');
  $menuList.addClass('hidden');
  $menuOverlay.addClass('hidden');
}

function openMenu() {
  $menuCloseIcon.removeClass('hidden');
  $menuList.removeClass('hidden');
  $menuList.removeClass('hidden');
  $menuOverlay.removeClass('hidden');
}

(function initPodcastPlayer() {
  var player = document.getElementById('lnw-player');
  var audio = document.getElementById('lnw-audio');
  if (!player || !audio) return;

  var playBtn = document.getElementById('lnw-play-btn');
  var iconPlay = playBtn.querySelector('.lnw-icon-play');
  var iconPause = playBtn.querySelector('.lnw-icon-pause');
  var art = document.getElementById('lnw-art');
  var titleEl = document.getElementById('lnw-title');
  var timeEl = document.getElementById('lnw-time');
  var scrub = document.getElementById('lnw-scrub');
  var progress = document.getElementById('lnw-progress');
  var closeBtn = document.getElementById('lnw-close');
  var episodes = document.querySelectorAll('.podcast-episodes .episode');

  function fmt(sec) {
    if (!sec || !isFinite(sec)) return '0:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function syncIcons() {
    if (audio.paused) {
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
    } else {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
    }
  }

  episodes.forEach(function(ep) {
    ep.addEventListener('click', function(e) {
      e.preventDefault();
      var src = ep.getAttribute('href');
      var title = ep.getAttribute('data-title') || 'Episode';
      var img = ep.querySelector('img');
      episodes.forEach(function(el) { el.classList.remove('is-playing'); });
      ep.classList.add('is-playing');
      player.classList.remove('hidden');
      titleEl.textContent = title;
      if (img) art.src = img.src;
      if (audio.getAttribute('data-src') !== src) {
        audio.setAttribute('data-src', src);
        audio.src = src;
        progress.style.width = '0%';
        timeEl.textContent = '0:00 / ...';
      }
      audio.play();
    });
  });

  playBtn.addEventListener('click', function() {
    if (audio.paused) audio.play();
    else audio.pause();
  });

  audio.addEventListener('play', syncIcons);
  audio.addEventListener('pause', syncIcons);
  audio.addEventListener('timeupdate', function() {
    var cur = audio.currentTime || 0;
    var dur = audio.duration || 0;
    timeEl.textContent = fmt(cur) + ' / ' + fmt(dur);
    if (dur > 0) {
      progress.style.width = ((cur / dur) * 100).toFixed(2) + '%';
    }
  });
  audio.addEventListener('loadedmetadata', function() {
    timeEl.textContent = fmt(audio.currentTime || 0) + ' / ' + fmt(audio.duration || 0);
  });

  scrub.addEventListener('click', function(e) {
    if (!audio.duration) return;
    var rect = scrub.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  });

  closeBtn.addEventListener('click', function() {
    audio.pause();
    player.classList.add('hidden');
    episodes.forEach(function(el) { el.classList.remove('is-playing'); });
  });
})();
