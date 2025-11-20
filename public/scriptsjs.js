document.addEventListener("DOMContentLoaded", function () {

    const mainContent = document.querySelector('main.content');

    // Keep track of previously added section
    let activeSection = null;
    const API_URL = "http://127.0.0.1:3000/api/v2/users";
    const API_URL_ORDERS = "http://127.0.0.1:3000/api/v2/orders";
    const API_URL_REQ = "http://127.0.0.1:3000/api/v2/requisitions";




    // ================================== VIEW USERS ================================================= 

    // Select the main content wrapper
    const $content = document.querySelector(".content");

    // Create the View Users container
    const $viewUser = document.createElement("div");
    $viewUser.className = "action-container";
    $viewUser.id = "view-user";
    $viewUser.innerHTML = `
        <h2>View Users</h2>
        <div class="view-by-id"></div>
        <div class="view-results"></div>
        <div class="view-all">
            <h3>All Users</h3>
            <div class="view-all-actions"></div>
        </div>
    `;

    // Append it inside the content wrapper
    $content.appendChild($viewUser);

    // Hide all other action containers except the dashboard initially
    document.querySelectorAll(".action-container").forEach(el => {
        if (el.id !== "dashboard") {
            el.style.display = "none";
        }
    });

    // Optional: Show dashboard by default
    const $dashboard = document.getElementById("dashboard");
    if ($dashboard) $dashboard.style.display = "block";


    const $viewOrder = document.createElement("div");
    $viewOrder.className = "action-container";
    $viewOrder.id = "view-user";
    $viewOrder.innerHTML = `
        <h2>View Users</h2>
        <div class="view-by-id"></div>
        <div class="view-results"></div>
        <div class="view-all">
            <h3>All Users</h3>
            <div class="view-all-actions"></div>
        </div>
    `;
    document.body.appendChild($viewOrder);
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");




    

    // ====================================== DELETE USER ============================================



    const $deleteUser = document.createElement("div");
    $deleteUser.className = "action-container";
    $deleteUser.id = "delete-user";
    $deleteUser.innerHTML = `
        <h2>Users</h2>
        <div class="delete-by-id">
            <input type="text" placeholder="Enter User ID" class="delete-user-id" />
        </div>
        <div class="delete-results"></div>
        <div class="delete-all">
            <h3>All Users</h3>
            <div class="delete-all-actions">
                <button class="delete-all-btn">Delete All Users</button>
            </div>
        </div>
    `;
    document.body.appendChild($deleteUser);
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");



    



    // ==================================== ADD USER ===============================================



    const $addUser = document.createElement("div");
    $addUser.className = "action-container";
    $addUser.id = "add-user";
    $addUser.innerHTML = `
        <h2>Add New User</h2>
        <div class="signup-page"></div>
        <p>
            <span id="dt">By confirming, a new user will be added. Click save to confirm</span>
            <button type="submit" id="btn-add-user">SAVE</button>
        </p>
        <div class="add-user-result"></div>
    `;
    document.body.appendChild($addUser);
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");

    // Add form fields dynamically
    const $signupPage = $addUser.querySelector(".signup-page");
    const fields = [
        { name: "id", placeholder: "ID", type: "text" },
        { name: "FirstName", placeholder: "First Name", type: "text" },
        { name: "LastName", placeholder: "Last Name", type: "text" },
        { name: "dob", placeholder: "Date of Birth", type: "date" },
        { name: "date_created", placeholder: "Date Created", type: "date" },
    ];
    fields.forEach(f => {
        const $input = document.createElement("input");
        $input.type = f.type;
        $input.name = f.name;
        $input.placeholder = f.placeholder;
        $input.required = true;
        $signupPage.appendChild($input);
    });


    //===========================    Model for update form ======================================




    const $updateModal = document.createElement("div");
    $updateModal.className = "update-modal hidden";
    $updateModal.innerHTML = `
    <div class="update-modal-content">
        <h2>Update User</h2>
        <form id="update-user-form" class="update-form">
        <input type="text" name="id" placeholder="ID" readonly />
        <input type="text" name="FirstName" placeholder="First Name" required />
        <input type="text" name="LastName" placeholder="Last Name" required />
        <input type="date" name="dob" placeholder="Date of Birth" required />
        <input type="date" name="date_created" placeholder="Date Created" required />
        <div class="update-actions">
            <button type="submit" class="save-update-btn">Save Changes</button>
            <button type="button" class="cancel-update-btn">Cancel</button>
        </div>
        </form>
    </div>
    `;
    document.body.appendChild($updateModal);












    //  ======================================== Orders HTML =================================================

    const $orderHTML = document.createElement("div");
    $orderHTML.className = "action-container";
    $orderHTML.id = "delete-user";
    $orderHTML.innerHTML = `
        <h2>Orders</h2>
        <div class="delete-by-id">
            <input type="text" placeholder="Enter User ID" class="delete-user-id" />
        </div>
        <div class="delete-results"></div>
        <div class="delete-all">
            <h3>All Orders</h3>
            <div class="delete-all-actions">
                <button class="delete-all-btn">Delete All Users</button>
            </div>
        </div>
    `;
    $content.appendChild($orderHTML);

    // Hide all other action containers except the dashboard initially
    document.querySelectorAll(".action-container").forEach(el => {
        if (el.id !== "dashboard") {
            el.style.display = "none";
        }
    });


    // ============================== Update Orders ==============================================


    const $updateOrderModal = document.createElement("div");
    $updateOrderModal.className = "update-modal hidden";
    $updateOrderModal.id = "updateOrderModal";
    $updateOrderModal.innerHTML = `
    <div class="update-modal-content">
        <h2>Update order</h2>
        <form id="update-order-form" class="update-form">
        <input type="text" name="id" placeholder="ID" readonly />
        <input type="text" name="po_number" placeholder="Number" required />
        <input type="date" name="po_date" placeholder="Date" required />
        <input type="text" name="po_amout" placeholder="Amount" required />
        <input type="text" name="po_department" placeholder="Department" required />
        <input type="text" name="po_approval_name" placeholder="Approval Name" required />
        <input type="date" name="po_approval_date" placeholder="Approval Date" required />
        <div class="update-actions">
            <button type="submit" class="save-update-btn">Save Changes</button>
            <button type="button" class="cancel-update-btn">Cancel</button>
        </div>
        </form>
    </div>
    `;
    document.body.appendChild($updateOrderModal);




    
    const $addOrder = document.createElement("div");
    $addOrder.className = "action-container";
    $addOrder.id = "add-user";
    $addOrder.innerHTML = `
        <h2>Add New Order</h2>
        <div class="signup-page"></div>
        <p>
            <span id="dt">By confirming, a new order will be added. Click save to confirm</span>
            <button type="submit" id="btn-add-user">SAVE</button>
        </p>
        <div class="add-user-result"></div>
    `;
    document.body.appendChild($addOrder);
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");

    // Add form fields dynamically
    const $addOrderPage = $addOrder.querySelector(".signup-page");
    const OrderFields = [
        { name: "id", placeholder: "ID", type: "text" },
        { name: "po_number", placeholder: "Number", type: "number" },
        { name: "po_date", placeholder: "Date", type: "date" },
        { name: "po_amout", placeholder: "Amount", type: "number" },
        { name: "po_department", placeholder: "Department", type: "text" },
        { name: "po_approval_name", placeholder: "Approval Name", type: "text" },
        { name: "po_approval_date", placeholder: "Approval Date", type: "date"}
    ];
    OrderFields.forEach(f => {
        const $input = document.createElement("input");
        $input.type = f.type;
        $input.name = f.name;
        $input.placeholder = f.placeholder;
        $input.required = true;
        $addOrderPage.appendChild($input);
    });


    

    const $deleteOrder = document.createElement("div");
    $deleteOrder.className = "action-container";
    $deleteOrder.id = "delete-user";
    $deleteOrder.innerHTML = `
        <h2>Orders</h2>
        <div class="delete-by-id">
            <input type="text" placeholder="Enter User ID" class="delete-user-id" />
        </div>
        <div class="delete-results"></div>
        <div class="delete-all">
            <h3>All Users</h3>
            <div class="delete-all-actions">
                <button class="delete-all-btn">Delete All Users</button>
            </div>
        </div>
    `;
    document.body.appendChild($deleteOrder);
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");


    //===========================    Model for update form ======================================




    const $orderUpdateModal = document.createElement("div");
    $orderUpdateModal.className = "update-modal hidden";
    $orderUpdateModal.innerHTML = `
    <div class="update-modal-content">
        <h2>Update orders</h2>
        <form id="update-user-form" class="update-form">
        <input type="text" name="id" placeholder="ID" readonly />
        <input type="date" name="po_date" placeholder="Date" required />
        <input type="number" name="po_amount" placeholder="Amount" required />
        <input type="text" name="po_department" placeholder="Department" required />
        <input type="text" name="po_approval_name" placeholder="Approval Name" required />
        <input type="date> name="po_approval_date" placeholder="Approval Date", required/>
        <div class="update-actions">
            <button type="submit" class="save-update-btn">Save Changes</button>
            <button type="button" class="cancel-update-btn">Cancel</button>
        </div>
        </form>
    </div>
    `;
    document.body.appendChild($orderUpdateModal);



    // ============================== NAVIGATION CLICK ===========================================



    // Select all sidebar menu links
    document.querySelectorAll(".sidebar .menu a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            // Get the action text in lowercase
            const action = this.textContent.trim().toLowerCase();

            // Hide all action containers except dashboard
            document.querySelectorAll(".action-container").forEach(el => {
                if (el.id !== "dashboard") {
                    el.style.display = "none";
                }
            });

            // Show dashboard only if clicked explicitly
            if (action === "dashboard") {
                document.getElementById("dashboard").style.display = "block";
            } else {
                // Hide dashboard when other items are clicked
                document.getElementById("dashboard").style.display = "none";

                // Show the selected section
                if (action === "users") {
                    $viewUser.style.display = "block";
                    fetchAllUsers();
                } else if (action === "requisitions") {
                    $requisitionHTML.style.display = "block";
                    $deleteUser.querySelector(".delete-results").innerHTML = "";
                    fetchAllRquistionsForUpdate();
                } else if (action === "orders") {
                    $orderHTML.style.display = "block";
                    $orderHTML.querySelector(".delete-results").innerHTML = "";
                    $deleteUser.querySelector(".delete-results").innerHTML = "";
                    fetchAllOrderForUpdate();
                }
            }
        });
    });

    // Show dashboard by default on page load
    window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("dashboard").style.display = "block";
    });


    // Delegated click for delete buttons in dynamic tables


        // Delegated click for delete buttons in dynamic tables
    $orderHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-user-btn-row")) {
            const orderId = e.target.dataset.id;
            deleteOrderById(orderId);
        }
    });


    // =========================== FETCH ALL USERS =============================================
    
    

    function fetchAllUsers() {
        const $allContainer = $viewUser.querySelector(".view-all-actions");
        const $resultsContainer = $viewUser.querySelector(".view-results");

        $allContainer.innerHTML = "<p>Loading users...</p>";
        $resultsContainer.innerHTML = "";

        fetch(API_URL)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                $allContainer.innerHTML = "";

                if (users.length === 0) {
                    $allContainer.innerHTML = "<p>No users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
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
                `;

                users.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.FirstName}</td>
                        <td>${user.LastName}</td>
                        <td>${new Date(user.dob).toLocaleDateString()}</td>
                        <td>${new Date(user.date_created).toLocaleDateString()}</td>
                    `;
                    $table.querySelector("tbody").appendChild(row);
                });

                $allContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    }





    // =========================== VIEW USER BY SINGLE INPUT SEARCH ========================================
    
    


    const $viewIdContainer = $viewUser.querySelector(".view-by-id");
    $viewIdContainer.innerHTML = "";

    const $inputSearch = document.createElement("input");
    $inputSearch.type = "text";
    $inputSearch.placeholder = "Enter any user detail to search";

    const $btnSearch = document.createElement("button");
    $btnSearch.textContent = "Search Users";

    $viewIdContainer.append($inputSearch, $btnSearch);

    $btnSearch.addEventListener("click", () => {
        const $resultsContainer = $viewUser.querySelector(".td-results");
        const searchValueTodelet = $inputSearch.value.trim().toLowerCase();

        if (!searchValueTodelet) {
            alert("Please enter a value to search.");
            $resultsContainer.innerHTML = "";
            return;
        }

        $resultsContainer.innerHTML = "<p>Searching users...</p>";

        fetch(API_URL)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                const filtered = users.filter(user => {
                    return Object.keys(user).some(key => {
                        if (!user[key]) return false;
                        return user[key].toString().toLowerCase().includes(searchValueTodelet);
                    });
                });

                $resultsContainer.innerHTML = "";

                if (filtered.length === 0) {
                    $resultsContainer.innerHTML = "<p>No matching users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
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
                `;

                filtered.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.FirstName}</td>
                        <td>${user.LastName}</td>
                        <td>${new Date(user.dob).toLocaleDateString()}</td>
                        <td>${new Date(user.date_created).toLocaleDateString()}</td>
                    `;
                    $table.querySelector("tbody").appendChild(row);
                });

                $resultsContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    });

    

    // ============================================= ADD USER ==================================================





    







   // ================= FUNCTION TO FETCH USERS AND DELETE ===============================



    function fetchAllUsersForDelete() {
        const $allContainer = $deleteUser.querySelector(".delete-all-actions");
        const $resultsContainer = $deleteUser.querySelector(".delete-results");

        $allContainer.innerHTML = "<p>Loading users...</p>";
        $resultsContainer.innerHTML = "";

        fetch(API_URL)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                $allContainer.innerHTML = "";

                if (users.length === 0) {
                    $allContainer.innerHTML = "<p>No users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
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
                `;

                users.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.FirstName}</td>
                        <td>${user.LastName}</td>
                        <td>${new Date(user.dob).toLocaleDateString()}</td>
                        <td>${new Date(user.date_created).toLocaleDateString()}</td>
                        <td>
                            <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
                        </td>
                    `;
                    row.querySelector(".delete-user-btn-row").addEventListener("click", () => deleteUserById(user._id));
                    $table.querySelector("tbody").appendChild(row);
                });

                $allContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    }





    // // ==================================== DELETE USER BY ID ========================================
    
    
    function deleteUserById(userId) {
        const $resultsContainer = $deleteUser.querySelector(".delete-results");

        fetch(`${API_URL}/${userId}`, { method: "DELETE" })
            .then(() => {
                $resultsContainer.innerHTML = `<p style="color:green;">User ${userId} deleted successfully.</p>`;
                fetchAllUsersForUpdate();
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to delete user ${userId}.</p>`;
            });
    }


    $deleteUser.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-user-btn-row")) {
        const userId = e.target.dataset.id;
        deleteUserById(userId);
    }
    });




    // ================= SEARCH USER FOR DELETE =================================================




    // Select the container (do NOT empty it)
    const $deleteIdContainer = $deleteUser.querySelector(".delete-by-id");

    // Select the existing input (we’ll use or add next to it)
    const existingInput = $deleteIdContainer.querySelector("input");
    

    // ✅ Create new Search input if not already there
    const $inputSearchDelete = existingInput || document.createElement("input");
    $inputSearchDelete.type = "text";
    $inputSearchDelete.placeholder = "Enter any user detail to search";
    $inputSearchDelete.classList.add("search-input");

    // ✅ Create Search button
    const $btnSearchDelete = document.createElement("button");
    $btnSearchDelete.textContent = "Search";
    $btnSearchDelete.classList.add("search-btn");

    // ✅ Create Add User button
    const $btnAddUser = document.createElement("button");
    $btnAddUser.textContent = "Add User";
    $btnAddUser.classList.add("add-user-btn");

    // ✅ Insert them without clearing existing HTML
    $deleteIdContainer.append($inputSearchDelete, $btnSearchDelete, $btnAddUser);

    // ========== ADD FUNCTIONALITY ==========
    // Add user click handler
    $btnAddUser.addEventListener("click", () => {
    // Hide other action containers if needed
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");

    // Show the add user form
    $addUser.style.display = "block";

    // Optionally scroll into view
    $addUser.scrollIntoView({ behavior: "smooth" });
    });


    const $btnSave = $addUser.querySelector("#btn-add-user");

    $btnSave.addEventListener("click", () => {
        const userData = {};
        $signupPage.querySelectorAll("input").forEach(input => {
            let name = input.name;
            let value = input.value.trim();

            if (name === "id") value = value.toUpperCase();
            if (name === "date_created" && !value) value = new Date().toISOString();

            userData[name] = value;
        });

        // Required field check
        if (!userData.id || !userData.FirstName || !userData.LastName || !userData.dob) {
            alert("Please fill in all required fields.");
            return;
        }

        // Submit to API
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to add user.");
                return data;
            })
            .then(() => {
                $addUser.querySelector(".add-user-result").innerHTML =
                    `<p style="color:green;">User added successfully!</p>`;
                $signupPage.querySelectorAll("input").forEach(input => input.value = "");

                        fetchAllUsersForUpdate();
                        setTimeout(() => {
                            // Hide Add User form
                            $addUser.style.display = "none";

                            // Show Users container
                            $deleteUser.style.display = "block";

                            // Scroll to Users section
                            $deleteUser.scrollIntoView({ behavior: "smooth" });
                        }, 500);
                
            })
            
            .catch(err => {
                $addUser.querySelector(".add-user-result").innerHTML =
                    `<p style="color:red;">${err.message || "Failed to add user."}</p>`;
            });
    });



    // ========== SEARCH FUNCTIONALITY ==========
    $btnSearchDelete.addEventListener("click", () => {
        const $resultsContainer = $deleteUser.querySelector(".delete-results");
        const searchValue = $inputSearchDelete.value.trim().toLowerCase();

        if (!searchValue) {
            alert("Please enter a value to search.");
            $resultsContainer.innerHTML = "";
            return;
        }

        $resultsContainer.innerHTML = "<p>Searching users...</p>";

        fetch(API_URL)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                const filtered = users.filter(user => {
                    return Object.keys(user).some(key => {
                        if (!user[key]) return false;
                        return user[key].toString().toLowerCase().includes(searchValue);
                    });
                });

                $resultsContainer.innerHTML = "";

                if (filtered.length === 0) {
                    $resultsContainer.innerHTML = "<p>No matching users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
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
                `;

                filtered.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.FirstName}</td>
                        <td>${user.LastName}</td>
                        <td>${new Date(user.dob).toLocaleDateString()}</td>
                        <td>${new Date(user.date_created).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${user._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
                        </td>
                    `;
                    row.querySelector(".delete-user-btn-row")
                        .addEventListener("click", () => deleteUserById(user._id));
                    row.querySelector(".update-user-btn")
                        .addEventListener("click", () => updateUserById(user._id));
                    $table.querySelector("tbody").appendChild(row);
                });

                $resultsContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    });





    //======================================= Function to fatch Users and update =====================================


    function fetchAllUsersForUpdate() {
        const $allContainer = $deleteUser.querySelector(".delete-all-actions");
        const $resultsContainer = $deleteUser.querySelector(".delete-results");

        $allContainer.innerHTML = "<p>Loading users...</p>";
        $resultsContainer.innerHTML = "";

        fetch(API_URL)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                $allContainer.innerHTML = "";

                if (users.length === 0) {
                    $allContainer.innerHTML = "<p>No users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                users.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.FirstName}</td>
                        <td>${user.LastName}</td>
                        <td>${new Date(user.dob).toLocaleDateString()}</td>
                        <td>${new Date(user.date_created).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${user._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
                        </td>
                    `;

                    // Add event listeners for both buttons
                    row.querySelector(".delete-user-btn-row").addEventListener("click", () => deleteUserById(user._id));
                    row.querySelector(".update-user-btn").addEventListener("click", () => updateUserById(user._id));

                    $table.querySelector("tbody").appendChild(row);
                });

                $allContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    }


    

    function updateUserById(userId) {
        const form = document.querySelector("#update-user-form");
        $updateModal.classList.remove("hidden");
        form.reset();

        // Fetch the user's data
        fetch(`${API_URL}/${userId}`)
            .then(res => res.json())
            .then(data => {
                const user = data.user || data.data?.user || data.data || data || {};
                console.log("Fetched user data:", user);

                // Fill in form fields
                form.querySelector("[name='id']").value = user.id || user._id || ""; 
                form.querySelector("[name='FirstName']").value = user.FirstName || "";
                form.querySelector("[name='LastName']").value = user.LastName || "";
                form.querySelector("[name='dob']").value = user.dob
                    ? new Date(user.dob).toISOString().split("T")[0]
                    : "";
                form.querySelector("[name='date_created']").value = user.date_created
                    ? new Date(user.date_created).toISOString().split("T")[0]
                    : "";

                // Store the backend _id in a hidden input for PATCH
                let hiddenIdInput = form.querySelector("[name='_id']");
                if (!hiddenIdInput) {
                    hiddenIdInput = document.createElement("input");
                    hiddenIdInput.type = "hidden";
                    hiddenIdInput.name = "_id";
                    form.appendChild(hiddenIdInput);
                }
                hiddenIdInput.value = user._id || user.id || "";
            })
            .catch(err => {
                console.error("Failed to load user details:", err);
                alert("Failed to load user details.");
                $updateModal.classList.add("hidden");
            });
    }







    // =================================== Handle Save using PATCH ============================================


    document.querySelector("#update-user-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedUser = Object.fromEntries(formData.entries());

        // Use the hidden _id for backend
        const userId = updatedUser._id;
        const { id, _id, ...payload } = updatedUser; // remove frontend id and hidden _id from body

        console.log("Updating user:", userId, "with data:", payload);

        fetch(`${API_URL}/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(() => {
                alert("User updated successfully!");
                $updateModal.classList.add("hidden");
                fetchAllUsersForUpdate();
            })
            .catch(err => {
                alert("Failed to update user.");
            });
    });


    
    // --- Handle Cancel Button ---
    document.querySelector(".cancel-update-btn").addEventListener("click", () => {
        $updateModal.classList.add("hidden");
    });















//  =================================================================================                     ===


//=================================================== ORDER ==========================================================

















  // Select the container (do NOT empty it)
    const $orderContainer = $orderHTML.querySelector(".delete-by-id");

    // Select the existing input (we’ll use or add next to it)
    const existingInputOrder = $orderContainer.querySelector("input");
    

    // ✅ Create new Search input if not already there
    const $inputSearchOrder = existingInputOrder || document.createElement("input");
    $inputSearchOrder.type = "text";
    $inputSearchOrder.placeholder = "Enter any user detail to search";
    $inputSearchOrder.classList.add("search-input");

    // ✅ Create Search button
    const $btnSearchOrder = document.createElement("button");
    $btnSearchOrder.textContent = "Search";
    $btnSearchOrder.classList.add("search-btn");

    // ✅ Create Add User button
    const $btnAddOrder = document.createElement("button");
    $btnAddOrder.textContent = "Add Order";
    $btnAddOrder.classList.add("add-user-btn");

    // ✅ Insert them without clearing existing HTML
    $orderContainer.append($inputSearchOrder, $btnSearchOrder, $btnAddOrder);

    // ========== ADD FUNCTIONALITY ==========
    // Add user click handler
    $btnAddOrder.addEventListener("click", () => {
    // Hide other action containers if needed
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");

    // Show the add user form
    $addOrder.style.display = "block";

    // Optionally scroll into view
    $addOrder.scrollIntoView({ behavior: "smooth" });
    });


    const $btnOrderSave = $addOrder.querySelector("#btn-add-user");

    $btnOrderSave.addEventListener("click", () => {
        const orderData = {};
        $addOrderPage.querySelectorAll("input").forEach(input => {
            let name = input.name;
            let value = input.value.trim();

            if (name === "id") value = value.toUpperCase();
            if (name === "po_approval_date" && !value) value = new Date().toISOString();

            orderData[name] = value;
        });

        // Required field check
        if (!orderData.id || !orderData.po_number || !orderData.po_date || !orderData.po_amout || !orderData.po_department || !orderData.po_approval_name || !orderData.po_approval_date) {
            alert("Please fill in all required fields.");
            return;
        }

        // Submit to API
        fetch(API_URL_ORDERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to add order.");
                return data;
            })
            .then(() => {
                $addOrder.querySelector(".add-user-result").innerHTML =
                    `<p style="color:green;">Order added successfully!</p>`;
                $orderContainer.querySelectorAll("input").forEach(input => input.value = "");

                        fetchAllOrderForUpdate();
                        setTimeout(() => {
                            // Hide Add User form
                            $addOrder.style.display = "none";

                            // Show Users container
                            $orderHTML.style.display = "block";

                            // Scroll to Users section
                            $orderHTML.scrollIntoView({ behavior: "smooth" });
                        }, 500);
                
            })
            
            .catch(err => {
                $addOrder.querySelector(".add-user-result").innerHTML =
                    `<p style="color:red;">${err.message || "Failed to add order."}</p>`;
            });
    });



    // ========== SEARCH FUNCTIONALITY ==========
    $btnSearchOrder.addEventListener("click", () => {
        const $resultsContainer = $Ordertable.querySelector(".delete-results");
        const searchValue = $inputSearchOrder.value.trim().toLowerCase();

        if (!searchValue) {
            alert("Please enter a value to search.");
            $resultsContainer.innerHTML = "";
            return;
        }

        $resultsContainer.innerHTML = "<p>Searching users...</p>";

        fetch(API_URL_ORDERS)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                const filtered = users.filter(user => {
                    return Object.keys(user).some(key => {
                        if (!user[key]) return false;
                        return user[key].toString().toLowerCase().includes(searchValue);
                    });
                });

                $resultsContainer.innerHTML = "";

                if (filtered.length === 0) {
                    $resultsContainer.innerHTML = "<p>No matching users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Department</th>
                            <th>Approval Name</th>
                            <th>Approval Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                filtered.forEach(order => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.po_number}</td>
                        <td>${new Date(order.po_date).toLocaleDateString()}</td>
                        <td>${order.po_amout}</td>
                        <td>${order.po_department}</td>
                        <td>${order.po_approval_name}</td>
                        <td>${new Date(order.po_approval_date).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${order._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${order._id}">Delete</button>
                        </td>
                    `;
                    row.querySelector(".delete-user-btn-row")
                        .addEventListener("click", () => deleteOrderById(order._id));
                    row.querySelector(".update-user-btn")
                        .addEventListener("click", () => up(order._id));
                    $table.querySelector("tbody").appendChild(row);
                });

                $resultsContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch orders.</p>`;
            });
    });






    function deleteOrderById(orderId) { // pass the id as parameter
        const $resultsContainer = $deleteOrder.querySelector(".delete-results");

        fetch(`${API_URL_ORDERS}/${orderId}`, { method: "DELETE" })
            .then(() => {
                $resultsContainer.innerHTML = `<p style="color:green;">Order ${orderId} deleted successfully.</p>`;
                fetchAllOrderForUpdate();
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to delete order ${orderId}.</p>`;
            });
    }



















   function fetchAllOrderForUpdate() {
        const $allContainer = $orderHTML.querySelector(".delete-all-actions");
        const $resultsContainer = $orderHTML.querySelector(".delete-results");

        $allContainer.innerHTML = "<p>Loading users...</p>";
        $resultsContainer.innerHTML = "";

        fetch(API_URL_ORDERS)
            .then(res => res.json())
            .then(res => {
                const orders = res.data?.order || [];
                $allContainer.innerHTML = "";

                if (orders.length === 0) {
                    $allContainer.innerHTML = "<p>No users found.</p>";
                    return;
                }

                const $Ordertable = document.createElement("table");
                $Ordertable.className = "users-table";
                $Ordertable.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Department</th>
                            <th>Approval Name</th>
                            <th>Approval Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                orders.forEach(order => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.po_number}</td>
                        <td>${new Date(order.po_date).toLocaleDateString()}</td>
                        <td>${order.po_amout}</td>
                        <td>${order.po_department}</td>
                        <td>${order.po_approval_name}</td>
                        <td>${new Date(order.po_approval_date).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${order._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${order._id}">Delete</button>
                        </td>
                    `;

                    // Add event listeners for both buttons
                    row.querySelector(".delete-user-btn-row").addEventListener("click", () => deleteOrderById(order._id));
                    row.querySelector(".update-user-btn").addEventListener("click", () => updateOrdersById(order._id));

                    $Ordertable.querySelector("tbody").appendChild(row);
                });

                $allContainer.appendChild($Ordertable);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch orders.</p>`;
            });
    }




    function updateOrdersById(orderId) {
        const $updateOrderModal = document.querySelector("#updateOrderModal");
        const $orderForm = document.querySelector("#update-order-form");

        $updateOrderModal.classList.remove("hidden");
        $orderForm.reset();

        fetch(`${API_URL_ORDERS}/${orderId}`)
            .then(res => res.json())
            .then(data => {
                const order = data.order || data.data?.order || data.data || {};

                $orderForm.querySelector("[name='id']").value = order.id || order._id || "";
                $orderForm.querySelector("[name='po_number']").value = order.po_number || "";
                $orderForm.querySelector("[name='po_date']").value = order.po_date
                    ? new Date(order.po_date).toISOString().split("T")[0]
                    : "";
                $orderForm.querySelector("[name='po_amout']").value = order.po_amout || "";
                $orderForm.querySelector("[name='po_department']").value = order.po_department || "";
                $orderForm.querySelector("[name='po_approval_name']").value = order.po_approval_name || "";
                $orderForm.querySelector("[name='po_approval_date']").value = order.po_approval_date
                    ? new Date(order.po_approval_date).toISOString().split("T")[0]
                    : "";
            })
            .catch(err => {
                console.error("Failed to load order details:", err);
                alert("Failed to load order details.");
                $updateOrderModal.classList.add("hidden");
            });

        // Cancel button hides the modal
        $orderForm.querySelector(".cancel-update-btn").addEventListener("click", () => {
            $updateOrderModal.classList.add("hidden");
        });

        // Handle save submission
        $orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const updatedOrder = {};
            $orderForm.querySelectorAll("input").forEach(input => {
                updatedOrder[input.name] = input.value;
            });

            fetch(`${API_URL_ORDERS}/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedOrder)
            })
            .then(res => res.json())
            .then(() => {
                alert(`Order ${orderId} updated successfully!`);
                $updateOrderModal.classList.add("hidden");
                fetchAllOrderForUpdate(); // refresh the table
            })
            .catch(err => alert("Failed to update order: " + err.message));
        });
    }




    // ========== SEARCH FUNCTIONALITY ==========
    $btnSearchOrder.addEventListener("click", () => {
        const $resultsContainer = $orderHTML.querySelector(".delete-results");
        const searchValue = $inputSearchOrder.value.trim().toLowerCase();

        if (!searchValue) {
            alert("Please enter a value to search.");
            $resultsContainer.innerHTML = "";
            return;
        }

        $resultsContainer.innerHTML = "<p>Searching orders...</p>";

        fetch(API_URL_ORDERS)
            .then(res => res.json())
            .then(res => {
                const orders = res.data?.order || [];
                const filtered = orders.filter(order => {
                    return Object.keys(order).some(key => {
                        if (!order[key]) return false;
                        return order[key].toString().toLowerCase().includes(searchValue);
                    });
                });

                $resultsContainer.innerHTML = "";

                if (filtered.length === 0) {
                    $resultsContainer.innerHTML = "<p>No matching orders found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Department</th>
                            <th>Approval Name</th>
                            <th>Approval Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                filtered.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.po_number}</td>
                        <td>${new Date(user.po_date).toLocaleDateString()}</td>
                        <td>${user.po_amout}</td>
                        <td>${user.po_department}</td>
                        <td>${user.po_approval_name}</td>
                        <td>${new Date(user.po_approval_date).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${user._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
                        </td>
                    `;
                    row.querySelector(".delete-user-btn-row")
                        .addEventListener("click", () => deleteUserById(user._id));
                    row.querySelector(".update-user-btn")
                        .addEventListener("click", () => updateOrdersById(user._id));
                    $table.querySelector("tbody").appendChild(row);
                });

                $resultsContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    });






















    
    function fetchAllUsersForDelete() {
        const $allContainer = $orderHTML.querySelector(".delete-all-actions");
        const $resultsContainer = $orderHTML.querySelector(".delete-results");

        $allContainer.innerHTML = "<p>Loading orders...</p>";
        $resultsContainer.innerHTML = "";

        fetch(API_URL_ORDERS)
            .then(res => res.json())
            .then(res => {
                const users = res.data?.user || [];
                $allContainer.innerHTML = "";

                if (users.length === 0) {
                    $allContainer.innerHTML = "<p>No users found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Department</th>
                            <th>Approval Name</th>
                            <th>Approval Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                users.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.po_number}</td>
                        <td>${new Date(user.po_date).toLocaleDateString()}</td>
                        <td>${user.po_amout}</td>
                        <td>${user.po_department}</td>
                        <td>${user.po_approval_name}</td>
                        <td>${new Date(user.po_approval_date).toLocaleDateString()}</td>
                        <td>
                            <button class="delete-user-btn-row" data-id="${user._id}">Delete</button>
                        </td>
                    `;
                    row.querySelector(".delete-user-btn-row").addEventListener("click", () => deleteUserById(user._id));
                    $table.querySelector("tbody").appendChild(row);
                });

                $allContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch users.</p>`;
            });
    }




    
    document.querySelector("#update-order-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedUser = Object.fromEntries(formData.entries());

        // Use the hidden _id for backend
        const userId = updatedUser._id;
        const { id, _id, ...payload } = updatedUser; // remove frontend id and hidden _id from body

        

        fetch(`${API_URL_ORDERS}/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(() => {
                alert("User updated successfully!");
                $updateOrderModal.classList.add("hidden");
                fetchAllOrderForUpdate();
            })
            .catch(err => {
                alert("Failed to update user.");
            });
    });



















// ==================================== Requisition start here ========================================
    
    






    const $requisitionHTML = document.createElement("div");
        $requisitionHTML.className = "action-container";
        $requisitionHTML.id = "delete-user";
        $requisitionHTML.innerHTML = `
            <h2>Requisitions</h2>
            <div class="delete-by-id">
                <input type="text" placeholder="Enter User ID" class="delete-user-id" />
            </div>
            <div class="delete-results"></div>
            <div class="delete-all">
                <h3>All Requisitions</h3>
                <div class="delete-all-actions">
                    <button class="delete-all-btn"></button>
                </div>
            </div>
        `;
    $content.appendChild($requisitionHTML);

    // Hide all other action containers except the dashboard initially
    document.querySelectorAll(".action-container").forEach(el => {
        if (el.id !== "dashboard") {
            el.style.display = "none";
        }
    });

 


    const $updateRequitionModal = document.createElement("div");
    $updateRequitionModal.className = "update-modal hidden";
    $updateRequitionModal.id = "updaterequisitionModal";
    $updateRequitionModal.innerHTML = `
    <div class="update-modal-content">
        <h2>Update order</h2>
        <form id="update-order-form" class="update-form">
        <input type="text" name="id" placeholder="ID" readonly />
        <input type="text" name="pr_number" placeholder="Number" required />
        <input type="date" name="pr_date" placeholder="Date" required />
        <input type="text" name="pr_amout" placeholder="Amount" required />
        <input type="text" name="pr_department" placeholder="Department" required />
        <input type="text" name="pr_approval_name" placeholder="Approval Name" required />
        <input type="date" name="pr_approval_date" placeholder="Approval Date" required />
        <div class="update-actions">
            <button type="submit" class="save-update-btn">Save Changes</button>
            <button type="button" class="cancel-update-btn">Cancel</button>
        </div>
        </form>
    </div>
    `;
    document.body.appendChild($updateRequitionModal);


        
    
    const $addRequisition = document.createElement("div");
    $addRequisition.className = "action-container";
    $addRequisition.id = "add-user";
    $addRequisition.innerHTML = `
        <h2>Add New Requisition</h2>
        <div class="signup-page"></div>
        <p>
            <span id="dt">By confirming, a new order will be added. Click save to confirm</span>
            <button type="submit" id="btn-add-user">SAVE</button>
        </p>
        <div class="add-user-result"></div>
    `;
    document.body.appendChild($addRequisition);
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");

    // Add form fields dynamically
    const $addRequisitionPage = $addRequisition.querySelector(".signup-page");
    const requisitionFields = [
        { name: "id", placeholder: "ID", type: "text" },
        { name: "pr_number", placeholder: "Number", type: "number" },
        { name: "pr_date", placeholder: "Date", type: "date" },
        { name: "pr_amout", placeholder: "Amount", type: "number" },
        { name: "pr_department", placeholder: "Department", type: "text" },
        { name: "pr_approval_name", placeholder: "Approval Name", type: "text" },
        { name: "pr_approval_date", placeholder: "Approval Date", type: "date"}
    ];
    requisitionFields.forEach(f => {
        const $input = document.createElement("input");
        $input.type = f.type;
        $input.name = f.name;
        $input.placeholder = f.placeholder;
        $input.required = true;
        $addRequisitionPage.appendChild($input);
    });






    




  // Select the container (do NOT empty it)
    const $requisitionContainer = $requisitionHTML.querySelector(".delete-by-id");
    // Select the existing input (we’ll use or add next to it)
    const existingInputrequisition = $requisitionHTML.querySelector("input");
    
    // ✅ Create new Search input if not already there
    const $inputSearchRequisition = existingInputrequisition || document.createElement("input");
    $inputSearchRequisition.type = "text";
    $inputSearchRequisition.placeholder = "Enter any requisition detail to search";
    $inputSearchRequisition.classList.add("search-input");

    // ✅ Create Search button
    const $btnSearchRequisition = document.createElement("button");
    $btnSearchRequisition.textContent = "Search";
    $btnSearchRequisition.classList.add("search-btn");

    // ✅ Create Add User button
    const $btnAddRequisition = document.createElement("button");
    $btnAddRequisition.textContent = "Add New";
    $btnAddRequisition.classList.add("add-user-btn");

    // ✅ Insert them without clearing existing HTML
    $requisitionContainer.append($inputSearchRequisition, $btnSearchRequisition, $btnAddRequisition);

    // ========== ADD FUNCTIONALITY ==========
    // Add user click handler
    $btnAddRequisition.addEventListener("click", () => {
    // Hide other action containers if needed
    document.querySelectorAll(".action-container").forEach(el => el.style.display = "none");

    // Show the add user form
    $btnAddRequisition.style.display = "block";

    // Optionally scroll into view
    $btnAddRequisition.scrollIntoView({ behavior: "smooth" });
    });


    const $btnRequsitionSave = $btnAddRequisition.querySelector("#btn-add-user");

    $btnRequsitionSave.addEventListener("click", () => {
        const requisitionData = {};
        $addRequisitionPage.querySelectorAll("input").forEach(input => {
            let name = input.name;
            let value = input.value.trim();

            if (name === "id") value = value.toUpperCase();
            if (name === "pr_approval_date" && !value) value = new Date().toISOString();

            requisitionData[name] = value;
        });

        // Required field check
        if (!requisitionData.id || !requisitionData.pr_number || !requisitionData.pr_date || !requisitionData.pr_amout || !requisitionData.pr_department || !requisitionData.pr_approval_name || !requisitionData.pr_approval_date) {
            alert("Please fill in all required fields.");
            return;
        }

        // Submit to API
        fetch(API_URL_REQ, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requisitionData)
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to add new requisition.");
                return data;
            })
            .then(() => {
                $addRequisition.querySelector(".add-user-result").innerHTML =
                    `<p style="color:green;">Order added successfully!</p>`;
                $requisitionContainer.querySelectorAll("input").forEach(input => input.value = "");

                        fetchAllRquistionsForUpdate();
                        setTimeout(() => {
                            // Hide Add User form
                            $addRequisition.style.display = "none";

                            // Show Users container
                            $requisitionHTML.style.display = "block";

                            // Scroll to Users section
                            $requisitionHTML.scrollIntoView({ behavior: "smooth" });
                        }, 500);
                
            })
            
            .catch(err => {
                $addRequisition.querySelector(".add-user-result").innerHTML =
                    `<p style="color:red;">${err.message || "Failed to add requision."}</p>`;
            });
    });



    // ========== SEARCH FUNCTIONALITY ==========
    $btnSearchRequisition.addEventListener("click", () => {
        const $resultsContainer = $requisitionTable.querySelector(".delete-results");
        const searchValue = $inputSearchRequisition.value.trim().toLowerCase();

        if (!searchValue) {
            alert("Please enter a value to search.");
            $resultsContainer.innerHTML = "";
            return;
        }

        $resultsContainer.innerHTML = "<p>Searching requisitions...</p>";

        fetch(API_URL_REQ)
            .then(res => res.json())
            .then(res => {
                const Requisitions = res.data?.requisition || [];
                const filtered = requisitions.filter(requisition => {
                    return Object.keys(requisition).some(key => {
                        if (!requisition[key]) return false;
                        return requisition[key].toString().toLowerCase().includes(searchValue);
                    });
                });

                $resultsContainer.innerHTML = "";

                if (filtered.length === 0) {
                    $resultsContainer.innerHTML = "<p>No matching requisitions found.</p>";
                    return;
                }

                const $table = document.createElement("table");
                $table.className = "users-table";
                $table.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Department</th>
                            <th>Approval Name</th>
                            <th>Approval Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                filtered.forEach(requisition => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${requisition.id}</td>
                        <td>${requisition.pr_number}</td>
                        <td>${new Date(requisition.pr_date).toLocaleDateString()}</td>
                        <td>${requisition.pr_amout}</td>
                        <td>${requisition.pr_department}</td>
                        <td>${requisition.pr_approval_name}</td>
                        <td>${new Date(requisition.pr_approval_date).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${requisition._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${requisition._id}">Delete</button>
                        </td>
                    `;
                    row.querySelector(".delete-user-btn-row")
                        .addEventListener("click", () => deleteRequisitionById(requisition._id));
                    row.querySelector(".update-user-btn")
                        .addEventListener("click", () => up(requisition._id));
                    $table.querySelector("tbody").appendChild(row);
                });

                $resultsContainer.appendChild($table);
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch requisitions.</p>`;
            });
    });






    function deleteRequisitionById(requisitionId) { // pass the id as parameter
        const $resultsContainer = $deleteOrder.querySelector(".delete-results");

        fetch(`${API_URL_ORDERS}/${orderId}`, { method: "DELETE" })
            .then(() => {
                $resultsContainer.innerHTML = `<p style="color:green;">Requisition ${requisitionId} deleted successfully.</p>`;
                fetchAllRquistionsForUpdate();
            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to delete order ${requisitionId}.</p>`;
            });
    }



















    function fetchAllRquistionsForUpdate() {
        const $allContainer = $requisitionHTML.querySelector(".delete-all-actions");
        const $resultsContainer = $requisitionHTML.querySelector(".delete-results");

        // Clear any old content and show loading message
        $allContainer.innerHTML = "<p>Loading requisitions...</p>";
        $resultsContainer.innerHTML = "";

        fetch(API_URL_REQ)
            .then(res => res.json())
            .then(res => {
                // Normalize data key variations
                const requisitions = res.data?.requisition || res.data?.Requisitions || res.requisition || res.data || [];
                
                // Clear loading message
                $allContainer.innerHTML = "";

                // Handle empty results
                if (requisitions.length === 0) {
                    $allContainer.innerHTML = "<p>No requisitions found.</p>";
                    return;
                }

                // Create table
                const $requisitionTable = document.createElement("table");
                $requisitionTable.className = "users-table";
                $requisitionTable.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Department</th>
                            <th>Approval Name</th>
                            <th>Approval Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;

                // Loop through requisitions
                requisitions.forEach(req => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${req.id}</td>
                        <td>${req.pr_number}</td>
                        <td>${new Date(req.pr_date).toLocaleDateString()}</td>
                        <td>${req.pr_amount}</td>
                        <td>${req.pr_department}</td>
                        <td>${req.pr_approval_name}</td>
                        <td>${new Date(req.pr_approval_date).toLocaleDateString()}</td>
                        <td>
                            <button class="update-user-btn" data-id="${req._id}">Update</button>
                            <button class="delete-user-btn-row" data-id="${req._id}">Delete</button>
                        </td>
                    `;

                    // Attach event listeners
                    row.querySelector(".delete-user-btn-row")
                        .addEventListener("click", () => deleteRequisitionById(req._id));
                    row.querySelector(".update-user-btn")
                        .addEventListener("click", () => updateRequisitionById(req._id));

                    $requisitionTable.querySelector("tbody").appendChild(row);
                });

                // ✅ Clear and append the new table into the result container
                $resultsContainer.innerHTML = "";
                $resultsContainer.appendChild($requisitionTable);

            })
            .catch(() => {
                $resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch requisitions.</p>`;
            });
    }



    

    function updateRequisitionById(userId) {
        const form = document.querySelector("#update-user-form");
        $updateModal.classList.remove("hidden");
        form.reset();

        // Fetch the user's data
        fetch(`${API_URL}/${userId}`)
            .then(res => res.json())
            .then(data => {
                const user = data.user || data.data?.user || data.data || data || {};
                console.log("Fetched user data:", user);

                // Fill in form fields
                form.querySelector("[name='id']").value = user.id || user._id || ""; 
                form.querySelector("[name='FirstName']").value = user.FirstName || "";
                form.querySelector("[name='LastName']").value = user.LastName || "";
                form.querySelector("[name='dob']").value = user.dob
                    ? new Date(user.dob).toISOString().split("T")[0]
                    : "";
                form.querySelector("[name='date_created']").value = user.date_created
                    ? new Date(user.date_created).toISOString().split("T")[0]
                    : "";

                // Store the backend _id in a hidden input for PATCH
                let hiddenIdInput = form.querySelector("[name='_id']");
                if (!hiddenIdInput) {
                    hiddenIdInput = document.createElement("input");
                    hiddenIdInput.type = "hidden";
                    hiddenIdInput.name = "_id";
                    form.appendChild(hiddenIdInput);
                }
                hiddenIdInput.value = user._id || user.id || "";
            })
            .catch(err => {
                console.error("Failed to load user details:", err);
                alert("Failed to load user details.");
                $updateModal.classList.add("hidden");
            });
    }







    // =================================== Handle Save using PATCH ============================================


    document.querySelector("#update-user-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedUser = Object.fromEntries(formData.entries());

        // Use the hidden _id for backend
        const userId = updatedUser._id;
        const { id, _id, ...payload } = updatedUser; // remove frontend id and hidden _id from body

        console.log("Updating user:", userId, "with data:", payload);

        fetch(`${API_URL}/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(() => {
                alert("User updated successfully!");
                $updateModal.classList.add("hidden");
                fetchAllUsersForUpdate();
            })
            .catch(err => {
                alert("Failed to update user.");
            });
    });


    
    // --- Handle Cancel Button ---
    document.querySelector(".cancel-update-btn").addEventListener("click", () => {
        $updateModal.classList.add("hidden");
    });














});
