namespace calcApi {
	export const getPriceHtml = (title: string): string => `
		<div class="calc-container">
	    <div class="calc-elem calc-price">
	      <p class="calc-elem__title">Цена:</p>
	      <p class="calc-elem__title">${title}</p>
	    </div>
	  </div>
	`
}