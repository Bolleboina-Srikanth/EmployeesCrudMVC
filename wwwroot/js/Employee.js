$(document).ready(function () {
    GetAllEmployees();
})

function GetAllEmployees() {
    $.ajax({
        url: "/Employee/GetAll",
        type: "GET",
        success: function (response) {
            employeeslist = response;
            disPlayProducts(employeeslist);
        },
        error: function (xhr, status, error) {
            console.log("failed to get products: " + xhr.responseText);
        },
    });
}

// display products
function disPlayProducts(employeeslist) {
    console.log(employeeslist.data);

    var html = '';
    $.each(employeeslist.data, function (key, item) {
        html += '<tr id="employee-${item.id}">';
        html += '<td>' + item.id + '</td>';
        html += '<td>' + item.name + '</td>';
        html += '<td>' + item.salary + '</td>';
        html += '<td>' + item.department + '</td>';
        html += '<td><a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateEmp" onclick="return getbyID(' + item.id + ')">Edit</a>  <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal"  onclick="ConfirmDelete(' + item.id + ')">Delete</a></td>';
        html += '</tr>';
    });
    
    $("#tbody").html(html);
}

function Add() {
    var empData = {
        name: $('#Name').val(),
        salary: $('#Salary').val(),
        department: $('#Department').val()
    }
    $.ajax({
        url: '/Employee/AddEmp',
        type: 'Post',
        data: JSON.stringify(empData),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            alert("employee added successfully")
            console.log(response)
            window.reload(true);
        },
        error: function (xhr, status, error) {
            console.log("failed to get products: " + xhr.responseText);
        },
    })
}

function getbyID(id) {
    $.ajax({
        url: '/Employee/GetByIdEmp', // Endpoint URL
        type: 'GET',
        data: { id: id },
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            console.log(result.data.id);
            const name = result.name;
            $('#UId').val(result.data.id);
            $('#UName').val(result.data.name);
            $('#USalary').val(result.data.salary);
            $('#UDepartment').val(result.data.department);
        },
        error: function (xhr, status, error) {
            console.log("Failed to fetch employee details: " + xhr.responseText);
        }
    });

}

function ConfirmDelete(id) {
    $('#DId').val(id);
}

function Update() {
    var empData = {
        id: $('#UId').val(),
        name: $('#UName').val(),
        salary: $('#USalary').val(),
        department: $('#UDepartment').val()
    }
    console.log(empData)
    $.ajax({
        url: '/Employee/Update',
        type: 'Put',
        data: JSON.stringify(empData),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            alert("employee details updated successfully")
            console.log(response)
        },
        error: function (xhr, status, error) {
            console.log("failed to get products: " + xhr.responseText);
        },
    })
}


function ConfirmDelete(id) {
    $('#DId').val(id);
}
function Delete() {
    const id= $('#DId').val();
    $.ajax({
        url: '/Employee/DeleteByIdEmp',
        type: 'Post',
        data: { id: id },
        //contentType: 'application/json',
        //contentType: 'application/json;charset=utf-8',
        //dataType: 'json',
        success: function (response) {
            alert("employee details deleted successfully")
            console.log(response)
        },
        error: function (xhr, status, error) {
            console.log("failed to get products: " + xhr.responseText);
        },
    })
}




