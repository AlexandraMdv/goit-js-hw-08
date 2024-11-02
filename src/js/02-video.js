import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector("iframe");
const player = new Vimeo(iframe);

let currentTime = 0;

player.on('pause', function(time) {
    currentTime = time.seconds;
    // console.log('This is current time: ', currentTime);
    
    localStorage.setItem('videoplayer-current-time', currentTime);
});

player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

const saveCurrentTime = throttle(function(time) {
    localStorage.setItem('videoplayer-curretn-time', time.seconds);
}, 1000);

player.on('timeupdate', saveCurrentTime);
