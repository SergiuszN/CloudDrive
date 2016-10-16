<?php
namespace CloudDriveBundle\Helpers;

class FlxZipArchive extends \ZipArchive {

    public function addDir($location, $name) {
        $this->addEmptyDir($name);
        $this->addDirDo($location, $name);
    }

    public function createTempFolderArchive($folder) {
        $tempZip = tempnam(sys_get_temp_dir(), 'zip') . '.zip';
        $res = $this->open($tempZip, \ZipArchive::CREATE);

        if($res === TRUE) {
            $this->addDir($folder, basename($folder));
            $this->close();
        }

        return $tempZip;
    }

    private function addDirDo($location, $name) {
        $name .= substr($name, -1) == '/' ? '' : '/';
        $location .= substr($location, -1) == '/' ? '' : '/';

        // Read all Files in Dir
        $dir = opendir ($location);
        while ($file = readdir($dir))    {
            if ($file == '.' || $file == '..') {
                continue;
            }
            // If dir: FlxZipArchive::addDir(), else ::File();
            $do = (filetype( $location . $file) == 'dir') ? 'addDir' : 'addFile';
            $this->$do($location . $file, $name . $file);
        }
    }
}