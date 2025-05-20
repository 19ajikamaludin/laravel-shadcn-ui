<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File as FileRule;

class FileController extends Controller
{
    const TYPES = [
        'excel/csv' => 'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image' => 'image/jpg,image/jpeg,image/png',
    ];

    public function show(string $name)
    {
        $path = null;
        $file = File::where('hash_name', $name)->first();

        // file di spesific path
        if ($file != null) {
            $path = Storage::disk('public')->path($file->dir . $name);
        }

        // file in default
        if (Storage::disk('default')->exists($name)) {
            $path = Storage::disk('default')->path($name);

            return response()->download($path, $name);
        }

        if ($path == null) {
            abort(404);
        }

        return response()->download($path, $file?->upload_name ?? $name);
    }

    public function store(Request $request)
    {

        $rule = ['required', 'file', 'max:62920']; // 62M

        if ($request->filemimes != '') {
            $filemimes = self::TYPES[$request->filemimes];
            $rule[] = FileRule::types($filemimes);
        }

        $request->validate([
            'file' => $rule,
            'path' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $dir = $request->input('dir', 'tmp') . '/';

        // the `/` its mean that in disk public it will store in root folder
        Storage::disk('public')->put($dir, $file);

        $uploaded = File::create([
            'dir' => $dir,
            'hash_name' => $file->hashName(),
            'upload_name' => $file->getClientOriginalName(),
            'hash_name' => $file->hashName(),
            'name' => $file->getClientOriginalName(),
            'type' => File::FILE,
        ]);

        return response()->json([
            'id' => Str::ulid(),
            'name_original' => $uploaded->upload_name,
            'name' => $uploaded->hash_name,
            'url' => route('file.show', ['file' => $uploaded->hash_name]),
        ]);
    }
}
