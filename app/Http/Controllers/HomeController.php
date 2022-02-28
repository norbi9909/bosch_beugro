<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function production()
    {
        //views can be returned with data.
        return view('production');
    }

    public function about()
    {
        return view('about');
    }

    public function center()
    {
        return view('center');
    }

    public function get_product_data()
    {
        $query=DB::select(DB::raw('select * from products'));
        return $query;
    }

    public function list_products(Request $request)
    {
        if($request->pcbid == 0)
        {
            return
            $query=DB::select(DB::raw('select * from production'));
        }
        $query=DB::select(DB::raw('select * from production where pcb_id = '.$request->pcbid.''));
        return $query;
    }

    public function delete_production(Request $request)
    {
        $query=DB::delete(DB::raw('delete from production where id = '.$request->id.''));
    }
}
