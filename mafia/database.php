<!DOCTYPE html>
<html>
  <head>
    <meta charset = "utf-8">
    <title>Search Results</title>
  </head>
  <body>
    <?php
      //creates variable $select
      $select = $_POST["select"];

      //build SELECT Query
      $query = "SELECT " . $select . " FROM mafia";

      //Connect to mysql
      if (!($database = mysql_connect("localhost", "root", "toybox", "mydb")))
        die("Could not connect to database </body></html");

      //open Products Database
      if(!mysql_select_db("mydb", $database))
        die("Could not open mydb database </body></html>");

      //query Products Database
      if(!($result = mysql_query($query, $database)))
      {
        print("<p>Could not execute query!</p>");
        die(mysql_error() . "</body></html>");
      } //end if

      mysql_close($database);
    ?>
    <table>
      <caption>Results of "SELECT <?php print("$select") ?> FROM mafia"</caption>
      <?php
        // fetch each record in result set
        while ($row = mysql_fetch_row($result))
        {
          //build table to display results
          print("<tr>");

          foreach ($row as $key => $value)
            print("<td>$value</td>");

          print("</tr>");
        } //end while
      ?>
    </table>
    <p>Your search yielded
      <?php print(mysql_num_rows($result))?> results.</p>
    <p>Please email comments to someone</p>
  </body>
</html>
