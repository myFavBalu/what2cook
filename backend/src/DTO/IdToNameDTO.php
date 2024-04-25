<?php

namespace App\DTO;


use JetBrains\PhpStorm\ArrayShape;

class IdToNameDTO
{
    private string $name;
    private int $id;

    public function __construct(int $id, string $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    #[ArrayShape(['id' => "int", 'name' => "string"])]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}