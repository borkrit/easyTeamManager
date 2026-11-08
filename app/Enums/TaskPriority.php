<?php
// app/Enums/TaskPriority.php
namespace App\Enums;

enum TaskPriority: string
{
    case NISKI = 'niski';
    case SREDNI = 'sredni';
    case WYSOKI = 'wysoki';
}