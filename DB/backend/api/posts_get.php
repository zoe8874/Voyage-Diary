<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../config/database.php';

$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$limit = isset($_GET['limit']) ? min(50, (int)$_GET['limit']) : 10;
$offset = ($page - 1) * $limit;
$tag = isset($_GET['tag']) ? trim($_GET['tag']) : null;

try {
    if ($tag) {
        // Beiträge mit bestimmtem Tag
        $sql = "SELECT b.*, u.Username, u.profil_bild,
                       (SELECT COUNT(*) FROM Kommentar k WHERE k.Beitrag_ID = b.Beitrag_ID) as kommentare_anzahl
                FROM Beitrag b
                JOIN Users u ON b.User_ID = u.User_ID
                JOIN Beitrag_Tag bt ON b.Beitrag_ID = bt.Beitrag_ID
                JOIN Tag t ON bt.Tag_ID = t.Tag_ID
                WHERE t.Tag_Name = ?
                ORDER BY b.CreatedAt DESC
                LIMIT ? OFFSET ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$tag, $limit, $offset]);
    } else {
        $sql = "SELECT b.*, u.Username, u.profil_bild,
                       (SELECT COUNT(*) FROM Kommentar k WHERE k.Beitrag_ID = b.Beitrag_ID) as kommentare_anzahl
                FROM Beitrag b
                JOIN Users u ON b.User_ID = u.User_ID
                ORDER BY b.CreatedAt DESC
                LIMIT ? OFFSET ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$limit, $offset]);
    }
    $posts = $stmt->fetchAll();

    // Zusätzlich für jeden Beitrag die Tags laden
    foreach ($posts as &$post) {
        $stmt = $pdo->prepare("SELECT t.Tag_Name FROM Tag t JOIN Beitrag_Tag bt ON t.Tag_ID = bt.Tag_ID WHERE bt.Beitrag_ID = ?");
        $stmt->execute([$post['Beitrag_ID']]);
        $post['tags'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    echo json_encode(['success' => true, 'posts' => $posts, 'page' => $page]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Fehler beim Laden: ' . $e->getMessage()]);
}
?>