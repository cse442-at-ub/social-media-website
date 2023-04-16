<?php
//$follows = http_get("localhost" + "/follows");
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $ID = $_GET['id'];
    if (empty($ID)) {
        echo "ID is empty";
    } else {
        echo $ID;
    }
}

$servername = "localhost";
$username = "localhost";
$password = null;
$database = "test";
$conn = new mysqli($servername, $username, $password, $database);
// get each column in the database
$sql = "SELECT id, commenter_ID, comments_ID,comments_body FROM Comments";
$loops = $conn->query($sql);
// ready to loop
if ($loops->num_rows > 0) {
    while($loop = $loops->fetch_assoc()) {
        echo "";
    }
}


$conn->close();
