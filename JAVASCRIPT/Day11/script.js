const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            {
                id: "TXN-456", amount: "50.00", description: "Enchanted Sword"
            }
        ]
    }
};



// Destructuring user object
const { name, email, address, payment } = user;
const { first, last } = name;
const { shipping:{street,city,state,postalCode,country}, billing:{street:street1,city:city1,state:state1,postalCode:postalCode1,country:country1} } = address;
const { transactions, currency } = payment;

// Select elements
const personalInfoSection = document.getElementById("personal-info");
const shippingSection = document.getElementById("shipping-address");
const billingSection = document.getElementById("billing-address");
const transactionsSection = document.getElementById("transactions");

// Inject personal info
personalInfoSection.innerHTML = `
    <h2>Personal Info</h2>
    <p><strong>Name:</strong> ${first} ${last}</p>
    <p><strong>Email:</strong> ${email}</p>
`;

// Inject shipping address
shippingSection.innerHTML = `
    <h2>Shipping Address</h2>
    <p>${street}, ${city}, ${state}, ${postalCode}, ${country}</p>
`;

// Inject billing address
billingSection.innerHTML = `
    <h2>Billing Address</h2>
    <p>${street1}, ${city1}, ${state1}, ${postalCode1}, ${country1}</p>
`;

// ✅ Inject Transactions using .map()
transactionsSection.innerHTML = `
    <h2>Transactions</h2>
    <ul>
        ${transactions.map(txn => `
            <li>
                <p><strong>ID:</strong> ${txn.id}</p>
                <p><strong>Description:</strong> ${txn.description}</p>
                <p><strong>Amount:</strong> ${txn.amount} ${currency}</p>
            </li>
        `).join('')}
    </ul>
`;