<?php


// Create database
$sql = "CREATE DATABASE blogDB";




// Create connection
$servername = "localhost";
$username = "username";
$password = null;
$database = "dbname";
//$port = "";
//$socket = "";
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$users_info = "CREATE TABLE users_info (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(10) NOT NULL, 
    lastname VARCHAR(10) NOT NULL, 
    email VARCHAR(20) NOT NULL, 
    password VARCHAR(20), 
    chat_history INT(8),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
$sql = "CREATE TABLE POST(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
owner VARCHAR(30) NOT NULL,
tile VARCHAR(600) NOT NULL,
image_ID INT(6),
comments_ID INT(6) NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    
)";

$sql ="CREATE TABLE Comments(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
comments_ID INT(6) NOT NULL,  
comments_body VARCHAR(600) NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP   
)";
if ($conn->query($users_info) === TRUE) {
    echo "Table users_info created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}
if ($conn->query($blog_history) === TRUE) {
    echo "Table blog_history created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>

