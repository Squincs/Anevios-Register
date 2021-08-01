const db = require ("quick.db");

const discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  
   var tag = "sád"
   var etikettag = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "#0078").size;
   var ailem = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0099").size;
   var üye =  message.guild.memberCount
   var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
   var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size
   var sestekiüye = message.guild.members.cache.filter(s => s.voice.channel).size;

  
  const say = new discord.MessageEmbed()
   .setTimestamp()
  .setColor("BLACK")
  .setTitle("Wod baş et ")
  .setDescription(`
 ✔ Sunucudaki Toplam Üye **${üye}**
 🔉 Sunucdaki Toplam Sesteki Üye **${sestekiüye}**
 🟢 Sunucudaki Toplam Çevrimiçi Üye **${online}**
  Tagımızı Alan Toplam Üye **${ailem}**
  Sunucumuzun Tagı ** Wod **
  Sunucumuzun Etiket Tagı ** 1967 **
  `)
  message.channel.send(say)
  
  
  
  
  
}

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say','kişi'],
    permLevel: 0,
}

exports.help = {
      name: "say"  
  
}