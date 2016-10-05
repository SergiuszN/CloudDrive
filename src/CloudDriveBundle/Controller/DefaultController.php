<?php

namespace CloudDriveBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('CloudDriveBundle::layout.html.twig');
    }

    public function apiTestPageAction()
    {
        die('test api page!');
        return $this->render('CloudDriveBundle::layout.html.twig');
    }
}
