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
        /* @var User $user */
        $user = $this->getUser();
        $response = new JsonResponse();

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
            return $response;
        }

        // scan dir and remove '.' from list and '..' if is home folder
        $list = scandir($pathToOpen);
        array_shift($list);
        if ($pathToOpen == $userDir) {
            array_shift($list);
        }

        $dir = array();

        foreach ($list as $key => $file) {
            if (is_dir($pathToOpen . $file)) {
                $dir['directory'][] = array($file, $this->folderSize($pathToOpen . $file), filemtime($pathToOpen . $file)*1000);
            } else {
                $dir['file'][] = array($file, filesize($pathToOpen . $file), filemtime($pathToOpen . $file)*1000);
            }
        }

        $parameters = array(
            'url' => $this->generateUrl('cloud_drive_api_main_page', array(), true) . '/',
            'folder' => str_replace('/', ':', 'home:' . str_replace($userDir, '', $pathToOpen)),
            'dir' => $dir,
        );

//        echo '<pre>';
//        var_dump($parameters);
//        echo '</pre>';
        //die();
        $response->setData($parameters);
        return $response;
    }

    public function uploadAction() {
        $user = $this->getUser();
        $userDir = realpath(__DIR__ . '/../../../uploads/user' . $user->getId()) . '/';

        $uploaddir = $userDir;
        $uploadfile = $uploaddir.basename($_FILES['uploadfile']['name']);

        if (copy($_FILES['uploadfile']['tmp_name'], $uploadfile))
        {
            echo "<h3>Файл успешно загружен на сервер</h3>";
        }
        else { echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; exit; }

        echo "<h3>Информация о загруженном на сервер файле: </h3>";
        echo "<p><b>Оригинальное имя загруженного файла: ".$_FILES['uploadfile']['name']."</b></p>";
        echo "<p><b>Mime-тип загруженного файла: ".$_FILES['uploadfile']['type']."</b></p>";
        echo "<p><b>Размер загруженного файла в байтах: ".$_FILES['uploadfile']['size']."</b></p>";
        echo "<p><b>Временное имя файла: ".$_FILES['uploadfile']['tmp_name']."</b></p>";

        die();
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
