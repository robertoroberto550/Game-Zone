<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if (empty($_SESSION['user_id'])) {
    respond(['success' => true, 'authenticated' => false]);
}

respond([
    'success' => true,
    'authenticated' => true,
    'user' => ['id' => $_SESSION['user_id'], 'username' => $_SESSION['username']],
]);
