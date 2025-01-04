<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->string('phone')->nullable()->change();
            $table->string('landline')->nullable()->change();
            $table->string('identity_number')->nullable()->change();
            $table->string('passport_number')->nullable()->change();
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
            $table->string('phone');
            $table->string('landline');
            $table->string('identity_number');
            $table->string('passport_number');
        });
    }
}
