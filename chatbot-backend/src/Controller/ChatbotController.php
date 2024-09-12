<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ChatbotController extends AbstractController
{
    #[Route('/api/chat', name: 'chatbot')]
    public function chatbot(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $step = $data['step'];
        $response = '';

        if ($step === 'weight') {
            $response = 'Please enter your height';
        } elseif ($step === 'height') {
            $weight = $data['weight'];
            $height = $data['height'];
            $bmi = $weight / ($height * $height);

            if ($bmi < 18.5) {
                $response = 'You are underweight.';
            } elseif ($bmi < 25) {
                $response = 'Your weight is ideal.';
            } else {
                $response = 'You are overweight.';
            }
        }

        return new JsonResponse(['response' => $response]);
    }
}
