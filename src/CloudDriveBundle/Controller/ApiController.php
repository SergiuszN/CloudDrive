<?php
namespace CloudDriveBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CloudDriveBundle\Repository\UserRepository;
use CloudDriveBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends Controller
{
    public function mainPageAction($path = '')
    {
        /* @var User $user */
        $user = $this->getUser();
        $response = new JsonResponse();

        // if user login
        if (! $user) {
            return $response;
        }

        $parameters = array(
            'userId' => $user->getId(),
            'path' => $path
        );

        $basePath = __DIR__ . '/../../../uploads/';
        $userDir = $basePath . 'user' . $user->getId() . '/';
        $pathToOpen = $userDir;

        if ($path) {
            $path = str_replace('..', '', $path);
            $path = str_replace(':', '/', $path);
            $pathToOpen .= $path;
        }

        if (!file_exists($userDir)) {
            mkdir($userDir);
        }

        $parameters['folder'] = $pathToOpen;
        $parameters['dir'] = scandir($pathToOpen);
        $response->setData($parameters);
        return $response;
    }

    /* @return UserRepository */
    protected function getUserRepository()
    {
        return $this->getDoctrine()->getEntityManager()->getRepository('CloudDriveBundle:User');
    }
}
