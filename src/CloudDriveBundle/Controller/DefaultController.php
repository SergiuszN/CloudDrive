<?php

namespace CloudDriveBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CloudDriveBundle\Repository\UserRepository;
use CloudDriveBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
        /* @var User $user */
        $user = $this->getUser();

        $view = 'CloudDriveBundle:CloudDriveViews:content.html.twig';
        $parameters = array();

        if ($user) {
            $view = 'CloudDriveBundle:CloudDriveViews/drive:main.html.twig';
        }

        return $this->render($view, $parameters);
    }

    public function userAction($userName)
    {
        /* @var User $user*/
        $userRepository = $this->getUserRepository();
        $user = $userRepository->findOneBy(array('username' => $userName));

        $response = new JsonResponse();
        $response->setData(array(
            'userId' => $user->getId()
        ));

        return $response;
    }

    /* @return UserRepository */
    protected function getUserRepository()
    {
        return $this->getDoctrine()->getEntityManager()->getRepository('CloudDriveBundle:User');
    }
}
