<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET"); 
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    if ($data !== null) {
        $filename = 'data.json';
        if (file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(array("message" => "JSON data saved to file successfully"));
        } else {
            echo json_encode(array("message" => "Error saving JSON data to file"));
        }
    } else {
        echo json_encode(array("message" => "Invalid JSON data received"));
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $filename = 'data.json';
    if (file_exists($filename)) {
        $json = file_get_contents($filename);
        echo $json;
    } else {
        echo json_encode(array("message" => "File not found"));
    }
} else {
    echo json_encode(array("message" => "Unsupported request method"));
}
?>
