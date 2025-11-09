$(document).ready(function () {
    const API_URL = "http://127.0.0.1:3000/api/v2/users";


    // ============================== VIEW USERS =================================================


    const $viewUser = $(`
        <div class="action-container" id="view-user">
            <h2>View Users</h2>
            <div class="view-by-id"></div>
            <div class="view-results"></div>
            <div class="view-all">
                <h3>All Users</h3>
                <div class="view-all-actions"></div>
            </div>
        </div>
    `);
    $("body").append($viewUser);
    $(".action-container").hide();




    //                         ============ DELETE USER ====================



    const $deleteUser = $(`
    <div class="action-container" id="delete-user">
        <h2>Delete Users</h2>
        <div class="delete-by-id">
            <h3>Delete User by ID</h3>
            <input type="text" placeholder="Enter User ID" class="delete-user-id" />
            <button class="delete-user-btn">Delete</button>
        </div>
        <div class="delete-results"></div>
        <div class="delete-all">
            <h3>All Users</h3>
            <div class="delete-all-actions">
                <button class="delete-all-btn">Delete All Users</button>
            </div>
        </div>
    </div>
    `);
    $("body").append($deleteUser);
    $(".action-container").hide();







    //    ================================================  ADD USER  ============================= 




    const $addUser = $(`
        <div class="action-container" id="add-user">
            <h2>Add New User</h2>
            <div class="signup-page"></div>
            <p>
                <span id="dt">By confirming, a new user will be added. Click save to confirm</span>
                <button type="submit" id="btn-add-user">SAVE</button>
            </p>
            <div class="add-user-result"></div>
        </div>
    `);
    $("body").append($addUser);
    $(".action-container").hide()


    // Add form fields dynamically
    const $signupPage = $addUser.find(".signup-page");
    const fields = [
        { name: "id", placeholder: "ID", type: "text" },
        { name: "FirstName", placeholder: "First Name", type: "text" },
        { name: "LastName", placeholder: "Last Name", type: "text" },
        { name: "dob", placeholder: "Date of Birth", type: "date" },
        { name: "date_created", placeholder: "Date Created", type: "date" },
    ];
    fields.forEach(f => {
        const $input = $(`<input type="${f.type}" name="${f.name}" placeholder="${f.placeholder}" required>`);
        $signupPage.append($input);
    });


// ===========================================================================================================

// ======================== orders html =======================================================


    const $ordersHTML = $(`
    <div class="action-container" id="delete-user">
        <h2>Delete Users</h2>
        <div class="delete-by-id">
            <h3>Delete User by ID</h3>
            <input type="text" placeholder="Enter User ID" class="delete-user-id" />
            <button class="delete-user-btn">Delete</button>
        </div>
        <div class="delete-results"></div>
        <div class="delete-all">
            <h3>All Users</h3>
            <div class="delete-all-actions">
                <button class="delete-all-btn">Delete All Users</button>
            </div>
        </div>
    </div>
    `);
    $("body").append($ordersHTML);
    $(".action-container").hide();
    



    //                  ================= NAVIGATION CLICK ================= 


    $(".nb a").click(function (e) {
        e.preventDefault();
        const action = $(this).text().trim().toLowerCase();

        $(".action-container").hide();

        if (action === "view users") {
            $viewUser.show();
            fetchAllUsers();
        } else if (action === "orders") {   
            $ordersHTML.show();
            $ordersHTML.find(".add-user-result").empty();
            fetchAllOrdersForDelete()
        } else if (action === "delete") {     
            $deleteUser.show();
            $deleteUser.find(".delete-results").empty();
            fetchAllUsersForDelete();        
        }
    });

    // Use delegated click for delete buttons in dynamic tables
    $deleteUser.on("click", ".delete-user-btn-row", function () {
        const userId = $(this).data("id");
        deleteUserById(userId);
    });


// ==============================================================================================



    /** ================= FETCH ALL USERS ================= */
    function fetchAllUsers() {
        const $allContainer = $viewUser.find(".view-all-actions");
        const $resultsContainer = $viewUser.find(".view-results");

        $allContainer.html("<p>Loading users...</p>");
        $resultsContainer.empty();

        $.get(API_URL)
            .done(res => {
                const users = res.data?.user || [];
                $allContainer.empty();

                if (users.length === 0) {
                    $allContainer.append("<p>No users found.</p>");
                    return;
                }

                const $table = $(`
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);

                users.forEach(user => {
                    $table.find("tbody").append(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.FirstName}</td>
                            <td>${user.LastName}</td>
                            <td>${new Date(user.dob).toLocaleDateString()}</td>
                            <td>${new Date(user.date_created).toLocaleDateString()}</td>
                        </tr>
                    `);
                });

                $allContainer.append($table);
            })
            .fail(() => {
                $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
            });
    }



