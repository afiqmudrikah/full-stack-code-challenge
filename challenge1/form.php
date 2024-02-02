<?php 

    session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        $errors = [];
        
        $firstName = htmlspecialchars($_POST["firstname"]);
        $lastName = htmlspecialchars($_POST["lastname"]);
        $contactNumber = htmlspecialchars($_POST["contactnumber"]);
        $email = htmlspecialchars($_POST["email"]);
        $website = htmlspecialchars($_POST["website"]);

        if(empty($firstName) || empty($lastName) || empty($contactNumber) || empty($email) || empty($website)){
            $errors["emptyFields"] = "Please fill in all the fields <br>";
        }

        if(!empty($firstName) && !preg_match("/^[A-Za-z]+$/", $firstName)){
            $errors["invalidFirstName"] = "First name should only contain alpabets <br>";
        }

        if(!empty($lastName) && !preg_match("/^[A-Za-z]+$/", $lastName)){
            $errors["invalidLastName"] = "Last name should only contain alpabets <br>";
        }

        $contactNumber = str_replace(' ', '', $contactNumber);

        if(!empty($contactNumber) && !preg_match("/^\+?[0-9]+$/", $contactNumber)){
            $errors["invalidContact"] = "Contact number should only contain numbers <br>";
        }

        if(!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors["invalidEmail"] = "Invalid email <br>";
        }

        if(!empty($website) && !filter_var($website, FILTER_VALIDATE_URL)){
            $errors["invalidURL"] = "Invalid website <br>";
        }

        $_SESSION["errors"] = $errors;

        if(!empty($_SESSION["errors"])){
            header("Location: index.php");
        }

        echo "<h2>These are the details you have submitted.</h2>";
        echo "<span>First name: </span>$firstName <br>";
        echo "<span>Last name: </span> $lastName <br>";
        echo "<span>Contact number: </span> $contactNumber <br>";
        echo "<span>Email: </span>$email <br>";
        echo "<span>Website/LinkedIn Profile: </span>$website <br>";

    }

?>