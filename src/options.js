document
    .getElementsByTagName('form')[0]
    .addEventListener('submit', function(event) {
        event.preventDefault();
        const server_url = document
            .getElementById('server-url')
            .value;
        const github_url = document
            .getElementById('github-url')
            .value;
        const credential = document
            .getElementById('github-credential')
            .value
        chrome.storage.sync.set({
            server_url,
            github_url,
            credential
        })
    });