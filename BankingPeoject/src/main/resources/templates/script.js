// Fetch accounts from backend and display them
function fetchAccounts() {
    fetch('/api/accounts')
        .then(response => response.json())
        .then(data => {
            const accountList = document.getElementById('accountList');
            accountList.innerHTML = '';
            data.forEach(account => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${account.id}</td>
                    <td>${account.accountNumber}</td>
                    <td>${account.accountHolder}</td>
                    <td>${account.balance}</td>
                    <td>
                        <button onclick="editAccount(${account.id})">Edit</button>
                        <button onclick="deleteAccount(${account.id})">Delete</button>
                    </td>
                `;
                accountList.appendChild(row);
            });
        });
}

// Submit create account form
document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const accountData = {
        accountNumber: formData.get('accountNumber'),
        accountHolder: formData.get('accountHolder'),
        balance: formData.get('balance')
    };

    fetch('/api/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    })
    .then(response => {
        if (response.ok) {
            alert('Account created successfully');
            fetchAccounts();
        } else {
            alert('Failed to create account');
        }
    });
});

// Function to delete account
function deleteAccount(id) {
    if (confirm('Are you sure you want to delete this account?')) {
        fetch(`/api/accounts/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Account deleted successfully');
                fetchAccounts();
            } else {
                alert('Failed to delete account');
            }
        });
    }
}

// Initial fetch of accounts when the page loads
fetchAccounts();
