<?php

namespace App\Request;


class GetRecipeNamesWithIdRequest
{
    public function __construct(
        /**
         * @var string[]
         */
        private array $filterTags = []
    )
    {
    }

    /**
     * @return  string[]
     */
    public function getFilterTags(): array
    {
        return $this->filterTags;
    }
}