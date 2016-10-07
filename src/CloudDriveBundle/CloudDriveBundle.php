<?php

namespace CloudDriveBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class CloudDriveBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
