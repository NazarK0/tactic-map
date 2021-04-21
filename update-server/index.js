const fs = require('fs')
const express = require('express')
const path = require('path')

const app = express()

app.get('/releases/latest', async (req, res) => {
    const clientVersion = req.query.v
    console.log(clientVersion, 'CLIENT VERSION');
    const updateURL = getBaseUrl()
    const { body } = await got.get(updateURL);
    const latest = body.tag_name;
    console.log(latest, 'LATEST VERSION');

    if (clientVersion === latest) {
        res.status(204).end()
    } else {       
        res.json({
            url: body.upload_url,
            name: body.name,
            notes: body.body,
            pub_date: body.publishedAt
        })
    }
})

let getLatestRelease = (platform) => {
    const dir = __dirname + `/releases/${platform}`;
    const versionsDesc = fs.readdirSync(dir).filter((file) => {
        const filePath = path.join(dir, file)
        return fs.statSync(filePath).isDirectory()
    }).reverse()
    return versionsDesc[0];
}

let getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://api.github.com/repos/NazarK0/test-electron-app-update/releases/latest'
  }
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${process.env.PORT || 3000}`)
});