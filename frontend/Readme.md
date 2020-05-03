# Calc Api Module

## install
`npm install`

`npm run build`

## use:
```html
<!doctype html>
<html lang="en">
<head>
    <!-- ... -->
    <script src="./build/calcApi-min.js" async></script>
</head>
<body>
    <!-- ... -->
    <script>
      window.onload = () => {
        const settings = {
          Services: '2152',
          CalcSettings: '5143',
          PriceName: '1394',
        };

        calcWidget.init(settings);
      };
    </script>
</body>
</html>
```
