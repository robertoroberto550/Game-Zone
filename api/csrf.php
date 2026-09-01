<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

respond(['success' => true, 'csrf_token' => csrfToken()]);
