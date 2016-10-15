<?php
namespace CloudDriveBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CloudDriveBundle\Repository\UserRepository;
use CloudDriveBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends Controller
{
    public function mainPageAction($path = 'home:')
    {
        $response = new JsonResponse();
        $directories = $this->getBaseDirectories($path);

        // scan dir and remove '.' from list and '..' if is home folder
        $list = scandir($directories->pathToOpen);
        array_shift($list);
        if ($directories->pathToOpen == $directories->userDir) {
            array_shift($list);
        }

        $dir = array();
        foreach ($list as $key => $file) {
            if (is_dir($directories->pathToOpen . $file)) {
                $dir['directory'][] = array($file, $this->folderSize($directories->pathToOpen . $file), filemtime($directories->pathToOpen . $file)*1000);
            } else {
                $dir['file'][] = array($file, filesize($directories->pathToOpen . $file), filemtime($directories->pathToOpen . $file)*1000);
            }
        }

        $response->setData(array(
            'url' => $this->generateUrl('cloud_drive_api_main_page', array(), true) . '/',
            'folder' => str_replace('/', ':', 'home:' . str_replace($directories->userDir, '', $directories->pathToOpen)),
            'dir' => $dir,
        ));
        return $response;
    }

    public function uploadAction($path = 'home:') {
        ini_set('upload_max_filesize', '2000M');
        ini_set('post_max_size', '2000M');
        set_time_limit(999999);
        ini_set('max_execution_time', '999999');
        ini_set('max_input_time', '999999');

        $directories = $this->getBaseDirectories($path);

        $uploaddir = $directories->pathToOpen;
        $uploadfile = $uploaddir.basename($_FILES['uploadfile']['name']);
        copy($_FILES['uploadfile']['tmp_name'], $uploadfile);
        unlink($_FILES['uploadfile']['tmp_name']);

        die();
    }

    public function uploadProgressAction()
    {
        $values = array(
            'start_time' => '',
            'content_length' => '',
            'bytes_processed' => '',
        );

        if (isset($_SESSION['upload_progress_1'])) {
            $values = array(
                'start_time' => $_SESSION['upload_progress_1']['start_time'],
                'content_length' => $_SESSION['upload_progress_1']['content_length'],
                'bytes_processed' => $_SESSION['upload_progress_1']['bytes_processed'],

            );
        }

        $response = new JsonResponse();
        $response->setData($values);
        return $response;
    }

    // helper functions -----------------------------------------------------------------
    protected function getBaseDirectories($path) {
        /* @var User $user */
        $user = $this->getUser();

        // replace path variable
        $path = str_replace('home:', '', $path);
        $path = str_replace(':', '/', $path);
        $path = str_replace('!', '..', $path);

        // get user directory
        $userDir = realpath(__DIR__ . '/../../../uploads/user' . $user->getId()) . '/';
        $userDir = str_replace('\\', '/', $userDir);

        // get path to open
        if ($path) {
            $pathToOpen = realpath($userDir . $path) . '/';
            $pathToOpen = str_replace('\\', '/', $pathToOpen);
        } else {
            $pathToOpen = $userDir;
        }

        // create user folder if not exist
        if (!file_exists($userDir)) {
            mkdir($userDir);
        }

        // safety block limited access over user folder
        if (strrpos($pathToOpen, $userDir) === false) {
            die();
        }

        return (object) array(
            'pathToOpen' => $pathToOpen,
            'userDir' => $userDir
        );
    }

    protected function folderSize($dir){
        $count_size = 0;
        $count = 0;
        $dir_array = scandir($dir);
        foreach($dir_array as $key=>$filename){
            if($filename!=".." && $filename!="."){
                if(is_dir($dir."/".$filename)){
                    $new_folderSize = $this->folderSize($dir."/".$filename);
                    $count_size = $count_size + $new_folderSize;
                }else if(is_file($dir."/".$filename)){
                    $count_size = $count_size + filesize($dir."/".$filename);
                    $count++;
                }
            }
        }
        return $count_size;
    }

    /* @return UserRepository */
    protected function getUserRepository()
    {
        return $this->getDoctrine()->getEntityManager()->getRepository('CloudDriveBundle:User');
    }
}
