
<?php
//handle Get and post request from React
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $comment = $_POST['comment'];
    if (empty($comment)) {
        echo "comment is empty";
    } else {
        echo $comment;
    }
}elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    $ID = $_GET['id'];
    if (empty($ID)) {
        echo "ID is empty";
    } else {
        echo $ID;
    }
}

// get info from database
// first connect to the desired database
$servername = "localhost";
$username = "localhost";
$password = null;
$database = "blogDB";
//$port = "";
//$socket = "";
$conn = new mysqli($servername, $username, $password, $database);
// get each column in the database
$sql = "SELECT id, commenter_ID, comments_ID,comments_body FROM Comments";
$loops = $conn->query($sql);
// ready to loop
if ($loops->num_rows > 0)
    while($lopp = $loops->fetch_assoc()) {
        echo "";
    }

?>