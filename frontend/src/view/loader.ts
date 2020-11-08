namespace calcApi {
	export const getLoaderHtml = (): string => `
		<style>
			.calc-loader {
			    display: none;
			    margin: 0 auto;
			}
			
			.calc-loader.active {
			    display: block;
			}
			
			/* @ LOADER: */
			.calc-boxes {
			    margin: 0 auto;
			    --size: 32px;
			    --duration: 800ms;
			    height: calc(var(--size) * 2);
			    width: calc(var(--size) * 3);
			    position: relative;
			    -webkit-transform-style: preserve-3d;
			    transform-style: preserve-3d;
			    -webkit-transform-origin: 50% 50%;
			    transform-origin: 50% 50%;
			    -webkit-transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
			    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
			}
			
			.calc-box {
			    width: var(--size);
			    height: var(--size);
			    top: 0;
			    left: 0;
			    position: absolute;
			    -webkit-transform-style: preserve-3d;
			    transform-style: preserve-3d;
			}
			
			.calc-box:nth-child(1) {
			    -webkit-transform: translate(100%, 0);
			    transform: translate(100%, 0);
			    -webkit-animation: box1 var(--duration) linear infinite;
			    animation: box1 var(--duration) linear infinite;
			}
			
			.calc-box:nth-child(2) {
			    -webkit-transform: translate(0, 100%);
			    transform: translate(0, 100%);
			    -webkit-animation: box2 var(--duration) linear infinite;
			    animation: box2 var(--duration) linear infinite;
			}
			
			.calc-box:nth-child(3) {
			    -webkit-transform: translate(100%, 100%);
			    transform: translate(100%, 100%);
			    -webkit-animation: box3 var(--duration) linear infinite;
			    animation: box3 var(--duration) linear infinite;
			}
			
			.calc-box:nth-child(4) {
			    -webkit-transform: translate(200%, 0);
			    transform: translate(200%, 0);
			    -webkit-animation: box4 var(--duration) linear infinite;
			    animation: box4 var(--duration) linear infinite;
			}
			
			.calc-box > div {
			    --background: #5c8df6;
			    --top: auto;
			    --right: auto;
			    --bottom: auto;
			    --left: auto;
			    --translateZ: calc(var(--size) / 2);
			    --rotateY: 0deg;
			    --rotateX: 0deg;
			    position: absolute;
			    width: 100%;
			    height: 100%;
			    background: var(--background);
			    top: var(--top);
			    right: var(--right);
			    bottom: var(--bottom);
			    left: var(--left);
			    -webkit-transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
			    transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
			}
			
			.calc-box > div:nth-child(1) {
			    --top: 0;
			    --left: 0;
			}
			
			.calc-box > div:nth-child(2) {
			    --background: #145af2;
			    --right: 0;
			    --rotateY: 90deg;
			}
			.calc-box > div:nth-child(3) {
			    --background: #447cf5;
			    --rotateX: -90deg;
			}
			
			.calc-box > div:nth-child(4) {
			    --background: #dbe3f4;
			    --top: 0;
			    --left: 0;
			    --translateZ: calc(var(--size) * 3 * -1);
			}
			
			@keyframes box1 {
			    0%,
			    50% {
			        -webkit-transform: translate(100%, 0);
			        transform: translate(100%, 0);
			    }
			    100% {
			        -webkit-transform: translate(200%, 0);
			        transform: translate(200%, 0);
			    }
			}
			
			@keyframes box2 {
			    0% {
			        -webkit-transform: translate(0, 100%);
			        transform: translate(0, 100%);
			    }
			    50% {
			        -webkit-transform: translate(0, 0);
			        transform: translate(0, 0);
			    }
			    100% {
			        -webkit-transform: translate(100%, 0);
			        transform: translate(100%, 0);
			    }
			}
			
			@keyframes box3 {
			    0%,
			    50% {
			        -webkit-transform: translate(100%, 100%);
			        transform: translate(100%, 100%);
			    }
			    100% {
			        -webkit-transform: translate(0, 100%);
			        transform: translate(0, 100%);
			    }
			}
			
			@keyframes box4 {
			    0% {
			        -webkit-transform: translate(200%, 0);
			        transform: translate(200%, 0);
			    }
			    50% {
			        -webkit-transform: translate(200%, 100%);
			        transform: translate(200%, 100%);
			    }
			    100% {
			        -webkit-transform: translate(100%, 100%);
			        transform: translate(100%, 100%);
			    }
			}
		</style>
		<div class="calc-loader active" id="calcLoader">
		   <div class="calc-boxes">
		       <div class="calc-box">
		           <div></div>
		           <div></div>
		           <div></div>
		           <div></div>
		       </div>
		       <div class="calc-box">
		           <div></div>
		           <div></div>
		           <div></div>
		           <div></div>
		       </div>
		       <div class="calc-box">
		           <div></div>
		           <div></div>
		           <div></div>
		           <div></div>
		       </div>
		       <div class="calc-box">
		           <div></div>
		           <div></div>
		           <div></div>
		           <div></div>
		       </div>
		   </div>
		</div>
	`
}