<?php
header('Content-Type: application/json');

// Include the config file for database connection
include 'config.php';

// Fetch the last saved profile
$sql = "SELECT * FROM candidateprofile ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $profile = $result->fetch_assoc();
    echo json_encode($profile);
} else {
    echo json_encode(['error' => 'No profile data found']);
}

$conn->close();
?>
