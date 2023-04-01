<?php
// make connection with existing database (contain parameter "database"
// username and
$servername = "localhost";
$username = "root";
$password = null;
$dbname = "spring3_database";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (mysqli_connect_errno()) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected";

// Create table
$sql = "CREATE TABLE user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    userpass VARCHAR(30) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if (!mysqli_query($conn, $sql)) {
    echo "Table created failed";
} 
echo "Table created successfully";

// Delete table
// $sql = "DROP TABLE user";
