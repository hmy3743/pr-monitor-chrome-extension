chrome.runtime.onInstalled.addListener(function() {
    chrome.runtime.openOptionsPage();
});

let websocket = null;

chrome.storage.sync.get('server_url', function(item) {
    connect(item.server_url);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if(changes.server_url)
        connect(changes.server_url.newValue);
    if(changes.github_url)
        send({
            name: 'github_url',
            value: changes.github_url.newValue
        });
    if(changes.credential)
        send({
            name: 'credential',
            value: changes.credential.newValue
        })
});

function onMessage(message) {
    console.log(message)
}

function connect(url) {
    websocket = new WebSocket(`ws://${url}`);
    websocket.addEventListener('message', function(event) {
        onMessage(JSON.parse(event.data));
    });
}

function send(data) {
    if(websocket && websocket.readyState == WebSocket.OPEN)
        websocket.send(JSON.stringify(data))
}
