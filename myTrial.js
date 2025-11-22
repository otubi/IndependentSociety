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




    