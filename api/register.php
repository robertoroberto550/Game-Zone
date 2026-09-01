<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

requirePost();
$data = requestData();
verifyCsrf($data);

$username = trim((string) ($data['username'] ?? ''));
$email = strtolower(trim((string) ($data['email'] ?? '')));
$password = (string) ($data['password'] ?? '');

if (!preg_match('/^[a-zA-Z0-9_]{3,24}$/', $username)) {
    respond(['success' => false, 'message' => 'Numele trebuie să aibă 3–24 caractere: litere, cifre sau _.'], 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) {
    respond(['success' => false, 'message' => 'Introdu o adresă de email validă.'], 422);
}
if (strlen($password) < 8 || strlen($password) > 72) {
    respond(['success' => false, 'message' => 'Parola trebuie să aibă între 8 și 72 de caractere.'], 422);
}

try {
    $statement = database()->prepare(
        'INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)'
    );
    $statement->execute([
        'username' => $username,
        'email' => $email,
        'password_hash' => password_hash($password, PASSWORD_DEFAULT),
    ]);
} catch (PDOException $exception) {
    if ((string) $exception->getCode() === '23000') {
        respond(['success' => false, 'message' => 'Numele sau emailul este deja folosit.'], 409);
    }
    error_log('NEXUS registration failed: ' . $exception->getMessage());
    respond(['success' => false, 'message' => 'Contul nu a putut fi creat. Încearcă din nou.'], 500);
}

session_regenerate_id(true);
$_SESSION['user_id'] = (int) database()->lastInsertId();
$_SESSION['username'] = $username;

respond(['success' => true, 'message' => 'Cont creat cu succes!', 'user' => ['username' => $username]], 201);
