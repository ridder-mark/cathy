var portAudio = require('naudiodon');
var fs = require('fs');
var lame = require('lame'); 

console.log(portAudio.getDevices());

var ai = new portAudio.AudioInput({
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId : 3 // Use -1 or omit the deviceId to select the default device
  });
  
  // create the Encoder instance
  var encoder = new lame.Encoder({
    // input
    channels: 2,        // 2 channels (left and right)
    bitDepth: 16,       // 16-bit samples
    sampleRate: 44100,  // 44,100 Hz sample rate
   
    // output
    bitRate: 128,
    outSampleRate: 22050,
    mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
  });
  
  var ws = fs.createWriteStream('rawAudio.wav');
  
  ai.on('error', err => console.error);
  
  process.stdin.pipe(encoder);
  
  ai.pipe(encoder);
  ai.start();
  
  encoder.pipe(ws);