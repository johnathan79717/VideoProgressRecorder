for (let v of document.getElementsByTagName('video')) {
    let srcToCurrentTimeDefault = {}
    srcToCurrentTimeDefault[v.src] = 0
    chrome.storage.sync.get(srcToCurrentTimeDefault, srcToCurrentTime =>
        v.addEventListener('loadedmetadata', () =>
            v.currentTime = srcToCurrentTime[v.src]
        )
    )

    v.addEventListener('timeupdate', () => {
        let srcToCurrentTime = {}
        srcToCurrentTime[v.src] = v.currentTime
        chrome.storage.sync.set(srcToCurrentTime)
    })
}
