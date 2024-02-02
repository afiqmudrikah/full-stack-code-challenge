<?php 
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PHP Challenge</title>
  </head>
  <body>
    <?php 

      if(isset($_SESSION["errors"])){
        $errors = $_SESSION["errors"];

        foreach($errors as $error) {
          echo "<span style='color:red; font-weight:bold;'>
          {$error}
          </span>";
        }
        unset($_SESSION["errors"]);
      }

    ?>
    <form action="form.php" method="post" autocomplete="off">
      <h3>Please fill in your details below:</h3>
      <label for="firstname">First Name:</label>
      <br />
      <input id="firstname" type="text" name="firstname" />
      <br />

      <label for="lastname">Last Name:</label>
      <br />
      <input id="lastname" type="text" name="lastname"/>
      <br />

      <label for="contactnumber"
        >Contact Number:(Optional to include country code)</label
      >
      <br />
      <input id="contactnumber" type="text" name="contactnumber" placeholder="e.g. +65 1234 5678" />
      <br />

      <label for="email">Email:</label>
      <br />
      <input id="email" type="email" name="email" />
      <br />

      <label for="website">Website/LinkedIn Profile:</label>
      <br />
      <input id="website" type="url" name="website" />
      <br />
      <input type="submit" name="submit" value="Submit" />
    </form>
  </body>
</html>
