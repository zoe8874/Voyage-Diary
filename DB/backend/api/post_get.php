<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../config/database.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Keine gültige Beitrags-ID']);
    exit;
}

try {
    // Beitrag
    $stmt = $pdo->prepare("SELECT b.*, u.Username, u.profil_bild FROM Beitrag b JOIN Users u ON b.User_ID = u.User_ID WHERE b.Beitrag_ID = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    if (!$post) {
        http_response_code(404);
        echo json_encode(['error' => 'Beitrag nicht gefunden']);
        exit;
    }
    // Tags
    $stmt = $pdo->prepare("SELECT Tag_Name FROM Tag t JOIN Beitrag_Tag bt ON t.Tag_ID = bt.Tag_ID WHERE bt.Beitrag_ID = ?");
    $stmt->execute([$id]);
    $post['tags'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    // Kommentare
    $stmt = $pdo->prepare("SELECT k.*, u.Username, u.profil_bild FROM Kommentar k JOIN Users u ON k.User_ID = u.User_ID WHERE k.Beitrag_ID = ? ORDER BY k.CreatedAt ASC");
    $stmt->execute([$id]);
    $post['kommentare'] = $stmt->fetchAll();
    // Hat der aktuelle Benutzer geliked? (wenn Session vorhanden)
    $post['user_liked'] = false;
    if (session_status() === PHP_SESSION_NONE) session_start();
    if (isset($_SESSION['user_id'])) {
        $stmt = $pdo->prepare("SELECT 1 FROM User_Like WHERE User_ID = ? AND Beitrag_ID = ?");
        $stmt->execute([$_SESSION['user_id'], $id]);
        $post['user_liked'] = $stmt->fetchColumn() > 0;
    }
    echo json_encode(['success' => true, 'post' => $post]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>