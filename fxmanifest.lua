fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'arca_loadingscreen'
author 'Arca'
description 'Loading screen for the Arca framework'
version '0.1.0'

loadscreen 'web/index.html'
-- arca_character closes the loading screen once the character menu is ready
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

server_script 'server.lua'
client_script 'client.lua'

files {
    'web/index.html',
    'web/style.css',
    'web/app.js',
    'web/config.js',
    'web/assets/*',
}
