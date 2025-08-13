<?php

namespace App\Request;

use Symfony\Component\Validator\Constraints as Assert;

class AddRecipeRequest
{
    public function __construct(
        #[Assert\NotBlank]
        private string $name,

        #[Assert\NotBlank]
        private string $ingredients,

        #[Assert\NotBlank]
        private string $instructions,

        /**
         * @var Tag[]
         */
        #[Assert\Valid]
        private array  $tags
    )
    {
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getIngredients(): string
    {
        return $this->ingredients;
    }

    public function getInstructions(): string
    {
        return $this->instructions;
    }

    public function getTags(): array
    {
        return $this->tags;
    }
}
