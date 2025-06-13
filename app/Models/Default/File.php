<?php

namespace App\Models\Default;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    const DIR = 'dir'; // dir

    const FILE = 'file';

    protected $fillable = [
        'upload_name',
        'hash_name',
        'name',
        'type',
        'dir',
        'size',
        'mimes',
    ];

    protected $appends = ['size_kb'];

    protected static function booted(): void
    {
        static::creating(function (File $model) {
            if ($model->size == null) {
                $model->size = Storage::disk('public')->size($model->dir.$model->hash_name);
            }
        });
    }

    public function sizeKb(): Attribute
    {
        return Attribute::make(get: function () {
            if ($this->size != null) {
                return $this->size / 1024;
            }

            return 0;
        });
    }

    public function storagePath(): Attribute
    {
        return Attribute::make(get: function () {
            return Storage::disk('public')->path($this->dir.$this->hash_name);
        });
    }
}
