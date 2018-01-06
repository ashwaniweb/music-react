import React, { Component } from 'react';
import './scss/style.scss';

class App extends Component {
  static defaultProps = {
    track: {
      name: "We Were Young",
      artist: "Odesza",
      album: "Summer's Gone",
      year: 2012,
      artwork: "/artwork/artwork.jpg",
      duration: 1,
      source: "/media/sample.mp3"
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      playStatus: 'play',
      currentTime: 0,
      totalTime: 0,
      progressWidth: 0,
      value: 0,
      loop: false
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loopPlay = this.loopPlay.bind(this);
  }
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

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  loopPlay() {
    let audio = document.getElementById('audio');
    let status = this.state.loop;
    if (status === false) {
      audio.loop = true;
      audio.load();
      status = true;
    }else{
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
    let seconds = timestamp - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timestamp = minutes + ":" + seconds;
    return timestamp;
  }

  render() {
    return (
      <div className="Player">
        {/* <div className="Background" style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}></div> */}
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
            <div className="material-icons">shuffle</div>
            <div className="material-icons">skip_previous</div>
            <div className="Button" onClick={this.togglePlay}>
              <div className="material-icons">{this.state.playStatus === 'pause' ? 'pause' : 'play_arrow'}</div>
            </div>
            <div className="material-icons">skip_next</div>
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
                <input
                  className="slider rangeSlider__range"
                  id="playtime"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="Time Time--total">
              {this.convertTime(this.props.track.duration)}
            </div>
          </div>
          <audio id="audio">
            <source src={this.props.track.source} />
          </audio>
        </div>
      </div>
    );
  }
}
// COMPONENTS

export default App;
