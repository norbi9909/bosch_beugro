$(document).ready(function() {

    if(window.location.pathname === '/production'){
        $.ajax({
            url: "/get_product_data",
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
            },
            async: false,
            success: function(response) {
                let select = `<select class="form-select">`;
            select+='<option value=0>All</option>'
                response.forEach(element => {
                    select += `<option value="${element.id}">${element.pcb}</option>`
                });
                select += "</select>"
                $("#PCBSelect").html(select);
            }
        });

        $("#btnPCBQuery").click(function (){
            let selectValue = $("#PCBSelect option:selected").val();
            console.log(selectValue);
            $.ajax({
            url: `/list_products`,
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                pcbid:selectValue
            },
            async: false,
            success: function(response) {
                let table = `<table class="table">`;
                table+=`
                    <tr>
                        <td>ID</td>
                        <td>PCB ID</td>
                        <td>Quantity</td>
                        <td>Start Date</td>
                        <td>End Date</td>
                    </tr>`;
            response.forEach(element => {
                table += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.pcb_id}</td>
                        <td>${element.quantity}</td>
                        <td>${element.startDate}</td>
                        <td>${element.endDate}</td>
                        <td class="deletePCB" data-id=${element.id} style="color: red; cursor:pointer">X</td>
                    </tr>
                `;
            });
                table += "</table>";
                $("#PCBTable").html(table);

                $(".deletePCB").click(function () {
                    let deleteId = $(this).data("id");
                    var result = confirm("Are you certain that you want to delete this perticular production data from the database?");
                    if (result) {
                        $.ajax({
                            url: `/delete_production`,
                            type: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data: {
                                id:deleteId
                            },
                            async: false,
                        })
                        $(this).closest("tr").remove();

                    }
                    console.log(deleteId);
                })
            }
            })
        });
    }

    if(window.location.pathname === '/center'){
        $("#colorfulDiv").click(function (){
            let colorPool = ["green", "red", "brown","orange","purple"];
            let random = Math.floor(Math.random() * colorPool.length);
            $(this).parent().parent().css("backgroundColor", colorPool[random]);

            let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let passwordLength = 8;
            let password = "";
            for (var i = 0; i <= passwordLength; i++) {
                var randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber +1);
            }
            $(this).text(password);
        })

        $("#hide").click(function () {
            let colorPool = ["green", "red", "brown","orange","purple"];
            let random = Math.floor(Math.random() * colorPool.length);
            $(this).css("backgroundColor", colorPool[random]);
            let length = $("#colorfulDiv").text().length;
            let pw = "";
            for(let i = 0; i < length; i++){
                pw += "*";
            }
            $("#colorfulDiv").text(pw);
        })
    }
});
