console.log("welcome text");
let url = document.getElementById('url');
// let get = document.getElementById('get');
// let post = document.getElementById('post');
let jsonRadio = document.getElementById('jsonRadio');
let paramsRadio = document.getElementById('paramsRadio');
let parametersBox = document.getElementById('parametersBox');
let requestJsonBox = document.getElementById('requestJsonBox');
parametersBox.style.display = 'none';
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
paramsRadio.addEventListener('click', () => {
    if (paramsRadio.checked) {
        console.log("checked");
        parametersBox.style.display = "block";
        requestJsonBox.style.display = "none";
    }
});
jsonRadio.addEventListener('click', () => {
    if (jsonRadio.checked) {
        console.log("checked");
        requestJsonBox.style.display = "block";
        parametersBox.style.display = "none";
    }
})
let addParam = document.getElementById('addParam');
let counter = 0;
let params = document.getElementById('params');
addParam.addEventListener('click', () => {
    console.log('clicked');
    let string = `<div class="form-row">
                        <label for="url" class="col-sm-2 col-form-label my-1">Parameter ${counter + 2}</label>
                        <div class="col-md-4 my-1">
                             <input type="text" class="form-control" id="parameterKey${counter + 2}" placeholder="Enter Parameter ${counter + 2} Key">
                        </div>
                        <div class="col-md-4 my-1">
                             <input type="text" class="form-control" id="parameterValue${counter + 2}" placeholder="Enter Parameter ${counter + 2} Value">
                        </div>
                        <button class="btn btn-dark my-1 delParam">×</button>
                    </div>`;
    let stringchild = getElementFromString(string);
    params.appendChild(stringchild);
    let delParam = document.getElementsByClassName('delParam');
    for (item of delParam) {
        item.addEventListener('click', (e) => {
            if (window.confirm("Do you want to delete the parameter?")) {
                e.target.parentElement.remove();
                counter--;
            }
        })
    }
    counter++;
});
let requestJsonText = document.getElementById('requestJsonText');
let submitbtn = document.getElementById('submit');
submitbtn.addEventListener('click', (e) => {
    e.preventDefault = true;
    // requestJsonText.placeholder = "Please wait......fetching your request from the server";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;
    let data = {};
    if (contentType == 'params') {
        for (let i = 0; i < counter + 1; i++) {
            if ((document.getElementById('parameterKey' + (i + 1))) != undefined) {
                let parameterKey = document.getElementById('parameterKey' + (i + 1)).value;
                let parameterValue = document.getElementById('parameterValue' + (i + 1)).value;
                data[parameterKey] = parameterValue;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    } else if (contentType == 'json') {
        data = requestJsonText.value;
    }
    if (requestType == 'GET') {
        fetch(url.value, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    } else if (requestType == 'POST') {
        fetch(url.value, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data
        })
            .then(res => res.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
});
//https://jsonplaceholder.typicode.com/posts/
//https://randomuser.me/api


