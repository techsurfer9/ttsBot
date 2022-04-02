const discordTTS = require("discord-tts");
const { Client, Intents } = require("discord.js");
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'CHANNEL']
});

client.login('OTI5OTk2NTA0Nzc5ODYyMDk2.YdvcvQ.zLvfpr9NTfYfYIfXjQoGp8B_aGI');

client.on("ready", () => {
  console.log("Online")
  let voiceConnection;
  let audioPlayer = new AudioPlayer();
  let message = '';

  client.on("messageCreate", async (msg) => {

    if (msg.content.toLowerCase().startsWith('.')) {
      let content = msg.content;
      message = content.substr(2);
      const stream = 'https://translate.google.com/translate_tts?ie=UTF-8&q=' + message + '&tl=hi&client=tw-ob';
      const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
      
      
      if(voiceConnection?.status===VoiceConnectionStatus.Connected){
        voiceConnection = joinVoiceChannel({
            channelId: msg.member.voice.channelId,
            guildId: msg.guildId,
            adapterCreator: msg.guild.voiceAdapterCreator,
        });
      }
      
      //voiceConnection=await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
      
     
      if (voiceConnection.status === VoiceConnectionStatus.Connected) {
        voiceConnection.subscribe(audioPlayer);
        audioPlayer.play(audioResource);
      }
    }
  });


});