//================================================================================================

    /** ================= VIEW USER BY SINGLE INPUT SEARCH ================= */
    const $viewIdContainer = $viewUser.find(".view-by-id");
    $viewIdContainer.empty();

    const $inputSearch = $('<input type="text" placeholder="Enter any user detail to search">');
    const $btnSearch = $('<button>Search Users</button>');
    $viewIdContainer.append($inputSearch, $btnSearch);

    $btnSearch.click(() => {
        const $resultsContainer = $viewUserList.find(".td-results");
        const searchValueTodelet = $inputSearch.val().trim().toLowerCase();

        if (!searchValueTodelet) {
            alert("Please enter a value to search.");
            $resultsContainer.empty();
            return;
        }

        $resultsContainer.html("<p>Searching users...</p>");

        $.get(API_URL)
            .done(res => {
                const users = res.data?.user || [];

                // Filter users by any field
                const filtered = users.filter(user => {
                    return Object.keys(user).some(key => {
                        if (!user[key]) return false;
                        return user[key].toString().toLowerCase().includes(searchValue);
                    });
                });

                $resultsContainer.empty();
                if (filtered.length === 0) {
                    $resultsContainer.html("<p>No matching users found.</p>");
                    return;
                }

                const $table = $(`
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);

                filtered.forEach(user => {
                    $table.find("tbody").append(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.FirstName}</td>
                            <td>${user.LastName}</td>
                            <td>${new Date(user.dob).toLocaleDateString()}</td>
                            <td>${new Date(user.date_created).toLocaleDateString()}</td>
                        </tr>
                    `);
                });

                $resultsContainer.append($table);
            })
            .fail(() => {
                $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
            });
    });

 // ==============================================================================================



 //                      ================= ADD USER ================= 


    const $btnAddUser = $addUser.find("#btn-add-user");
    $btnAddUser.click(() => {
        const userData = {};
        $signupPage.find("input").each(function () {
            let name = $(this).attr("name");
            let value = $(this).val().trim();

            // Default current date if date_created is empty
            if (name === "date_created" && !value) value = new Date().toISOString();

            userData[name] = value;
        });

        // // Validation according to schema
         if (!userData.id || !userData.FirstName || !userData.LastName || !userData.dob) {
             alert("Please fill in all required fields.");
             return;
         }

        $.ajax({
        url: API_URL,
        method: "POST",
        data: JSON.stringify(userData),
        contentType: "application/json",
        success: function () {
            $addUser.find(".add-user-result").html(`<p style="color:green;">User added successfully!</p>`);
            $signupPage.find("input").val(""); // Clear form
            fetchAllUsers();
        },
        error: function (err) {
            $addUser.find(".add-user-result").html(`<p style="color:red;">${err.responseJSON?.message || "Failed to add user."}</p>`);
        }
});

    });






    //               ================= FUNCTION TO FATCH USER AND DELETE========================



    function fetchAllUsersAndDelete() {
    const $allContainerTodelete = $deleteUser.find(".view-all-actions");
    const $resultsContainer = $viewUser.find(".view-results");
    


    $allContainer.html("<p>Loading users...</p>");
    $resultsContainer.empty();

        $.get(API_URL)
            .done(res => {
                const users = res.data?.user || [];
                $allContainer.empty();

                if (users.length === 0) {
                    $allContainer.append("<p>No users found.</p>");
                    return;
                }

                const $table = $(`
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);

                users.forEach(user => {
                    $table.find("tbody").append(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.FirstName}</td>
                            <td>${user.LastName}</td>
                            <td>${new Date(user.dob).toLocaleDateString()}</td>
                            <td>${new Date(user.date_created).toLocaleDateString()}</td>
                        </tr>
                    `);
                });

                $allContainer.append($table);
            })
            .fail(() => {
                $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
            });
    }


    //   ================= FETCH ALL USERS FOR DELETE ================= 



    function fetchAllUsersForDelete() {
        const $allContainer = $deleteUser.find(".delete-all-actions");
        const $resultsContainer = $deleteUser.find(".delete-results");

        $allContainer.html("<p>Loading users...</p>");
        $resultsContainer.empty();

        $.get(API_URL)
            .done(res => {
                const users = res.data?.user || [];
                $allContainer.empty();

                if (users.length === 0) {
                    $allContainer.append("<p>No users found.</p>");
                    return;
                }

                const $table = $(`
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);

                users.forEach(user => {
                    $table.find("tbody").append(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.FirstName}</td>
                            <td>${user.LastName}</td>
                            <td>${new Date(user.dob).toLocaleDateString()}</td>
                            <td>${new Date(user.date_created).toLocaleDateString()}</td>
                            <td>
                                <button class="delete-user-btn-row" data-id="${user._id}">Deslete</button>
                            </td>
                        </tr>
                    `);
                });

                $allContainer.append($table);

                // Attach click handler for delete buttons
                $table.find(".delete-user-btn-row").click(function () {
                    const userId = $(this).data("_id");
                    deleteUserById(userId);
                });
            })
            .fail(() => {
                $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
            });
    }




    // ====================== DELETE USER BY ID ================================== 





    function deleteUserById(userId) {
        const $resultsContainer = $deleteUser.find(".delete-results");

        $.ajax({
            url: `${API_URL}/${userId}`,
            type: "DELETE",
            success: () => {
                $resultsContainer.html(`<p style="color:green;">User ${userId} deleted successfully.</p>`);
                fetchAllUsersForDelete(); // refresh table
            },
            error: () => {
                $resultsContainer.html(`<p style="color:red;">Failed to delete user ${userId}.</p>`);
            }
        });
    }




    // =================================== SEARCH USER FOR DELETE =============================================




