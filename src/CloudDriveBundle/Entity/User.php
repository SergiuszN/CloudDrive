<?php

namespace CloudDriveBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * User
 *
 * @ORM\Table(name="fos_user")
 * @ORM\Entity(repositoryClass="CloudDriveBundle\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="ShareLink", mappedBy="user")
     */
    protected $sharedLink;

    public function __construct()
    {
        parent::__construct();
        $this->sharedLink = new ArrayCollection();
        // your own logic
    }

    /**
     * Add sharedLink
     *
     * @param \CloudDriveBundle\Entity\ShareLink $sharedLink
     * @return User
     */
    public function addSharedLink(\CloudDriveBundle\Entity\ShareLink $sharedLink)
    {
        $this->sharedLink[] = $sharedLink;

        return $this;
    }

    /**
     * Remove sharedLink
     *
     * @param \CloudDriveBundle\Entity\ShareLink $sharedLink
     */
    public function removeSharedLink(\CloudDriveBundle\Entity\ShareLink $sharedLink)
    {
        $this->sharedLink->removeElement($sharedLink);
    }

    /**
     * Get sharedLink
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSharedLink()
    {
        return $this->sharedLink;
    }
}
