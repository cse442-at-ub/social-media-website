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
    echo "Connected! " . "<br>";
}


// for post
$sql = "CREATE TABLE post_history(
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    title VARCHAR(600) NOT NULL,
    post_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    like_count INT(8),
    like_id  INT(8),
    image_name VARCHAR(200), --image+id.jpg ?? NULL
    comments_id INT(8)
    )";

if (mysqli_query($conn, $sql)) {
    echo "post_history table created successfully. " . "<br>";
} else {
    echo "Error creating post_history table: " . mysqli_error($conn) . "<br>";
}

$sql = "CREATE TABLE users_info (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL, 
    lastname VARCHAR(30) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    email VARCHAR(200) NOT NULL, 
    user_password VARCHAR(255) NOT NULL, 
    auth_token VARCHAR(255),
    user_profile_photo_filename VARCHAR(10), 
    follows INT(8),
    fans INT(8), 
    blog_history_id INT(8)
)";


if (mysqli_query($conn, $sql)) {
    echo "users_info table created successfully. " . "<br>";
} else {
    echo "Error creating users_info table: " . mysqli_error($conn) . "<br>";
}


// to Delete table
// $sql = "DROP TABLE users_info";

// for image (zhexi)
// $sql = "CREATE TABLE images(
//     id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     post_id INT(8),
//     image_name VARCHAR(200)
// )";

// if (mysqli_query($conn, $sql)) {
//     echo "Images table created successfully. " . "<br>";
// } else {
//     echo "Error creating images table: " . mysqli_error($conn) . "<br>";
// }