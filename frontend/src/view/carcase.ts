namespace calcApi {
	export const getCarcaseHtml = (): string => `
		<style>
		   .calc-section {
		       width: 100%;
		       padding: 20px;
		       font-family: "Helvetica Neue", Arial, serif;
		   }
		   
		   .calc-main-container {
		       display: flex;
		       flex-wrap: wrap;
		   }
		   
		   .calc-container {
		       min-height: 100px;
		       margin-bottom: 10px;
		       padding: 10px;
		   }
		   
		   .calc-elem {
		       color: #636363;
		       width: 250px;
		       padding: 10px;
		       -moz-transition: border 0.3s ease;
		       -o-transition: border 0.3s ease;
		       -webkit-transition: border 0.3s ease;
		       transition: border 0.3s ease;
		       backface-visibility: hidden;
		       --borderWidth: 3px;
		       background: #ffffff;
		       position: relative;
		       border-radius: var(--borderWidth);
		   }
		   
		   .calc-price {
		       background: none;
		   }
		   
		   .calc-elem:after {
		       content: '';
		       position: absolute;
		       top: calc(-1 * var(--borderWidth));
		       left: calc(-1 * var(--borderWidth));
		       height: calc(100% + var(--borderWidth) * 2);
		       width: calc(100% + var(--borderWidth) * 2);
		       background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
		       border-radius: calc(2 * var(--borderWidth));
		       z-index: -1;
		       -webkit-animation: animatedGradient 3s ease alternate infinite;
		       animation: animatedGradient 3s ease alternate infinite;
		       background-size: 300% 300%;
		   }
		   
		   .calc-elem__title {
		       font-size: 1rem;
		       line-height: 32px;
		       font-weight: bold;
		       color: #404040bd;
		       padding: 0 5px;
		       -moz-transition: color 0.3s ease;
		       -o-transition: color 0.3s ease;
		       -webkit-transition: color 0.3s ease;
		       transition: color 0.3s ease;
		   }
		   
		   .calc-price .calc-elem__title {
		       text-align: center;
		       color: #fff;
		   }
		   
		   .calc-elem__title.fade {
		       -webkit-animation: colorFade 0.6s 0s ease both;
		       -moz-animation: colorFade 0.6s 0s ease both;
		       -ms-animation: colorFade 0.6s 0s ease both;
		       -o-animation: colorFade 0.6s 0s ease both;
		       animation: colorFade 0.6s 0s ease both;
		   }
		   
		   .calc-elem.active > .calc-elem__list {
		       display: block;
		   }
		   
		   .calc-elem.hover > .calc-elem__title {
		       color: #b2b2b2;
		   }
		   
		   .calc-elem.open .calc-elem__list {
		       height: 100px;
		       opacity: 1;
		   }
		   
		   .calc-elem__list {
		       display: none;
		       list-style-type: none;
		       font-weight: 200;
		       width: 100%;
		       -moz-transition: all 0.3s ease;
		       -o-transition: all 0.3s ease;
		       -webkit-transition: all 0.3s ease;
		       transition: all 0.3s ease;
		       padding: 10px 5px 0 0;
		       margin: 15px 0 0;
		   }
		   
		   .calc-elem__link {
		       padding: 5px;
		       text-decoration: none;
		       font-size: 1rem;
		       color: #cbcbcb;
		       font-weight: bold;
		       cursor: pointer;
		       -moz-transition: color 0.3s ease;
		       -o-transition: color 0.3s ease;
		       -webkit-transition: color 0.3s ease;
		       transition: color 0.3s ease;
		   }
		   
		   .calc-elem__link:hover {
		       color: #636363;
		   }
		   
		   .calc-elem__link.active {
		       color: #636363;
		   }
		   
		   .calc-elem__list-elem {
		       padding: 8px 0;
		   }
		   
		   .calc-elem__close {
		       float: right;
		       fill: #cbcbcb;
		       position: relative;
		       top: 4px;
		       -moz-transform: rotate(0deg);
		       -ms-transform: rotate(0deg);
		       -webkit-transform: rotate(0deg);
		       transform: rotate(0deg);
		       -moz-transition: all 0.3s ease;
		       -o-transition: all 0.3s ease;
		       -webkit-transition: all 0.3s ease;
		       transition: all 0.3s ease;
		       cursor: pointer;
		   }
		   
		   .calc-elem__path {
		       -moz-transition: all 0.3s ease;
		       -o-transition: all 0.3s ease;
		       -webkit-transition: all 0.3s ease;
		       transition: all 0.3s ease;
		   }
		   
		   .calc-elem__close:hover .calc-elem__path {
		       fill: #404040;
		   }
		   
		   .calc-elem__close.active {
		       -moz-transform: rotate(-135deg);
		       -ms-transform: rotate(-135deg);
		       -webkit-transform: rotate(-135deg);
		       transform: rotate(-135deg);
		   }
		   
		   .calc-elem__close.active .calc-elem__path {
		       fill: #404040;
		   }
		   
		   /* @ ANIMATIONS: */
		   /* FONT: */
		   @keyframes colorFade {
		       from {
		           color: #404040;
		       }
		       to {
		           color: #cbcbcb;
		       }
		   }
		   
		   /* BORDER: */
		   @keyframes animatedGradient {
		       0% {
		           background-position: 0% 50%;
		       }
		       50% {
		           background-position: 100% 50%;
		       }
		       100% {
		           background-position: 0% 50%;
		       }
		   }
		</style>
		
		<h2>Калькулятор</h2>
		<div id="calcContainer" class="calc-main-container"></div>
	`
}