// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekBar = document.getElementById('seekBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playListButton = document.getElementById('listButton');
    const playList = document.getElementById('playList');
    const exitButton = document.getElementById('exitButton');
    const Player = document.getElementById('mainbody');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musictitle = document.getElementById('musictitle');
    const songImage = document.getElementById('songImage');

    const playListItems = playList.querySelectorAll('li');

    let currentSongIndex = 0;

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.style.backgroundImage = 'url("./img/pauseBtn.png")';
        } else {
            audioPlayer.pause();
            playPauseBtn.style.backgroundImage = 'url("./img/playBtn.png")';
        }
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;
        seekBar.value = progress;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    });

    seekBar.addEventListener('input', () => {
        const seekTime = (seekBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    
    playListItems.forEach(item => {
        item.addEventListener('click', function() {
            const songSrc = this.getAttribute('src');
            audioPlayer.src = songSrc;
            audioPlayer.play();
            playPauseBtn.style.backgroundImage = 'url("./img/pauseBtn.png")';
            currentSongIndex = Array.from(playListItems).indexOf(this);
            updateMusicTitleAndImage(currentSongIndex);
        });
    });

    audioPlayer.addEventListener('ended', () => {
        nextSong(); 
        updateMusicTitleAndImage(currentSongIndex); 
    });

    prevBtn.addEventListener('click', () => {
        prevSong();
        updateMusicTitleAndImage(currentSongIndex);
    });

    nextBtn.addEventListener('click', () => {
        nextSong();
        updateMusicTitleAndImage(currentSongIndex);
    });

    function updateMusicTitleAndImage(index) {
        playListItems.forEach(item => {
            item.classList.remove('current-playing');
        });

        const currentItem = playListItems[index];
        currentItem.classList.add('current-playing');

        const songText = playListItems[index].textContent.trim();
        musictitle.textContent = songText;
        const songImageSrc = playListItems[index].getAttribute('data-image') || './img/default.png';
        songImage.style.backgroundImage = `url(${songImageSrc})`;

        currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playListItems.length) % playListItems.length;
        const prevSongSrc = playListItems[currentSongIndex].getAttribute('src');
        audioPlayer.src = prevSongSrc;
        audioPlayer.play();
        playPauseBtn.style.backgroundImage = 'url("./img/pauseBtn.png")';
        updateMusicTitleAndImage(currentSongIndex);
    }
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playListItems.length;
        const nextSongSrc = playListItems[currentSongIndex].getAttribute('src');
        audioPlayer.src = nextSongSrc;
        audioPlayer.play();
        playPauseBtn.style.backgroundImage = 'url("./img/pauseBtn.png")';
        updateMusicTitleAndImage(currentSongIndex);
    }
   
    playListButton.addEventListener('click', function() {
        if (playList.classList.contains('expanded')) {
            playList.classList.remove('expanded');
        } else {
            playList.classList.add('expanded');
        }
    });

    exitButton.addEventListener('click', function() {
        if (Player.classList.contains('expanded')) {
            Player.classList.remove('expanded');
            exitButton.style.backgroundImage = 'url("./img/exitright1.png")';
        } else {
            Player.classList.add('expanded');
            exitButton.style.backgroundImage = 'url("./img/exitleft1.png")';
        }

    });

    updateMusicTitleAndImage(currentSongIndex);    
});