//     const $deleteIdContainer = $deleteUser.find(".delete-by-id");
//     $deleteIdContainer.empty();

//     const $inputSearchDelete = $('<input type="text" placeholder="Enter any user detail to search">');
//     const $btnSearchDelete = $('<button>Search Users</button>');
//     $deleteIdContainer.append($inputSearchDelete, $btnSearchDelete);

//     $btnSearchDelete.click(() => {
//         const $resultsContainer = $deleteUser.find(".delete-results");
//         const searchValue = $inputSearchDelete.val().trim().toLowerCase();

//         if (!searchValue) {
//             alert("Please enter a value to search.");
//             $resultsContainer.empty();
//             return;
//         }

//         $resultsContainer.html("<p>Searching users...</p>");

//         $.get(API_URL)
//             .done(res => {
//                 const users = res.data?.user || [];

//                 const filtered = users.filter(user => {
//                     return Object.keys(user).some(key => {
//                         if (!user[key]) return false;
//                         return user[key].toString().toLowerCase().includes(searchValue);
//                     });
//                 });

//                 $resultsContainer.empty();
//                 if (filtered.length === 0) {
//                     $resultsContainer.html("<p>No matching users found.</p>");
//                     return;
//                 }

//                 const $table = $(`
//                     <table class="users-table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>First Name</th>
//                                 <th>Last Name</th>
//                                 <th>Date of Birth</th>
//                                 <th>Date Created</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody></tbody>
//                     </table>
//                 `);

//                 filtered.forEach(user => {
//                     $table.find("tbody").append(`
//                         <tr>
//                             <td>${user.id}</td>
//                             <td>${user.FirstName}</td>
//                             <td>${user.LastName}</td>
//                             <td>${new Date(user.dob).toLocaleDateString()}</td>
//                             <td>${new Date(user.date_created).toLocaleDateString()}</td>
//                             <td>
//                                 <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
//                             </td>
//                         </tr>
//                     `);
//                 });

