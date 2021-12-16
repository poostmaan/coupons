<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Design by foolishdeveloper.com -->
    <title>LOGIN - COUPON</title>
 
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <!--Stylesheet-->
    <style >
      *,
        *:before,
        *:after{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            background-color: #080710;
        }
        form{
            background-color: rgba(255,255,255,0.13);
            position: relative;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.1);
            box-shadow: 0 0 40px rgba(8,7,16,0.6);
            padding: 50px 35px;
        }
        form *{
            font-family: 'Poppins',sans-serif;
            color: #ffffff;
            letter-spacing: 0.5px;
            outline: none;
            border: none;
        }
        form h3{
            font-size: 32px;
            font-weight: 500;
            line-height: 42px;
            text-align: center;
        }
        label{
            display: block;
            margin-top: 30px;
            font-size: 16px;
            font-weight: 500;
        }
        input{
            display: block;
            height: 50px;
            width: 100%;
            background-color: rgba(255,255,255,0.07);
            border-radius: 3px;
            padding: 0 10px;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 300;
        }
        ::placeholder{
            color: #e5e5e5;
        }
        button{
            /*margin-top: 50px;*/
            width: 100%;
            background-color: #ffffff;
            color: #080710;
            padding: 15px 0;
            font-size: 18px;
            font-weight: 600;
            border-radius: 5px;
            cursor: pointer;
        }
        .alert-edit{
            background-color: #f93768;
            border-color: #f93768;
            animation: myAnim 1s ease 0s 1 normal forwards;
        }
        .alert-text{
            font-size: 10px;
        }
        @keyframes myAnim {
          0% {
            transform: scaleX(0.4);
          }

          100% {
            transform: scaleX(1);
          }
        }
        @media screen and (min-width: 360px) {
            form {
                transform: scale(1);
            }
        }

    </style>
</head>
<body>
    <!-- <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div> -->
    <div class="row d-flex align-items-center justify-content-center vh-100 m-0">
        <div class="col-md-4 col-sm-1"></div>
        <div class="col-md-4 col-sm-10 col-xs-6">
            <form action="backend/php/acceso.php" method="POST">
                <h3>LOGIN</h3>

                <label for="username">Usuario</label>
                <input type="text" name="usuario" placeholder="Usuario" id="username" required>

                <label for="password">Contraseña</label>
                <input type="password" name="password" placeholder="Contraseña" id="password" required>

                <button class="mt-3">INGRESA</button>

                <?php if(isset($_GET["fallo"]) && $_GET["fallo"] == 'true'):?>

                    <div class="alert alert-danger d-flex align-items-center my-2 alert-edit" role="alert">
                        <div class="alert-text">Usuario o contraseña incorrectos, intenta de nuevo</div>
                    </div>

                <?php endif;?>
                <!-- <div class="social">
                  <div class="go"><i class="fab fa-google"></i>  Google</div>
                  <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
                </div> -->
            </form>
        </div>
        <div class="col-md-4 col-sm-1"></div>
    </div>
</body>
</html>
