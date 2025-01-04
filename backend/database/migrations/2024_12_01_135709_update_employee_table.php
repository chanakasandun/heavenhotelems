<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateEmployeeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            // Remove the department_id column
            $table->dropForeign(['department_id']);
            $table->dropColumn('department_id');
            
            // Add the position_id column and set the foreign key
            $table->unsignedBigInteger('position_id')->after('last_name');
            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            // Add the department_id column back
            $table->unsignedBigInteger('department_id')->nullable()->after('last_name');
            $table->foreign('department_id')->references('id')->on('departments');
            
            // Remove the position_id column
            $table->dropForeign(['position_id']);
            $table->dropColumn('position_id');
        });
    }
}
