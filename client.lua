-- Hide GTA's own "Loading game (xx%)" spinner in the bottom-right while our loading
-- screen is up. It keeps coming back during loading, so clear it every frame until
-- the loading screen is shut down.
CreateThread(function()
    while GetIsLoadingScreenActive() do
        BusyspinnerOff()
        RemoveLoadingPrompt()
        Wait(0)
    end
    BusyspinnerOff()
end)
