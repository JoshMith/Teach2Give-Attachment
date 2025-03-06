console.log("Booleans Exercise")

/*
Scenario: You are building a secure banking system where a user can make a withdrawal. 
Before a withdrawal can be processed, it must pass several checks: 
1. User Authentication - The user must provide the correct password (hashed) for 
authentication. 
2. Multi-Factor Authentication (MFA) - The user must enter a valid MFA code to verify 
their identity. 
3. Sufficient Balance - The user must have enough funds to cover the withdrawal amount. 
4. Daily Transaction Limit - The withdrawal amount must be within the daily transaction 
limit.
*/
/*
Steps to Solve the Challenge: 
1. Create a function called verifyPassword 
○ Purpose: This function will compare the user’s input password with the stored 
hashed password. 
○ Input: User’s entered password, hashed password from the system. 
○ Output: Returns true if the passwords match, otherwise returns false
*/
import bcrypt from 'bcrypt';

// const bcrypt = require('bcrypt');

// Mock user data (Simulating database records)
const user = {
    hashedPassword: bcrypt.hashSync("securepassword", 10), // Simulated stored password
    mfaCode: "123456", // Simulated MFA code
    balance: 5000, // User's current balance
    dailyLimit: 2000 // Max amount user can withdraw per day
};

// Function to verify password
function verifyPassword(inputPassword, storedHashedPassword) {
    return bcrypt.compareSync(inputPassword, storedHashedPassword);
}

// Function to verify MFA code
function verifyMFA(inputCode, actualCode) {
    return inputCode === actualCode;
}

// Function to check sufficient balance
function checkBalance(withdrawalAmount, currentBalance) {
    return currentBalance >= withdrawalAmount;
}

// Function to check daily transaction limit
function checkDailyLimit(withdrawalAmount, dailyLimit) {
    return withdrawalAmount <= dailyLimit;
}

// Function to process withdrawal
function processWithdrawal(inputPassword, inputMFA, withdrawalAmount) {
    // Step 1: Verify Password
    if (!verifyPassword(inputPassword, user.hashedPassword)) {
        return "Transaction Failed: Incorrect password.";
    }

    // Step 2: Verify MFA Code
    if (!verifyMFA(inputMFA, user.mfaCode)) {
        return "Transaction Failed: MFA failed.";
    }

    // Step 3: Check Sufficient Balance
    if (!checkBalance(withdrawalAmount, user.balance)) {
        return "Transaction Failed: Insufficient balance.";
    }

    // Step 4: Check Daily Transaction Limit
    if (!checkDailyLimit(withdrawalAmount, user.dailyLimit)) {
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    // Step 5: Process withdrawal
    user.balance -= withdrawalAmount;
    return `Transaction Successful: Withdrawn $${withdrawalAmount}. Remaining balance: $${user.balance}`;
}

// Example Test Cases
console.log(processWithdrawal("securepassword", "123456", 1000)); // ✅ Success
console.log(processWithdrawal("wrongpassword", "123456", 1000));  // ❌ Incorrect password
console.log(processWithdrawal("securepassword", "654321", 1000)); // ❌ MFA failed
console.log(processWithdrawal("securepassword", "123456", 6000)); // ❌ Insufficient funds
console.log(processWithdrawal("securepassword", "123456", 3000)); // ❌ Exceeds daily limit
