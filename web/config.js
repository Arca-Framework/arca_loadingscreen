// Edit this file to customise the loading screen. No Lua needed.
window.ArcaLoading = {
    serverName: 'Arca Roleplay',   // overridden by sv_projectName if set
    tagline: 'Your story starts here.',

    // Background: put an image or .webm/.mp4 in web/assets and point to it.
    // A video plays muted unless music is off and videoSound is true.
    background: 'assets/background.svg',
    backgroundVideo: '',            // e.g. 'assets/background.webm'
    videoSound: false,

    // Music: put an .mp3/.ogg in web/assets. Leave empty for none.
    music: '',                      // e.g. 'assets/music.mp3'
    musicVolume: 0.25,

    tips: [
        'Press Z to open the radial menu.',
        'Hold Left Alt to interact with the world around you.',
        'Use /job to see your current job and duty status.',
        'Eat and drink regularly — hunger and thirst go down over time.',
        'Respect other players and have fun!',
    ],
    tipInterval: 6000,

    links: [
        { icon: 'fa-brands fa-discord', label: 'Discord', url: 'discord.gg/yourserver' },
        { icon: 'fa-solid fa-globe', label: 'Website', url: 'yourserver.com' },
    ],

    team: [
        { name: 'Owner', role: 'Founder' },
        { name: 'Developer', role: 'Development' },
    ],
};
