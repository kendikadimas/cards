<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    protected $fillable = [
        'quote',
        'name',
        'title',
        'avatar',
        'order',
        'is_active'
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) {
            return Storage::url($this->avatar);
        }
        return 'https://github.com/shadcn.png';
    }
}
