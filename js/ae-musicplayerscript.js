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
    const prevBtn = document.getElementById('prevBtn');  // 上一曲按钮
    const nextBtn = document.getElementById('nextBtn');  // 下一曲按钮
    const musictitle = document.getElementById('musictitle');

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
            updateMusicTitle(currentSongIndex);
        });
    });

    audioPlayer.addEventListener('ended', () => {
        nextSong();  
    });

    prevBtn.addEventListener('click', () => {
        prevSong();
    });

    nextBtn.addEventListener('click', () => {
        nextSong();
    });

    function updateMusicTitle(index) {
    const songText = playListItems[index].textContent.trim();
    musictitle.textContent = songText;
    }
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playListItems.length) % playListItems.length;
        const prevSongSrc = playListItems[currentSongIndex].getAttribute('src');
        audioPlayer.src = prevSongSrc;
        audioPlayer.play();
        playPauseBtn.style.backgroundImage = 'url("./img/pauseBtn.png")';
        updateMusicTitle(currentSongIndex);
    }
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playListItems.length;
        const nextSongSrc = playListItems[currentSongIndex].getAttribute('src');
        audioPlayer.src = nextSongSrc;
        audioPlayer.play();
        playPauseBtn.style.backgroundImage = 'url("./img/pauseBtn.png")';
        updateMusicTitle(currentSongIndex);
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

    updateMusicTitle(currentSongIndex);    
});