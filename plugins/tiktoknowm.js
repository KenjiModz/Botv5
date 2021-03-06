let fetch = require('node-fetch')
let handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw '*Formato de uso: ${usedPrefix}${command} https://tiktokxxxx*'
  let res = await fetch(global.API('xteam', '/dl/tiktok', {
    url: args[0]
  }, 'APIKEY'))
  if (res.status !== 200) throw await res.text()
  let json = await res.json()
  if (!json.status) throw json
  /*let url = json.server_1 || json.info[0].videoUrl || ''
  if (!url) throw 'Gagal mengambil url download'
  let txt = json.info[0].text
  for (let hashtag of json.info[0].hashtags) txt = txt.replace(hashtag, '*$&*')
  await conn.sendFile(m.chat, url, 'tiktok.mp4', `
βΆ ${json.info[0].playCount} Views
β€ ${json.info[0].diggCount} Likes
π ${json.info[0].shareCount} Shares
π¬ ${json.info[0].commentCount} Comments
π΅ ${json.info[0].musicMeta.musicName} by ${json.info[0].musicMeta.musicAuthor}
- *By:* ${json.info[0].authorMeta.nickName} (${json.info[0].authorMeta.name})
- *Desc:*
${txt}
  `.trim(), m)*/
  let url = json.result.link_dl1 || json.result.link_dl2 || ''
  if (!url) throw '*Error al obtener la URL de descarga*'
  let txt = `
  β­οΈ *De:* ${json.result.name}
π *DescripciΓ³n:*
  ${json.result.caption}
  
  π πππ©π πΏππ€π¨ π
    `
    await conn.sendFile(m.chat, url, 'tiktok.mp4', txt.trim(), m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^tiktok2|Tiktok2$/i
handler.limit = true

module.exports = handler
