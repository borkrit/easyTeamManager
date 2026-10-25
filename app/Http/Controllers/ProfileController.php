<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(Request $request): Response
{
    $user = $request->user();

    $tasks = $user->tasks()
        ->with(['project'])
        ->latest()
        ->get();

    return Inertia::render('Profile/Show', [
        'user' => $user,
        'tasks' => [
            'data' => $tasks,
        ],
    ]);
}
}