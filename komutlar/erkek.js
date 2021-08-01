const Discord = require("discord.js");
const datab = require("quick.db");
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const ayarlar = require('../ayarlar.json')

exports.run =  async (client, message, args) => {
if(![(ayarlar.kayıtcı)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))
return message.reply(`Bu İşlemi Tek Kayıt Sorumlusu Kardeşimiz Kullana Bilir !`) 


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)

let tag = ayarlar.tag
let name = args[1]
if(!name) return message.channel.send('Bir İsim Belirt Kanka.')
let yas = args[2]
if(!yas) return message.channel.send("Bir Yaş Belirt Kanka.")

datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

  
member.setNickname(`${tag} ${name} | ${yas}`)
member.roles.add(ayarlar.erkekrol)
member.roles.remove(ayarlar.kayıtsız)

  const a = await datab.fetch(`Eskiİsimler.${message.guild.id}.${member.id}`);
  if (a == null) await datab.set(`Eskiİsimler.${message.guild.id}.${member.id}`, []);
  await datab.push(`Eskiİsimler.${message.guild.id}.${member.id}`, `${name} |${yas}`);
  
  let fdh = datab.fetch(`Eskiİsimler.${message.guild.id}.${member.id}`);
  if (!fdh | fdh === [] || fdh.length === 0 || fdh.length < 1) return message.channel.send('Eski İsimleri Yok!').then(x => x.delete({ timeout: 9000}))

  let uzunluk;
  if (fdh.length >= 11) uzunluk = 10
  if (fdh.length < 11) uzunluk = fdh.length

  let sayı = 1
  let data = []
  for (var i = 0; i < uzunluk; i++) {
    data.push(`\`• ${fdh[i]}\``);
  };

  const sanctus = new Discord.MessageEmbed()
  .setTitle("Kayıt Başarılı Şekilde Yapıldı")
  .setThumbnail(member.user.avatarURL({dynamic: true}))
  .setDescription(`**Kayıt Eden Yetkili** : <@${message.author.id}>
  **Kayıt Olan Kullanıcı** : ${member}
  **Kayıta Verilen Rol** : <@&${ayarlar.erkekrol}>
  **Kayıta Alınan Rol** : <@&${ayarlar.kayıtsız}>
  Yeni Kullanıcı Adı :  \`${tag} ${name} | ${yas}\`
  
  **Bu Kullanıcının Sunucudaki Eski İsimleri** [${sayı++ || "0"}]     \n\n${data.join('\n')}  `).setColor('0x348f36').setFooter(message.author.tag, message.author.avatarURL({dynamic: true})).setTimestamp()  

  message.channel.send(sanctus)
  
 
};

exports.conf = {
  aliases: ['e',"man"],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'erkek',
  description: 'Belirttiğiniz kişiyi sunucuda erkek rolü verir.',
  usage: 'erkek üye',
 
};
