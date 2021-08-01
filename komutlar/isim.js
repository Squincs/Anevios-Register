const dis = require("discord.js");
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {

let tag = ayarlar.tag
let s = ayarlar.prefix
let kayıtcı = ayarlar.kayıtcı

let sanctus1 = new dis.MessageEmbed()

.setDescription(`**Kullanıcının İsmi Başarı İle Düzenlendi**`).setColor('RANDOM')
 if (!message.member.roles.cache.get(kayıtcı)) return message.channel.send(sanctus1) 
  
  let member = message.mentions.members.first();
if (!member) return message.channel.send(new dis.MessageEmbed().setColor('RANDOM').setDescription(`İsim Değiştireceğin Kullanıcıyı Belirtmelisin! \n\n **Örnek Kullanım:** ${s}isim @kullanıcı <isim> <yaş>`))
let isim = args[1] 
if (!isim) return message.channel.send(new dis.MessageEmbed().setColor('RANDOM').setDescription(`İsmini Belirtmelisin! \n\n **Örnek Kullanım:** ${s}isim @kullanıcı <isim> <yaş>`))
let yas = args[2]
if(!yas) return message.channel.send(new dis.MessageEmbed().setColor("RANDOM").setDescription("Yaşını Belirtmen Lazım Knkm \n\n **Örnek Kullanım:** ${d}isim @kullanıcı <isim> <yaş>"))
  member.setNickname(`${tag} ${isim} ${yas}`)

const sanctus = new dis.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**${member}  kullanıcının ismini  \`${tag} ${isim} | ${yas} | olarak ayarladım**`)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(sanctus)


}
exports.conf = {
  enabled: true,
  guildonly: false, 
  aliases: ['i'],
  permlevel: 0
}
exports.help = {
  name: 'isim',
  description: 'ÖYLE iŞTE',
  usage: 'İsim Değiştirmeye yarar'
}






