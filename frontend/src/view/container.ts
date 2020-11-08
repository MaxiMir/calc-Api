namespace calcApi {
	export const getContainerHtml = (elementsHTML: string, table: string, checkedID: number | null, title?: string): string => `
		<div class="calc-container">
           <div class="calc-elem" data-table="${table}" data-checked-id="${checkedID}">
             <svg version="1.1"
                 class="calc-elem__close"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px"
                 width="25px"
                 viewBox="0 0 42 42"
                 enable-background="new 0 0 42 42"
                 xml:space="preserve"
             >
               <path
                   class="calc-elem__path one"
                   fill="#cbcbcb"
                   d="M42,21L42,21c0,1.1-0.9,2-2,2H2c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2H40C41.1,19,42,19.9,42,21z" cx="0"
                   cy="0"
               />
               <path
                   class="calc-elem__path two"
                   fill="#cbcbcb"
                   d="M21,42L21,42c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2V40C23,41.1,22.1,42,21,42z" cx="10"
                   cy="10"
               />
             </svg>
             <span class="calc-elem__title">${title}</span>
             <ul class="calc-elem__list">${elementsHTML}</ul>
           </div>
      </div>	
	`
}