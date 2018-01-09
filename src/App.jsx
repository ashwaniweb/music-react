import React, { Component } from 'react';
import './scss/style.scss';
const track = [
  {
    id: 1,
    name: "3 Peg-Label Black",
    artist: "Daler mehndi",
    album: "T-Series Mixtape Punjabi",
    year: 2012,
    artwork: "/artwork/abcd2.png",
    duration: 215,
    source: "/songs/3 Peg-Label Black.mp3"
  },
  {
    id: 2,
    name: "Ae Jo Silli Silli-Narazgi",
    artist: "Daler mehndi",
    album: "Club 60",
    year: 2010,
    artwork: "/artwork/club60.png",
    duration: 291,
    source: "/songs/Ae Jo Silli Silli-Narazgi.mp3"
  },
  {
    id: 3,
    name: "Gallan Goriyan-Aaja Soniye",
    artist: "Daler mehndi",
    album: "Creature",
    year: 2010,
    artwork: "/artwork/creature.png",
    duration: 239,
    source: "/songs/Gallan Goriyan-Aaja Soniye.mp3"
  },
  {
    id: 4,
    name: "High Rated Gabru-Ban Ja Rani",
    artist: "Daler mehndi",
    album: "Kudi Gujrati",
    year: 2010,
    artwork: "/artwork/kudi-gujrati.png",
    duration: 267,
    source: "/songs/High Rated Gabru-Ban Ja Rani.mp3"
  },
  {
    id: 5,
    name: "Oh Ho Ho-Soni De Nakhre",
    artist: "Daler mehndi",
    album: "Ye Jawani Hai Deewani",
    year: 2010,
    artwork: "/artwork/yjhd.png",
    duration: 241,
    source: "/songs/Oh Ho Ho-Soni De Nakhre.mp3"
  },
  {
    id: 6,
    name: "Yaar Bolda-Mukhda Dekh Ke",
    artist: "Daler mehndi",
    album: "Youngistan",
    year: 2010,
    artwork: "/artwork/youngistan.png",
    duration: 244,
    source: "/songs/Yaar Bolda-Mukhda Dekh Ke.mp3"
  }
]
class App extends Component {
  static defaultProps = {
    track: {
      id: 6,
      name: "Yaar Bolda-Mukhda Dekh Ke",
      artist: "Daler mehndi",
      album: "Youngistan",
      year: 2010,
      artwork: "/artwork/youngistan.png",
      duration: null,
      source: "/songs/Yaar Bolda-Mukhda Dekh Ke.mp3"
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      track: track,
      playStatus: 'play',
      currentTime: 0,
      totalTime: 0,
      progressWidth: 0,
      value: 0,
      loop: false,
      prevPlay: false,
      nextPlay: false,
      shufflePlay: false,
      menu: false,
      playList: false
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.menuChange = this.menuChange.bind(this);
    this.playList = this.playList.bind(this);
    this.loopPlay = this.loopPlay.bind(this);
    this.prevPlay = this.prevPlay.bind(this);
    this.nextPlay = this.nextPlay.bind(this);
    this.shufflePlay = this.shufflePlay.bind(this);
  }
  // Seek functionality
  componentDidMount() {
    this.slider.value = 0;
    this.currentTimeInterval = null;

    // Get duration of the song and set it as max slider value
    this.audio.onloadedmetadata = function () {
      this.setState({ duration: this.audio.duration });
    }.bind(this);

    // Sync slider position with song current time
    this.audio.onplay = () => {
      this.currentTimeInterval = setInterval(() => {
        this.slider.value = this.audio.currentTime;
      }, 500);
    };

    this.audio.onpause = () => {
      clearInterval(this.currentTimeInterval);
    };

    // Seek functionality
    this.slider.onchange = (e) => {
      clearInterval(this.currentTimeInterval);
      this.audio.currentTime = e.target.value;
    };
  }

  //  Play/Pause functionality
  togglePlay() {
    let status = this.state.playStatus;
    let audio = document.getElementById('audio');
    if (status === 'play') {
      status = 'pause';
      audio.play();
      let _this = this;
      setInterval(function () {
        _this.updateScrubber(audio.currentTime);
        _this.updateTime(audio.currentTime);
      }, 100);
    } else {
      status = 'play';
      audio.pause();
    }
    this.setState({
      playStatus: status
    });
  }

  menuChange() {
    this.setState({
      menu: !this.state.menu,
      playList: false
    });
  }

  playList() {
    this.setState({
      menu: false,
      playList: !this.state.playList
    });
  }

  // Loop functionality
  loopPlay() {
    let audio = document.getElementById('audio');
    let status = this.state.loop;
    if (status === false) {
      audio.loop = true;
      audio.load();
      status = true;
    } else {
      audio.loop = false;
      audio.load();
      status = false;
    }
    this.setState({
      loop: !this.state.loop
    })
  }

  updateTime(timestamp) {
    timestamp = Math.floor(timestamp);
    this.setState({
      currentTime: timestamp
    });
  }

  prevPlay(timestamp) {
    this.setState({
      prevPlay: !this.state.prevPlay
    });
  }

  nextPlay(timestamp) {
    this.setState({
      nextPlay: !this.state.nextPlay
    });
  }

  shufflePlay(timestamp) {
    this.setState({
      shufflePlay: !this.state.shufflePlay
    });
  }

  updateScrubber(progressWidth) {
    let audio = document.getElementById('audio');
    let percentage = Math.floor((100 / audio.duration) * audio.currentTime);
    this.setState({
      progressWidth: percentage,
      // totalTime: audio.duration
    });
  }

  convertTime(timestamp) {
    let minutes = Math.floor(timestamp / 60);
    let seconds = Math.floor(timestamp - minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timestamp = minutes + ":" + seconds;
    return timestamp;
  }

  render() {
    return (
      <div className="Player">
        <div className="topbar">
          <i className="material-icons" onClick={this.menuChange}>menu</i>
          <i className="material-icons" onClick={this.playList}>queue_music</i>
        </div>
        <div className={this.state.menu ? 'setting show' : 'setting'}>
          <ul>
            <li>Setting - 1</li>
            <li>Setting - 2</li>
            <li>Setting - 3</li>
            <li>Setting - 4</li>
            <li>Setting - 5</li>
            <li>Setting - 6</li>
          </ul>
        </div>
        <div className={this.state.playList ? 'playList show' : 'playList'}>
          <ul id="plList">
            {this.state.track.map(track =>
              <li key={track.id} className="plItem">
                <div className="plNum">{track.id}.</div>
                <div className="plTitle">{track.name}</div>
                <div className="plLength">{this.convertTime(track.duration)}</div>
              </li>
            )}
          </ul>
        </div>

        <div className="wrap">
          <div className="Artwork" style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}></div>
          <div className="TrackInformation">
            <div className="Name">{this.props.track.name}</div>
            <div className="Artist">{this.props.track.artist}</div>
            <div className="Album">
              {this.props.track.album} ({this.props.track.year})
			  	</div>
          </div>
          <div className="Scrubber">
            <div className="Scrubber-Progress" style={{ 'width': this.state.progressWidth + '%' }} />
            <div className="Controls">
              <div className={this.state.shufflePlay ? 'material-icons active' : 'material-icons'} onClick={this.shufflePlay}>shuffle</div>
              <div className={this.state.prevPlay ? 'material-icons active' : 'material-icons'} onClick={this.prevPlay}>skip_previous</div>
              <div className="Button" onClick={this.togglePlay}>
                <div className="material-icons">{this.state.playStatus === 'pause' ? 'pause' : 'play_arrow'}</div>
              </div>
              <div className={this.state.nextPlay ? 'material-icons active' : 'material-icons'} onClick={this.nextPlay}>skip_next</div>
              <div className={this.state.loop ? 'material-icons active' : 'material-icons'} onClick={this.loopPlay}>repeat</div>
            </div>
            <div className="Timestamps">
              <div className="Time Time--current">
                {this.convertTime(this.state.currentTime)}
              </div>
              <div className="playTime">
                <div className="rangeSlider rangeSlider--horizontal">
                  <div className="rangeSlider__fill" style={{ width: this.state.progressWidth + '%' }}></div>
                  <div className="rangeSlider__handle" style={{ left: 'calc(' + this.state.progressWidth + '% - 10px )' }} onChange={this.handleChange}></div>
                  {/* <input
                  className="slider rangeSlider__range"
                  id="playtime"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={this.state.value}
                  onChange={this.handleChange}
                /> */}
                  <input ref={(slider) => {
                    this.slider = slider
                  }}
                    type="range"
                    name="points"
                    min={0}
                    max={this.state.duration} />
                </div>
              </div>
              <div className="Time Time--total">
                {this.convertTime(this.state.duration)}
              </div>
            </div>
            <audio id="audio" ref={(audio) => { this.audio = audio }} src={this.props.track.source} />
            {/* <audio id="audio" ref={(audio) => { this.audio = audio }}>
            <source src={this.props.track.source} />
          </audio> */}
          </div>
        </div>
      </div>
    );
  }
}
// COMPONENTS

export default App;
