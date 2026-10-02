(() => {
    const cfg = window.ArcaLoading || {};
    const handover = window.nuiHandoverData || {};
    const $ = (id) => document.getElementById(id);
    const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    /* ---------- text ---------- */
    $('server-name').textContent = handover.serverName && handover.serverName !== 'Arca' ? handover.serverName : cfg.serverName || 'Arca';
    $('tagline').textContent = cfg.tagline || '';
    $('welcome').textContent = handover.playerName ? `Welcome, ${handover.playerName}` : 'Welcome';
    if (handover.maxPlayers) $('players').textContent = `${(handover.players || 0) + 1} / ${handover.maxPlayers} players`;

    /* ---------- background ---------- */
    if (cfg.backgroundVideo) {
        const video = $('bg-video');
        video.src = cfg.backgroundVideo;
        video.style.display = 'block';
        video.muted = !(cfg.videoSound && !cfg.music);
        video.volume = cfg.musicVolume ?? 0.25;
    } else if (cfg.background) {
        $('bg').style.backgroundImage = `url('${cfg.background}')`;
    }

    /* ---------- music ---------- */
    if (cfg.music) {
        const music = $('music');
        const btn = $('music-btn');
        music.src = cfg.music;
        music.volume = cfg.musicVolume ?? 0.25;
        music.play().catch(() => {});
        btn.classList.remove('hidden');
        btn.addEventListener('click', () => {
            music.muted = !music.muted;
            btn.innerHTML = `<i class="fa-solid ${music.muted ? 'fa-volume-xmark' : 'fa-volume-high'}"></i>`;
        });
    }

    /* ---------- links / team ---------- */
    $('links').innerHTML = (cfg.links || [])
        .map((l) => `<a><i class="${esc(l.icon)}"></i>${esc(l.url || l.label)}</a>`)
        .join('');
    const team = cfg.team || [];
    if (team.length) {
        $('team').innerHTML = team.map((m) => `<div><strong>${esc(m.name)}</strong><span>${esc(m.role)}</span></div>`).join('');
    } else {
        $('team').classList.add('hidden');
    }

    /* ---------- tips ---------- */
    const tips = cfg.tips || [];
    let tipIndex = Math.floor(Math.random() * Math.max(tips.length, 1));
    const tipEl = $('tip');
    const showTip = () => {
        if (!tips.length) return tipEl.parentElement.classList.add('hidden');
        tipEl.classList.add('fade');
        setTimeout(() => {
            tipEl.textContent = tips[tipIndex % tips.length];
            tipIndex++;
            tipEl.classList.remove('fade');
        }, 400);
    };
    if (tips.length) tipEl.textContent = tips[tipIndex++ % tips.length]; else showTip();
    setInterval(showTip, cfg.tipInterval || 6000);

    /* ---------- progress ---------- */
    // FiveM sends loadProgress (0-1) plus init/data-file events while the game loads
    const stages = {
        startInitFunctionOrder: 'Initialising game',
        initFunctionInvoking: 'Loading game systems',
        startDataFileEntries: 'Loading map data',
        performMapLoadFunction: 'Building the city',
        onLogLine: null,
    };
    let shown = 0;
    let target = 0;

    function setProgress(fraction) {
        target = Math.max(target, Math.min(1, fraction));
    }

    // ease the bar toward the real value so it never jumps backwards
    setInterval(() => {
        shown += (target - shown) * 0.15;
        const pct = Math.round(shown * 100);
        $('fill').style.width = `${pct}%`;
        $('percent').textContent = `${pct}%`;
    }, 100);

    window.addEventListener('message', ({ data }) => {
        if (!data || !data.eventName) return;
        if (data.eventName === 'loadProgress') {
            setProgress(data.loadFraction);
        } else if (data.eventName === 'onLogLine') {
            if (data.message) $('stage').textContent = data.message.replace(/\.+$/, '') + '…';
        } else if (stages[data.eventName]) {
            $('stage').textContent = stages[data.eventName];
        }
    });

    // outside FiveM (browser preview) fake some progress
    if (typeof GetParentResourceName !== 'function' && !window.invokeNative) {
        let fake = 0;
        const t = setInterval(() => {
            fake += Math.random() * 0.06;
            setProgress(fake);
            if (fake >= 1) clearInterval(t);
        }, 300);
    }
})();
