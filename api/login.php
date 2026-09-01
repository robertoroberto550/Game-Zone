<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

requirePost();
$data = requestData();
verifyCsrf($data);

$identity = trim((string) ($data['identity'] ?? ''));
$password = (string) ($data['password'] ?? '');

if ($identity === '' || $password === '') {
    respond(['success' => false, 'message' => 'Completează utilizatorul și parola.'], 422);
}

$statement = database()->prepare(
    'SELECT id, username, email, password_hash FROM users WHERE email = :identity OR username = :identity LIMIT 1'
);
$statement->execute(['identity' => strtolower($identity)]);
$user = $statement->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    usleep(350000);
    respond(['success' => false, 'message' => 'Datele de conectare nu sunt corecte.'], 401);
}

session_regenerate_id(true);
$_SESSION['user_id'] = (int) $user['id'];
$_SESSION['username'] = $user['username'];

respond(['success' => true, 'message' => 'Te-ai conectat cu succes!', 'user' => ['username' => $user['username']]]);
