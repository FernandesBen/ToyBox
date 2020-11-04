<!DOCTYPE html>
<html>
  <head>
    <meta charset = "utf-8">
    <title>Search Results</title>
  </head>
  <body>
    <?php
      //build SELECT Query
      $query = "SELECT username FROM mafia";

      //Connect to mysql
      if (!($database = mysql_connect("localhost", "root", "toybox", "mydb")))
        die("Could not connect to database </body></html>");

      //open mydb Database
      if(!mysql_select_db("mydb", $database))
        die("Could not open mydb database </body></html>");

      //query mydb Database
      if(!($result = mysql_query($query, $database)))
      {
        print("<p>Could not execute query!</p>");
        die(mysql_error() . "</body></html>");
      } //end if

      mysql_close($database);
    ?>
    <p>Results: <?php print("$result") ?></p>
  </body>
</html>
