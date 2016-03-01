var data = [{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},
{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},
{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}];

function generateTable (data) {

    var table = $('<table></table>'),
        tableHead = generateTableHead(data[0]),
        tableBody = $('<tbody></tbody>');

    data.forEach(function (el){
        var tr = $('<tr></tr>');
        for (var prop in el) {
            var td = $('<td></td>');
            td.text(el[prop]);
            tr.append(td);
        }
        tableBody.append(tr);
    });




    table.append(tableHead);
    table.append(tableBody);
    $('#wrapper').append(table);
}

function generateTableHead (obj) {
    var tableHead = $('<thead></thead>'),
        tr = $('<tr></tr>');

    for (var prop in obj) {
        var th = $('<th></th>');
        th.text(prop);
        tr.append(th);
    }

    tableHead.append(tr);

    return tableHead;
}

generateTable(data);