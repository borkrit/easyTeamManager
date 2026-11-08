<?php 
// app/Enums/TaskStatus.php
namespace App\Enums;

enum TaskStatus: string
{
    case DO_ZROBIENIA = 'do_zrobienia';
    case W_TRAKCIE = 'w_trakcie';
    case ZAKONCZONE = 'zakonczone';
}