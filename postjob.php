<?php
// Include the database connection file
require 'config.php';

// Set headers for CORS (if needed)
header('Access-Control-Allow-Origin: http://10.0.0.2'); // Replace with your app's origin
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

// Get the job details from the request (sent by the frontend)
$data = json_decode(file_get_contents("php://input"), true);

// Extract job details
$companyName = $data['Company Name'] ?? null; // Changed to 'Company Name'
$location = $data['Location'] ?? null; // Changed to 'Location'
$jobTitle = $data['Job Title'] ?? null; // Changed to 'Job Title'
$requiredSkills = $data['Required Skills'] ?? null; // Changed to 'Required Skills'
$experienceLevel = $data['Experience Level'] ?? null; // Changed to 'Experience Level'

// Validate the inputs
if (!$companyName || !$location || !$jobTitle || !$requiredSkills || !$experienceLevel) {
    echo json_encode([
        'status' => 'error',
        'message' => 'All fields are required.'
    ]);
    exit;
}

// Insert the job into the database
$sql = "INSERT INTO jobs (`Company Name`, `Location`, `Job Title`, `Required Skills`, `Experience Level`)
        VALUES (?, ?, ?, ?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("sssss", $companyName, $location, $jobTitle, $requiredSkills, $experienceLevel);
    
    if ($stmt->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Job posted successfully.'
        ]);
    } else {
        // If execution fails, log and show the error
        $error = $stmt->error;
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to post the job. SQL Error: ' . $error
        ]);
    }
    $stmt->close();
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to prepare the SQL statement.'
    ]);
}

$conn->close();
?>
