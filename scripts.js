'use strict';

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const primaryDownload = document.getElementById('primary-download-link');
if (primaryDownload) {
    const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent;
    if (/linux/i.test(platform) && !/android/i.test(navigator.userAgent)) {
        primaryDownload.href = primaryDownload.dataset.linuxUrl;
        document.getElementById('primary-download-text').textContent = 'Download for Linux';
        const alternate = document.getElementById('alternate-download-link');
        alternate.href = primaryDownload.dataset.windowsUrl;
        alternate.textContent = 'Download for Windows instead';
    }
}

const modal = document.getElementById('modal');
if (modal) {
    const modalImage = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    const closeButton = modal.querySelector('.close');
    let trigger;
    function closeModal() {
        modal.style.display = 'none';
        trigger?.focus();
    }
    function openModal(element) {
        trigger = element;
        element = element.querySelector('img');
        modalImage.src = element.dataset.full || element.src;
        modalImage.alt = element.alt;
        caption.textContent = element.alt;
        modal.style.display = 'block';
        closeButton.focus();
    }
    document.querySelectorAll('.gallery-trigger').forEach(element => {
        element.addEventListener('click', () => openModal(element));
        element.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(element);
            }
        });
    });
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    modal.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
        // The close button is the viewer's only interactive control.
        if (event.key === 'Tab') { event.preventDefault(); closeButton.focus(); }
    });
}

// Decode the stereo comparison only after the visitor starts playback.
const demo = document.getElementById('voice-demo');
if (demo) {
    const mix = document.getElementById('vc-mix');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let context, originalGain, changedGain;
    function updateMix() {
        const value = Number(mix.value) / 100;
        originalGain.gain.value = 1 - value;
        changedGain.gain.value = value;
        mix.setAttribute('aria-valuetext', `${100 - Number(mix.value)}% original, ${mix.value}% changed`);
    }
    demo.addEventListener('play', () => {
        if (!AudioContextClass) return;
        if (!context) {
            context = new AudioContextClass();
            const source = context.createMediaElementSource(demo);
            const splitter = context.createChannelSplitter(2);
            const merger = context.createChannelMerger(1);
            originalGain = context.createGain();
            changedGain = context.createGain();
            source.connect(splitter);
            splitter.connect(originalGain, 0);
            splitter.connect(changedGain, 1);
            originalGain.connect(merger, 0, 0);
            changedGain.connect(merger, 0, 0);
            merger.connect(context.destination);
            updateMix();
            mix.disabled = false;
        }
        context.resume().catch(() => { /* Native playback controls remain available. */ });
    });
    mix.addEventListener('input', updateMix);
}

// Load the third-party player only when requested.
const loadVideo = document.getElementById('load-video');
if (loadVideo) {
    loadVideo.addEventListener('click', () => {
        const player = document.createElement('iframe');
        player.width = '560';
        player.height = '315';
        player.title = 'Whispering Tiger translation overview';
        player.src = 'https://www.youtube-nocookie.com/embed/HSGqQuGDFmU?rel=0&autoplay=1';
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        loadVideo.replaceWith(player);
        player.focus();
    }, {once: true});
}
