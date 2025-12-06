<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteStat extends Model
{
    protected $fillable = [
        'key',
        'label',
        'value',
        'order'
    ];

    protected $casts = [
        'value' => 'integer',
        'order' => 'integer',
    ];
}
