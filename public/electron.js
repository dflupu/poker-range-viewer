process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const electron = require('electron')
const {app, screen} = electron
app.disableHardwareAcceleration()

const BrowserWindow = electron.BrowserWindow

const os = require('os')
const path = require('path')
const isDev = require('electron-is-dev')

const globalShortcut = electron.globalShortcut

let mainWindow

function createWindow() {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {nodeIntegration: true},
    webSecurity: false
  })

  mainWindow.loadURL(
    isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  )

  if (isDev) {
    const extensionName = BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.1_0'
      )
    )

    BrowserWindow.removeDevToolsExtension(extensionName)
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
