<?php

namespace App\Models\Default;

use App\Models\Traits\UserTrackable;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Model extends BaseModel
{
    use CascadeSoftDeletes, HasFactory, HasUlids, SoftDeletes, UserTrackable;

    public $cascadeDeletes = [];
}