//                 $resultsContainer.append($table);

//                 // Attach click handler for delete buttons in search results
//                 $table.find(".delete-user-btn-row").click(function () {
//                     const userId = $(this).data("_id");
//                     deleteUserById(userId);
//                 });
//             })
//             .fail(() => {
//                 $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
//             });
//     });

// // ================================================================================================
























function fetchAllOrdersForDelete() {
        const $allContainer = $deleteUser.find(".delete-all-actions");
        const $resultsContainer = $deleteUser.find(".delete-results");

        $allContainer.html("<p>Loading users...</p>");
        $resultsContainer.empty();

        $.get(API_URL)
            .done(res => {
                const users = res.data?.user || [];
                $allContainer.empty();

                if (users.length === 0) {
                    $allContainer.append("<p>No users found.</p>");
                    return;
                }

                const $table = $(`
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);

                users.forEach(user => {
                    $table.find("tbody").append(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.FirstName}</td>
                            <td>${user.LastName}</td>
                            <td>${new Date(user.dob).toLocaleDateString()}</td>
                            <td>${new Date(user.date_created).toLocaleDateString()}</td>
                            <td>
                                <button class="delete-user-btn-row" data-id="${user._id}">Deslete</button>
                            </td>
                        </tr>
                    `);
                });

                $allContainer.append($table);

                // Attach click handler for delete buttons
                $table.find(".delete-user-btn-row").click(function () {
                    const userId = $(this).data("_id");
                    deleteUserById(userId);
                });
            })
            .fail(() => {
                $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
            });
    }




    // ====================== DELETE USER BY ID ================================== 





    function deleteUserById(userId) {
        const $resultsContainer = $deleteUser.find(".delete-results");

        $.ajax({
            url: `${API_URL}/${userId}`,
            type: "DELETE",
            success: () => {
                $resultsContainer.html(`<p style="color:green;">User ${userId} deleted successfully.</p>`);
                fetchAllUsersForDelete(); // refresh table
            },
            error: () => {
                $resultsContainer.html(`<p style="color:red;">Failed to delete user ${userId}.</p>`);
            }
        });
    }




    // =================================== SEARCH USER FOR DELETE =============================================




    const $deleteIdContainer = $deleteUser.find(".delete-by-id");
    $deleteIdContainer.empty();

    const $inputSearchDelete = $('<input type="text" placeholder="Enter any user detail to search">');
    const $btnSearchDelete = $('<button>Search Users</button>');
    $deleteIdContainer.append($inputSearchDelete, $btnSearchDelete);

    $btnSearchDelete.click(() => {
        const $resultsContainer = $deleteUser.find(".delete-results");
        const searchValue = $inputSearchDelete.val().trim().toLowerCase();

        if (!searchValue) {
            alert("Please enter a value to search.");
            $resultsContainer.empty();
            return;
        }

        $resultsContainer.html("<p>Searching users...</p>");

        $.get(API_URL)
            .done(res => {
                const users = res.data?.user || [];

                const filtered = users.filter(user => {
                    return Object.keys(user).some(key => {
                        if (!user[key]) return false;
                        return user[key].toString().toLowerCase().includes(searchValue);
                    });
                });

                $resultsContainer.empty();
                if (filtered.length === 0) {
                    $resultsContainer.html("<p>No matching users found.</p>");
                    return;
                }

                const $table = $(`
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `);

                filtered.forEach(user => {
                    $table.find("tbody").append(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.FirstName}</td>
                            <td>${user.LastName}</td>
                            <td>${new Date(user.dob).toLocaleDateString()}</td>
                            <td>${new Date(user.date_created).toLocaleDateString()}</td>
                            <td>
                                <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
                            </td>
                        </tr>
                    `);
                });

                $resultsContainer.append($table);

                // Attach click handler for delete buttons in search results
                $table.find(".delete-user-btn-row").click(function () {
                    const userId = $(this).data("_id");
                    deleteUserById(userId);
                });
            })
            .fail(() => {
                $resultsContainer.html(`<p style="color:red;">Failed to fetch users.</p>`);
            });
    });
});
