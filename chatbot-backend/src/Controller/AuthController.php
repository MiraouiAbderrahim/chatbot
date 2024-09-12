<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AuthController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login()
    {
        return $this->json([
            'message' => 'This should never be reached, as Symfony will intercept the request.'
        ]);
    }
}
