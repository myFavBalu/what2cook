<?php

namespace App\Request;


use Symfony\Component\Validator\Constraints as Assert;

class Tag
{
    public function __construct(
        #[Assert\NotBlank]
        public int    $id,

        #[Assert\NotBlank]
        public string $name
    )
    {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
