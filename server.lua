-- Passes the player's name and live player count to the loading screen
AddEventHandler('playerConnecting', function(name, _, deferrals)
    deferrals.handover({
        playerName = name,
        serverName = GetConvar('sv_projectName', GetConvar('sv_hostname', 'Arca')),
        players = #GetPlayers(),
        maxPlayers = GetConvarInt('sv_maxclients', 48),
    })
end)
