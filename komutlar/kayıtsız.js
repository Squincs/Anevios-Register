const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\
  
if(![(ayarlar.kayıtcı)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu İşlemi Sadece Kayıt Sorumlusu Yapapbilir !`) 
  
const kayıtsız = (ayarlar.kayıtsız)

//-------------------------------------------------------------------------------\\



let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini Niye Kayıtsıza Atmaya Çalşıyırsın ???`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Lan Botu Kayıtsıza Atıp Napıcan La Botu Kayıtsıza Atamam`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sen Hayırdır Sunucu Sahibini Kayıtsıza Atmaya Çalışıyorsun???`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

message.channel.send(new MessageEmbed().setDescription(`${kullanici} Adlı kullanıcıya <@&ROL İD> Rolü Verildi`).setColor('0x348f36').setFooter(message.author.tag, message.author.avatarURL({dynamic: true})).setTimestamp()) 
kullanici.setNickname(ayarlar.kayıtsızisim)
kullanici.roles.add(kayıtsız) 
kullanici.roles.cache.forEach(r => {
kullanici.roles.remove(r.id)})
moment.locale("tr");
message.react('✅')
        

  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsız','unreg'],
    permLevel: 0,
}

exports.help = {
      name: "unregister"  
  
}