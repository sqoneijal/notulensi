<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\API\ResponseTrait;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{

   use ResponseTrait;

   /**
    * Instance of the main Request object.
    *
    * @var CLIRequest|IncomingRequest
    */
   protected $request;

   /**
    * An array of helpers to be loaded automatically upon
    * class instantiation. These helpers will be available
    * to all other controllers that extend BaseController.
    *
    * @var list<string>
    */
   protected $helpers = ['cors', 'cdn'];
}
