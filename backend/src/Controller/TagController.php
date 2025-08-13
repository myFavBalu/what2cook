<?php declare(strict_types=1);

namespace App\Controller;

use App\DTO\IdToNameDTO;
use App\Service\TagService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class TagController
{
    public function __construct(
        private readonly TagService $tagService)
    {
    }

    public function findTagsByName(Request $request): JsonResponse
    {
        $searchName = $request->get("searchName");
        $results = $this->tagService->findTagsByName($searchName);

        $responseBody = [];

        foreach ($results as $tag) {
            $returnObject = new IdToNameDTO(
                $tag->getId(),
                $tag->getName()
            );
            $responseBody[] = $returnObject->jsonSerialize();
        }

        return new JsonResponse($responseBody);
    }
}
