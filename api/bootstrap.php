<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function respond(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requirePost(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond(['success' => false, 'message' => 'Metodă nepermisă.'], 405);
    }
}

function requestData(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (str_contains($contentType, 'application/json')) {
        $data = json_decode((string) file_get_contents('php://input'), true);
        return is_array($data) ? $data : [];
    }
    return $_POST;
}

function database(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $localConfigFile = __DIR__ . '/config.local.php';
    $localConfig = is_file($localConfigFile) ? require $localConfigFile : [];
    if (!is_array($localConfig)) {
        $localConfig = [];
    }

    $host = (string) ($localConfig['host'] ?? getenv('DB_HOST') ?: '');
    $port = (string) ($localConfig['port'] ?? getenv('DB_PORT') ?: '3306');
    $name = (string) ($localConfig['name'] ?? getenv('DB_NAME') ?: '');
    $user = (string) ($localConfig['user'] ?? getenv('DB_USER') ?: '');
    $pass = (string) ($localConfig['pass'] ?? getenv('DB_PASS') ?: '');

    if ($host === '' || $name === '' || $user === '' || $pass === '') {
        respond(['success' => false, 'message' => 'Baza de date nu este configurată.'], 503);
    }

    try {
        $pdo = new PDO(
            "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4",
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    } catch (PDOException $exception) {
        error_log('NEXUS DB connection failed: ' . $exception->getMessage());
        respond(['success' => false, 'message' => 'Serviciul este temporar indisponibil.'], 503);
    }

    return $pdo;
}

function csrfToken(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrf(array $data): void
{
    $token = (string) ($data['csrf_token'] ?? '');
    if ($token === '' || !hash_equals(csrfToken(), $token)) {
        respond(['success' => false, 'message' => 'Sesiunea a expirat. Reîncarcă pagina.'], 419);
    }
}
