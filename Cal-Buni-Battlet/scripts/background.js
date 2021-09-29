chrome.extension.onMessage.addListener(
    function (request) {
        switch (request.type) {
            case 'a':
                process(data);
                break;
            case 'b':
                break;
        }
    });

function process(require) {
    var oldData = getLocalData();
    oldData.push(require);
    localStorage.mydata = JSON.stringify(oldData)
}

function getLocalData() {
    if (!localStorage.mydata) {
        localStorage.mydata = JSON.stringify([]);
    }

    return JSON.parse(localStorage.mydata);
}