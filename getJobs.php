<?php
// Include the database connection file
require 'config.php';

// Set headers for CORS
header('Access-Control-Allow-Origin: http://10.0.0.2'); // Replace with your app's origin
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

// Fetch all job records
$sql = "SELECT `id`, `Company Name` AS company_name, `Location` AS job_location, `Job Title` AS title, `Required Skills` AS skills, `Experience Level` AS level FROM `jobs`"; // Adjust field names as needed

// Check if the query is successful
if ($result = $conn->query($sql)) {
    if ($result->num_rows > 0) {
        $jobs = [];
        while ($row = $result->fetch_assoc()) {
            $jobs[] = $row;
        }
        echo json_encode(['status' => 'success', 'data' => $jobs]);
    } else {
        echo json_encode(['status' => 'success', 'data' => []]);
    }
} else {
    // If query fails, output the error message
    echo json_encode([
        'status' => 'error',
        'message' => 'SQL query failed: ' . $conn->error
    ]);
}

// Close the database connection
$conn->close();
?>
