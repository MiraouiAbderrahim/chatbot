<?php

// src/Security/LoginSuccessHandler.php
namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        // Generate the JWT token
        $jwt = $this->jwtManager->create($token->getUser());

        // Get the authenticated user
        $user = $token->getUser();

        // Prepare the response
        $responseData = [
            'token' => $jwt,
            'user' => [
                'email' => $user->getEmail(),
                'gender' => $user->getGender(),
            ]
        ];

        // Return the response with token and user info
        return new JsonResponse($responseData, JsonResponse::HTTP_OK);
    }
}
