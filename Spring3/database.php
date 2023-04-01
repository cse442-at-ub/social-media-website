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
} else {
    echo "Connected";
}

// Create table
$sql = "CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    userpass VARCHAR(30) NOT NULL
)";




$sql = "CREATE TABLE users_info (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(10) NOT NULL, 
    lastname VARCHAR(10) NOT NULL, 
    email VARCHAR(20) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    user_profile_photo_filename VARCHAR(10) NOT NULL, 
    follows INT(8) NOT NULL,
    fans INT(8) NOT NULL, 
    blog_history_id INT(8) NOT NULL
)";




$sql = "INSERT INTO users_info (
                        id, firstname, lastname, email, password, 
                        user_profile_photo_filename, follows, fans, 
                        blog_history_id
                        ) VALUES (
                                  1, 'Doe', 'john','john@example.com', 
                                  'password', 'image1.jpg', 1, 1, 1)";




if (mysqli_query($conn, $sql)) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . mysqli_error($conn);
}

// to Delete table
// $sql = "DROP TABLE user";
