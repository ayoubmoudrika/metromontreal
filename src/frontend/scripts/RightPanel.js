var dataList;
var title = "Metro stations City Of Montreal";
let rightPanelTableHeaders = ["Name", "Opened", "Distance", "Ligne"];

function setDataListMetros(){
    let urlRequest = document.location.pathname + document.location.search;
    let urlCallBack = urlRequest.replace("metroPage", "metros");

    $.ajax({
        type: "GET",
        url: urlRequest,
        success: function () {
            $.ajax({
                type: "GET",
                url: urlCallBack,
                success: function (response){
                    dataList = response;
                    setTable();
                }
            })
        }
    })
}

function removeAllChildNodes(parent) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }
}

function setTable(){
    let table = document.getElementById("metroTable");
    removeAllChildNodes(table);
    setHeaders();
    for(let i = 0; i < dataList.length; i++){
        setTableValues(i);
    }
}

function setHeaders(){
    const targetNode = document.getElementById("metroTable");
    let headers = document.createElement("tr");
    rightPanelTableHeaders.forEach((field) => {
        let cell = document.createElement("th");
        cell.appendChild(document.createTextNode(field))
        headers.appendChild(cell);
    });
    targetNode.appendChild(headers);
}

function setTableValues(index){
    const targetNode = document.getElementById("metroTable");
    let row = document.createElement("tr");
    row.id = "tableRow" + index;

    for(let i = 0; i < rightPanelTableHeaders.length; i++) {
        let cell = document.createElement("td");
        let attribute = rightPanelTableHeaders[i];
        cell.appendChild(document.createTextNode(dataList[index][attribute]));
        row.appendChild(cell);
    }
}